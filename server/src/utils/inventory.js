const foodByName = require("../data/foodByName.json");

// estimate expiration date to be two weeks from now
let twoWeeksFromNow = new Date();
twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
twoWeeksFromNow = twoWeeksFromNow.toISOString();

const invalidWords = ["of", "and"];

const removeSpaces = (word) => {
  return word.replace(/\s/g, "");
};

const getMatchScore = (parsedWord, actualFoodName) => {
  const parsedWordNoSpaces = removeSpaces(parsedWord);
  const actualFoodNameNoSpaces = removeSpaces(actualFoodName);

  const absoluteScore =
    (parsedWordNoSpaces.length / actualFoodNameNoSpaces.length) * 100;
  let relativeScore = absoluteScore;

  // if we find a match with a parsed word that is
  // at least 5 letters long and an actual word that is
  // at least 12 letters long, we can assume it's a good match
  if (parsedWordNoSpaces.length >= 5 && actualFoodNameNoSpaces.length >= 12) {
    relativeScore = Math.min(absoluteScore * 1.5, 100);
  }

  return {
    absolute: absoluteScore,
    relative: relativeScore
  };
};

const getAllSubstrings = (str) => {
  const substrings = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.slice(i, j));
    }
  }

  return substrings;
};

exports.parseReceiptText = (text) => {
  const groceryItems = {};
  const lines = text.split("\n");

  for (const line of lines) {
    const possibleMatches = getAllSubstrings(line);
    const bestMatch = {
      score: { absolute: 0 }
    };
    let isFoodAlreadyFound = false;

    // check word on each line
    for (let i = 0; i < possibleMatches.length; i++) {
      const word = possibleMatches[i].trim().toLowerCase();

      if (invalidWords.includes(word)) {
        continue;
      }

      if (foodByName.hasOwnProperty(word)) {
        const { name: foodName } = foodByName[word];

        // go to next line if we already found this food
        if (groceryItems.hasOwnProperty(foodName)) {
          isFoodAlreadyFound = true;
          groceryItems[foodName].quantity += 1;
          break;
        }

        // update best match if absolute score is higher
        const score = getMatchScore(word, foodName);
        if (score.absolute > bestMatch.score.absolute) {
          bestMatch.score = score;
          bestMatch.foodName = foodName;
          bestMatch.word = word;
        }

        // go to next line if exact match is found
        if (score.absolute === 100) {
          break;
        }
      }
    }

    if (!isFoodAlreadyFound && bestMatch.score.relative >= 50) {
      groceryItems[bestMatch.foodName] = {
        name: bestMatch.foodName,
        expiresAt: twoWeeksFromNow,
        quantity: 1,
        fooDBKey: bestMatch.word
      };
    }
  }

  return Object.values(groceryItems);
};
