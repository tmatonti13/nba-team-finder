const searchBtn = document.getElementById("searchBtn");
const teamInput = document.getElementById("teamInput");
const resultDiv = document.getElementById("result");
const errorMsg = document.getElementById("errorMsg");

async function searchTeam() {
  const query = teamInput.value.trim().toLowerCase();

  resultDiv.classList.add("hidden");
  errorMsg.textContent = "";

  if (!query) {
    errorMsg.textContent = "Please enter a team name.";
    return;
  }

  try {
    const response = await fetch("/api/teams");
    const payload = await response.json();
    const teams = payload.data;

    const team = teams.find((t) =>
      t.full_name.toLowerCase().includes(query) ||
      t.name.toLowerCase().includes(query) ||
      t.city.toLowerCase().includes(query) ||
      t.abbreviation.toLowerCase().includes(query)
    );

    if (!team) {
      errorMsg.textContent = "Team not found.";
      return;
    }

    resultDiv.innerHTML = `
      <div class="team-header">
        <img
          class="team-logo"
          src="https://a.espncdn.com/i/teamlogos/nba/500/${team.abbreviation.toLowerCase()}.png"
          alt="${team.full_name} logo"
        />
        <div>
          <h2>${team.full_name}</h2>
          <p class="team-subtitle">${team.abbreviation} • ${team.city || "N/A"}</p>
        </div>
      </div>

      <div class="team-details">
        <div class="detail-box">
          <span class="label">City</span>
          <span class="value">${team.city || "N/A"}</span>
        </div>
        <div class="detail-box">
          <span class="label">Conference</span>
          <span class="value">${team.conference || "N/A"}</span>
        </div>
        <div class="detail-box">
          <span class="label">Division</span>
          <span class="value">${team.division || "N/A"}</span>
        </div>
        <div class="detail-box">
          <span class="label">Data Source</span>
          <span class="value">${payload.source === "api" ? "Live API" : "Fallback Data"}</span>
        </div>
      </div>
    `;

    resultDiv.classList.remove("hidden");
  } catch (error) {
    errorMsg.textContent = "Something went wrong while loading team data.";
    console.error(error);
  }
}

searchBtn.addEventListener("click", searchTeam);

teamInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchTeam();
  }
});