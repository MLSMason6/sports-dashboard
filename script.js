const scoresDiv = document.getElementById("scores");
const leagueSelect = document.getElementById("leagueSelect");

async function getScores(leagueId) {
  try {
    scoresDiv.innerHTML = "Loading...";
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`);
    const data = await res.json();

    scoresDiv.innerHTML = "";

    data.events.slice(0, 5).forEach(game => {
      const gameDiv = document.createElement("div");
      gameDiv.classList.add("game");

      gameDiv.innerHTML = `
        <h2>${game.strEvent}</h2>
        <p>${game.dateEvent} | ${game.strTime}</p>
        <p><strong>${game.intHomeScore ?? '-'} </strong> - <strong>${game.intAwayScore ?? '-'}</strong></p>
      `;

      scoresDiv.appendChild(gameDiv);
    });
  } catch (error) {
    scoresDiv.innerHTML = "Error loading scores.";
  }
}

// Load default league
getScores(leagueSelect.value);

// Change league on dropdown select
leagueSelect.addEventListener("change", (e) => {
  getScores(e.target.value);
});
