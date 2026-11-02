// ==================== داده‌های کامل الفبا ====================
const alphabet = [
    { letter: "A", words: "Apple (سیب) - Ant (مورچه)", color: "#ff4757" },
    { letter: "B", words: "Ball (توپ) - Bear (خرس)", color: "#2ed573" },
    { letter: "C", words: "Cat (گربه) - Car (ماشین)", color: "#ffa502" },
    { letter: "D", words: "Dog (سگ) - Duck (اردک)", color: "#1e90ff" },
    { letter: "E", words: "Elephant (فیل) - Egg (تخم مرغ)", color: "#9b59b6" },
    { letter: "F", words: "Fish (ماهی) - Frog (قورباغه)", color: "#e67e22" },
    { letter: "G", words: "Goat (بز) - Grapes (انگور)", color: "#16a085" },
    { letter: "H", words: "Hat (کلاه) - Horse (اسب)", color: "#c0392b" },
    { letter: "I", words: "Ice cream (بستنی) - Igloo (ایگلو)", color: "#2980b9" },
    { letter: "J", words: "Juice (آبمیوه) - Jelly (ژله)", color: "#8e44ad" },
    { letter: "K", words: "Key (کلید) - Kite (بادبادک)", color: "#d35400" },
    { letter: "L", words: "Lion (شیر) - Lemon (لیمو)", color: "#27ae60" },
    { letter: "M", words: "Moon (ماه) - Monkey (میمون)", color: "#f39c12" },
    { letter: "N", words: "Nose (بینی) - Nest (لانه)", color: "#3498db" },
    { letter: "O", words: "Orange (پرتقال) - Owl (جغد)", color: "#e74c3c" },
    { letter: "P", words: "Pencil (مداد) - Pizza (پیتزا)", color: "#1abc9c" },
    { letter: "Q", words: "Queen (ملکه) - Question (سوال)", color: "#9b59b6" },
    { letter: "R", words: "Rabbit (خرگوش) - Rain (باران)", color: "#e67e22" },
    { letter: "S", words: "Sun (خورشید) - Star (ستاره)", color: "#f1c40f" },
    { letter: "T", words: "Tree (درخت) - Tiger (ببر)", color: "#2ecc71" },
    { letter: "U", words: "Umbrella (چتر) - Unicorn (اسب تک‌شاخ)", color: "#e84393" },
    { letter: "V", words: "Van (ون) - Violin (ویولن)", color: "#6c5ce7" },
    { letter: "W", words: "Watch (ساعت) - Watermelon (هندوانه)", color: "#0984e3" },
    { letter: "X", words: "Xylophone (زیلوفون) - X-ray (اشعه ایکس)", color: "#d63031" },
    { letter: "Y", words: "Yak (گاو تبتی) - Yo-yo (یویو)", color: "#00b894" },
    { letter: "Z", words: "Zebra (گورخر) - Zoo (باغ‌وحش)", color: "#636e72" }
];

const container = document.getElementById('cardsContainer');
const modal = document.getElementById('myModal');
const modalTitle = document.getElementById('modalTitle');
const modalWords = document.getElementById('modalWords');
let currentWordToSpeak = "";
let currentLetterToSpeak = "";
let currentCardIndex = 0;
let cardElements = [];

// ==================== منوی سه خطی و ناوبری ====================
function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('open');
}

function openSection(sectionId) {
    toggleMenu();
    // مخفی کردن همه بخش‌ها
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById('home-section').style.display = 'none';

    // نمایش بخش انتخاب شده
    if (sectionId === 'home-section') {
        document.getElementById('home-section').style.display = 'block';
    } else {
        document.getElementById(sectionId).style.display = 'block';
        // اگر آزمون انتخاب شد، ریست شود
        if(sectionId === 'quiz-section') {
            document.getElementById('reportSection').style.display = 'block';
            document.getElementById('quizSection').style.display = 'none';
        }
        // اگر بازی انتخاب شد، شروع نشود تا کاربر خودش شروع کند
    }
}

// ==================== ساخت کارت‌ها ====================
function renderCards() {
    container.innerHTML = "";
    cardElements = [];
    alphabet.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'flashcard';
        card.style.backgroundColor = item.color;
        if (index === 0) card.classList.add('active');
        let englishWord = item.words.split(' ')[0];
        card.innerHTML = `<h2>${item.letter}</h2><p>${englishWord}</p>`;
        card.onclick = () => {
            card.style.backgroundColor = "#2f3542";
            openModal(item.letter, item.words, englishWord);
        };
        container.appendChild(card);
        cardElements.push(card);
    });
}

function nextCard() {
    cardElements[currentCardIndex].classList.remove('active');
    currentCardIndex = (currentCardIndex + 1) % cardElements.length;
    cardElements[currentCardIndex].classList.add('active');
}

function prevCard() {
    cardElements[currentCardIndex].classList.remove('active');
    currentCardIndex = (currentCardIndex - 1 + cardElements.length) % cardElements.length;
    cardElements[currentCardIndex].classList.add('active');
}

// ==================== مودال ====================
function openModal(letter, words, englishWord) {
    modal.style.display = "block";
    modalTitle.innerText = `حرف ${letter}`;
    modalWords.innerText = words;
    currentWordToSpeak = englishWord;
    currentLetterToSpeak = letter;
}
function closeModal() { modal.style.display = "none"; }

// ==================== تلفظ صوتی ====================
function speakLetter() {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentLetterToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
    }
}
function speakWord() {
    if ('speechSynthesis' in window) {
        let wordToSpeak = currentWordToSpeak.split(' (')[0];
        const utterance = new SpeechSynthesisUtterance(wordToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("مرورگر شما از قابلیت صدا پشتیبانی نمی‌کند.");
    }
}

// ==================== جستجو ====================
function searchCards() {
    let input = document.getElementById('searchInput').value.toUpperCase();
    let cards = document.getElementsByClassName('flashcard');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].innerText.toUpperCase().includes(input)) cards[i].style.display = "";
        else cards[i].style.display = "none";
    }
}

// ==================== آزمون ====================
let totalAnswered = 0; let correctAnswers = 0;
let currentQuizQuestions = []; let currentQuestionIndex = 0;

const quizBank = [
    { question: "املای صحیح کدام است؟", options: ["Aple", "Apple", "Appel"], answer: "Apple" },
    { question: "کدام کلمه درست نوشته شده است؟", options: ["Banna", "Banana", "Bananna"], answer: "Banana" },
    { question: "املای صحیح کلمه سگ کدام است؟", options: ["Dog", "Dogg", "Doge"], answer: "Dog" },
    { question: "کدام گزینه صحیح است؟ (من یک سیب دارم)", options: ["I has an apple", "I have an apple", "I have a apple"], answer: "I have an apple" },
    { question: "کدام گزینه صحیح است؟ (او یک پسر است)", options: ["He is a boy", "He are a boy", "He am a boy"], answer: "He is a boy" },
    { question: "جمع کلمه Cat کدام است؟", options: ["Cats", "Cates", "Caties"], answer: "Cats" },
    { question: "معنی کلمه Book چیست؟", options: ["کتاب", "میز", "خودکار"], answer: "کتاب" },
    { question: "معنی کلمه Water چیست؟", options: ["آب", "نان", "شیر"], answer: "آب" }
];

function startQuiz() {
    totalAnswered = 0; correctAnswers = 0; currentQuestionIndex = 0;
    let shuffledQuestions = quizBank.sort(() => 0.5 - Math.random());
    currentQuizQuestions = shuffledQuestions.slice(0, 5);
    document.getElementById('reportSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuizQuestions.length) { endQuiz(); return; }
    let questionData = currentQuizQuestions[currentQuestionIndex];
    document.getElementById('questionText').innerText = `سوال ${currentQuestionIndex + 1}: ${questionData.question}`;
    let optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = "";
    questionData.options.forEach(option => {
        let btn = document.createElement('button');
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option, questionData.answer);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) { alert("🎉 آفرین! جواب درست بود."); correctAnswers++; }
    else { alert(`❌ اشتباه بود. جواب درست: ${correct}`); }
    totalAnswered++; currentQuestionIndex++;
    showQuestion();
}

function endQuiz() {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('reportSection').style.display = 'block';
    let savedTotal = parseInt(localStorage.getItem("quizTotal") || 0);
    let savedScore = parseInt(localStorage.getItem("quizScore") || 0);
    localStorage.setItem("quizTotal", savedTotal + totalAnswered);
    localStorage.setItem("quizScore", savedScore + correctAnswers);
    alert(`آزمون تموم شد! توی این دور ${correctAnswers} از ${totalAnswered} رو درست جواب دادی.`);
    updateProgress();
}

function updateProgress() {
    let savedTotal = parseInt(localStorage.getItem("quizTotal") || 0);
    let savedScore = parseInt(localStorage.getItem("quizScore") || 0);
    document.getElementById('totalQuestions').innerText = savedTotal;
    document.getElementById('scoreDisplay').innerText = savedScore;
}

// ==================== بازی شکار حرف ====================
let gameScore = 0; let currentTarget = "";
let gameColors = ["#ff4757", "#1e90ff", "#ffa502", "#9b59b6", "#2ed573"];

function startLetterGame() {
    gameScore = 0;
    document.getElementById('gameScore').innerText = gameScore;
    nextRound();
}

function nextRound() {
    let randomTargetIndex = Math.floor(Math.random() * alphabet.length);
    let targetObj = alphabet[randomTargetIndex];
    currentTarget = targetObj.letter;
    document.getElementById('targetLetter').innerText = currentTarget;

    let bubblesContainer = document.getElementById('bubblesContainer');
    bubblesContainer.innerHTML = "";
    let options = [currentTarget];
    while (options.length < 4) {
        let randomWrongIndex = Math.floor(Math.random() * alphabet.length);
        let wrongLetter = alphabet[randomWrongIndex].letter;
        if (!options.includes(wrongLetter)) options.push(wrongLetter);
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(letter => {
        let btn = document.createElement('button');
        btn.className = 'bubble-btn';
        btn.innerText = letter;
        let randomColor = gameColors[Math.floor(Math.random() * gameColors.length)];
        btn.style.backgroundColor = randomColor;
        btn.style.boxShadow = `0 8px 15px ${randomColor}80`;
        btn.onclick = () => checkGameClick(letter, btn);
        bubblesContainer.appendChild(btn);
    });
}

function checkGameClick(selectedLetter, btnElement) {
    if (selectedLetter === currentTarget) {
        gameScore += 10;
        document.getElementById('gameScore').innerText = gameScore;
        btnElement.style.transform = "scale(1.5)";
        btnElement.style.backgroundColor = "#2ed573";
        setTimeout(nextRound, 500);
    } else {
        btnElement.style.backgroundColor = "#ff4757";
        btnElement.style.animation = "shake 0.5s";
        if(gameScore > 0) { gameScore -= 5; document.getElementById('gameScore').innerText = gameScore; }
        setTimeout(() => { btnElement.style.backgroundColor = gameColors[0]; btnElement.style.animation = ""; }, 500);
    }
}

// ==================== بازی حافظه ====================
let memoryScore = 0;
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
function startMemoryGame() {
    memoryScore = 0; matchedPairs = 0; flippedCards = [];
    document.getElementById('memoryScore').innerText = memoryScore;
    let grid = document.getElementById('memoryGrid');
    grid.innerHTML = "";

    let selectedLetters = alphabet.sort(() => 0.5 - Math.random()).slice(0, 8);
    memoryCards = [...selectedLetters, ...selectedLetters].sort(() => 0.5 - Math.random());

    let allCards = []; // برای اینکه بتونیم بعداً همه رو با هم بچرخونیم

    memoryCards.forEach((card, index) => {
        let div = document.createElement('div');
        div.className = 'memory-card flipped'; // از اول "فلیپ" (رو) باشه تا حرفش دیده بشه
        div.dataset.letter = card.letter;
        div.dataset.index = index;
        div.innerText = card.letter; // حرف رو نشون بده
        div.onclick = () => flipMemoryCard(div);
        grid.appendChild(div);
        allCards.push(div); // ذخیره کارت‌ها
    });

    // نمایش پیام به کاربر
    let gameHeader = document.querySelector('#game-section-memory .game-header p');
    gameHeader.innerText = "سریع به حروف نگاه کن! ۳ ثانیه فرصت داری...";
    gameHeader.style.color = "#ff4757";
    gameHeader.style.fontWeight = "bold";

    // ⏱️ شروع تایمر ۳ ثانیه‌ای
    setTimeout(() => {
        // برگرداندن همه کارت‌ها به پشت (مخفی کردن حروف)
        allCards.forEach(cardDiv => {
            cardDiv.classList.remove('flipped');
            cardDiv.innerText = "?";
        });

        // تغییر پیام
        gameHeader.innerText = "حالا جای حروف رو حدس بزن!";
        gameHeader.style.color = "#2ed573";

    }, 3000); // ۳۰۰۰ میلی‌ثانیه = ۳ ثانیه
}

function flipMemoryCard(div) {
    if (div.classList.contains('flipped') || div.classList.contains('matched') || flippedCards.length === 2) return;

    div.classList.add('flipped');
    div.innerText = div.dataset.letter;
    flippedCards.push(div);

    if (flippedCards.length === 2) {
        if (flippedCards[0].dataset.letter === flippedCards[1].dataset.letter) {
            // جفت پیدا شد
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            memoryScore += 20;
            document.getElementById('memoryScore').innerText = memoryScore;
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === 8) setTimeout(() => alert("🎉 تبریک! تو برنده شدی!"), 500);
        } else {
            // اشتباه
            setTimeout(() => {
                flippedCards[0].classList.remove('flipped');
                flippedCards[0].innerText = "?";
                flippedCards[1].classList.remove('flipped');
                flippedCards[1].innerText = "?";
                flippedCards = [];
            }, 1000);
        }
    }
}

// ==================== اجرای اولیه ====================
renderCards();
updateProgress();