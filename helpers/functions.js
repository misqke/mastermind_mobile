import { COLORS } from "./constants";

export const generateCode = (numColors, codeLength) => {
  const newCode = [];
  const availableColors = COLORS.slice(0, numColors);
  while (newCode.length < codeLength) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    newCode.push(availableColors[randomIndex]);
  }
  return newCode;
};

export const checkGuess = (guess, code) => {
  let results = { correct: 0, close: 0 };
  let incorrectColors = [];
  // check for correct guesses
  guess.forEach((color, i) => {
    if (color.name === code[i].name) {
      results.correct += 1;
    } else {
      incorrectColors.push(color.name);
    }
  });
  // check for correct colors in wrong spots
  guess.forEach((color, i) => {
    if (color.name !== code[i].name) {
      if (incorrectColors.includes(color.name)) {
        const index = incorrectColors.findIndex(color.name);
        results.close += 1;
        incorrectColors.splice(index, 1);
      }
    }
  });

  return results;
};
