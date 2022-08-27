#!/bin/bash

CWD=`pwd`
PLAYGROUND_PATH=$CWD/playground
PACK_STDOUT=`npm pack --pack-destination='./playground'`
PACK_VER=`echo $PACK_STDOUT | sed -r "s/^.*gitmemo-(.*).tgz$/\1/"`

echo "Install gitmemo-$PACK_VER.tgz"

cd $PLAYGROUND_PATH &&
  npm remove gitmemo &&
  npm i gitmemo-$PACK_VER.tgz &&
  npx gitmemo
