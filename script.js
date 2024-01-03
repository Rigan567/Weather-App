const temperatureField = document.querySelector(".weather1");
const locationField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const searchField = document.querySelector(".search");
const weatherField = document.querySelector(".weather3 span");
const form = document.querySelector("form");
const btn = document.querySelector("button");

let target = "location.now";

const fetchData = async (target) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=dd2d2c52545f4fe6a1e204119240301&q=${target}`;

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  const {
    current: {
      temp_c,
      condition: { text, icon },
    },
    location: { name, localtime },
  } = data;

  updateDom(temp_c, name, icon, text, localtime);
};

const updateDom = (temperature, city, emoji, text, date) => {
  temperatureField.innerText = temperature + "°c";
  locationField.innerText = city;
  emojiField.src = emoji;
  weatherField.innerText = text;
  const exactTime = date.split(" ")[1];
  const exactDate = date.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();

  console.log(exactTime);
  console.log(exactDay);

  dateField.innerText = `${exactTime} - ${getDayfullName(
    exactDay
  )} - ${exactDate}`;
};

fetchData(target);

const getDayfullName = (num) => {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
};

const search = (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
};

form.addEventListener("submit", search);
