
let user = {
  level: 1,
  exp: 0,
  streak: 0,
  statPoints: 0,
  penalty: 0,
  stats: {
    Strength: 1,
    Discipline: 1,
    Focus: 1,
    Energy: 1
  }
};

function updateUI() {
  document.getElementById('level').innerText = "Level: " + user.level;
  document.getElementById('exp').innerText = "EXP: " + user.exp + "/100";
  document.getElementById('streak').innerText = "Streak: " + user.streak + " days";
  document.getElementById('penalty').innerText = "Penalty Count: " + user.penalty;
  document.getElementById('points').innerText = "Unspent Stat Points: " + user.statPoints;

  let statsHTML = '';
  for (let stat in user.stats) {
    statsHTML += stat + ": " + user.stats[stat] + " <button onclick='addStat("" + stat + "")'>+</button><br>";
  }
  document.getElementById('stats').innerHTML = statsHTML;

  let avatar = "avatar1.png";
  if (user.level >= 5) avatar = "avatar2.png";
  if (user.level >= 10) avatar = "avatar3.png";
  if (user.level >= 20) avatar = "avatar4.png";
  document.getElementById('avatar').src = avatar;

  localStorage.setItem("nofapUser", JSON.stringify(user));
}

function gainExp() {
  user.streak += 1;
  user.exp += 20;
  while (user.exp >= 100) {
    user.exp -= 100;
    user.level += 1;
    user.statPoints += 5;
  }
  updateUI();
}

function relapse() {
  user.penalty += 1;
  user.exp = Math.floor(user.exp * 0.5);
  user.streak = 0;
  if (user.level > 1) user.level -= 1;
  updateUI();
}

function addStat(stat) {
  if (user.statPoints > 0) {
    user.stats[stat] += 1;
    user.statPoints -= 1;
    updateUI();
  }
}

window.onload = function() {
  const saved = localStorage.getItem("nofapUser");
  if (saved) {
    user = JSON.parse(saved);
  }
  updateUI();
}
