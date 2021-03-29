fetch('https://opentdb.com/api.php?amount=4&category=9&difficulty=medium&type=boolean')
	.then(response => response.json())
	.then(results => {
		let form = document.querySelector('.form');
		let name = form.querySelector('.form-name');
		let timer;
		const submitButton = document.getElementById('submit');
		const previousButton = document.getElementById('previous');
		const nextButton = document.getElementById('next');
		const countdownContainer = document.getElementById("countdown");
		countdownContainer.style.display = "none";
		submitButton.style.display = "none";
		previousButton.style.display = "none";
		nextButton.style.display = "none";

		let restartButton = document.getElementById('btn');

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			let regex = /^[A-ZА-Я]+[a-zа-я]{2,10}$/;
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
				//name.classList.remove('error');
				//let elem = document.getElementsByClassName('error-block');
				//elem[0].remove();
				form.style.display = "none";

				start();
			}
		})

		let question1 = results.results[0].question;
		let question2 = results.results[1].question;
		let question3 = results.results[2].question;
		let question4 = results.results[3].question;
		let answers1 = [results.results[0].incorrect_answers];
		let correctAnswer1 = results.results[0].correct_answer;
		let answers2 = [results.results[1].incorrect_answers];
		let correctAnswer2 = results.results[1].correct_answer;
		let answers3 = [results.results[2].incorrect_answers];
		let correctAnswer3 = results.results[2].correct_answer;
		let answers4 = [results.results[3].incorrect_answers];
		let correctAnswer4 = results.results[3].correct_answer;

		function start() {

			const questions = [
				{
					question: question1,
					answers: {
						a: correctAnswer1,
						b: answers1,
					},
					correctAnswer: "a"
				},
				{
					question: question2,
					answers: {
						a: correctAnswer2,
						b: answers2,
					},
					correctAnswer: "a"
				},
				{
					question: question3,
					answers: {
						a: correctAnswer3,
						b: answers3,
					},
					correctAnswer: "a"
				},
				{
					question: question4,
					answers: {
						a: correctAnswer4,
						b: answers4,
					},
					correctAnswer: "a"
				},
			];
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
			const quizContainer = document.querySelector('.quiz-container');
			const resultsContainer = document.getElementById('results');

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

			buildQuiz(questions);
			const radiobuttons = document.querySelectorAll(".answers input");
			radiobuttons.forEach(button => button.removeAttribute("disabled"));

			radiobuttons.forEach(button => button.addEventListener('click', () => {
				clearTimeout(timer);
				clearInterval(interval);
			}));

			const slides = document.querySelectorAll('.slide');
			let currentSlide = 0;

			function showSlide(n) {
				slides[currentSlide].classList.remove('active-slide');
				slides[n].classList.add('active-slide');
				currentSlide = n;

				function countdown() {
					countdownContainer.style.display = "block";
					let display = document.querySelector("#countdown .display")
					let timeLeft = "10";
					interval = setInterval(function () {
						if (--timeLeft >= 0) {
							display.innerHTML = timeLeft
						} else {
							document.querySelector("#countdown h1").style.display = "none";
							previousButton.style.display = "none";
							nextButton.style.display = "none";
							submitButton.style.display = "none";
							restartButton.style.display = "inline-block";
							clearInterval(interval);
							timeLeft = "10";
						}
					}, 1000)
				}

				countdown();

				function blockQuizOnTimeout() {
					radiobuttons.forEach(button => button.setAttribute("disabled", true));
					alert("Время на ответ истекло");
				}

				timer = setTimeout(blockQuizOnTimeout, 10000);

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
				btn.classList.remove('btn_block');
				countdownContainer.style.display = "none";
			})

			function reloadLocation() {
				location.reload();
			}
			restartButton.addEventListener('click', () => {
				reloadLocation();

			});
		}

	})
	.catch(err => console.log(err))
