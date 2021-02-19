let num;
let score;
let questions = ['Земля круглая или плоская?', 'Сколько месяцев в году?', '2 + 2 =?', 'Как зовут внучку Деда Мороза?'];
let answers = ['круглая', '12', '4', 'снегурочка'];
let currentResult = 0;
let answer;
 function correctAnswer() {
   questions.forEach((item) => { 
 answer = prompt(item);
answers.forEach((item) => {
   	if (answer == item) {
   		currentResult++;
   	}
   })
})

  	}


correctAnswer(questions, answers);
let text = document.getElementById('text');
text.innerHTML = ('Количество верных ответов - ' + currentResult);