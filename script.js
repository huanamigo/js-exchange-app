const currencyOne = document.querySelector('.currency-one');
const currencyTwo = document.querySelector('.currency-two');

const amountOne = document.querySelector('.amount-one');
const amountTwo = document.querySelector('.amount-two');

const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');

var myHeaders = new Headers();
myHeaders.append('apikey', 'rtibhdd4d0I4WZMvib4NNHqf6kc949En');

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

let apiResult;

const calculate = () => {
  var requestURL = `https://api.exchangerate.host/convert?from=${currencyOne.value}&to=${currencyTwo.value}`;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function () {
    var response = request.response;
    rateInfo.innerText = `Aktualny kurs ${currencyOne.value} na ${currencyTwo.value} wynosi ${response.info.rate}`;
    amountTwo.value = (amountOne.value * response.info.rate).toFixed(3);
  };
};

amountOne.addEventListener('input', calculate);
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);

swapBtn.addEventListener('click', () => {
  let temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});
