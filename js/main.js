const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const result = document.querySelector('.result');
const send = document.querySelector('.send');
const restart = document.querySelector('.restart');

const data = [] || JSON.parse(localStorage.getItem("data"));

function inputBMI(){
  const cm = height.value;
  const kg = weight.value;
  const bmi = Math.round((kg/((cm/100)*(cm/100))*100))/100;
  const today = new Date();
  const date = today.getFullYear()+ "-" + (today.getMonth()+1) + "-" + (today.getDate());
  
  let str = {};

}

// restart.addEventListener('click' ,);
// send.addEventListener('click' ,);