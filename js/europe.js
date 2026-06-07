const countries = [
    { name: "알바니아공화국", aliases: ["알바니아"], code: "al"},
    { name: "안도라공국", aliases: ["안도라"], code: "ad" },
    { name: "오스트리아공화국", aliases: ["오스트리아"], code: "at"},
    { name: "벨라루스공화국", aliases: ["벨라루스"], code: "by"},
    { name: "벨기에왕국", aliases: ["벨기에"], code: "be"},
    { name: "보스니아 헤르체고비나", aliases: ["보스니아", "보스니아헤르체고비나"], code: "ba"},
    { name: "불가리아공화국", aliases: ["불가리아"], code: "bg" },
    { name: "크로아티아공화국", aliases: ["크로아티아"], code: "hr"},
    { name: "키프로스공화국", aliases: ["키프로스"], code: "cy" },
    { name: "체코공화국", aliases: ["체코"], code: "cz"},
    { name: "덴마크왕국", aliases: ["덴마크"], code: "dk" },
    { name: "에스토니아공화국", aliases: ["에스토니아"],},
    { name: "핀란드공화국", aliases: ["핀란드"], code: "fi" },
    { name: "프랑스공화국", aliases: ["프랑스"], code: "fr", egg: "바게트"},
    { name: "독일연방공화국", aliases: ["독일"], code: "de", egg: "맥주"},
    { name: "그리스공화국", aliases: ["그리스"], code: "gr"},
    { name: "헝가리", aliases: ["헝가리"], code: "hu"},
    { name: "아이슬란드", aliases: ["아이슬란드"], code: "is", egg: "대구"},
    { name: "아일랜드", aliases: ["아일랜드"], code: "ie" },
    { name: "이탈리아공화국", aliases: ["이탈리아"], code: "it", egg: "피자"},
    { name: "라트비아공화국", aliases: ["라트비아"], code: "lv"},
    { name: "리히텐슈타인공국", aliases: ["리히텐슈타인"], code: "li" },
    { name: "리투아니아공화국", aliases: ["리투아니아"], code: "lt"},
    { name: "룩셈부르크대공국", aliases: ["룩셈부르크"], code: "lu"},
    { name: "몰타공화국", aliases: ["몰타"], code: "mt" },
    { name: "몰도바공화국", aliases: ["몰도바"], code: "md"},
    { name: "모나코공국", aliases: ["모나코"], code: "mc" },
    { name: "몬테네그로", aliases: ["몬테네그로"], code: "me" },
    { name: "네덜란드왕국", aliases: ["네덜란드", "홀란드"], code: "nl"},
    { name: "북마케도니아공화국", aliases: ["북마케도니아", "마케도니아"], code: "mk"},
    { name: "노르웨이왕국", aliases: ["노르웨이"], code: "no" },
    { name: "폴란드공화국", aliases: ["폴란드"], code: "pl"},
    { name: "포르투갈공화국", aliases: ["포르투갈"], code: "pt" },
    { name: "루마니아", aliases: ["루마니아"], code: "ro"},
    { name: "러시아연방", aliases: ["러시아"], code: "ru", egg: "보드카"},
    { name: "산마리노공화국", aliases: ["산마리노"], code: "sm" },
    { name: "세르비아공화국", aliases: ["세르비아"], code: "rs"},
    { name: "슬로바키아공화국", aliases: ["슬로바키아"], code: "sk" },
    { name: "슬로베니아공화국", aliases: ["슬로베니아"], code: "si"},
    { name: "스페인왕국", aliases: ["스페인"], code: "es" },
    { name: "스웨덴왕국", aliases: ["스웨덴"], code: "se" },
    { name: "스위스연방", aliases: ["스위스"], code: "ch" },
    { name: "우크라이나", aliases: ["우크라이나"], code: "ua"},
    { name: "그레이트브리튼 및 북아일랜드 연합왕국", aliases: ["영국"], code: "gb"},
    { name: "아르메니아공화국", aliases: ["아르메니아"], code: "am",},
    { name: "아제르바이잔공화국", aliases: ["아제르바이잔"], code: "az"},
    { name: "조지아", aliases: ["조지아"], code: "ge"},
    { name: "튀르키예공화국", aliases: ["튀르키예", "터키"], code: "tr", egg: "케밥"},
    { name: "바티칸 시국", aliases: ["바티칸", "교황령"], code: "va"},
    {name: "코소보공화국",aliases: ["코소보"],code: "xk"}
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