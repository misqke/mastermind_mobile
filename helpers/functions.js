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

export const generateStartingGuesses = (codeLength) => {
  const startingGuesses = [];
  for (let i = 0; i < 8; i++) {
    let guess = [];
    let results = [];
    for (let k = 0; k < codeLength; k++) {
      guess.push("black");
      results.push(false);
    }
    startingGuesses.push({ guess, results });
  }
  return startingGuesses;
};

export const checkGuess = (guess, code) => {
  let results = [];
  let incorrectIndexes = [];
  // check for correct guesses
  guess.forEach((color, i) => {
    if (color === code[i]) {
      results.push("black");
    } else {
      incorrectIndexes.push(i);
    }
  });
  // check for correct colors in wrong spots
  let codeClone = [...code];
  incorrectIndexes.forEach((x) => {
    for (let i = 0; i < codeClone.length; i++) {
      if (x !== i && codeClone[i] !== guess[i]) {
        if (guess[x] === codeClone[i]) {
          results.push("white");
          codeClone.splice(i, 1);
          break;
        }
      }
    }
  });

  while (results.length < guess.length) {
    results.push(false);
  }
  return results;
};

export const checkWin = (results) => {
  let win = true;
  results.forEach((result) => {
    if (result !== "black") {
      win = false;
      return;
    }
  });
  return win;
};
