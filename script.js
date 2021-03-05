
const buildQuiz = () => {
	const output = [];
	questions.forEach((currentQuestion, questionNumber) => {
		const answers = [];
		for (let letter in currentQuestion.answers) {
			answers.push(
				`<label class="answer">
					<input type="radio" id="input" name="question${questionNumber}" value="${letter}" onclick="func()">
						${letter}:
						${currentQuestion.answers[letter]}
				</label>`
			);
		}
		output.push(
			`<div class="question"> ${currentQuestion.question} </div>
			<div class="answers"> ${answers.join('')} </div>`
		);
	});
	quizContainer.innerHTML = output.join('');

	function func() {
		quizContainer.getElementById("input").disabled = true;
	}
	func();
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
			answerContainers[questionNumber].style.color = 'lightgreen';
		}
		else {
			answerContainers[questionNumber].style.color = 'red';
		}
	});

	resultsContainer.innerHTML = `Правильных ответов ${numCorrect} из ${questions.length}`;

}


let quizContainer = document.querySelector('.quiz-container');
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

buildQuiz();

submitButton.addEventListener('click', () => {
	showResults();
});


/*const nextButton = document.getElementById('next');
nextButton.addEventListener('click', (event) => {
	console.log('Следующий слайд');
});

const previousButton = document.getElementById('previous');
previousButton.addEventListener('click', (event) => {
	console.log('Предыдущий слайд');
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
}*/
