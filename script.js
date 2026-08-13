const opening = document.getElementById("opening");
const site = document.getElementById("site");
const music = document.getElementById("weddingMusic");
const openButton = document.getElementById("openInvitation");
const musicControl = document.getElementById("musicControl");
const target = new Date("2026-09-19T11:00:00+08:00").getTime();

function setTime(id, value) {
  document.getElementById(id).textContent = String(value).padStart(2, "0");
}
function updateCountdown() {
  let distance = Math.max(0, target - Date.now());
  setTime("days", Math.floor(distance / 86400000));
  setTime("hours", Math.floor((distance / 3600000) % 24));
  setTime("minutes", Math.floor((distance / 60000) % 60));
  setTime("seconds", Math.floor((distance / 1000) % 60));
}
updateCountdown();
setInterval(updateCountdown, 1000);

openButton.addEventListener("click", async () => {
  // The click is intentional user interaction, so browsers allow audio playback here.
  try {
    await music.play();
    musicControl.classList.remove("paused");
  } catch (error) {
    musicControl.classList.add("paused");
  }

  opening.classList.add("hidden");
  site.classList.add("visible");
  musicControl.classList.add("show");
  window.scrollTo({top: 0, behavior: "instant"});
});

musicControl.addEventListener("click", async () => {
  if (music.paused) {
    await music.play();
    musicControl.classList.remove("paused");
  } else {
    music.pause();
    musicControl.classList.add("paused");
  }
});

const quickLinks = [...document.querySelectorAll(".quick-nav a")];
const navSections = quickLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      quickLinks.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === "#" + entry.target.id
      ));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

navSections.forEach(section => observer.observe(section));

quickLinks.forEach(link => {
  link.addEventListener("click", () => {
    quickLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});
