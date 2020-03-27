// app : number guesser
// author : khoirush akbar
/* requirement :
  - can only input number
  - 3 guesses only, if win/lose user cannot enter another guess, and submit button change to play again
  - display if guess is right or wrong by showing text and by changing the border of text input to red/green
*/

let min = 1
let max = 10
var theNumber, chances


const guessBtn = document.querySelector('#guess-btn'),
  guessVal = document.querySelector('#guess-value'),
  resultMsg = document.querySelector('#result')

initGame(min, max)


loadEventListener()

function loadEventListener() {
  guessBtn.addEventListener('click', submitGuess)
}

function submitGuess(e) {
  if (guessBtn.value == 'SUBMIT') {
    guess = guessVal.value
    if (isNaN(guess) || guess < min || guess > max) {
      setTextMessage(`Please only insert number ${min} - ${max}`, 'red')
    } else {
      if (guess == theNumber) {
        setTextMessage(`${guess} is correct, YOU WIN !`, 'green')
        gameOver()
      } else {
        chances -= 1
        if (chances > 0) {
          setTextMessage(`${guess} is incorrect, ${chances} more chances left`, 'red')
        } else {
          setTextMessage(`${guess} is incorrect, YOU LOSE !`, 'red')
          gameOver()
        }
      }
    }
  } else if (guessBtn.value == 'PLAY AGAIN') {
    initGame()
    guessBtn.value = 'SUBMIT'
  }


}

function setTextMessage(msg, color) {
  resultMsg.textContent = msg
  resultMsg.style.color = color
  resultMsg.style.display = 'block'
}

function initGame(min, max) {
  theNumber = Math.floor(Math.random() * (max - min + 1)) + min
  chances = 3
  resultMsg.style.display = 'none'
  guessVal.disabled = false
}

function gameOver() {
  guessBtn.value = 'PLAY AGAIN'
  guessVal.disabled = true
}