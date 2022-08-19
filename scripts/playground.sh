#!/bin/bash

CWD=`pwd`
PLAYGROUND_PATH=$CWD/playground
PACK_NAME=`npm pack --pack-destination='./playground'`

cd $PLAYGROUND_PATH &&
  npm remove gitmemo &&
  npm i $PACK_NAME &&
  node ./node_modules/gitmemo/.output/server/index.mjs
