window.onload = function() {
    displayLeaderboard();
};

function displayLeaderboard() {
    // 1. Kunin ang pinakabagong data mula sa LocalStorage
    const rawData = localStorage.getItem('junli_db');
    const users = rawData ? JSON.parse(rawData) : [];
    const container = document.getElementById('leaderboard-list');

    // Siguraduhing malinis ang listahan bago magdagdag
    container.innerHTML = "";

    if (users.length === 0) {
        container.innerHTML = "<p style='text-align:center; opacity:0.5;'>No records found.</p>";
        return;
    }

    // 2. SORTING LOGIC: Pinakamataas na points ang nasa taas
    users.sort((a, b) => (b.points || 0) - (a.points || 0));

    // 3. DISPLAY LOGIC: I-loop ang mga users para sa table/list
    users.forEach((user, index) => {
        const row = document.createElement('div');
        row.className = "leaderboard-row"; // Siguraduhing may style ito sa CSS
        
        // Lagyan natin ng special icon ang Top 3
        let rankIcon = index + 1;
        if (index === 0) rankIcon = "🥇";
        if (index === 1) rankIcon = "🥈";
        if (index === 2) rankIcon = "🥉";

        row.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; 
                        background: rgba(255,255,255,0.1); margin-bottom: 10px; 
                        padding: 15px; border-radius: 12px; border-left: 5px solid #00f2fe;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-weight: bold; color: #00f2fe; width: 30px;">${rankIcon}</span>
                    <div>
                        <p style="font-weight: 600; color: white; margin: 0;">${user.name.toUpperCase()}</p>
                        <p style="font-size: 0.7rem; color: rgba(255,255,255,0.6); margin: 0;">${user.info || 'No Section'}</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; color: #00f2fe;">${user.points || 0}</span>
                    <p style="font-size: 0.6rem; color: white; opacity: 0.5; margin: 0;">PTS</p>
                </div>
            </div>
        `;
        container.appendChild(row);
    });
}