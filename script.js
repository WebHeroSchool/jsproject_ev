let form = document.querySelector('.form');
let name = form.querySelector('.form-name');
form.addEventListener('submit', function () {
	event.preventDefault();
	let regex = /^[А-ЯЁ]{1}[а-яё]+$/;
	name.classList.remove('error');
	if (!regex.test(name.value)) {
		event.preventDefault();
		name.classList.add('error');
		let error = document.createElement('div');
		error.className = 'error-block';
		error.style.color = 'red';
		error.innerHTML = 'Имя указано неверно';
		name.parentElement.insertBefore(error, name);
	}
	else {
		name.classList.remove('error');
		let elem = document.getElementsByClassName('error-block');
		elem[0].remove();
	}
})
const buildQuiz = () => {
	const output = [];
	questions.forEach((currentQuestion, questionNumber) => {
		const answers = [];
		for (let letter in currentQuestion.answers) {
			answers.push(
				`<label class="answer">
					<input type="radio" class="input" name="question${questionNumber}" value="${letter}" >
						${letter}:
						${currentQuestion.answers[letter]}
				</label>`
			);
		}
		output.push(
			`<div class="slide">
			<div class="question"> ${currentQuestion.question} </div>
			<div class="answers"> ${answers.join('')} </div>
			</div>`
		);
	});
	quizContainer.innerHTML = output.join('');
}

function func() {
	let inputs = document.querySelectorAll(".input");
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].disabled = true;
	}
};
let elem = document.querySelectorAll('.input');

let numCorrect = 0;
function checkResult() {
	const answerContainers = quizContainer.querySelectorAll('.answers');
	questions.forEach((currentQuestion, questionNumber) => {
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;
		if (userAnswer === currentQuestion.correctAnswer) {
			numCorrect++;
			answerContainers[questionNumber].style.color = 'lightgreen';
		}
		else {
			answerContainers[questionNumber].style.color = 'red';
		}
	});
}

function showResults() {
	resultsContainer.innerHTML = `Правильных ответов ${numCorrect} из ${questions.length}`;
}

const quizContainer = document.querySelector('.quiz-container');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const questions = [
	{
		question: 'Планета Земля круглая?',
		answers: {
			a: "да",
			b: "нет",
		},
		correctAnswer: "a"
	},
	{
		question: 'В году 12 месяцев?',
		answers: {
			a: "да",
			b: "нет",
		},
		correctAnswer: "a"
	},
	{
		question: '2 + 2 = 22?',
		answers: {
			a: "да",
			b: "нет",
		},
		correctAnswer: "b"
	},
	{
		question: 'Помидор это фрукт?',
		answers: {
			a: "да",
			b: "нет",
		},
		correctAnswer: "b"
	},
];

buildQuiz(questions);
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(n) {
	slides[currentSlide].classList.remove('active-slide');
	slides[n].classList.add('active-slide');
	currentSlide = n;
	if (currentSlide === 0) {
		previousButton.style.display = 'none';
	} else {
		previousButton.style.display = 'inline-block';
	}
	if (currentSlide === slides.length - 1) {
		nextButton.style.display = 'none';
		submitButton.style = 'inline-block';
	} else {
		nextButton.style.display = 'inline-block';
		submitButton.style = 'none';
	}
}
showSlide(currentSlide);
function showNextSlide() {
	showSlide(currentSlide + 1);
}
function showPreviousSlide() {
	showSlide(currentSlide - 1);
}
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

submitButton.addEventListener('click', () => {
	checkResult();
	showResults();
	elem.onclick = func();
});

