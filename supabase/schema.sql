-- Everything Pitch This runs on the server. Applied to the Supabase project as two migrations.

-- One row per room. Everyone can read a game; only the TV that started it can change it.
create table public.games (
  code text primary key check (code ~ '^[A-Z]{4}$'),
  state jsonb not null,
  updated_at timestamptz not null default now()
);
-- host secrets live apart so they never reach a player
create table public.game_hosts (
  code text primary key references public.games(code) on delete cascade,
  token uuid not null,
  created_at timestamptz not null default now()
);
alter table public.games enable row level security;
alter table public.game_hosts enable row level security;
create policy "anyone can read games" on public.games for select to anon, authenticated using (true);
-- no policies on game_hosts: no direct access at all

create or replace function public.save_game(p_code text, p_token uuid, p_state jsonb)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare existing uuid;
begin
  if p_code !~ '^[A-Z]{4}$' then raise exception 'bad code'; end if;
  if octet_length(p_state::text) > 200000 then raise exception 'state too large'; end if;
  select token into existing from game_hosts where code = p_code;
  if existing is null then
    insert into games(code, state) values (p_code, p_state);
    insert into game_hosts(code, token) values (p_code, p_token);
    return true;
  elsif existing <> p_token then
    return false;
  end if;
  update games set state = p_state, updated_at = now() where code = p_code;
  return true;
end;
$$;
revoke all on function public.save_game(text, uuid, jsonb) from public;
grant execute on function public.save_game(text, uuid, jsonb) to anon, authenticated;

alter publication supabase_realtime add table public.games;

-- Games (names, questions, bets) are kept for at most 24 hours after their last change.
create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule(
  'delete-old-games',
  '17 * * * *',
  $$ delete from public.games where updated_at < now() - interval '24 hours' $$
);
