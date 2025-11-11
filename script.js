// ===== GAME DATA (Global so both index.html and student.html can access it) =====
const games = {
  pong: {
    title: "Pong Casualism",
    thumbnail: "images/pong.png", 
    link: "https://sudhakar-g.itch.io/pong-casualism",
    description: "A reimagined Pong where randomness and spontaneity redefine the rhythm of play.",
    detailed: "This version of Pong is built around the art philosophy of Casualism — imperfection, randomness, and unexpected outcomes. Each bounce may change color, speed, or shape, forcing players to adapt dynamically. The goal is to embrace unpredictability and fun.",
    screenshots: ["images/pong1.png", "images/pong2.png", "images/pong3.png"]
  },
  diwali: {
    title: "Fireworks Across Time",
    thumbnail: "images/Diwali.png", 
    link: "https://sudhakar-g.itch.io/fireworks-across-time",
    description: "Celebrate Diwali across generations in this emotional interactive story.",
    detailed: "‘Fireworks Across Time’ takes players through a heartfelt journey of celebration and memory. Experience how Diwali evolves as life changes — from childhood joy to nostalgic reflection. The art and sound design blend traditional culture with emotional storytelling.",
    screenshots: ["images/diwali1.png", "images/diwali2.png", "images/diwali3.png"]
  },
  placeholder1: {
    title: "Placeholder Game",
    thumbnail: "images/Placeholder.png", 
    link: "https://example.com/link3",
    description: "A sample game entry for demonstration.",
    detailed: "This placeholder game is used for layout testing.",
    screenshots: ["images/Placeholder.png"]
  }
};

// ===== MAIN SCRIPT LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const modal = document.getElementById("gameModal");
  if (!modal) return; // if modal not present (like on index.html), skip rest

  const gameTitle = document.getElementById("gameTitle");
  const gameDescription = document.getElementById("gameDescription");
  const detailedText = document.getElementById("detailedText");
  const gameImage = document.getElementById("gameImage");
  const playButton = document.getElementById("playButton");
  const closeModal = document.querySelector(".close");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  let currentScreens = [];
  let currentIndex = 0;

  // ===== OPEN MODAL =====
  document.addEventListener("click", e => {
    const card = e.target.closest(".game-card");
    if (!card) return;

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

  // ===== CLOSE MODAL =====
  closeModal.onclick = () => (modal.style.display = "none");
  window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.style.display = "none";
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  // ===== CAROUSEL FUNCTIONS =====
  function nextImage() {
    if (!currentScreens.length) return;
    currentIndex = (currentIndex + 1) % currentScreens.length;
    gameImage.src = currentScreens[currentIndex];
  }

  function prevImage() {
    if (!currentScreens.length) return;
    currentIndex = (currentIndex - 1 + currentScreens.length) % currentScreens.length;
    gameImage.src = currentScreens[currentIndex];
  }

  rightArrow.onclick = nextImage;
  leftArrow.onclick = prevImage;

  // ===== GISCUS COMMENTS =====
  function loadComments(gameTitle) {
    const container = document.getElementById("giscus-container");
    if (!container) return;

    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "Sudhakar-Gnanaraj/DGD_X");
    script.setAttribute("data-repo-id", "R_kgDOQSslxg");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQSslxs4Cxoz-");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", gameTitle);
    script.setAttribute("data-theme", "dark");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    container.appendChild(script);
  }
});
