const body = document.querySelector("body");
const nodeNumber = document.createElement("div");
const btnStart = document.querySelector("#btn-start");
const score = document.querySelector("#score");
const time = document.querySelector("#times");
nodeNumber.classList.add("number");
console.log(score);

let index = 0;
let newNode;
let value = "";
let topPos = 0;
let leftPos = 0;
let setTime;
let minute = 05;
let seconds = 00;

function tinhKhoangCach(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randomIndex(min, max) {
  return Math.random() * (max - min) + min;
}

function checkOverlap(khoangC, radius) {
  return khoangC <= radius * 2;
}

function countTime() {
  if (seconds === 0) {
    minute--;
    seconds = 60;
  } else {
    seconds--;
  }

  time.textContent = "Times: " + minute + ":" + seconds + "s";
  setTime = setTimeout(countTime, 1000);

  if (minute === 0 && seconds == 0) {
    alert('Điểm của bạn là: ' + score.textContent);
    clearTimeout(setTime);
    reset();
  }
}

function createNode() {
  for (let i = 1; i <= 100; i++) {
    newNode = nodeNumber.cloneNode();

    if (i < 10) {
      value = "0" + i;
    } else {
      value = i;
    }
    newNode.textContent = value;
    body.appendChild(newNode);
  }
}

function removeNode() {
  document.querySelectorAll(".number").forEach((el) => {
    body.removeChild(el);
  });
}

function reset() {
  index = 0;
  btnStart.style.display = "inline-block";
  minute = 10;
  seconds = 0;
  removeNode();
}

btnStart.addEventListener("click", startGame);

function startGame() {
  let flag;
  let a;

  createNode();
  btnStart.style.display = "none";
  score.textContent = 00;
  const numArr = document.querySelectorAll(".number");

  numArr.forEach((el) => {
    while (true) {
      leftPos = randomIndex(50, 1200);
      topPos = randomIndex(50, 800);

      for (const i of numArr) {
        a = tinhKhoangCach(
          i.offsetLeft + 20,
          i.offsetTop + 20,
          leftPos + 20,
          topPos + 20
        );
        flag = checkOverlap(a, 30);

        if (flag === true) {
          break;
        }
      }

      if (flag === false) {
        arrTop = topPos;
        arrL = leftPos;
        break;
      }
    }

    el.style.display = "block";
    el.style.left = arrL + "px";
    el.style.top = arrTop + "px";

    el.addEventListener("click", () => {
      if (parseInt(el.textContent) - 1 == index) {
        el.style.backgroundColor = "#00FF00";
        el.style.borderColor = '#00FF00';
        index = el.textContent;
        score.textContent = parseInt(score.textContent) + 1;
      } else {
        el.style.backgroundColor = "red";
        el.style.borderColor = 'red';

      }
    });
  });

  setTimeout(countTime, 1000);
}
