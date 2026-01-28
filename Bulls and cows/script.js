const start = () => {
  let answer = [];

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  for (let i = 0; i < 4; i++) {
    const number = digits.splice(-getRandomIndex(), 1)[0];
    answer.push(number);
  }

  const input = document.getElementById("guess");
  const btn = document.getElementById("button");
  const table = document.getElementById("history");

  let history = [];

  btn.addEventListener("click", () => {
    if (input.value.length === 4 && checkUnique(+input.value)) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");

      const [cows, bulls] = bullsAndCows(answer, [...input.value]);

      if (!history.includes(input.value)) {
        history.push(input.value);

        const value = input.value;
        td.innerText = `${value} - быки: ${bulls}, коровы: ${cows}.`;
        tr.appendChild(td);
        table.appendChild(tr);
        input.value = "";
      } else {
        td.innerText = `Введите другое число!`;
        tr.appendChild(td);
        table.appendChild(tr);
      }
    } else {
      alert(`Введите четыре уникальных цифры!`);
    }
  });
};

const getRandomIndex = () => {
  return +Math.random().toFixed(1) * 10;
};

const checkUnique = (number) => {
  let arr = `${number}`.split("");
  let uniqueSet = [];
  for (let i = 0; i < arr.length; i++) {
    if (uniqueSet.includes(arr[i])) {
      return false;
    }
    uniqueSet.push(arr[i]);
  }
  return true;
};

const bullsAndCows = (answer, guess) => {
  let cows = 0;
  let bulls = 0;

  for (let i = 0; i < answer.length; i++) {
    if (+answer[i] === +guess[i]) {
      bulls++;
      continue;
    }
    if (answer.includes(+guess[i])) {
      cows++;
    }
  }

  if (bulls === answer.length) {
    alert("Поздравляем! Вы угадали правильное число!");
    location.reload();
  }

  return [cows, bulls];
};

start();
