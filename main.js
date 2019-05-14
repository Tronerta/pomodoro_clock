'use strict'

const timerDisplay = document.querySelector('#timer');
const sessionMinutes = document.querySelector('#sessionMinutes');
const breakMinutes = document.querySelector('#breakMinutes');
const indicator = document.querySelector('#indicator');

let running = false;
let currentPart = indicator.innerText

// functions
const timer = time => {
	let minutes = parseInt(time.split(':')[0])
	let seconds = parseInt(time.split(':')[1])
	let changeStateStatus = false;

	if (minutes > 0 || seconds > 0) {
		if (seconds !== 0) {
			seconds--
		} else {
			seconds = 59
			minutes--
		}
	} else {
		changeStateStatus = true;
		changeState()
	}
	
	let minutesString = minutes < 10 ? `0${minutes}` : minutes
	let secondsString = seconds < 10 ? `0${seconds}` : seconds

	document.title = `${currentPart}: ${timerDisplay.innerText}`
	if (!changeStateStatus) { timerDisplay.innerText = `${minutesString}:${secondsString}` }
}

const changeState = () => {
	if (currentPart == "Session") {
		currentPart = "Break"
		timerDisplay.innerText = breakMinutes.innerText + ':00'
		changeColors('Break')
	} else {
		indicator.innerText = 'Session'
		currentPart = 'Session'
		timerDisplay.innerText = sessionMinutes.innerText + ':00'
		changeColors('Session')
	}

	indicator.innerText = currentPart
}

const changeColors = state => {
	if (state == "Session") {
		indicator.classList.remove('break-color')
		indicator.classList.add('session-color')
		timerDisplay.classList.remove('break-color')
	} else {
		indicator.classList.remove("session-color")
		indicator.classList.add("break-color")
		timerDisplay.classList.add('break-color')
	}
}


// changing minutes
document.querySelectorAll('.operator').forEach(button => {
	button.addEventListener('click', () => {
		let part = button.id.split('_')[0]
		let operator = button.id.split('_')[1]

		let sessionNum = parseInt(sessionMinutes.innerText)
		let breakNum = parseInt(breakMinutes.innerText)

		if (part == "session") {
			if (operator == "minus") {
				if (sessionNum > 1) {
					sessionNum--
				}
			} else {
				if (sessionNum < 60) {
					sessionNum++
				}
			}
		}

		if (part == "break") {
			if (operator == "minus") {
				if (breakNum > 1) {
					breakNum--
				}
			} else {
				if (breakNum < 60) {
					breakNum++
				}
			}
		}

		sessionMinutes.innerText = `${sessionNum}`
		breakMinutes.innerText = `${breakNum}`

		let currentNum = currentPart == 'Session' ? sessionNum : breakNum

		if (!running) {
			let displayString = currentNum < 10 ? `0${currentNum}` : `${currentNum}`
			timerDisplay.innerText = `${displayString}:00`
		}
	
	})
})

// controls
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
const resetButton = document.querySelector('#reset')
const stopButton = document.querySelector('#stop')

startButton.addEventListener('click', function() {
	let interval = window.setInterval(function(){
		timer(timerDisplay.innerText)
	}, 1000)
	running = true;

	pauseButton.addEventListener('click', () => {
		window.clearInterval(interval)
	})

	resetButton.addEventListener('click', () => {
		window.clearInterval(interval)
	})

	stopButton.addEventListener('click', () => {
		window.clearInterval(interval)
	})
})

resetButton.addEventListener('click', () => {
	running = false;
	timerDisplay.innerText = '25:00';
	sessionMinutes.innerText = '25';
	breakMinutes.innerText = '5';
	currentPart = 'Session';
	indicator.innerText = 'Session';
	changeColors('Session')
})

stopButton.addEventListener('click', () => {
	running = false
	let currentMinutes = currentPart == 'Session' ? sessionMinutes.innerText : breakMinutes.innerText;
	timerDisplay.innerText = currentMinutes.length < 2 ? `0${currentMinutes}:00` : `${currentMinutes}:00`
})

