export function scrambleLetters(array) {
  let scrambledLetters = [...array].sort(() => {
    return Math.random() - 0.5;
  });
  return scrambledLetters;
}
