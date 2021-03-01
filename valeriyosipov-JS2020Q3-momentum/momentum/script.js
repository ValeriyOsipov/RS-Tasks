//localStorage.setItem('name', 123)
//localStorage.setItem('focus', 123)


// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  city = document.querySelector('.city'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Show Time
function showTime() {
//  let today = new Date(2020, 0, 22, 10, 0, 0, 0),
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    month = today.getMonth(),
    day = today.getDate(),
    weekday = today.getDay(),
    monthStr = "";
    weekdayStr = "";

  //Transform weekday
  switch(weekday) {
    case 0:
      weekdayStr = "Sunday";
      break;
    case 1:
      weekdayStr = "Monday";
      break;
    case 2:
      weekdayStr = "Tuesday";
      break;
    case 3:
      weekdayStr = "Wednesday";
      break;
    case 4:
      weekdayStr = "Thursday";
      break;
    case 5:
      weekdayStr = "Friday";
      break;
    case 6:
      weekdayStr = "Saturday";
      break;
  }

  //Transform month
  switch(month) {
    case 0:
      monthStr = "January";
      break;
    case 1:
      monthStr = "February";
      break;
    case 2:
      monthStr = "March";
      break;
    case 3:
      monthStr = "April";
      break;
    case 4:
      monthStr = "May";
      break;
    case 5:
      monthStr = "June";
      break;
    case 6:
      monthStr = "July";
      break;
    case 7:
      monthStr = "August";
      break;
    case 8:
      monthStr = "September";
      break;
    case 9:
      monthStr = "October";
      break;
    case 10:
      monthStr = "November";
      break;
    case 11:
      monthStr = "December";
      break;
  }

    
  // Output Time
  time.innerHTML = `<p>${weekdayStr}, ${monthStr} ${day}</p>
    <span>${addZero(hour)}</span><span>:</span><span>${addZero(min)}</span><span>:</span><span>${addZero(sec)}</span>`;

  if ((sec === 0) && (min === 0)) {
    setBgGreet();
  }

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
//  let today = new Date(2020, 0, 22, 10, 0, 0, 0),
  let today = new Date(),
    hour = today.getHours(),
    imageSrc = "";

  if ((hour < 12) && (hour >= 6)) {
    // Morning
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'lightgrey';
    imageSrc = `../momentum/assets/images/morning/${addZero(imgArray[hour])}.jpg`;
    changeBgImg(imageSrc);
  } else if ((hour < 18) && (hour >= 12)) {
    // Afternoon
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'lightgrey';
    imageSrc = `../momentum/assets/images/day/${addZero(imgArray[hour])}.jpg`;
    changeBgImg(imageSrc);
  } else if ((hour < 24) && (hour >= 18)) {
    // Evening
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
    imageSrc = `../momentum/assets/images/evening/${addZero(imgArray[hour])}.jpg`;
    changeBgImg(imageSrc);
  } else {
    // Night
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
    imageSrc = `../momentum/assets/images/night/${addZero(imgArray[hour])}.jpg`;
    changeBgImg(imageSrc);
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === "") {
        e.target.innerText = temp;
        localStorage.setItem('name', temp);
      } else {
        localStorage.setItem('name', e.target.innerText);
      }
      name.blur();
      active = false;
    }
  } else {
    if (e.target.innerText === "") {
      e.target.innerText = temp;
      localStorage.setItem('name', temp);
    } else {
      localStorage.setItem('name', e.target.innerText)
    }
    active = false;
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === "") {
        e.target.innerText = temp;
        localStorage.setItem('name', temp);
      } else {
        localStorage.setItem('focus', e.target.innerText);
      }
      focus.blur();
      active = false;
    }
  } else {
    if (e.target.innerText === "") {
      e.target.innerText = temp;
      localStorage.setItem('name', temp);
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
    active = false;
  }
}

// Get City
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

// Set City
function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === "") {
        e.target.innerText = temp;
        localStorage.setItem('city', temp);
      } else {
        localStorage.setItem('city', e.target.innerText);
      }
      city.blur();
      active = false;
      getWeather();
    }
  } else {
    if (e.target.innerText === "") {
      e.target.innerText = temp;
      localStorage.setItem('city', temp);
    } else {
      localStorage.setItem('city', e.target.innerText)
    }
    active = false;
    getWeather();
  }
}

// Clear text
let temp = "";
let active = false;
function clearText() {
  if (!active) {
    temp = this.textContent;
    this.textContent = "";
    active = true;
  }
}

// Form images array
function getRandom(a) {
  return Math.floor(Math.random() * a.length);
}
let imgArray = [];
function formArray() {
  let randomImg = 0;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let arr2 = [];
  for (let i = 0; i < 4; i++) {
    for (j = 0; j < 6; j++) {
      randomImg = arr[getRandom(arr)];
      arr2.push(arr[arr.indexOf(randomImg)]);
      imgArray.push(arr[arr.indexOf(randomImg)]);
      arr.splice(arr.indexOf(randomImg), 1);
    }
    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    arr2 = [];
  }
}

// Change bg image
function changeBgImg(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;    
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  };
}

// Next image
let realImgIndex = 0;
let currentImgIndex = 0;
let counter = 0;
function nextImage() {
  let today = new Date(),
    imageSrc = "",
    hour = today.getHours();
    currentImgIndex = hour;
  counter++;
  realImgIndex = (currentImgIndex + counter) % 24;
  if ((realImgIndex < 12) && (realImgIndex >= 6)) {
    imageSrc = `../momentum/assets/images/morning/${addZero(imgArray[realImgIndex])}.jpg`;
    document.body.style.color = 'lightgrey';
  } else if ((realImgIndex < 18) && (realImgIndex >= 12)) {
    imageSrc = `../momentum/assets/images/day/${addZero(imgArray[realImgIndex])}.jpg`;
    document.body.style.color = 'lightgrey';
  } else if ((realImgIndex < 24) && (realImgIndex >= 18)) {
    imageSrc = `../momentum/assets/images/evening/${addZero(imgArray[realImgIndex])}.jpg`;
    document.body.style.color = 'white';
  } else {
    imageSrc = `../momentum/assets/images/night/${addZero(imgArray[realImgIndex])}.jpg`;
    document.body.style.color = 'white';
  }
  changeBgImg(imageSrc);
  btn.disabled = true;
  animateButton(btn);
  setTimeout(function() { btn.disabled = false }, 1000);
}

//Get quote
const quote = document.querySelector('.quote');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const qbtn = document.querySelector('.qbtn');
async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.quote.quoteText.length > 300) {
    getQuote();
  } else {
    blockquote.textContent = data.quote.quoteText;
    figcaption.textContent = data.quote.quoteAuthor;
  }
}

function nextQuote() {
  getQuote();
  animateButton(qbtn);
}

qbtn.addEventListener('click', nextQuote);

/*qbtn.onclick = function() {
  quote.classList.remove("nextQuote");
  void quote.offsetWidth;
  quote.classList.add("nextQuote");
  setTimeout(getQuote, 300);
}*/

//Get weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=25411685d92865957b81f8e9063ad301&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  if ((data.cod != 200) && (localStorage.getItem('city') !== null)) {
    city.textContent = "[Please enter valid city]";
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    humidity.textContent = `${data.main.humidity.toFixed(0)}%`;
    wind.textContent = `${data.wind.speed.toFixed(2)}m/s`
  }
}

//Animate button
function animateButton(obj) {
  obj.classList.remove("animateButton");
  void obj.offsetWidth;
  obj.classList.add("animateButton");
}


const btn = document.querySelector('.btn');
btn.addEventListener('click', nextImage);


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener("click", clearText);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener("click", clearText);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener("click", clearText);

// Run
formArray();
getQuote()
setBgGreet();
getName();
getFocus();
getCity();
getWeather();
showTime();