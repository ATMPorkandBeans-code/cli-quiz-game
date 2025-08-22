#!/usr/bin/env node
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  "Who won the 2024 World Series?\n  a. San Diego Padres\n  b. Los Angeles Dodgers\n  c. New York Yankees\n  d. Boston Red Sox\n",
  "What is the capital city of New York State?\n  a. Dallas\n  b. Saratoga\n  c. Buffalo\n  d. Albany\n",
  "Which country is the Vatican City surrounded by?\n  a. France\n  b. Egypt\n  c. Italy\n  d. Spain\n",
  "Who is considered the 'Father of Relativity'?\n  a. Albert Einstein\n  b. George Washington\n  c. Issac Newton\n  d. Thomas Edison\n",
  "What is James Bond's code name?\n  a. 009\n  b. Smooth Operator\n  c. 007\n  d. Money Penny\n"
];

const answers = ["b", "d", "c", "a", "c"]
let playerName = "";
let playerScore = 0;
let qIndex = 0;
let aIndex = 0;

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

const timer = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Time's up!"), seconds * 1000);
  });
};

const question = async() => {
  const result = await Promise.race([
    askQuestion(questions[qIndex]),
    timer(10)
  ]);
  return result;
  }

const calculateScore = (playerArray) => {
  for (const answer in playerArray) {
    if (playerArray[answer] === answers[aIndex]) {
      playerScore++;
      aIndex++;
    }
}
}

const playGame = async() => {
  const playerResults = [];
  
  const answer1 = await question();
  qIndex++;
  const answer2 = await question();
  qIndex++;
  const answer3 = await question();
  qIndex++;
  const answer4 = await question();
  qIndex++;
  const answer5 = await question();
  qIndex++;

  playerResults.push(answer1, answer2, answer3, answer4, answer5)

  calculateScore(playerResults);

  console.log(`Thanks for playing ${playerName}! Your score is ${playerScore} out of 5\n`)
  const playAgain = await askQuestion("Would you like to play again? y/n\n")
  if (playAgain === "y"){
    playerScore = 0;
    qIndex = 0;
    aIndex = 0;
    playGame();
  } else {
    process.exit(0);
  }
}

async function getPlayerInfo() {
  playerName = await askQuestion("What is your Name?\n");
  console.log(`Hello ${playerName}!`);
  const gameStatus = await askQuestion("Would you like to play? y/n\n");
  if (gameStatus === "y") {
    playGame();
  } else {
    process.exit(0);
  }
}

console.log("Welcome to The Quiz Game!!  \n");
getPlayerInfo();

