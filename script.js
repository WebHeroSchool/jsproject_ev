let num = 0;
let score = 0;
let question1 = { question: 'Планета Земля круглая?', answers: { a: 'да', b: 'нет,' }, correctAnswer: 'да' };
let question2 = { question: 'В году 12 месяцев?', answers: { a: 'да', b: 'нет,' }, correctAnswer: 'да' };
let question3 = { question: '2 + 2 = 22?', answers: { a: 'да', b: 'нет,' }, correctAnswer: 'нет' };
let question4 = { question: 'Помидор это фрукт?', answers: { a: 'да', b: 'нет,' }, correctAnswer: 'нет' };
let questions = [question1, question2, question3, question4];

let quizContainer = document.querySelectorAll('.quiz-container');

const buildQuiz = (questions) => {
	const output = [];
	questions.forEach((currentQuestion, questionNumber) => {
		const answers = [];
		for (let letter in currentQuestion.answers) {
			answers.push(
				`<label class="answer">
					<input type="radio" name="question${questionNumber}" value="${letter}">
						${letter}:
						${currentQuestion.answers[letter]}
				</label>`
			);
		}
		output.push(
			`<div class="question">${answers.join('')}</div>`
		);
	});
	quizContainer.innerHTML = output.join('');
}

function showResults() {
	const answerContainers = quizContainer.querySelectorAll('.answers');
	let numCorrect = 0;
	questions.forEach((currentQuestion, questionNumber) => {
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;
		if (userAnswer === currentQuestion.correctAnswer) {
			numCorrect++;
		}
	});
}

const nextButton = document.getElementById('next');
nextButton.addEventListener('click', (event) => {
	console.log('Следующий слайд');
});

const previousButton = document.getElementById('previous');
previousButton.addEventListener('click', (event) => {
	console.log('Предыдущий слайд');
});

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
	showResults();
});

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
function showNextSlide() {
	showSlide(currentSlide + 1);
}
function showPreviousSlide() {
	showSlide(currentSlide - 1);
}
buildQuiz(questions);