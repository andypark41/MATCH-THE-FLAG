const countries = [
    { name: "알제리민주인민공화국", aliases: ["알제리"], code: "dz" },
    { name: "앙골라공화국", aliases: ["앙골라"], code: "ao" },
    { name: "베냉공화국", aliases: ["베냉"], code: "bj" },
    { name: "보츠와나공화국", aliases: ["보츠와나"], code: "bw" },
    { name: "부르키나파소", aliases: ["부르키나파소"], code: "bf" },
    { name: "부룬디공화국", aliases: ["부룬디"], code: "bi" },
    { name: "카보베르데공화국", aliases: ["카보베르데"], code: "cv" },
    { name: "카메룬공화국", aliases: ["카메룬"], code: "cm" },
    { name: "중앙아프리카공화국", aliases: ["중앙아프리카"], code: "cf" },
    { name: "차드공화국", aliases: ["차드"], code: "td" },
    { name: "코모로연합", aliases: ["코모로"], code: "km" },
    { name: "콩고공화국", aliases: ["콩고"], code: "cg" },
    { name: "콩고민주공화국", aliases: ["민주콩고", "DR콩고"], code: "cd" },
    { name: "코트디부아르공화국", aliases: ["코트디부아르"], code: "ci" },
    { name: "지부티공화국", aliases: ["지부티"], code: "dj" },
    { name: "이집트아랍공화국", aliases: ["이집트"], code: "eg" },
    { name: "적도기니공화국", aliases: ["적도기니"], code: "gq" },
    { name: "에리트레아국", aliases: ["에리트레아"], code: "er" },
    { name: "에스와티니왕국", aliases: ["에스와티니", "스와질란드"], code: "sz" },
    { name: "에티오피아연방민주공화국", aliases: ["에티오피아"], code: "et" },
    { name: "가봉공화국", aliases: ["가봉"], code: "ga" },
    { name: "감비아공화국", aliases: ["감비아"], code: "gm" },
    { name: "가나공화국", aliases: ["가나"], code: "gh" },
    { name: "기니공화국", aliases: ["기니"], code: "gn" },
    { name: "기니비사우공화국", aliases: ["기니비사우"], code: "gw" },
    { name: "케냐공화국", aliases: ["케냐"], code: "ke" },
    { name: "레소토왕국", aliases: ["레소토"], code: "ls" },
    { name: "라이베리아공화국", aliases: ["라이베리아"], code: "lr" },
    { name: "리비아국", aliases: ["리비아"], code: "ly" },
    { name: "마다가스카르공화국", aliases: ["마다가스카르"], code: "mg" },
    { name: "말라위공화국", aliases: ["말라위"], code: "mw" },
    { name: "말리공화국", aliases: ["말리"], code: "ml" },
    { name: "모리타니이슬람공화국", aliases: ["모리타니"], code: "mr" },
    { name: "모리셔스공화국", aliases: ["모리셔스"], code: "mu" },
    { name: "모로코왕국", aliases: ["모로코"], code: "ma" },
    { name: "모잠비크공화국", aliases: ["모잠비크"], code: "mz" },
    { name: "나미비아공화국", aliases: ["나미비아"], code: "na" },
    { name: "니제르공화국", aliases: ["니제르"], code: "ne" },
    { name: "나이지리아연방공화국", aliases: ["나이지리아"], code: "ng" },
    { name: "르완다공화국", aliases: ["르완다"], code: "rw" },
    { name: "상투메 프린시페 민주공화국", aliases: ["상투메프린시페"], code: "st" },
    { name: "세네갈공화국", aliases: ["세네갈"], code: "sn" },
    { name: "세이셸공화국", aliases: ["세이셸"], code: "sc" },
    { name: "시에라리온공화국", aliases: ["시에라리온"], code: "sl" },
    { name: "소말리아연방공화국", aliases: ["소말리아"], code: "so" },
    { name: "남아프리카공화국", aliases: ["남아공"], code: "za" },
    { name: "남수단공화국", aliases: ["남수단"], code: "ss" },
    { name: "수단공화국", aliases: ["수단"], code: "sd" },
    { name: "탄자니아연합공화국", aliases: ["탄자니아"], code: "tz" },
    { name: "토고공화국", aliases: ["토고"], code: "tg" },
    { name: "튀니지공화국", aliases: ["튀니지"], code: "tn" },
    { name: "우간다공화국", aliases: ["우간다"], code: "ug" },
    { name: "잠비아공화국", aliases: ["잠비아"], code: "zm" },
    { name: "짐바브웨공화국", aliases: ["짐바브웨"], code: "zw" }
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