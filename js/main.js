const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const result = document.querySelector('.result');
// const send = document.querySelector('.send');
// const restart = document.querySelector('.restart');
const clear = document.querySelector('.clear');
const list = document.querySelector('.list');

//不可以放反，放反會變空陣列
// 讀取 LocalStorage 的資料，沒有就空陣列
let data = JSON.parse(localStorage.getItem("list")) || [];

//這個刷新要緊接 data 後面，不能放最後不然一樣不會跑東西出來
showList();
// console.log(data);

//計算 BMI、判定 BMI_Level、確定顏色、寫入 data 陣列存入 LocalStorage
function inputBMI() {
  const cm = height.value;
  const kg = weight.value;
  const bmi = Math.round((kg / ((cm / 100) * (cm / 100)) * 100)) / 100;
  const today = new Date();
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());

  let BMI_level = "";
  let bgColor = "";
  let bdrColor = "";

  // 如果沒有數值報錯
  if (!cm || !kg) {
    alert('請輸入數值！');
    return
  }

  // 判定 BMI 數值
  if (bmi < 18.5) {
    BMI_level = '體重過輕';
    bgColor = 'bgColorB';
    bdrColor = 'bdrColorB';
  } else if (bmi >= 18.5 && bmi < 25) {
    BMI_level = '理想';
    bgColor = 'bgColorG';
    bdrColor = 'bdrColorG';
  } else if (bmi >= 25 && bmi < 30) {
    BMI_level = '體重過重';
    bgColor = 'bgColorO';
    bdrColor = 'bdrColorO';
  } else if (bmi >= 30 && bmi < 35) {
    BMI_level = '輕度肥胖';
    bgColor = 'bgColorOO';
    bdrColor = 'bdrColorOO';
  } else if (bmi >= 35 && bmi < 40) {
    BMI_level = '中度肥胖';
    bgColor = 'bgColorOO';
    bdrColor = 'bdrColorOO';
  } else {
    BMI_level = '重度肥胖';
    bgColor = 'bgColorR';
    bdrColor = 'bdrColorR';
  }

  //寫入陣列
  data.unshift({
    BMI_level: BMI_level,
    bgColor: bgColor,
    bdrColor: bdrColor,
    bmi: bmi,
    weight: kg,
    height: cm,
    date: date,
  });




  // 寫入LocalStorage
  localStorage.setItem('list', JSON.stringify(data));
  console.log(data);

  // 刷新按鈕、下方表單
  showList();
  showresult(data);
}

// 刷新表單
function showList() {
  let str = '';
  let detail = JSON.parse(localStorage.getItem("list"));

// 判斷 localStorage 抓到的資料有沒有抓到，不是空的
  if (detail !== null) {
    let len = detail.length;
    for (let i = 0; i < len; i++) {
      str += `
          <li class="${detail[i].bdrColor}">
            <h3>${detail[i].BMI_level}</h3>
            <p>BMI<span>${detail[i].bmi}</span></p>
            <p>體重<span>${detail[i].weight}</span></p>
            <p>身高<span>${detail[i].height}</span></p>
            <p>${detail[i].date}</p>
            <button  data-num="${i}">刪除</button>
          </li>`;
    }
  }

// 判斷 str 是不是空的來決定動作
  if (str === '' || str === null) {
    clear.classList.add("hide");
    list.textContent = "還沒有輸入數值";
  } else {
    clear.classList.remove("hide");
    list.innerHTML = str;
  }

  // console.log(data);
}

// 刷新按鈕，顯示 BMI 資訊與 BMI等級燈號
function showresult(data) {
  let str = '';
  str = `
    <button class="detail ${data[0].bgColor}">
      <div class="showBMI">
        <div class="BMI_num">${data[0].bmi}</div>
        <div class="BMI">BMI</div>
        <div class="restart"> <img src="https://upload.cc/i1/2021/07/29/YynqD8.png" alt=""></div>
        <div class="BMI_level">${data[0].BMI_level}</div>
      </div>
    </button>`;

  result.innerHTML = str;

}

// 刪除單筆資料
function deleteData(e) {
  let num = e.target.dataset.num;
  let name = e.target.nodeName;
  if (name !== "BUTTON") return;
  data.splice(num, 1);
  localStorage.setItem('list', JSON.stringify(data));
  showList();
  console.log(e);
}

// 資料全部刪除
function deletDataAll() {
  localStorage.removeItem('list');
  showList();

  height.value = '';
  weight.value = '';
  result.innerHTML = `<button class="send">看結果</button>`;

  console.log(data);
}

// 監聽按鈕
// 監聽問題：如果不抓上一層的 div class 來監聽，按鈕重新冒出來後會抓不到，問助教
// send.addEventListener('click', inputBMI);
// restart.addEventListener('click', (e) => {
//   // e.preventDefault();
//   // console.log(e);
//   height.value = '';
//   weight.value = '';
//   result.innerHTML = `<button class="send">看結果</button>`;
// });
clear.addEventListener('click', deletDataAll);

list.addEventListener('click', deleteData);

result.addEventListener('click', function (e) {
  // console.log(e);
  let classN = e.target.className;
  let reset = e.target.nodeName;

  // 判斷監聽目標及後續動作
  if (reset === "IMG") {
    height.value = '';
    weight.value = '';
    height.removeAttribute("disabled", "disabled");
    weight.removeAttribute("disabled", "disabled");
    result.innerHTML = `<button class="send">看結果</button>`;
  } else if (classN === "restart") {
    height.value = '';
    weight.value = '';
    height.removeAttribute("disabled", "disabled");
    weight.removeAttribute("disabled", "disabled");
    result.innerHTML = `<button class="send">看結果</button>`;
  } else if (classN === "send") {
    inputBMI();
    height.setAttribute("disabled", "disabled");
    weight.setAttribute("disabled", "disabled");
  }
})