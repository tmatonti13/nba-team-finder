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
      <h2>${team.full_name}</h2>
      <p><strong>City:</strong> ${team.city || "N/A"}</p>
      <p><strong>Conference:</strong> ${team.conference || "N/A"}</p>
      <p><strong>Division:</strong> ${team.division || "N/A"}</p>
      <p><strong>Abbreviation:</strong> ${team.abbreviation || "N/A"}</p>
      <p><strong>Data Source:</strong> ${payload.source}</p>
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