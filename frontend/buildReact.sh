cd /home/achille/prog/bettingcroc/app/scripts/app
rm -r ./build
cd /home/achille/prog/bettingcroc/app/app-frontend
npm run build
cp -r /home/achille/prog/bettingcroc/app/app-frontend/build /home/achille/prog/bettingcroc/app/scripts/app/build
