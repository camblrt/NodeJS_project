#!/bin/bash

if [ -d build/ ]; then
    rm -r build/
    echo "build folder deleted"
else 
    echo "build not exist"
fi
echo "go to React folder"
cd ../ReactStepByStep/
echo "build project"
npm run-script build
echo "copy build into node project"
cp -r build/ ../NodeJS_project/
echo "go back into Node"
cd ../NodeJS_project/