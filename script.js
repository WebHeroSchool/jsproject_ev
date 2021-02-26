let num = 0;
let score = 0;
let question1 = { question: 'Планета Земля круглая?', correctAnswer: 'да' };
let question2 = { question: 'В году 12 месяцев?', correctAnswer: 'да' };
let question3 = { question: '2 + 2 = 22?', correctAnswer: 'нет' };
let question4 = { question: 'Помидор это фрукт?', correctAnswer: 'нет' };
let questions = [question1, question2, question3, question4];

buildQuiz = (questions) => {
	questions.forEach((item) => {
		let question = document.getElementById('question');
		question.innerHTML += ' ' + item.question
		question.style.color = 'blue';
	})
}

buildQuiz(questions);

function showResults() {
	questions.forEach((item) => {
		let i = prompt(item.questions);
		if (item.correctAnswer.toLowerCase() === i.toLowerCase()) {
			score++;
		}
	})
	let answer = document.querySelector('.correctAnswer');
	answer.innerHTML = 'Правильные ответы - : ' + score;
}


const nextButton = document.querySelector('.nextbutton');
nextButton.addEventListener('click', (event) => {
	console.log('Следующий слайд');
});

const previousButton = document.querySelector('.previousbutton');
previousButton.addEventListener('click', (event) => {
	console.log('Предыдущий слайд');
});

const submitButton = document.getElementById('text');
submitButton.addEventListener('click', () => {
	showResults();
});

let slides = document.querySelectorAll('.slider');
let currentSlide = 0;
function nextSlide() {
	for (let i = 0; i < slides.length; i++) {
		currentSlide++;
		console.log('номер слайда - ' + currentSlide);
	}

}
nextSlide();