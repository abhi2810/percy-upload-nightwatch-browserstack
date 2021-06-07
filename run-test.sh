#!/bin/bash

if [ "$BROWSERSTACK_USERNAME" == "" ] || [ "$BROWSERSTACK_ACCESS_KEY" == "" ]; then
  echo 'Error: Please initialize environment variables BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY with your BrowserStack account username and access key, before running tests'
  exit 1
fi

if [ "$PERCY_TOKEN" == "" ]; then
  echo 'Error: Please initialize environment variables PERCY_TOKEN for Percy Project.'
  exit 1
fi

BRANCH=""
FOLDER=""

case "$2" in

  master)
    BRANCH="master"
    FOLDER="./master_website"
    ;;

  changed)
    BRANCH="changed"
    FOLDER="./changed_website"
    ;;

  *)
    echo 'Please change the branch to master or changed'
    exit 1
    ;;
esac

export PERCY_BRANCH=$BRANCH

echo "$PERCY_BRANCH"

mkdir -p images

npx http-server "$FOLDER" -p 3000 &

npm test

npx percy upload ./images

jobs
kill %1
wait
