const countries = [
    { name: "앤티가 바부다", aliases: ["앤티가바부다"], code: "ag" },
    { name: "바하마국", aliases: ["바하마"], code: "bs" },
    { name: "바베이도스", aliases: ["바베이도스"], code: "bb" },
    { name: "벨리즈", aliases: ["벨리즈"], code: "bz" },
    { name: "캐나다", aliases: ["캐나다"], code: "ca", egg: "메이플 시럽" },
    { name: "코스타리카공화국", aliases: ["코스타리카"], code: "cr" },
    { name: "쿠바공화국", aliases: ["쿠바"], code: "cu" },
    { name: "도미니카국", aliases: ["도미니카"], code: "dm" },
    { name: "도미니카공화국", aliases: ["도미니카공화국"], code: "do" },
    { name: "엘살바도르공화국", aliases: ["엘살바도르"], code: "sv" },
    { name: "그레나다", aliases: ["그레나다"], code: "gd" },
    { name: "과테말라공화국", aliases: ["과테말라"], code: "gt" },
    { name: "아이티공화국", aliases: ["아이티"], code: "ht" },
    { name: "온두라스공화국", aliases: ["온두라스"], code: "hn" },
    { name: "자메이카", aliases: ["자메이카"], code: "jm" },
    { name: "멕시코합중국", aliases: ["멕시코"], code: "mx", egg: "타코" },
    { name: "니카라과공화국", aliases: ["니카라과"], code: "ni" },
    { name: "파나마공화국", aliases: ["파나마"], code: "pa" },
    { name: "세인트키츠 네비스", aliases: ["세인트키츠네비스"], code: "kn" },
    { name: "세인트루시아", aliases: ["세인트루시아"], code: "lc" },
    { name: "세인트빈센트 그레나딘", aliases: ["세인트빈센트그레나딘"], code: "vc" },
    { name: "트리니다드 토바고공화국", aliases: ["트리니다드토바고"], code: "tt" },
    { name: "미합중국", aliases: ["미국", "USA", "US"], code: "us", egg: "치즈버거" }
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