const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word;
    this.displayWord = word.replaceAll(/[\w]/g, "_");
    this.remainingGuesses = 10;
    this.incorrectLetters = [];
    this.correctLetters = [];
  }

  guessLetter(letter) {
    if (this.word.includes(letter)) {
      this.correctLetters.push(letter);
      this.displayWord = this.word.split('').map(char => this.correctLetters.includes(char) ? char : '_').join('');
    } else {
      this.incorrectLetters.push(letter);
      this.remainingGuesses--;
    }
  }

  updateScreen() {
    document.getElementById('word-to-guess').textContent = this.displayWord;
    document.getElementById('incorrect-letters').textContent = this.incorrectLetters.join(',');
    document.getElementById('remaining-guesses').textContent = this.remainingGuesses;
  }

  isGameOver() {
    return this.remainingGuesses <= 0 || this.displayWord === this.word;
  }

  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return 'win';
    } else if (this.remainingGuesses <= 0) {
      return 'loss';
    } else {
      return null;
    }
  }
}


function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  if (!/^[a-z]{1}$/g.test(pressedKey)) return


  currentWord.guessLetter(pressedKey)
  currentWord.updateScreen()

  const gameOver = currentWord.isGameOver()

  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()