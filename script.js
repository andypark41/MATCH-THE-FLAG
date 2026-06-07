const clouds = document.querySelectorAll(".cloud")

clouds.forEach((cloud, index) => {
    let position = 0
    const speed = 0.1 + index * 0.03

    function animate() {
        position += speed

        cloud.style.transform =
            `translateX(${Math.sin(position) * 8}px)`

        requestAnimationFrame(animate)
    }

    animate()
})

const themeToggle = document.getElementById("themeToggle")
const icon = document.querySelector(".theme-icon")

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode")

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent = "LIGHT MODE"

        icon.classList.remove("sun")

    } else {

        themeToggle.textContent = "DARK MODE"

        icon.classList.add("sun")
    }
})

const ruleBtn = document.getElementById("ruleBtn");
const ruleBox = document.getElementById("ruleBox");
const closeBtn = document.getElementById("closeBtn");

const tabBtns = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".rule-content");

function openRule() {
  ruleBox.classList.add("show");

  requestAnimationFrame(() => {
    ruleBox.classList.add("active");
  });
}

function closeRule() {
  ruleBox.classList.remove("active");

  setTimeout(() => {
    ruleBox.classList.remove("show");
  }, 220);
}

ruleBtn.addEventListener("click", openRule);
closeBtn.addEventListener("click", closeRule);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRule();
});

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

const ruleTitle = document.getElementById("ruleTitle");

const titleMap = {
  tab1: "게임 규칙 및 조작",
  tab2: "게임 플레이 방법"
};

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(target).classList.add("active");

    ruleTitle.textContent = titleMap[target];
  });
});

const playBtn = document.querySelector(".menu-btn");
const gameSelect = document.getElementById("gameSelect");
const homeBtn = document.getElementById("homeBtn");

const titleBox = document.querySelector(".title-box");
const menuButtons = document.querySelector(".menu-buttons");

playBtn.addEventListener("click", () => {
  titleBox.style.display = "none";
  menuButtons.style.display = "none";
  themeToggle.style.display = "none";

  gameSelect.style.display = "flex";
});

function goHome() {
    gameSelect.style.display = "none";

    titleBox.style.display = "";
    menuButtons.style.display = "";
    themeToggle.style.display = "";
}

homeBtn.addEventListener("click", goHome);

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        goHome();
    }
});

document.getElementById("asiaBtn").addEventListener("click", () => {
    location.href = "games/asia.html";
});

document.getElementById("europeBtn").addEventListener("click", () => {
    location.href = "games/europe.html";
});

document.getElementById("africaBtn").addEventListener("click", () => {
    location.href = "games/africa.html";
});

document.getElementById("northAmericaBtn").addEventListener("click", () => {
    location.href = "games/north-america.html";
});

document.getElementById("southAmericaBtn").addEventListener("click", () => {
    location.href = "games/south-america.html";
});

document.getElementById("oceaniaBtn").addEventListener("click", () => {
    location.href = "games/oceania.html";
});