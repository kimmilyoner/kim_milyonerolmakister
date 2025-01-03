let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let timer;
let timeLeft = 30; // Süre limiti (30 saniye)

// Soruları API'den çek
fetch('/api/questions')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(error => console.error('Sorular yüklenemedi:', error));

function showQuestion() {
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const timerEl = document.getElementById('timer');

  clearInterval(timer); // Önceki zamanlayıcıyı temizle
  timeLeft = 30; // Süreyi sıfırla
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Süre doldu! Yanıt vermediğiniz için soru atlandı.');
      moveToNextQuestion();
    }
  }, 1000);

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      clearInterval(timer); // Kullanıcı cevap verdiyse süreyi durdur
      checkAnswer(option, currentQuestion.answer);
    };
    optionsEl.appendChild(btn);
  });

  nextBtn.style.display = 'none';
  nextBtn.onclick = moveToNextQuestion;
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    alert('Doğru cevap! +10 puan kazandınız.');
    score += 10;
  } else {
    alert('Yanlış cevap! Doğru cevap: ' + correct);
  }
  document.getElementById('next-btn').style.display = 'block';
  updateScore();
}

function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function updateTimer() {
  const timerEl = document.getElementById('timer');
  timerEl.textContent = `Kalan Süre: ${timeLeft} saniye`;
}

function updateScore() {
  const scoreEl = document.getElementById('score');
  scoreEl.textContent = `Puan: ${score}`;
}

function endGame() {
  alert(`Oyun bitti! Toplam puanınız: ${score}`);
  document.getElementById('question').textContent = 'Oyun tamamlandı!';
  document.getElementById('options').innerHTML = '';
  document.getElementById('next-btn').style.display = 'none';
  clearInterval(timer);
}
