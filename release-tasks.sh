#!/bin/bash

echo "Downloading Dependencies"
npm install --production


echo "Building for Production"
./node_modules/.bin/ng build --prod --aot
