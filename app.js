
const $ = s => document.querySelector(s);
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const money = v => v<=0 ? '$0' : v>=1e6 ? '$'+(+(v/1e6).toFixed(2))+'M' : '$'+Math.round(v/1e3)+'K';
const fmt = s => Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const esc = s => String(s??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const clone = o => JSON.parse(JSON.stringify(o));
const rid = () => Math.random().toString(36).slice(2,10);
function store(kind){ try{ return window[kind] }catch(e){ return null } }
function sget(kind,k){ try{ return store(kind)?.getItem(k) }catch(e){ return null } }
function sset(kind,k,v){ try{ store(kind)?.setItem(k,v) }catch(e){} }

const PITCH_SECS = 180;
const EMOJI = ['🔥','🤑','😂','🤯','🙄','💤'];
const COLORS = ['#ff6b57','#7c5cff','#2f7dff','#14b37d','#f4b73a','#ff9ec0','#7fd3ff','#b8e45c','#ff8f3d','#c58cff','#5ce1e6','#ffd166'];

/* ---------- content packs ---------- */
// Each company is [name, slogan] with an optional [logo color, accent]; packs without colors take them from their palette.
const PACKS = {
  classic:{name:'Classic', list:[
  ['Snaccident','Oops, all flavor.',['#ff6b57','#f4b73a']],
  ['Grandma-as-a-Service','Love, delivered on demand.',['#7c5cff','#ff9ec0']],
  ['CloudSock','Walk on the cloud.',['#2f7dff','#7fd3ff']],
  ['Barkchain','Every woof, on the ledger.',['#14936a','#b8e45c']],
  ['Naptimize','Sleep is the new hustle.',['#5b6cff','#c3b5ff']],
  ['Fridgetopia','A fridge smarter than you.',['#2bb3c0','#d6f3f5']],
  ['Quackride','Waddle less. Arrive more.',['#f4b73a','#ff8f3d']],
  ['SoupScription','Never go a day without broth.',['#d9480f','#ffd8a8']],
  ['Plantr','Swipe right on succulents.',['#2f9e44','#b2f2bb']],
  ['MoodSync','Feelings, synced across devices.',['#e64980','#ffc9de']],
  ['Rent-a-Nemesis','Motivation, with a grudge.',['#c92a2a','#495057']],
  ['Lawnfluencer','The grass is greener on our feed.',['#5c940d','#d8f5a2']],
  ['SpoonDAO','Decentralized stirring.',['#868e96','#4dabf7']],
  ['PillowPal','It listens. It never interrupts.',['#9775fa','#e5dbff']],
  ['Gymnasty','Sweat now, complain forever.',['#f03e3e','#ffe066']],
  ['Toastr','Breakfast, but make it social.',['#e8590c','#fff3bf']],
  ['Spookscribe','Haunting prose by actual ghosts.',['#495057','#c5f6fa']],
  ['PuddleHop','Premium puddles near you.',['#1971c2','#a5d8ff']],
  ['Couchsurfr','Your couch, monetized.',['#a61e4d','#fcc2d7']],
  ['Socksmith','Artisanal mismatched pairs.',['#0b7285','#ffd43b']],
  ]},
  food:{name:'Food & Drink', pal:[['#e8590c','#ffd8a8'],['#c92a2a','#ffc9c9'],['#f08c00','#fff3bf'],['#2f9e44','#d3f9d8'],['#862e9c','#f3d9fa']], list:[
    ['Brunchify','Mimosas as a service.'],['Crumbtrail','Never lose a snack again.'],['SaladDays','Lettuce change the world.'],
    ['Spicenet','The internet, but hotter.'],['Leftoverly',"Yesterday's dinner, tomorrow's IPO."],['Brinery','Everything tastes better pickled.'],
    ['NoodleNoodle','Slurp responsibly.'],['Waffle Labs','Crispy outside, disruptive inside.'],['TacoTuesday+','Every day is Tuesday now.'],
    ['Sproutly','Microgreens, macro dreams.'],['FondueMe','Dip into the future.'],['Kombucha Club','Fizz with purpose.'],
    ['Crustworthy','Pizza you can trust.'],['Sipster','Coffee for people who skip coffee.'],['Gravy Train','All aboard the sauce.'],
    ['Bagelchain','Every schmear, verified.'],['Mealworm Market','Protein, but crunchy.'],['Spoonfed','Meals that eat themselves.'],
    ['Ice Ice Bay','Artisanal ice, hand-carved.'],['Snackrobat','Snacks that do flips.']]},
  pets:{name:'Pets & Animals', pal:[['#f08c00','#ffe8cc'],['#5c940d','#e9fac8'],['#1971c2','#d0ebff'],['#a61e4d','#ffdeeb'],['#495057','#f1f3f5']], list:[
    ['Pawpal',"Your dog's professional network."],['Meowmentum','Cats that get things done.'],['Fetchly',"We throw it so you don't have to."],
    ['Hamsterwheel Energy','Clean power, tiny legs.'],['Goatyoga','Namastay on the goat.'],['Purrfect Match','Dating, for cats.'],
    ['BirdBnB','Short stays for long flights.'],['Llama Drop','Same-day spit delivery.'],['Fishfluencer','Small tank, big following.'],
    ['Woofware','Software your dog can use.'],['Snailmail Pro','Slow and steady wins delivery.'],['Ferret Fiber','Internet that sneaks everywhere.'],
    ['Turtletech','Built to last 150 years.'],['FurSight TV','Binge-watching for bored pets.'],['Squirrel Savings','Hide your nuts for retirement.'],
    ['Parrot Assist','The assistant that repeats you.'],['Horse Sense','Advice, straight from the stable.'],['Cowworking','Office space with a moo view.'],
    ['Hiss & Tell','Gossip for reptiles.'],['Ducktape','Holds your pond together.']]},
  tech:{name:'Tech & AI', pal:[['#2f7dff','#a5d8ff'],['#7048e8','#d0bfff'],['#0ca678','#c3fae8'],['#1c7ed6','#ffe066'],['#e64980','#ffdeeb']], list:[
    ['Blockbuddy',"A blockchain that's also your friend."],['Cloudnine','We put your feelings in the cloud.'],['Promptly',"AI that's always late."],
    ['Bytesize','Snackable software.'],['Glitchcraft','Bugs, but on purpose.'],['Wi-Fly','Internet on a drone, right above you.'],
    ['Passwordle','Guess your own password daily.'],['Robonanny','Bedtime stories, now with firmware.'],['Algorhythm','Music picked by math.'],
    ['Metaverse Mall','Shop till your headset drops.'],['Quantum Toast','Burnt and not burnt at once.'],['SmartSpoon','Your spoon knows what you ate.'],
    ['Unplugd','An app for using fewer apps.'],['Deepfake Dad','Dad jokes on demand.'],['Captchapp','Prove you are human, for fun.'],
    ['Holo-Host',"Throw parties you don't attend."],['Loadingbar','We make waiting beautiful.'],['Emailicious','Inbox zero, flavor one.'],
    ['Ctrl-Zen','Undo your stress.'],['Dronut','Donuts, delivered by drone.']]},
  fitness:{name:'Health & Fitness', pal:[['#f03e3e','#ffe3e3'],['#0ca678','#c3fae8'],['#f59f00','#fff3bf'],['#4263eb','#dbe4ff'],['#ae3ec9','#f3d9fa']], list:[
    ['Sweatshare','Sweat now, invest later.'],['Stretchly','Flexibility, quarterly.'],['Napnasium','The gym where you sleep.'],
    ['Plankton','One-minute planks, for life.'],['Kalebrate','Celebrate every leaf.'],['Hydrajudge','A water bottle that judges you.'],
    ['StepUp Socks','Socks that count your steps.'],['Zenbox','Meditation in a shipping container.'],['Yogurt Yoga','Stretch, then snack.'],
    ['Lift Off','Weightlifting on the moon.'],['Pulsepal','Your heartbeat, but social.'],['Cardio Karaoke','Sing until you sweat.'],
    ['Breathe.io','Inhale. Exhale. Subscribe.'],['Sleepcoin','Earn crypto while you snore.'],['Posture Police',"Sit up. We're watching."],
    ['Trailmix Trainer',"A coach who's all snacks."],['Vitamindz','Supplements for the mind.'],['Burpee Bank','Deposit reps, withdraw abs.'],
    ['Couch to Kayak','From sofa to sea in 30 days.'],['Sauna Sound','Podcasts for people in saunas.']]},
  home:{name:'Home & Life', pal:[['#1098ad','#c5f6fa'],['#d6336c','#ffdeeb'],['#5c940d','#e9fac8'],['#e67700','#fff3bf'],['#5f3dc4','#e5dbff']], list:[
    ['Laundrone','Folding clothes from above.'],['Mowbot','Your lawn, on autopilot.'],['Chorely','Chores, gamified.'],
    ['Sockmate','We find the missing one.'],['Roomie Rater','Reviews for roommates.'],['Doorbell Diaries','Every visitor, narrated.'],
    ['Plantsitter','Babysitting for your ferns.'],['Fridge Poetry','Groceries that rhyme.'],['Couch Potato Co.','Furniture that never lets you leave.'],
    ['Dishwizard','Magic for dirty plates.'],['Clutterless','We hide your stuff for you.'],['Rent-a-Grandpa','Wisdom, by the hour.'],
    ['Nap Pod Home','A cocoon for your living room.'],['Mailmood','Bills that apologize.'],['Lightbulb Moments','Lamps that have ideas.'],
    ['Keyfinder','Your keys, forever found.'],['BlanketFort','Fort-building kits for adults.'],['Tidy Tiger','Cleaning, with a roar.'],
    ['Porch Guardian','Packages that bite back.'],['Bedtimes','The news, read in a soothing voice.']]},
  spooky:{name:'Spooky & Weird', pal:[['#5f3dc4','#d0bfff'],['#2b8a3e','#b2f2bb'],['#e8590c','#ffd8a8'],['#212529','#ced4da'],['#c2255c','#fcc2d7']], list:[
    ['Hauntify','Find a ghost for your home.'],['Cryptid Cab','Rides from Bigfoot himself.'],['Witchcraft Brewery','Potions with a 5-star rating.'],
    ['Vampire Dental','Fangs, whitened.'],['Ouija Online','The spirits are typing…'],['Zombie Cardio',"Run like they're right behind you."],
    ['Moonlighting','Night jobs for werewolves.'],['Alien Airbnb','Abductions, now bookable.'],['Crystal Clear','Fortune-telling, with a warranty.'],
    ['Mummy Wrap','Gift wrapping, ancient style.'],['Gravesite Wi-Fi','Stay connected forever.'],['Poltergeist Pro','We move your furniture for you.'],
    ['Swampthing Spa','Mud baths, straight from the bog.'],['Tarot Taxi',"We know where you're going."],['Skeleton Crew','Staffing, bare bones.'],
    ['Bat Signal','Text alerts for vampires.'],['Fog Machine','Mystery, on tap.'],['Cursed Candles','Smells amazing. Mostly safe.'],
    ['Haunted Takeout','Dinner that follows you home.'],['Area 52','One better than 51.']]},
};
const ALL_COS = Object.values(PACKS).flatMap(pk=>pk.list.map(([co,tag,c],i)=>({co,tag,c:c||pk.pal[i%pk.pal.length]})));
const packCos = key => key==='all' ? ALL_COS : PACKS[key].list.map(([co,tag,c],i)=>({co,tag,c:c||PACKS[key].pal[i%PACKS[key].pal.length]}));
const packName = key => key==='all' ? `Everything (${ALL_COS.length})` : `${PACKS[key].name} (${PACKS[key].list.length})`;

const STEPS = [
  {i:'📱', t:'Join the game', d:'Scan the code with your phone and pick a side: Founder or Investor.',
   founder:"You'll pitch a company in front of everyone.", investor:"You hold the money. You'll judge from your phone."},
  {i:'🤫', t:'Get a secret company', d:"Each founder gets 3 slides they've never seen: a name and logo, some mystery charts, and a slogan.",
   founder:'No peeking. You see your slides at the same moment as the room.', investor:'Company names stay hidden until each founder pitches.'},
  {i:'⏱️', t:'Pitch for 3 minutes', d:'Founders take the stage one at a time. The charts have no labels, so make up what they mean.',
   founder:'Your phone is the clicker. Tap › for the next slide.', investor:"Listen closely. You'll bet on these companies."},
  {i:'🔥', t:'React and ask', d:'Tap emoji that float up on the big screen and send in questions. The founder answers them when time runs out.',
   founder:'Expect tough questions. Confidence sells.', investor:'Tap emoji any time. Type a question to grill the founder.'},
  {i:'💰', t:'Split your $1M', d:'After the last pitch, spread $1M across the companies you believe in.',
   founder:'You get $1M of side bets too, on everyone except yourself.', investor:'Up to 50% on your favorite, 40% on your second, 30% on each of the rest.'},
  {i:'🏆', t:'The big reveal', d:'The company that raised the most pays its backers 2×. Each place below pays less, and last place pays nothing.',
   founder:'Your score is how much investors put into you.', investor:'Back the top companies to grow your fund.'},
  {i:'🔁', t:'Two ways to win', d:'Founders compete on Money raised. Everyone competes on Best bets. Each round starts fresh at $1M.',
   founder:'Top both boards: raise big and bet smart.', investor:'Finish with the biggest fund to win.'},
];

/* ---------- generated art ---------- */
function logo(f){
  const r=rng(f.seed), [a,b]=f.c, kinds=['circle','square','tri','half'];
  const k1=kinds[Math.floor(r()*4)], k2=kinds[Math.floor(r()*4)];
  const shape=(k,x,y,s,col)=>{
    if(k==='circle') return `<circle cx="${x}" cy="${y}" r="${s/2}" fill="${col}"/>`;
    if(k==='square') return `<rect x="${x-s/2}" y="${y-s/2}" width="${s}" height="${s}" rx="${s*.22}" fill="${col}"/>`;
    if(k==='tri') return `<path d="M${x} ${y-s/2} L${x+s/2} ${y+s/2} L${x-s/2} ${y+s/2}Z" fill="${col}"/>`;
    return `<path d="M${x-s/2} ${y} A${s/2} ${s/2} 0 0 1 ${x+s/2} ${y}Z" fill="${col}"/>`;
  };
  return `<svg viewBox="0 0 100 100" class="logo" aria-hidden="true">${shape(k1,40+r()*8,42+r()*8,46,a)}${shape(k2,58+r()*6,58+r()*6,34,b)}<circle cx="${30+r()*40}" cy="${28+r()*10}" r="5" fill="#1a231f"/></svg>`;
}
function charts(f){
  const r=rng(f.seed*7), [a,b]=f.c, ink='#1a231f', ax=`<path d="M8 8 V92 H96" stroke="${ink}" stroke-width="2" fill="none" opacity=".5"/>`;
  let bars=''; for(let i=0;i<6;i++){const h=15+r()*70; bars+=`<rect x="${14+i*13.5}" y="${90-h}" width="9" height="${h}" rx="1.5" fill="${i===5?a:b}"/>`}
  let pts=[], y=70; for(let i=0;i<8;i++){y=Math.max(12,Math.min(86,y-(r()*26-8)));pts.push(`${12+i*11.5},${y.toFixed(1)}`)}
  const line=`<polyline points="${pts.join(' ')}" fill="none" stroke="${a}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  let ang=-Math.PI/2, pie=''; const vals=[r()+.4,r()+.2,r()+.1], tot=vals.reduce((s,v)=>s+v,0), cols=[a,b,'#cfd6d1'];
  vals.forEach((v,i)=>{const a2=ang+v/tot*Math.PI*2, x1=50+38*Math.cos(ang),y1=50+38*Math.sin(ang),x2=50+38*Math.cos(a2),y2=50+38*Math.sin(a2);
    pie+=`<path d="M50 50 L${x1.toFixed(1)} ${y1.toFixed(1)} A38 38 0 ${a2-ang>Math.PI?1:0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z" fill="${cols[i]}"/>`; ang=a2});
  return `<div class="charts"><svg viewBox="0 0 100 100">${ax}${bars}</svg><svg viewBox="0 0 100 100">${ax}${line}</svg><svg viewBox="0 0 100 100">${pie}<circle cx="50" cy="50" r="17" fill="#fbfbf6"/></svg></div>`;
}
function slide(f,i,who){
  if(i===0) return `<div class="slide"><div class="in">${logo(f)}<div class="co">${esc(f.co)}</div><div class="sub">Presented by ${esc(who)}, Founder &amp; CEO</div></div></div>`;
  const corner=`<div class="corner">${logo(f)}${esc(f.co)}</div>`;
  if(i===1) return `<div class="slide">${corner}<div class="in">${charts(f)}</div></div>`;
  return `<div class="slide">${corner}<div class="in"><div class="tagline">${esc(f.tag)}</div></div></div>`;
}
function qrSvg(text){
  try{ const q=qrcode(0,'M'); q.addData(text); q.make(); return q.createSvgTag({cellSize:4,margin:2,scalable:true}) }
  catch(e){ return '' }
}

/* ---------- investing rules ---------- */
// sorted from largest: top bet ≤50%, second ≤40%, every other ≤30%, total ≤100%
function valid(a){
  const v=Object.values(a).sort((x,y)=>y-x);
  if(v.reduce((s,x)=>s+x,0)>100) return false;
  return (v[0]??0)<=50 && (v[1]??0)<=40 && v.slice(2).every(x=>x<=30);
}
function maxFor(a,id){ for(let v=50;v>=0;v-=5){ if(valid({...a,[id]:v})) return v } return 0 }
const used = a => Object.values(a).reduce((s,x)=>s+x,0);
// presence is untrusted: keep only allowed companies, 5% steps, and a valid split
function sanitize(a,allowed){
  const out={}; if(!a||typeof a!=='object') return out;
  for(const id of allowed){ const v=+a[id]; if(Number.isFinite(v)&&v>0) out[id]=Math.min(50,Math.round(v/5)*5) }
  return valid(out)?out:{};
}
const betIds = (st,pid) => st.order.filter(f=>f!==pid);

function computeResults(st,bettors){
  const N=st.order.length;
  const allocOf=pid=>st.alloc[pid]?.a||{};
  const inv=Object.keys(st.players).filter(p=>st.players[p].role==='investor');
  const raised=st.order.map(fid=>({fid,amt:inv.reduce((s,p)=>s+(allocOf(p)[fid]||0)*1e4,0)})).sort((a,b)=>b.amt-a.amt);
  // tied founders share the average of the multipliers for the ranks they cover
  for(let i=0;i<N;){
    let j=i; while(j+1<N&&raised[j+1].amt===raised[i].amt) j++;
    let m=0; for(let k=i;k<=j;k++) m+=2*(N-1-k)/(N-1); m/=(j-i+1);
    for(let k=i;k<=j;k++){ raised[k].mult=+m.toFixed(4); raised[k].rank=i+1 }
    i=j+1;
  }
  const mult=Object.fromEntries(raised.map(r=>[r.fid,r.mult]));
  const value=a=>(100-used(a))*1e4+Object.entries(a).reduce((s,[id,p])=>s+p*1e4*(mult[id]??1),0);
  // everyone in the round is scored: investors, plus founders on their side bets
  const funds=bettors.map(pid=>({pid,val:Math.round(value(allocOf(pid))),founder:st.players[pid]?.role==='founder'})).sort((a,b)=>b.val-a.val);
  return {raised,funds,mult};
}

/* ---------- transport ---------- */
// Supabase keeps every screen in sync: the TV saves the game to one row per room code,
// and the phones talk to the TV through realtime presence on that room's channel.
const SB_URL='https://knvaszzjraveyjwnxlhs.supabase.co', SB_KEY='sb_publishable_W-32u77BagcvTzq3uxTgng_TvJS7FNn';
const SB = window.supabase ? supabase.createClient(SB_URL, SB_KEY, {realtime:{params:{eventsPerSecond:20}}}) : null;
const tokens={};
const hostToken = code => tokens[code] || sget('localStorage','pt-host-'+code);
async function supaNet(code){
  const ch=SB.channel('room:'+code,{config:{presence:{key:PID}}});
  const stateFns=[], peerFns=[]; let myP={}, timer=null, last='';
  const list=()=>Object.entries(ch.presenceState()).map(([k,m])=>({peer:k,isMe:k===PID,presence:m[m.length-1]||{}}));
  ch.on('presence',{event:'sync'},()=>{ const l=list(); peerFns.forEach(f=>f(l)) });
  ch.on('postgres_changes',{event:'*',schema:'public',table:'games',filter:'code=eq.'+code},p=>{ if(p.new?.state) stateFns.forEach(f=>f(p.new.state)) });
  await new Promise((res,rej)=>ch.subscribe(st=>{ if(st==='SUBSCRIBED') res(); else if(st==='CHANNEL_ERROR'||st==='TIMED_OUT') rej(new Error(st)) }));
  // presence changes are coalesced into a few sends a second
  const flush=()=>{ timer=null; const body=JSON.stringify(myP); if(body===last) return; last=body; ch.track(clone(myP)).catch(()=>{}) };
  return {
    code,
    get isHost(){ return !!hostToken(code) },
    async load(){ const {data,error}=await SB.from('games').select('state').eq('code',code).maybeSingle(); if(error) throw error; return data?.state||null },
    onState(fn){ stateFns.push(fn) },
    async set(st){ const {data,error}=await SB.rpc('save_game',{p_code:code,p_token:hostToken(code),p_state:st}); if(error) throw error; if(data!==true) throw new Error('not host') },
    presence(p){ for(const k in p){ if(p[k]===null) delete myP[k]; else myP[k]=p[k] } if(!timer) timer=setTimeout(flush,120) },
    onPeers(fn){ peerFns.push(fn) },
    leave(){ SB.removeChannel(ch) },
  };
}

/* ---------- app state ---------- */
const PID = sget('sessionStorage','pt-pid') || rid(); sset('sessionStorage','pt-pid',PID);
let net=null, S=null, loaded=false, peers=[], view='pick';
let me={name:sget('localStorage','pt-name')||'', role:sget('localStorage','pt-role')||'investor'};
let H=null;               // host's working copy of the game (only on the hosting screen)
let myA={}, myLocked=false, myRound=-1, myQs=[], lastEmo=0, pendingRender=false, sentAt=0;
// request counters start from the clock, so a phone that reloads still sends numbers newer than the TV has seen
let emoN=Date.now(), qN=emoN, navN=emoN, goN=emoN, endN=emoN;
const seen={};            // host: last request numbers seen from each player

function banner(msg){ const b=$('#banner'); b.textContent=msg||''; b.hidden=!msg }

/* ---------- host logic ---------- */
function newGame(){
  return {v:1, host:PID, round:0, phase:'lobby', tut:0, players:{}, order:[], cos:{}, pack:'all', cur:0, slide:0, qa:false,
    clock:{left:PITCH_SECS,endsAt:null}, qs:{}, alloc:{}, res:null};
}
let writing=false, dirty=false;
async function commit(){
  dirty=true; renderAll(); if(writing) return; writing=true;
  while(dirty){ dirty=false;
    try{ await net.set(clone(H)); banner('') }
    catch(e){ banner("Couldn't save the game. Check your connection."); console.warn(e); break } }
  writing=false;
}
const presentPids = () => new Set(peers.map(p=>p.presence?.pid).filter(Boolean));
const pres = pid => peers.find(p=>p.presence?.pid===pid)?.presence;

function hostSync(){
  if(!H) return;
  let ch=false;
  for(const p of peers){
    const pr=p.presence; if(!pr||!pr.pid||!pr.name||pr.host) continue;
    const pid=pr.pid, name=String(pr.name).slice(0,16), role=pr.role==='founder'?'founder':'investor';
    // first sight of a player (or a TV reload): note where their counters stand without acting on old requests
    if(!seen[pid]) seen[pid]={emo:pr.emo?.n||0, q:Math.max(0,...(Array.isArray(pr.qs)?pr.qs.map(q=>q?.n||0):[])), nav:pr.nav?.n||0, go:pr.go||0, end:pr.end||0};
    const s=seen[pid];
    let pl=H.players[pid];
    if(!pl){ pl=H.players[pid]={name,role,color:COLORS[Object.keys(H.players).length%COLORS.length]}; ch=true; }
    else {
      if(pl.name!==name){ pl.name=name; ch=true }
      // roles only change between rounds, so nobody switches sides mid-game
      if(pl.role!==role && (H.phase==='lobby'||H.phase==='howto')){ pl.role=role; ch=true }
    }
    // emoji float up on the TV only; nothing is stored
    if(pr.emo && pr.emo.n>s.emo){ floatEmoji(pr.emo.e); s.emo=pr.emo.n }
    const cf=H.order[H.cur];
    if(H.phase==='pitch' && Array.isArray(pr.qs)){
      for(const q of pr.qs){ if(q&&q.n>s.q&&q.f===cf&&typeof q.text==='string'&&q.text.trim()){
        (H.qs[cf] ||= []).push({from:pid,text:q.text.trim().slice(0,140)}); s.q=q.n; ch=true } }
    }
    if(H.phase==='pitch' && pid===cf){
      if(pr.nav && pr.nav.n>s.nav){ s.nav=pr.nav.n; const i=Math.max(0,Math.min(2,pr.nav.i|0)); if(i!==H.slide){H.slide=i; ch=true} }
      if(pr.go && pr.go>s.go){ s.go=pr.go; if(!H.clock.endsAt&&!H.qa){ H.clock.endsAt=Date.now()+H.clock.left*1000; ch=true } }
      if(pr.end && pr.end>s.end){ s.end=pr.end; if(!H.qa){ toQA(); ch=true } }
    }
    if((H.phase==='invest') && pr.r===H.round){
      const allowed=pl.role==='founder'?betIds(H,pid):H.order;
      const a=sanitize(pr.a,allowed), locked=!!pr.locked, cur=H.alloc[pid];
      if(locked && (!cur||!cur.locked||JSON.stringify(cur.a)!==JSON.stringify(a))){ H.alloc[pid]={a,locked:true}; ch=true }
      if(!locked && cur?.locked){ H.alloc[pid]={a,locked:false}; ch=true }
      if(!locked) live[pid]=a;
    }
  }
  if(ch) commit(); else renderAll();
}
const live={};  // host: unlocked allocations, used if the host reveals before someone locks

function toQA(){ H.qa=true; H.clock={left:0,endsAt:null} }
function clockLeft(st){ const c=st.clock; return c.endsAt? Math.max(0,Math.ceil((c.endsAt-Date.now())/1000)) : c.left }

function startRound(){
  const here=presentPids();
  const founders=Object.keys(H.players).filter(p=>H.players[p].role==='founder'&&here.has(p));
  H.round+=1; H.order=founders.sort(()=>Math.random()-.5);
  // this screen remembers every company it has dealt, across games, so nothing repeats until the theme runs dry
  const all=packCos(H.pack||'all'); let seenCos=new Set(JSON.parse(sget('localStorage','pt-seen-cos')||'[]'));
  let pool=all.filter(c=>!seenCos.has(c.co));
  if(pool.length<founders.length){ all.forEach(c=>seenCos.delete(c.co)); pool=all.slice() }
  pool.sort(()=>Math.random()-.5);
  H.cos={}; founders.forEach((pid,k)=>{ const {co,tag,c}=pool[k]; seenCos.add(co); H.cos[pid]={co,tag,c,seed:1+Math.floor(Math.random()*9999)} });
  sset('localStorage','pt-seen-cos',JSON.stringify([...seenCos]));
  Object.assign(H,{phase:'pitch',cur:0,slide:0,qa:false,clock:{left:PITCH_SECS,endsAt:null},qs:{},alloc:{},res:null});
  for(const k in live) delete live[k];
  commit();
}
const bettorsOf = st => Object.keys(st.players).filter(p=>presentPids().has(p)||st.alloc[p]);
function readyCounts(){
  const here=presentPids(), ps=Object.entries(H.players).filter(([p])=>here.has(p));
  return {f:ps.filter(([,v])=>v.role==='founder').length, i:ps.filter(([,v])=>v.role==='investor').length};
}
const hostAct = {
  howto(){ H.phase='howto'; H.tut=0; commit() },
  tutBack(){ if(H.tut>0){H.tut--; commit()} else { H.phase='lobby'; commit() } },
  tutNext(){ if(H.tut<STEPS.length-1){H.tut++; commit()} else hostAct.start() },
  start(){ const c=readyCounts(); if(c.f<2||c.i<1){ banner('You need at least 2 founders and 1 investor in the room.'); setTimeout(()=>banner(''),3500); return } startRound() },
  clock(){ if(H.qa) return; if(H.clock.endsAt){ H.clock={left:clockLeft(H),endsAt:null} } else { H.clock.endsAt=Date.now()+H.clock.left*1000 } commit() },
  prev(){ if(H.slide>0){H.slide--; commit()} },
  next(){ if(H.slide<2){H.slide++; commit()} },
  qa(){ toQA(); commit() },
  nextFounder(){ if(H.cur<H.order.length-1){ Object.assign(H,{cur:H.cur+1,slide:0,qa:false,clock:{left:PITCH_SECS,endsAt:null}}) } else { H.phase='invest' } commit() },
  reveal(){
    for(const pid of Object.keys(H.players)) if(!H.alloc[pid]?.locked && live[pid]) H.alloc[pid]={a:live[pid],locked:false};
    H.res=computeResults(H,bettorsOf(H)); H.phase='reveal'; commit() },
  again(){ startRound() },
  lobby(){ Object.assign(H,{phase:'lobby',res:null}); commit() },
  kick(pid){ delete H.players[pid]; commit() },
  reset(){ if(confirm('Clear every player and start over?')){ H=newGame(); commit() } },
  music(){ Music.toggle(); renderAll() },
  full(){ try{ const el=document.documentElement; (document.fullscreenElement?document.exitFullscreen():el.requestFullscreen?.())?.catch?.(()=>{}) }catch(e){} },
};
setInterval(()=>{
  if(H && H.phase==='pitch' && H.clock.endsAt && !H.qa && clockLeft(H)<=0){ toQA(); commit() }
  document.querySelectorAll('[data-timer]').forEach(e=>{ const st=H||S; if(!st) return; const t=clockLeft(st); e.textContent=fmt(t); e.classList.toggle('low',t<30) });
},250);

function floatEmoji(e){
  if(!EMOJI.includes(e)) return;
  const scr=$('.screen'); if(!scr) return;
  const el=document.createElement('div'); el.className='float'; el.textContent=e;
  el.style.left=(8+Math.random()*80)+'%'; scr.appendChild(el); setTimeout(()=>el.remove(),2700);
}

/* ---------- lobby music ---------- */
// A short game-show loop synthesized in the browser (no audio files), played on the TV only
// while people are joining. It fades out when the pitches start.
const Music = (()=>{
  const BPM=112, E=60/BPM/2;                      // one eighth note, in seconds
  const hz = m => 440*Math.pow(2,(m-69)/12);      // MIDI note to frequency
  const CHORDS=[[53,57,60,65],[50,57,62,65],[46,58,62,65],[48,55,60,64]];   // F, Dm, Bb, C
  const MELODY=[72,0,69,72,77,0,76,72, 74,0,72,69,65,0,69,72, 70,0,74,77,74,0,72,70, 72,0,67,72,76,0,79,0,
                77,0,76,77,72,0,69,0, 74,76,77,74,69,0,72,0, 70,72,74,77,79,0,77,74, 76,0,72,0,67,0,0,0];
  let ctx=null, master=null, noiseBuf=null, timer=null, step=0, nextT=0, playing=false, offAt=null;
  let muted = sget('localStorage','pt-music')==='off';
  // must run inside a click: browsers only allow sound after the viewer interacts
  function unlock(){
    try{
      if(!ctx){
        ctx=new (window.AudioContext||window.webkitAudioContext)();
        master=ctx.createGain(); master.gain.value=0;
        const comp=ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
        noiseBuf=ctx.createBuffer(1,ctx.sampleRate*0.3,ctx.sampleRate);
        const d=noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
      }
      if(ctx.state==='suspended') ctx.resume();
    }catch(e){ ctx=null }
  }
  function tone(type,freq,t,dur,vol,cut){
    const o=ctx.createOscillator(), g=ctx.createGain(); o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+0.01); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    let out=o; if(cut){ const f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=cut; o.connect(f); out=f }
    out.connect(g); g.connect(master); o.start(t); o.stop(t+dur+0.02);
  }
  function noise(t,dur,vol,hp){
    const n=ctx.createBufferSource(), f=ctx.createBiquadFilter(), g=ctx.createGain(); n.buffer=noiseBuf;
    f.type='highpass'; f.frequency.value=hp; g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    n.connect(f); f.connect(g); g.connect(master); n.start(t); n.stop(t+dur+0.02);
  }
  function kick(t){
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.frequency.setValueAtTime(140,t); o.frequency.exponentialRampToValueAtTime(45,t+0.15);
    g.gain.setValueAtTime(0.55,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.2);
    o.connect(g); g.connect(master); o.start(t); o.stop(t+0.22);
  }
  function play(s,t){
    const e=s%8, ch=CHORDS[Math.floor(s/8)%4];
    if([0,3,4,6].includes(e)) tone('triangle',hz(ch[0]-12),t,E*0.9,0.32);           // bass
    if(e%2===1) ch.slice(1).forEach(n=>tone('square',hz(n),t,E*0.6,0.03,1800));       // offbeat chord stabs
    const m=MELODY[s%MELODY.length]; if(m) tone('triangle',hz(m),t,E*1.6,0.11);        // melody
    if(e===0||e===4) kick(t);
    if(e===2||e===6) noise(t,0.12,0.1,1500);                                             // clap
    if(e%2===1) noise(t,0.04,0.04,7000);                                                 // hi-hat
  }
  function tick(){ while(nextT<ctx.currentTime+0.15){ play(step,nextT); nextT+=E; step++ } }
  function start(){
    if(!ctx||playing) return; playing=true; clearTimeout(offAt);
    if(ctx.state==='suspended') ctx.resume();
    if(!timer){ step=0; nextT=ctx.currentTime+0.05; timer=setInterval(tick,25) }
    master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.22,ctx.currentTime+1.5);
  }
  function stop(){
    if(!ctx||!playing) return; playing=false;
    master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
    master.gain.linearRampToValueAtTime(0,ctx.currentTime+1.2);
    offAt=setTimeout(()=>{ clearInterval(timer); timer=null; ctx.suspend() },1400);
  }
  return {
    unlock,
    get muted(){ return muted },
    toggle(){ muted=!muted; sset('localStorage','pt-music',muted?'off':'on'); unlock() },
    // called on every TV redraw: music only while people are gathering, and only if not muted
    sync(st){ const want = !muted && !!st && (st.phase==='lobby'||st.phase==='howto'); want?start():stop() },
    stopNow(){ stop() },
  };
})();

/* ---------- rendering: TV ---------- */
const nameOf=(st,pid)=>st.players[pid]?.name||'Someone';
const coOf=(st,pid)=>st.cos[pid];
const baseUrl = () => location.origin+location.pathname;
function joinUrl(){ return baseUrl()+'?room='+(net?.code||'') }

function tvHTML(st){
  if(st.phase==='lobby'){
    const here=presentPids(), all=Object.entries(st.players);
    const col=role=>{ const ps=all.filter(([,p])=>p.role===role);
      return ps.length? ps.map(([pid,p])=>`<div class="pl ${here.has(pid)?'':'away'}"><span class="dot" style="background:${p.color}"></span>${esc(p.name)}${here.has(pid)?'':`<button class="x btn ghost" data-h="kick:${pid}" style="padding:0 .6cqw;border:0">away ×</button>`}</div>`).join('')
        : `<div class="empty">Nobody yet</div>` };
    const q=qrSvg(joinUrl());
    return `<div class="tv-lobby"><div><h2>Pitch <span>This</span></h2>
      ${q?`<div class="qr">${q}</div>`:''}
      <div class="join">Scan to join, or open the link and enter code<div class="code">${esc(net?.code)}</div><b>${esc(baseUrl())}</b></div>
      <div class="join">Theme: <b style="display:inline;font-family:var(--body);font-size:1.8cqw">${esc(PACKS[st.pack]?.name||'Everything')}</b></div></div>
      <div class="roster"><div><h3>Founders</h3>${col('founder')}</div><div><h3>Investors</h3>${col('investor')}</div></div></div>`;
  }
  if(st.phase==='howto'){
    const s=STEPS[st.tut];
    return `<div class="tv-howto"><div class="art">${s.i}</div><div><div class="stepno">Step ${st.tut+1} of ${STEPS.length}</div><h2>${s.t}</h2><p>${s.d}</p>
      <div class="tpips">${STEPS.map((_,i)=>`<i class="${i<=st.tut?'on':''}"></i>`).join('')}</div></div></div>`;
  }
  if(st.phase==='pitch'){
    const fid=st.order[st.cur], co=coOf(st,fid), qs=st.qs[fid]||[];
    if(!co) return '';
    const qa=st.qa?`<div class="qa"><div><div class="eyebrow">Time's up</div><h2>Q&amp;A with ${esc(nameOf(st,fid))}</h2><p class="muted" style="font-size:2cqw">${esc(co.co)}</p></div>
      <ol>${qs.length?qs.slice(-6).map(q=>`<li><b>${esc(nameOf(st,q.from))} asks</b>${esc(q.text)}</li>`).join(''):'<li>No questions came in. Ask out loud!</li>'}</ol></div>`:'';
    return slide(co,st.slide,nameOf(st,fid)) + (st.qa?'':`${qs.length?`<div class="qcount">💬 ${qs.length} question${qs.length>1?'s':''}</div>`:''}
      <div class="hud"><span class="who">Founder ${st.cur+1} of ${st.order.length}: ${esc(nameOf(st,fid))}</span><div class="pips">${[0,1,2].map(i=>`<i class="${i===st.slide?'on':''}"></i>`).join('')}</div><span class="clock" data-timer>${fmt(clockLeft(st))}</span></div>`) + qa;
  }
  if(st.phase==='invest'){
    const bettors=bettorsOf(st);
    return `<div class="tv-pad"><div><div class="eyebrow">Investing</div><h2>Split your $1M on your phone</h2></div>
      <div class="cos">${st.order.map(f=>`<span>${logo(coOf(st,f))}${esc(coOf(st,f).co)}</span>`).join('')}</div>
      <div class="lockgrid">${bettors.map(p=>`<div class="lock ${st.alloc[p]?.locked?'ok':''}"><b>${st.alloc[p]?.locked?'✓':'…'}</b>${esc(nameOf(st,p))}</div>`).join('')}</div></div>`;
  }
  if(st.phase==='reveal'&&st.res){
    const r=st.res, top=Math.max(1,...r.raised.map(x=>x.amt));
    return `<div class="tv-pad"><div><div class="eyebrow">Round ${st.round} results</div><h2>The big reveal</h2></div>
      <div class="reveal-grid"><div>${r.raised.map(x=>{const co=coOf(st,x.fid);return `<div class="bar-row"><div class="rk">${x.rank}</div><div>
        <div class="bar-meta"><b>${esc(co.co)} <span>· ${esc(nameOf(st,x.fid))}</span></b><span><span class="money">${money(x.amt)}</span> <span class="mult">${+x.mult.toFixed(2)}×</span></span></div>
        <div class="track"><div class="fill" style="width:${x.amt/top*100}%;background:${co.c[0]}"></div></div></div></div>`}).join('')}</div>
      <div class="lb"><h3>Best bets</h3><ol>${r.funds.slice(0,9).map(x=>{const d=x.val-1e6;return `<li><span>${esc(nameOf(st,x.pid))} ${x.founder?'<i class="ftag">F</i>':''}</span><span class="money ${d>0?'up':d<0?'down':''}">${money(x.val)}</span></li>`}).join('')}</ol></div></div></div>`;
  }
  return '';
}

function hostBarHTML(st){
  const c=readyCounts();
  const B=(act,label,cls='',dis=false)=>`<button class="btn ${cls}" data-h="${act}" ${dis?'disabled':''}>${label}</button>`;
  let mid='';
  if(st.phase==='lobby') mid=`<label class="chip on" style="display:flex;gap:6px;align-items:center">Theme
      <select id="pack" aria-label="Theme pack" style="font:inherit;background:transparent;color:var(--ink);border:0">${['all',...Object.keys(PACKS)].map(k=>`<option value="${k}" ${k===(st.pack||'all')?'selected':''}>${packName(k)}</option>`).join('')}</select></label>
    <span class="chip">${c.f} founders · ${c.i} investors here</span>${B('howto','How to play')}${B('start','Start the pitches','primary')}`;
  if(st.phase==='howto') mid=`${B('tutBack','Back')}${B('tutNext',st.tut<STEPS.length-1?'Next':'Start the pitches','primary')}${B('start','Skip tutorial','ghost')}`;
  if(st.phase==='pitch'){
    const last=st.cur>=st.order.length-1;
    mid=`${B('prev','‹ Slide','',st.slide===0||st.qa)}${B('next','Slide ›','',st.slide===2||st.qa)}
      ${st.qa?'':B('clock',st.clock.endsAt?'Pause clock':'Start clock','primary')}
      ${st.qa?'':B('qa','End pitch → Q&A')}
      ${B('nextFounder',last?'Open investing':'Next founder',st.qa?'primary':'')}`;
  }
  if(st.phase==='invest'){ const tot=bettorsOf(st); const n=tot.filter(p=>st.alloc[p]?.locked).length;
    mid=`<span class="chip ${n===tot.length?'done':''}">${n} of ${tot.length} locked in</span>${B('reveal','Reveal results','primary')}` }
  if(st.phase==='reveal') mid=`<span class="chip on">Everyone resets to $1M</span>${B('again','Next round','primary')}${B('lobby','Back to lobby')}`;
  const music=(st.phase==='lobby'||st.phase==='howto')?B('music',Music.muted?'♪ Music off':'♪ Music on','ghost'):'';
  return `<div class="bar">${B('full','⛶ Full screen','ghost')}${music}<span class="sp"></span>${mid}<span class="sp"></span>
    ${st.phase==='lobby'?B('reset','Reset game','ghost'):''}<span class="chip on">Room ${esc(net.code)}</span></div>`;
}

/* ---------- rendering: phone ---------- */
function phoneHTML(st){
  const pl=st?.players[PID];
  const top=`<div class="ptop"><span class="me"><span class="dot" style="background:${pl?.color||'var(--muted)'}"></span>${esc(me.name)}</span><span class="chip on">${me.role==='founder'?'Founder':'Investor'}</span></div>`;
  if(!st) return top+`<div class="card"><h2>Waiting for the TV</h2><p class="muted">Room ${esc(roomCode)} isn't open yet. Check the code on the TV.</p></div>`;
  if(!pl) return top+`<div class="card"><h2>Joining…</h2><p class="muted">Hang tight while the TV adds you.</p></div>`;
  if(st.phase==='lobby') return top+`<div class="card"><h2>You're in!</h2><p class="muted">Watch the TV. The host starts when everyone has joined.</p>
    <div class="seg">${roleBtn('founder')}${roleBtn('investor')}</div><p class="note">You can switch sides until the game starts.</p></div>`;
  if(st.phase==='howto'){ const s=STEPS[st.tut];
    return top+`<div class="card"><div class="eyebrow">Step ${st.tut+1} of ${STEPS.length}</div><h2>${s.i} ${s.t}</h2><p class="muted" style="margin:0">${s.d}</p><div class="tip">${me.role==='founder'?s.founder:s.investor}</div></div>`;
  }
  if(st.phase==='pitch'){
    const fid=st.order[st.cur], co=coOf(st,fid);
    if(fid===PID){
      return top+`<div class="card"><div class="eyebrow">You're on stage</div><h2>${esc(co.co)}</h2>
        <div class="mini">${slide(co,st.slide,me.name)}</div>
        <div class="navs"><button class="btn" data-p="nav" data-d="-1" ${st.slide===0||st.qa?'disabled':''} aria-label="Previous slide">‹</button><button class="btn primary" data-p="nav" data-d="1" ${st.slide===2||st.qa?'disabled':''} aria-label="Next slide">›</button></div>
        ${st.qa?`<div class="tip">Time's up. Answer the questions on the TV.</div>`:
          `<div class="left"><span>Time left</span><span class="money bignum" data-timer>${fmt(clockLeft(st))}</span></div>
          ${st.clock.endsAt?`<button class="btn" data-p="end">Done pitching → Q&amp;A</button>`:`<button class="btn primary big" data-p="go">Start my 3 minutes</button>`}`}</div>`;
    }
    const mine=st.order.includes(PID)&&st.order.indexOf(PID)>st.cur;
    return top+`<div class="card"><div class="eyebrow">Now pitching · ${st.cur+1} of ${st.order.length}</div><h2>${esc(co.co)}</h2><p class="muted" style="margin:0">${esc(nameOf(st,fid))} is on stage${st.qa?' for Q&amp;A':''}.</p>
      ${mine?`<div class="tip">You're up in ${st.order.indexOf(PID)-st.cur} pitch${st.order.indexOf(PID)-st.cur>1?'es':''}. Your company stays secret until then.</div>`:''}</div>
      <div class="card"><div class="eyebrow">React</div><div class="emos">${EMOJI.map(e=>`<button data-p="emo" data-e="${e}" aria-label="Send ${e}">${e}</button>`).join('')}</div></div>
      ${st.qa?'':`<div class="card"><div class="eyebrow">Ask ${esc(nameOf(st,fid))} a question</div>
      <form class="ask" data-p="ask"><input type="text" id="qtext" maxlength="140" placeholder="Answered after the pitch" autocomplete="off"><button class="btn primary">Send</button></form>
      <div class="sent" id="sent">${Date.now()-sentAt<5000?'Sent! It shows up after the pitch.':''}</div></div>`}`;
  }
  if(st.phase==='invest'){
    const isF=pl.role==='founder', list=isF?betIds(st,PID):st.order;
    if(myRound!==st.round){ myRound=st.round; const saved=st.alloc[PID]; myA=saved?{...saved.a}:{}; myLocked=!!saved?.locked; pushAlloc() }
    const left=100-used(myA);
    return top+`<div class="card"><div class="eyebrow">${isF?'Your side bets':'Your fund'}</div><h2>Split your $1M</h2>
      <p class="rule">${isF?"Bet on the other founders. Side bets don't count toward anyone's raise. ":''}Up to 50% on your favorite, 40% on your second, 30% on each of the rest. Anything you don't invest is kept as cash.</p>
      <div class="alloc">${list.map(id=>{const co=coOf(st,id), v=myA[id]||0, mx=maxFor(myA,id);
        return `<div class="arow"><div class="top"><span>${logo(co)}${esc(co.co)}</span><span class="money">${money(v*1e4)}</span></div>
        <input type="range" min="0" max="50" step="5" value="${v}" data-id="${id}" ${myLocked?'disabled':''} aria-label="${esc(co.co)}"><div class="cap">${v}% · max ${mx}% right now</div></div>`}).join('')}</div>
      <div class="left"><span>Left as cash</span><span class="money">${money(left*1e4)}</span></div>
      <button class="btn ${myLocked?'':'primary'} big" data-p="lock">${myLocked?'Locked in ✓ · tap to change':'Lock it in'}</button></div>`;
  }
  if(st.phase==='reveal'&&st.res){
    const r=st.res, mine=st.alloc[PID]?.a||{}, f=r.funds.find(x=>x.pid===PID), rank=r.funds.findIndex(x=>x.pid===PID)+1;
    const raise=r.raised.find(x=>x.fid===PID);
    return top+(raise?`<div class="card"><div class="eyebrow">Your company</div><h2>${esc(coOf(st,PID).co)}</h2>
      <div class="left"><span>Raised · place ${raise.rank} of ${r.raised.length}</span><span class="money">${money(raise.amt)}</span></div></div>`:'')+
      (f?`<div class="card"><div class="eyebrow">${raise?'Your side bets':'Your fund'}</div><h2 class="money">${money(f.val)}</h2>
      <p class="muted" style="margin:0">${rank? `#${rank} of ${r.funds.length} on Best bets`:''}</p>
      <div class="res">${Object.entries(mine).map(([id,p])=>`<div class="r"><span>${esc(coOf(st,id)?.co)} · ${p}%</span><span class="money">${(r.mult[id]??0).toFixed(2)}× = ${money(p*1e4*(r.mult[id]??0))}</span></div>`).join('')}
      ${used(mine)<100?`<div class="r"><span>Cash kept</span><span class="money">${money((100-used(mine))*1e4)}</span></div>`:''}</div></div>`:
      `<div class="card"><h2>Watch the TV</h2><p class="muted">You joined after betting closed. You'll play next round.</p></div>`)+
      `<p class="note" style="text-align:center">Next round everyone starts again at $1M.</p>`;
  }
  return top;
}
function roleBtn(r){ return `<button data-p="role" data-r="${r}" aria-pressed="${me.role===r}"><b>${r==='founder'?'Founder':'Investor'}</b><span>${r==='founder'?'Pitch a secret company':'Split $1M on the best pitch'}</span></button>` }

/* ---------- rendering: landing ---------- */
function landingHTML(){
  return `<div class="land"><div class="brand"><h1>Pitch <span>This</span></h1><p>The party game where founders pitch companies they've never seen, and investors bet $1M on who sells it best.</p></div>
    <form class="card" data-p="join"><div class="eyebrow">Join on your phone</div>
      <input type="text" id="rc" maxlength="4" placeholder="ROOM" value="${esc(roomCode)}" autocomplete="off" autocapitalize="characters" aria-label="Room code" required>
      <input type="text" id="nm" maxlength="16" placeholder="Your name" value="${esc(me.name)}" autocomplete="nickname" required>
      <div class="seg">${roleBtn('founder')}${roleBtn('investor')}</div>
      <button class="btn primary big" ${SB?'':'disabled'}>Join the game</button></form>
    <div class="card"><div class="eyebrow">On the TV</div><p class="muted" style="margin:0">Start a room on the big screen everyone can see. Players join by scanning its code. No accounts needed.</p>
      ${net?.isHost?`<button class="btn primary big" data-p="host">Resume hosting room ${esc(net.code)}</button>`:''}
      <button class="btn big" data-p="hostnew" ${SB?'':'disabled'}>Host a new game</button></div>
    <p class="note" style="text-align:center">No accounts or tracking. Games are deleted after 24 hours. <a href="https://github.com/pitchthis/pitchthis.github.io/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer">Security &amp; privacy</a></p>
  </div>`;
}

function renderAll(){
  const st=H||S, app=$('#app');
  // keep a half-typed question when the page redraws
  if(view==='player'&&document.activeElement?.matches?.('input[type=range]')){ pendingRender=true; return }
  pendingRender=false;
  const qv=$('#qtext')?.value, nv=$('#nm')?.value, focused=document.activeElement?.id;
  if(view==='host'&&st) Music.sync(st); else Music.stopNow();
  if(view==='host'&&st){
    if(!$('.screen')) app.innerHTML=`<div class="hostwrap"><div class="stagebox"><div class="screen" id="tv"></div></div><div id="hbar"></div></div>`;
    $('#tv').querySelectorAll(':scope > :not(.float)').forEach(n=>n.remove());
    $('#tv').insertAdjacentHTML('afterbegin',tvHTML(st));
    // leave the bar alone while the theme menu is open, or the redraw would close it
    if(document.activeElement?.id!=='pack') $('#hbar').innerHTML=hostBarHTML(st);
  } else if(view==='player'){
    app.innerHTML=`<div class="phone">${phoneHTML(st)}</div>`;
  } else app.innerHTML=landingHTML();
  if(qv!=null&&$('#qtext')){ $('#qtext').value=qv; if(focused==='qtext') $('#qtext').focus() }
  if(nv!=null&&$('#nm')){ $('#nm').value=nv; if(focused==='nm') $('#nm').focus() }
}

/* ---------- player actions ---------- */
function pushAlloc(){ net.presence({a:myA,locked:myLocked,r:S?.round??0}) }
document.addEventListener('click',e=>{
  const h=e.target.closest('[data-h]'); if(h&&H){ const [a,arg]=h.dataset.h.split(':'); hostAct[a]?.(arg); return }
  const b=e.target.closest('[data-p]'); if(!b) return; const p=b.dataset.p;
  if(p==='role'){ e.preventDefault(); me.role=b.dataset.r; sset('localStorage','pt-role',me.role); if(view==='player') net.presence({role:me.role}); renderAll() }
  if(p==='hostnew'){ Music.unlock(); hostNew(); return }
  if(p==='host'){ Music.unlock(); view='host'; net.presence({host:true,pid:null,name:null});
    H = S && S.v===1 ? clone(S) : newGame(); H.host=PID; commit() }
  if(p==='emo'){ const now=Date.now(); if(now-lastEmo<350) return; lastEmo=now; emoN++; net.presence({emo:{e:b.dataset.e,n:emoN,t:now}}) }
  if(p==='nav'){ navN++; net.presence({nav:{i:S.slide+(+b.dataset.d),n:navN}}) }
  if(p==='go'){ goN++; net.presence({go:goN}) }
  if(p==='end'){ endN++; net.presence({end:endN}) }
  if(p==='lock'){ myLocked=!myLocked; pushAlloc(); renderAll() }
});
document.addEventListener('submit',e=>{
  const f=e.target.closest('[data-p]'); if(!f) return; e.preventDefault();
  if(f.dataset.p==='join'){ joinRoom(); return }
  if(f.dataset.p==='ask'){ const t=$('#qtext').value.trim().slice(0,140); if(!t||!S) return;
    qN++; myQs=[...myQs,{n:qN,f:S.order[S.cur],text:t}].slice(-3); net.presence({qs:myQs});
    $('#qtext').value=''; sentAt=Date.now(); renderAll() }
});
document.addEventListener('input',e=>{
  const r=e.target.closest('input[type=range][data-id]'); if(!r||myLocked) return;
  const id=r.dataset.id; myA[id]=Math.min(+r.value,maxFor(myA,id)); if(!myA[id]) delete myA[id];
  r.value=myA[id]||0; pushAlloc();
  // redraw only the numbers, so the slider under the finger keeps its grip
  const row=r.closest('.arow'); row.querySelector('.money').textContent=money((myA[id]||0)*1e4);
  document.querySelectorAll('.arow').forEach(rw=>{const i=rw.querySelector('input').dataset.id; rw.querySelector('.cap').textContent=`${myA[i]||0}% · max ${maxFor(myA,i)}% right now`});
  const lf=document.querySelector('.left .money'); if(lf) lf.textContent=money((100-used(myA))*1e4);
});

document.addEventListener('change',e=>{ if(e.target.id==='pack'&&H){ H.pack=PACKS[e.target.value]?e.target.value:'all'; e.target.blur(); commit(); return }
  if(pendingRender&&e.target.matches('input[type=range]')){ e.target.blur(); renderAll() } });

/* ---------- rooms ---------- */
const params=new URLSearchParams(location.search);
let roomCode=(params.get('room')||'').toUpperCase().replace(/[^A-Z]/g,'').slice(0,4);
const LETTERS='ABCDEFGHJKLMNPQRSTUVWXYZ';   // no I or O, so codes read cleanly off a TV
async function connect(code){
  if(net?.code===code) return true;
  net?.leave(); net=null; S=null; H=null; loaded=false; peers=[];
  try{ net=await supaNet(code) }catch(e){ banner("Can't reach the game server. Check your connection and try again."); return false }
  roomCode=code; history.replaceState(null,'',baseUrl()+'?room='+code);
  net.onState(onState);
  net.onPeers(list=>{ peers=list; if(H) hostSync(); else if(view==='host') renderAll() });
  try{ onState(await net.load()) }catch(e){ banner("Can't load the game. Reload to try again.") }
  return true;
}
async function hostNew(){
  banner('');
  for(let i=0;i<6;i++){
    const code=Array.from({length:4},()=>LETTERS[Math.floor(Math.random()*LETTERS.length)]).join('');
    const token=(crypto.randomUUID?crypto.randomUUID():'10000000-1000-4000-8000-100000000000'.replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)));
    const {data,error}=await SB.rpc('save_game',{p_code:code,p_token:token,p_state:newGame()});
    if(error){ banner("Couldn't start a game. Check your connection."); return }
    if(data!==true) continue;   // that code is taken; roll another
    tokens[code]=token; sset('localStorage','pt-host-'+code,token);
    if(!await connect(code)) return;
    view='host'; net.presence({host:true}); H=S?clone(S):newGame(); H.host=PID; renderAll(); return;
  }
  banner("Couldn't find a free room code. Try again.");
}
async function joinRoom(){
  const code=$('#rc').value.toUpperCase().replace(/[^A-Z]/g,''), n=$('#nm').value.trim().slice(0,16);
  if(code.length!==4){ banner('Room codes are 4 letters. Check the TV.'); return }
  if(!n) return;
  me.name=n; sset('localStorage','pt-name',n); banner('');
  if(!await connect(code)) return;
  if(!S){ banner(`No game found for room ${code}. Check the code on the TV.`); return }
  view='player';
  // every request carries a counter, so the TV acts on each one exactly once
  net.presence({pid:PID,name:me.name,role:me.role,host:null}); renderAll();
}
function onState(st){
  loaded=true; banner('');
  S=st;
  // a phone that reloads mid-game goes straight back to its seat
  if(view==='pick' && st?.players?.[PID] && st.host!==PID){ view='player'; me.role=st.players[PID].role; me.name=st.players[PID].name; net.presence({pid:PID,name:me.name,role:me.role,host:null}) }
  if(H && st && st.host!==PID){ H=null; view='pick'; banner('Another screen took over hosting.'); setTimeout(()=>banner(''),4000) }
  if(view==='player'&&S&&S.round!==myRound&&S.phase!=='invest'){ myA={}; myLocked=false }
  if(!H) renderAll();
}

/* ---------- boot ---------- */
async function boot(){
  if(!SB){ renderAll(); banner("Couldn't load the game. Check your connection and reload."); return }
  renderAll();
  if(roomCode.length===4) await connect(roomCode);
  renderAll();
}
boot();
