require("dotenv").config();
const express = require("express");
const path = require("path");
const { BalldontlieAPI } = require("@balldontlie/sdk");

const app = express();
const PORT = 3000;

const api = new BalldontlieAPI({
  apiKey: process.env.API_KEY
});

const fallbackTeams = [
  { id: 1, full_name: "Atlanta Hawks", name: "Hawks", city: "Atlanta", conference: "East", division: "Southeast" },
  { id: 2, full_name: "Boston Celtics", name: "Celtics", city: "Boston", conference: "East", division: "Atlantic" },
  { id: 3, full_name: "Brooklyn Nets", name: "Nets", city: "Brooklyn", conference: "East", division: "Atlantic" },
  { id: 4, full_name: "Charlotte Hornets", name: "Hornets", city: "Charlotte", conference: "East", division: "Southeast" },
  { id: 5, full_name: "Chicago Bulls", name: "Bulls", city: "Chicago", conference: "East", division: "Central" },
  { id: 6, full_name: "Cleveland Cavaliers", name: "Cavaliers", city: "Cleveland", conference: "East", division: "Central" },
  { id: 7, full_name: "Dallas Mavericks", name: "Mavericks", city: "Dallas", conference: "West", division: "Southwest" },
  { id: 8, full_name: "Denver Nuggets", name: "Nuggets", city: "Denver", conference: "West", division: "Northwest" },
  { id: 9, full_name: "Detroit Pistons", name: "Pistons", city: "Detroit", conference: "East", division: "Central" },
  { id: 10, full_name: "Golden State Warriors", name: "Warriors", city: "Golden State", conference: "West", division: "Pacific" },
  { id: 11, full_name: "Houston Rockets", name: "Rockets", city: "Houston", conference: "West", division: "Southwest" },
  { id: 12, full_name: "Indiana Pacers", name: "Pacers", city: "Indiana", conference: "East", division: "Central" },
  { id: 13, full_name: "LA Clippers", name: "Clippers", city: "Los Angeles", conference: "West", division: "Pacific" },
  { id: 14, full_name: "Los Angeles Lakers", name: "Lakers", city: "Los Angeles", conference: "West", division: "Pacific" },
  { id: 15, full_name: "Memphis Grizzlies", name: "Grizzlies", city: "Memphis", conference: "West", division: "Southwest" },
  { id: 16, full_name: "Miami Heat", name: "Heat", city: "Miami", conference: "East", division: "Southeast" },
  { id: 17, full_name: "Milwaukee Bucks", name: "Bucks", city: "Milwaukee", conference: "East", division: "Central" },
  { id: 18, full_name: "Minnesota Timberwolves", name: "Timberwolves", city: "Minnesota", conference: "West", division: "Northwest" },
  { id: 19, full_name: "New Orleans Pelicans", name: "Pelicans", city: "New Orleans", conference: "West", division: "Southwest" },
  { id: 20, full_name: "New York Knicks", name: "Knicks", city: "New York", conference: "East", division: "Atlantic" },
  { id: 21, full_name: "Oklahoma City Thunder", name: "Thunder", city: "Oklahoma City", conference: "West", division: "Northwest" },
  { id: 22, full_name: "Orlando Magic", name: "Magic", city: "Orlando", conference: "East", division: "Southeast" },
  { id: 23, full_name: "Philadelphia 76ers", name: "76ers", city: "Philadelphia", conference: "East", division: "Atlantic" },
  { id: 24, full_name: "Phoenix Suns", name: "Suns", city: "Phoenix", conference: "West", division: "Pacific" },
  { id: 25, full_name: "Portland Trail Blazers", name: "Trail Blazers", city: "Portland", conference: "West", division: "Northwest" },
  { id: 26, full_name: "Sacramento Kings", name: "Kings", city: "Sacramento", conference: "West", division: "Pacific" },
  { id: 27, full_name: "San Antonio Spurs", name: "Spurs", city: "San Antonio", conference: "West", division: "Southwest" },
  { id: 28, full_name: "Toronto Raptors", name: "Raptors", city: "Toronto", conference: "East", division: "Atlantic" },
  { id: 29, full_name: "Utah Jazz", name: "Jazz", city: "Utah", conference: "West", division: "Northwest" },
  { id: 30, full_name: "Washington Wizards", name: "Wizards", city: "Washington", conference: "East", division: "Southeast" }
];

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/teams", async (req, res) => {
  try {
    const teams = await api.nba.getTeams();
    res.json({ source: "api", data: teams.data });
  } catch (error) {
    console.error("API failed, using fallback data.", error.message);
    res.json({ source: "fallback", data: fallbackTeams });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});