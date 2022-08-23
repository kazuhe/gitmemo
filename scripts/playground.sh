#!/bin/bash

CWD=`pwd`
PLAYGROUND_PATH=$CWD/playground
PACK_NAME=`npm pack --pack-destination='./playground'`

cd $PLAYGROUND_PATH &&
  # pnpm remove gitmemo &&
  pnpm add ./$PACK_NAME &&
  node ./node_modules/gitmemo/bin
