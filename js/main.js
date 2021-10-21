const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const result = document.querySelector('.result');
const send = document.querySelector('.send');
const restart = document.querySelector('.restart');
const list = document.querySelector('.list');

const data = [] || JSON.parse(localStorage.getItem("data"));

function inputBMI() {
  const cm = height.value;
  const kg = weight.value;
  const bmi = Math.round((kg / ((cm / 100) * (cm / 100)) * 100)) / 100;
  const today = new Date();
<<<<<<< Updated upstream
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());

  let str = {};
  console.log(typeof kg);

  if (!cm || !kg) {
    alert('請輸入數值');
    return
  }
=======
  const date = today.getFullYear()+ "-" + (today.getMonth()+1) + "-" + (today.getDate());
  
  let BMI_level = "";
  let bgColor = "";
  let bdrColor = "";

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

  data.unshift({
    BMI_level:BMI_level,
    bgColor:bgColor,
    bdrColor:bdrColor,
    weight:kg,
    height:cm,
    date:date,
  });

  localStorage.setItem('list',JSON.stringify(data));
  console.log(data);
>>>>>>> Stashed changes
  

}
console.log();

// restart.addEventListener('click' ,);
send.addEventListener('click', inputBMI);