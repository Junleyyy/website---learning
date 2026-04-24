// 1. GLOBAL VARIABLES & STATE
let isLoginMode = true;

// 2. GUI OVERLAY FUNCTION (Dapat laging nasa taas para mabasa ng lahat)
function showGUI(icon, message, color) {
    const overlay = document.getElementById('gui-overlay');
    const guiIcon = document.getElementById('gui-icon');
    const guiMsg = document.getElementById('gui-msg');

    if (overlay && guiIcon && guiMsg) {
        overlay.style.display = "flex";
        guiIcon.innerText = icon;
        guiMsg.innerText = message;
        guiMsg.style.color = color;

        setTimeout(() => {
            overlay.style.display = "none";
        }, 1500);
    }
}

// 3. AUTH TOGGLE LOGIC (Switching between Login & Register)
const switchBtn = document.getElementById('switch-auth');
const registerFields = document.getElementById('register-fields');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const toggleText = document.getElementById('toggle-text');

if (switchBtn) {
    switchBtn.onclick = function(e) {
        e.preventDefault();
        isLoginMode = !isLoginMode;

        if (isLoginMode) {
            formTitle.innerText = "LOGIN";
            submitBtn.innerText = "Pumasok sa Module";
            registerFields.style.display = "none";
            toggleText.innerText = "Don't have an account?";
            switchBtn.innerText = "Register here";
        } else {
            formTitle.innerText = "REGISTER";
            submitBtn.innerText = "Gumawa ng Account";
            registerFields.style.display = "block";
            toggleText.innerText = "Already have an account?";
            switchBtn.innerText = "Login here";
        }
    };
}

// 4. SHOW/HIDE PASSWORD LOGIC
const togglePassword = document.querySelector('#togglePassword');
const passwordField = document.querySelector('#password');

if (togglePassword && passwordField) {
    togglePassword.addEventListener('click', function () {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.textContent = type === 'password' ? 'SHOW' : 'HIDE';
    });
}

// 5. FORM SUBMISSION LOGIC (Login & Register Process)
const authForm = document.getElementById('auth-form');

if (authForm) {
    authForm.onsubmit = function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let users = JSON.parse(localStorage.getItem('junli_db')) || [];

        if (isLoginMode) {
            // --- LOGIN PROCESS ---
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                showGUI("✨", `Welcome back,\n${user.name}!`, "#00f2fe");
                localStorage.setItem('junli_active_session', user.email);
                setTimeout(() => window.location.href = 'dashboard.html', 1600);
            } else {
                showGUI("❌", "Mali ang Email\no Password!", "#ff4b2b");
            }
        } else {
            // --- REGISTER PROCESS ---
            const name = document.getElementById('name').value;
            const grade = document.getElementById('grade').value;
            const section = document.getElementById('section').value;

            if (users.some(u => u.email === email)) {
                showGUI("⚠️", "Email is already\nregistered!", "#ffcc00");
                return;
            }

            const newUser = { 
                name: name, 
                email: email, 
                info: `Grade ${grade} - ${section}`, 
                password: password, 
                points: 0 
            };

            users.push(newUser);
            localStorage.setItem('junli_db', JSON.stringify(users));
            
            showGUI("✅", "Account Created\nSuccessfully!", "#00f2fe");
            localStorage.setItem('junli_active_session', email);
            setTimeout(() => window.location.href = 'dashboard.html', 1600);
        }
    };
}