/* ===============================
   RESPOSTAS CORRETAS
================================ */
const correctAnswers = {
    q1: "Taylor Swift",
    q2: "2012",
    q3: "Someone Like You",
    q4: "1989",
    q5: "Reading"
};

let playerName = "";

/* ===============================
   INICIAR JOGO
================================ */
function startGame() {
    const input = document.getElementById("playerName");
    playerName = input.value.trim();

    if (!playerName) {
        alert("Digite seu nome para começar!");
        input.focus();
        return;
    }

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
}

/* ===============================
   ENVIO DO QUIZ
================================ */
document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let score = 0;

    // Percorre apenas as perguntas que existem
    for (let question in correctAnswers) {
        const selected = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (!selected) {
            alert("Responda todas as perguntas antes de enviar!");
            return;
        }

        if (selected.value === correctAnswers[question]) {
            score++;
        }
    }

    saveScore(playerName, score);
    showResult(playerName, score);
});

/* ===============================
   SALVAR RANKING
================================ */
function saveScore(name, score) {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({ name, score });

    // Ordena do maior para o menor
    ranking.sort((a, b) => b.score - a.score);

    // Mantém apenas o TOP 5
    ranking = ranking.slice(0, 5);

    localStorage.setItem("ranking", JSON.stringify(ranking));
}

/* ===============================
   MOSTRAR RESULTADO
================================ */
function showResult(name, score) {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("scoreBox").innerHTML = `
    <h2>${name}, você acertou ${score} de 5 </h2>
  `;

    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    let rankingHTML = "<h3>🏆 Ranking</h3>";

    if (ranking.length === 0) {
        rankingHTML += "<p>Nenhum jogador ainda.</p>";
    } else {
        ranking.forEach((item, index) => {
            rankingHTML += `
        <p>${index + 1}º — <strong>${item.name}</strong> (${item.score} pts)</p>
      `;
        });
    }

    document.getElementById("rankingBox").innerHTML = rankingHTML;
}

/* ===============================
   REINICIAR JOGO
================================ */
function restartGame() {
    location.reload();
}
