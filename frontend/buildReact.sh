cd /home/achille/prog/bettingcroc/app/backend/scripts/app
rm -r ./build
cd /home/achille/prog/bettingcroc/app/frontend
npm run build
cp -r /home/achille/prog/bettingcroc/app/frontend/build /home/achille/prog/bettingcroc/app/backend/scripts/app/build
