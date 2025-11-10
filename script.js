// === GISCUS CONFIG (replace with your own values from giscus.app) ===
const GISCUS_REPO = "Sudhakar-Gnanaraj/DGD_X";
const GISCUS_REPO_ID = "R_kgDOQSslxg";
const GISCUS_CATEGORY = "General";
const GISCUS_CATEGORY_ID = "DIC_kwDOQSslxs4Cxoz-";
// ====================================================================

const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupDescription = document.getElementById('popup-description');
const popupIcon = document.getElementById('popup-icon');
const popupScreenshots = document.getElementById('popup-screenshots');
const playBtn = document.getElementById('play-btn');
const closeBtn = document.querySelector('.close-btn');
const giscusContainer = document.getElementById('giscus-container');

// Open popup
document.querySelectorAll('.game-link').forEach(img => {
  img.addEventListener('click', () => {
    const title = img.dataset.title;
    const description = img.dataset.description;
    const screenshots = img.dataset.screenshots.split(',');
    const playURL = img.dataset.play;

    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupIcon.src = img.src;
    popupScreenshots.innerHTML = screenshots.map(s => `<img src="${s}" alt="${title} Screenshot">`).join('');
    playBtn.onclick = () => window.open(playURL, '_blank');

    // Load Giscus dynamically
    giscusContainer.innerHTML = `
      <script src="https://giscus.app/client.js"
        data-repo="${GISCUS_REPO}"
        data-repo-id="${GISCUS_REPO_ID}"
        data-category="${GISCUS_CATEGORY}"
        data-category-id="${GISCUS_CATEGORY_ID}"
        data-mapping="specific-term"
        data-term="${title}"
        data-theme="light"
        crossorigin="anonymous"
        async>
      </script>
    `;

    popup.classList.remove('hidden');
  });
});

// Close popup
closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
  giscusContainer.innerHTML = ''; // cleanup
});

window.addEventListener('click', e => {
  if (e.target === popup) {
    popup.classList.add('hidden');
    giscusContainer.innerHTML = '';
  }
});
