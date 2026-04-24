window.onload = function() {
    const activeEmail = localStorage.getItem('junli_active_session');
    const users = JSON.parse(localStorage.getItem('junli_db')) || [];

    // Hanapin ang data ng active user
    const user = users.find(u => u.email === activeEmail);

    if (user) {
        document.getElementById('stat-name').innerText = user.name;
        document.getElementById('stat-points').innerText = user.points;
        document.getElementById('stat-email').innerText = user.email;
        document.getElementById('stat-section').innerText = user.info;

        // Progress Logic (Kunwari ang Max Points ay 500)
        const maxPoints = 500;
        let percentage = (user.points / maxPoints) * 100;
        if (percentage > 100) percentage = 100;

        document.getElementById('progress-fill').style.width = percentage + "%";

        // Rank Logic
        let rank = "CSS Novice";
        if (user.points >= 100) rank = "System Technician";
        if (user.points >= 300) rank = "Network Specialist";
        if (user.points >= 450) rank = "CSS Master";

        document.getElementById('rank-text').innerText = "Rank: " + rank;
    } else {
        window.location.href = "index.html";
    }
};