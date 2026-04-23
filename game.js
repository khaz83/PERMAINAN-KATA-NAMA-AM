const levels = [
    { s: "Kucing itu tidur di meja.", a: ["Kucing", "meja"] },
    { s: "Budak itu lari ke sekolah.", a: ["Budak", "sekolah"] },
    { s: "Ibu membeli roti di kedai.", a: ["Ibu", "roti", "kedai"] },
    { s: "Adik main bola di padang.", a: ["Adik", "bola", "padang"] }
];

let currentLevel = 0;
let score = 0;
let lives = 3;
let foundInLevel = 0;

function loadLevel() {
    const container = document.getElementById('sentence-container');
    const nextBtn = document.getElementById('next-btn');
    container.innerHTML = '';
    nextBtn.style.display = 'none';
    foundInLevel = 0;

    document.getElementById('high-score').innerText = localStorage.getItem('highScore') || 0;

    const words = levels[currentLevel].s.split(" ");
    words.forEach(word => {
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const span = document.createElement('span');
        span.innerText = word;
        span.className = 'word';
        
        span.onclick = () => {
            if (levels[currentLevel].a.includes(cleanWord)) {
                if (span.style.color !== "white") {
                    span.style.backgroundColor = "#28a745";
                    span.style.color = "white";
                    score += 10;
                    foundInLevel++;
                    updateUI();
                    checkWin();
                }
            } else {
                span.style.backgroundColor = "#dc3545";
                span.style.color = "white";
                lives--;
                updateUI();
                if (lives <= 0) gameOver();
            }
        };
        container.appendChild(span);
        container.appendChild(document.createTextNode(" "));
    });
}

function updateUI() {
    document.getElementById('score').innerText = score;
    document.getElementById('lives').innerText = lives;
}

function checkWin() {
    if (foundInLevel === levels[currentLevel].a.length) {
        document.getElementById('next-btn').style.display = 'inline-block';
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        alert("Hebat! Anda tamat semua pusingan.");
        gameOver();
    } else {
        loadLevel();
    }
}

function gameOver() {
    const high = localStorage.getItem('highScore') || 0;
    if (score > high) localStorage.setItem('highScore', score);
    alert("Permainan Tamat! Skor anda: " + score);
    location.reload();
}

loadLevel();