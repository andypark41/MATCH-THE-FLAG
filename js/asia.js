const countries = [
    { name: "대한민국", aliases: ["한국"], code: "kr", egg: "김치" },
    { name: "일본국", aliases: ["일본"], code: "jp", egg: "초밥" },
    { name: "중화인민공화국", aliases: ["중국"], code: "cn", egg: "마라탕" },
    { name: "중화민국", aliases: ["대만"], code: "tw" },
    { name: "몽골국", aliases: ["몽골"], code: "mn" },
    { name: "베트남사회주의공화국", aliases: ["베트남"], code: "vn", egg: "쌀국수" },
    { name: "타이왕국", aliases: ["태국"], code: "th" },
    { name: "라오인민민주공화국", aliases: ["라오스"], code: "la" },
    { name: "캄보디아왕국", aliases: ["캄보디아"], code: "kh" },
    { name: "말레이시아", aliases: [], code: "my" },
    { name: "싱가포르공화국", aliases: ["싱가포르"], code: "sg" },
    { name: "인도네시아공화국", aliases: ["인도네시아"], code: "id" },
    { name: "필리핀공화국", aliases: ["필리핀"], code: "ph" },
    { name: "인도공화국", aliases: ["인도"], code: "in" },
    { name: "파키스탄이슬람공화국", aliases: ["파키스탄"], code: "pk" },
    { name: "방글라데시인민공화국", aliases: ["방글라데시"], code: "bd" },
    { name: "네팔연방민주공화국", aliases: ["네팔"], code: "np" },
    { name: "스리랑카민주사회주의공화국", aliases: ["스리랑카"], code: "lk" },
    { name: "사우디아라비아왕국", aliases: ["사우디아라비아", "사우디"], code: "sa" },
    { name: "아랍에미리트", aliases: ["UAE", "에미리트"], code: "ae" },
    { name: "카타르국", aliases: ["카타르"], code: "qa" },
    { name: "쿠웨이트국", aliases: ["쿠웨이트"], code: "kw" },
    { name: "오만술탄국", aliases: ["오만"], code: "om" },
    { name: "예멘공화국", aliases: ["예멘"], code: "ye" },
    { name: "이스라엘국", aliases: ["이스라엘"], code: "il" },
    { name: "요르단하심왕국", aliases: ["요르단"], code: "jo" },
    { name: "이라크공화국", aliases: ["이라크"], code: "iq" },
    { name: "이란이슬람공화국", aliases: ["이란"], code: "ir" },
    { name: "튀르키예공화국", aliases: ["튀르키예", "터키"], code: "tr" },
    { name: "카자흐스탄공화국", aliases: ["카자흐스탄"], code: "kz" }
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