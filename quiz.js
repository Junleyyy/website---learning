// Database ng Questions (ICT-CSS)
const questions = [
    {
        q: "Ano ang tamang gamit sa paglilinis ng RAM gold pins?",
        options: ["Basahan", "Eraser", "Alcohol", "Toothpaste"],
        answer: 1
    },
    {
        q: "Ito ay port na ginagamit para sa wired internet connection.",
        options: ["HDMI", "USB", "Ethernet Port", "VGA"],
        answer: 2
    },
    {
        q: "Ano ang tawag sa 'brain' ng computer?",
        options: ["HDD", "RAM", "Power Supply", "CPU"],
        answer: 3
    },
    {
        q: "Anong cable ang ginagamit sa pag-connect ng monitor sa CPU?",
        options: ["VGA/HDMI", "SATA", "Power Cord", "RJ45"],
        answer: 0
    },
    {
        q: "Ito ang storage device na walang gumagalaw na parts (mas mabilis).",
        options: ["Hard Drive", "Floppy Disk", "SSD", "CD-ROM"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let totalPoints = 0;
const pointsPerCorrect = 10;

// Element Selectors
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const scoreLive = document.getElementById('score-live');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const finalScoreText = document.getElementById('final-score');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.q;
    questionNumber.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "login-btn"; 
        btn.style.marginTop = "10px";
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].answer;
    const overlay = document.getElementById('gui-overlay');
    const icon = document.getElementById('gui-icon');
    const msg = document.getElementById('gui-msg');

    // Ipakita ang Overlay
    overlay.style.display = "flex";

    if (selectedIndex === correctIndex) {
        totalPoints += pointsPerCorrect;
        icon.innerText = "✨";
        msg.innerText = "CORRECT!\n+10 Points";
        msg.style.color = "#00f2fe";
    } else {
        icon.innerText = "❌";
        msg.innerText = "WRONG!\nBetter luck next time.";
        msg.style.color = "#ff4b2b";
    }

    scoreLive.innerText = `Points: ${totalPoints}`;
    currentQuestionIndex++;

    // Mag-antay ng 1.5 seconds bago itago ang GUI at lumipat
    setTimeout(() => {
        overlay.style.display = "none"; // Itago ang GUI
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    finalScoreText.innerText = `You earned ${totalPoints} points!`;

    // DATABASE SAVING LOGIC
    let users = JSON.parse(localStorage.getItem('junli_db')) || [];
    const activeEmail = localStorage.getItem('junli_active_session');

    users = users.map(user => {
        if (user.email === activeEmail) {
            user.points = (user.points || 0) + totalPoints;
            showToast("🏆 Quiz Score Saved!");
        }
        return user;
    });

    localStorage.setItem('junli_db', JSON.stringify(users));
}

// Start
loadQuestion();