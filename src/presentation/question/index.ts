import { Question } from "@/domain/interaction/question";
import readline from "readline";

export const question: Question = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${question}`, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};
