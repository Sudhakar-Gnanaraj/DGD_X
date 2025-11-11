const students = {
  Sudhakar: {
    name: "Sudhakar",
    description: "Sudhakar is a passionate and driven professional with a strong foundation in both technology and business. Holding a Bachelor’s degree in Computer Science Engineering and a Master’s in Business Administration, he brings a unique blend of analytical, creative, and strategic thinking to his work.<br><br>With over three years of experience as a Business Analyst, Sudhakar has collaborated with multiple multinational corporations and government organizations, contributing to impactful projects that bridge the gap between technical innovation and business goals.<br><br>A lifelong video game enthusiast, Sudhakar is now channeling his passion into becoming an independent game developer. Combining his technical expertise, creative vision, and understanding of user experiences, he aims to craft immersive and meaningful games that resonate with players around the world.",
    games: ["pong", "diwali", "placeholder1"]
  },
  Suneha: {
    name: "Suneha",
    description: "Focused on storytelling and visual aesthetics in interactive media.",
    games: ["placeholder1", "placeholder1", "placeholder1"]
  },
  Anshul: {
    name: "Anshul",
    description: "Enjoys exploring gameplay mechanics and player engagement design.",
    games: ["placeholder1", "placeholder1", "placeholder1"]
  }
};

// Get the student name from the URL
const params = new URLSearchParams(window.location.search);
const studentName = params.get("name");
const student = students[studentName];

if (student) {
  document.getElementById("student-name").textContent = student.name;
  document.getElementById("student-description").innerHTML = student.description;

  const gamesContainer = document.getElementById("student-games");
  gamesContainer.innerHTML = "";
  student.games.forEach(gameKey => {
    const game = games[gameKey];
    if (!game) return;

    const card = document.createElement("div");
    card.className = "game-card";
    card.dataset.game = gameKey;
    card.innerHTML = `
      <img src="${game.thumbnail || game.screenshots[0]}" alt="${game.title}">
      <h3>${game.title}</h3>
    `;
    gamesContainer.appendChild(card);
  });

  // Reattach modal event listeners for dynamically added cards
  document.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", () => {
      const gameKey = card.dataset.game;
      const game = games[gameKey];
      if (!game) return;

      modal.style.display = "flex";
      gameTitle.textContent = game.title;
      gameDescription.textContent = game.description;
      detailedText.textContent = game.detailed;
      playButton.onclick = () => window.open(game.link, "_blank");

      currentScreens = game.screenshots;
      currentIndex = 0;
      gameImage.src = currentScreens[currentIndex];
      setTimeout(() => loadComments(game.title), 200);
    });
  });
}
