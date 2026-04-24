const lessons = {
    'Hardware Troubleshooting': {
        content: `<h3>Hardware Basics</h3><br>Ang RAM ay 'volatile memory'. Kailangan linisin ang gold pins gamit ang eraser kung walang display.`,
        question: "Ano ang ginagamit na panlinis sa gold pins ng RAM?",
        options: ["Eraser", "Water", "Soap", "Oil"],
        answer: 0
    },
    'Network Configuration': {
        content: `<h3>Networking Basics</h3><br>Ang IP Address ay parang house address ng computer sa network.`,
        question: "Ano ang tawag sa unique address ng computer?",
        options: ["MAC", "IP Address", "ZIP Code", "ID"],
        answer: 1
    }
};

let currentLesson = null;

function openModule(title) {
    currentLesson = lessons[title];
    document.getElementById('lesson-list').style.display = 'none';
    document.getElementById('module-reader').style.display = 'block';
    document.getElementById('module-content').innerHTML = currentLesson.content;
    
    startTimer();
}

function startTimer() {
    let timeLeft = 10; // 10 seconds lang para mabilis i-test
    const timerText = document.getElementById('seconds');
    
    const countdown = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('timer-box').style.display = 'none';
            showMiniQuiz();
        }
    }, 1000);
}

function showMiniQuiz() {
    document.getElementById('mini-quiz-section').style.display = 'block';
    document.getElementById('mini-question').innerText = currentLesson.question;
    
    const optionsDiv = document.getElementById('mini-options');
    optionsDiv.innerHTML = '';

    currentLesson.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "login-btn";
        btn.style.marginTop = "10px";
        btn.onclick = () => checkMiniAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkMiniAnswer(idx) {
    if (idx === currentLesson.answer) {
        // SUCCESS GUI
        if (typeof showToast === "function") {
            showToast("Tama! +20 Points added.");
        }
        
        savePoints(20);
    } else {
        if (typeof showToast === "function") {
            showToast("Mali! Subukan ulit ang module.");
        }
        setTimeout(() => location.reload(), 2000);
    }
}

function savePoints(pts) {
    let users = JSON.parse(localStorage.getItem('junli_db')) || [];
    const activeEmail = localStorage.getItem('junli_active_session');

    users = users.map(user => {
        if (user.email === activeEmail) {
            user.points = (user.points || 0) + pts;
        }
        return user;
    });

    localStorage.setItem('junli_db', JSON.stringify(users));
    
    // Lipat sa Dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}