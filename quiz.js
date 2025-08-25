#!/usr/bin/env node
import readline from "readline";
import chalk from 'chalk'

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
let qIndex = 0; //Index for questions array
let aIndex = 0; //Index for answers array

async function getPlayerInfo() {
  playerName = await askQuestion("What is your Name?\n");
  console.log(`Hello ${chalk.red(playerName)}!`);
  const gameStatus = await askQuestion("Would you like to play? y/n\n");
  if (gameStatus === "y") {
    runQuiz();
  } else {
    rl.close();
    process.exit(0);
  };
}

//Instantiates readline Question
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}
// Instantiaties logic for the timed questions.
function timedQuestion(question, timeout) {
  return new Promise((resolve, reject) => {
    let answered = false;

    // Ask the question
    rl.question(question, (input) => {
      if (!answered) {
        answered = true;
        clearTimeout(timer);  // stop the timer if user answered
        resolve(input.trim()); // send their answer
      }
    });

    // Timer setup
    const timer = setTimeout(() => {
      if (!answered) {
        answered = true;
        rl.write("\n"); // move to next line cleanly
        reject(new Error("timeout"));
      }
    }, timeout);
  });
}

// Calculates the player's score from the playerResults array
const calculateScore = (playerArray) => {
  for (const answer in playerArray) {
    if (playerArray[answer] === answers[aIndex]){
      playerScore++;
      aIndex++;
    } else{
      aIndex++;
    }
};
}

// Starts the Trivia game
async function runQuiz() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    try {
      const response = await timedQuestion(questions[i], 5000);
      if (response.toLowerCase() === answers[i]) {
        score++;
        console.log("✅ Correct!");
      } else {
        console.log("❌ Incorrect.");
      }
    } catch (err) {
      console.log("⏰ Time's up!");
    }
  }

  console.log(`Thanks for playing ${chalk.red(playerName)}! Your score is ${chalk.red(score)} out of 5\n`)
  const playAgain = await askQuestion("Would you like to play again? y/n\n")
  if (playAgain === "y"){
    score = 0;
    qIndex = 0;
    aIndex = 0;
    runQuiz();
  } else{
    rl.close();
    process.exit(0);
  };
}

console.log(chalk.bgGreen("Welcome to The Quiz Game!!  \n"));
getPlayerInfo();