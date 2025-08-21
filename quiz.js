#!/usr/bin/env node
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = {
  "Who won the 2024 World Series?\n": "Los Angeles Dodgers",
  "What is the capital city of New York State?\n": "Albany",
  "Which country is the Vatican City surrounded by?\n": "Italy",
};
let timerDone = false;
let playerName = "";

console.log("Welcome to The Quiz Game!!  \n");

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function getPlayerInfo() {
  playerName = await askQuestion("What is your Name?\n");
  console.log(`Hello ${playerName}!`);
  const gameStatus = await askQuestion("Would you like to play? y/n\n");
  if (gameStatus === "y") {
    playGame();
  }
}

getPlayerInfo();

const playGame = async () => {
  let playerScore = 0;
  for (let question in questions) {
    const query = async () => {
      const questionPromise = rl.question(`${question}\n`);
      const result = await Promise.race([questionPromise, runTimer(10000)]);
    };
    query();

    // console.log(question);
    // const choice = await rl.question("Answer Here: ");
    // await runTimer(10000);
    if (result === questions[question] && timerDone === false) {
      playerScore++;
      console.log("Great work! You are correct!");
    } else if (timerDone) {
      console.log("Time is Up! New Question");
    } else if (result != questions[question]) {
      console.log("Incorrect response");
    }
  }

  console.log(`${playerName}, your score is ${playerScore} / 3.`);
};

const runTimer = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      timerDone = true;
      resolve();
    }, ms);
  });
};
