#!/bin/sh
# Run before each push: tags app.js in index.html with its content hash,
# so browsers never pair a fresh page with a cached copy of old code.
cd "$(dirname "$0")"
v=$(shasum -a 256 app.js | cut -c1-10)
sed -i '' -E "s#<script src=\"app\.js(\?v=[0-9a-f]+)?\"></script>#<script src=\"app.js?v=$v\"></script>#" index.html
grep -o 'app.js?v=[0-9a-f]*' index.html
