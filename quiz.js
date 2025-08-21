#!/usr/bin/env node
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  "Who won the 2024 World Series?",
  "What is the capital city of New York State?",
  "Which country is the Vatican City surrounded by?"
];

const answers = ["Dodgers", "Albany", "Italy"]
let playerName = "";

console.log("Welcome to The Quiz Game!!  \n");

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


  let playerScore = 0;
  let qIndex = 0;
  let aIndex = 0;

const question = async() => {
  const result = await Promise.race([
    askQuestion(questions[qIndex]),
    timer(10)
  ]);
  if (result === "Time's up!"){
      qIndex++;
      aIndex++;
      console.log(result, qIndex, aIndex)
  } else if (result === answers[aIndex]){
      playerScore++;
      qIndex++;
      aIndex++;
      console.log(result, qIndex, aIndex, playerScore)
  }
}

question();

async function getPlayerInfo() {
  playerName = await askQuestion("What is your Name?\n");
  console.log(`Hello ${playerName}!`);
  const gameStatus = await askQuestion("Would you like to play? y/n\n");
  if (gameStatus === "y") {
    playGame();
  }
}




