#!/bin/sh
FILENAME="start-dev.sh"
START="\033[31;1;4m"
END="\033[0m"
printf "${START}[${FILENAME}]${END} Starting server" &&
npm run dev &
sleep 2 &&
printf "${START}[${FILENAME}]${END} Starting client" &&
(cd client && npm start)
