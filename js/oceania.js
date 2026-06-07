const countries = [
    { name: "오스트레일리아연방", aliases: ["호주", "오스트레일리아"], code: "au" },
    { name: "피지공화국", aliases: ["피지"], code: "fj" },
    { name: "키리바시공화국", aliases: ["키리바시"], code: "ki" },
    { name: "마셜제도공화국", aliases: ["마셜제도"], code: "mh" },
    { name: "미크로네시아연방", aliases: ["미크로네시아"], code: "fm" },
    { name: "나우루공화국", aliases: ["나우루"], code: "nr" },
    { name: "뉴질랜드", aliases: ["뉴질랜드"], code: "nz" },
    { name: "팔라우공화국", aliases: ["팔라우"], code: "pw" },
    { name: "파푸아뉴기니독립국", aliases: ["파푸아뉴기니"], code: "pg" },
    { name: "사모아독립국", aliases: ["사모아"], code: "ws" },
    { name: "솔로몬제도", aliases: ["솔로몬제도"], code: "sb" },
    { name: "통가왕국", aliases: ["통가"], code: "to" },
    { name: "투발루", aliases: ["투발루"], code: "tv" },
    { name: "바누아투공화국", aliases: ["바누아투"], code: "vu" }
];

function shuffle(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

let shuffledCountries = shuffle(countries);

let currentCountry;
let score = 0;
let question = 0;
let totalQuestions = shuffledCountries.length;
let answered = false;

let autoTimer;
let nextTimer;
let showButtonTimer;
let countdown;
let timeLeft;

function updateInfo() {
    document.getElementById("info").textContent =
        `문제 ${question}/${totalQuestions} | 점수 ${score}`;
}

function updateTimerColor() {
    const timer = document.getElementById("timer");

    if (timeLeft >= 7) {
        timer.style.color = "green";
    } else if (timeLeft >= 4) {
        timer.style.color = "#d4a000";
    } else {
        timer.style.color = "red";
    }
}

function nextQuestion() {
    clearTimeout(autoTimer);
    clearTimeout(nextTimer);
    clearTimeout(showButtonTimer);
    clearInterval(countdown);

    document.getElementById("nextBtn").style.display = "none";

    if (question >= totalQuestions) {
        endGame();
        return;
    }

    question++;
    answered = false;

    document.getElementById("answer").disabled = false;
    document.getElementById("checkBtn").disabled = false;

    currentCountry = shuffledCountries[question - 1];

    document.getElementById("flag").src =
        `https://flagcdn.com/w320/${currentCountry.code}.png`;

    document.getElementById("answer").value = "";
    document.getElementById("result").textContent = "";

    updateInfo();

    timeLeft = 10;

    document.getElementById("timer").textContent =
        `남은 시간: ${timeLeft}초`;

    updateTimerColor();

    countdown = setInterval(() => {
        timeLeft--;

        document.getElementById("timer").textContent =
            `남은 시간: ${timeLeft}초`;

        updateTimerColor();

        if (timeLeft <= 0) {
            clearInterval(countdown);
        }
    }, 1000);

    autoTimer = setTimeout(() => {
        if (!answered) {

            answered = true;

            clearInterval(countdown);

            document.getElementById("answer").disabled = true;
            document.getElementById("checkBtn").disabled = true;

            document.getElementById("timer").textContent = "시간 초과";
            document.getElementById("timer").style.color = "red";

            document.getElementById("result").textContent =
                `시간 초과! 정답은 ${currentCountry.name}`;

            document.getElementById("result").style.color = "red";

            showButtonTimer = setTimeout(() => {
                document.getElementById("nextBtn").style.display = "inline-block";
            }, 2000);

            nextTimer = setTimeout(() => {
                nextQuestion();
            }, 5000);
        }
    }, 10000);
}

function checkAnswer() {
    if (answered) return;

    answered = true;

    clearTimeout(autoTimer);
    clearInterval(countdown);

    document.getElementById("answer").disabled = true;
    document.getElementById("checkBtn").disabled = true;

    const userAnswer =
        document.getElementById("answer").value.trim();

    const result =
        document.getElementById("result");

    const aliases =
        currentCountry.aliases || [];

    const isEgg =
        currentCountry.egg &&
        userAnswer === currentCountry.egg;

    const isCorrect =
        userAnswer === currentCountry.name ||
        aliases.includes(userAnswer) ||
        userAnswer.toLowerCase() === currentCountry.code.toLowerCase();

    if (isEgg) {

        score++;

        result.textContent = "이스터에그!";
        result.style.color = "#d4a000";

        document.getElementById("timer").textContent =
            "이스터에그!";

        document.getElementById("timer").style.color =
            "#d4a000";

    } else if (isCorrect) {

        score++;

        result.textContent = "정답!";
        result.style.color = "green";

        document.getElementById("timer").textContent =
            "정답!";

        document.getElementById("timer").style.color =
            "green";

    } else {

        result.textContent =
            `오답! 정답은 ${currentCountry.name}`;

        result.style.color = "red";

        document.getElementById("timer").textContent =
            "오답!";

        document.getElementById("timer").style.color =
            "red";
    }

    updateInfo();

    showButtonTimer = setTimeout(() => {
        document.getElementById("nextBtn").style.display =
            "inline-block";
    }, 2000);

    nextTimer = setTimeout(() => {
        nextQuestion();
    }, 5000);
}

function endGame() {
    canGoHomeWithEsc = true;

    const wrong = totalQuestions - score;
    const rate = ((score / totalQuestions) * 100).toFixed(1);

    document.querySelector(".container").innerHTML = `
        <h1>게임 종료</h1>
        <p>맞춘 문제 : ${score}</p>
        <p>틀린 문제 : ${wrong}</p>
        <p>전체 문제 : ${totalQuestions}</p>
        <p>정답률 : ${rate}%</p>
        <button onclick="location.reload()">다시하기</button>
        <button onclick="location.href='../index.html'">홈으로</button>
    `;
}

function giveUp() {
    canGoHomeWithEsc = true;

    clearTimeout(autoTimer);
    clearTimeout(nextTimer);
    clearTimeout(showButtonTimer);
    clearInterval(countdown);

    const rate =
        ((score / totalQuestions) * 100).toFixed(1);

    document.querySelector(".container").innerHTML = `
        <h1>게임 포기</h1>
        <p>진행 문제 : ${question}</p>
        <p>맞춘 문제 : ${score}</p>
        <p>전체 문제 : ${totalQuestions}</p>
        <p>정답률 : ${rate}%</p>
        <button onclick="location.reload()">다시하기</button>
        <button onclick="location.href='../index.html'">홈으로</button>
    `;
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        location.href = "../index.html";
        return;
    }

    if (e.key !== "Enter") return;

    if (!answered) {
        checkAnswer();
    } else {
        nextQuestion();
    }
});

nextQuestion();