import './style.css';
import './leaflet.css';
import { clearMap, drawMap, redrawPopup } from './map';
import {
  getData, updateHeader, prepareGlobalTimeline, prepareCountryTimeline, assembleMainArray,
  preparePopulationArray, transformArrayToDraw, tableSort, checkState,
} from './data';
import { drawMainChart, clearMainChart } from './chart';
import { toFullscreen } from './fullscreen';

let statisticsObject = {};
let globalObject = {};
let population = [];
let globalTimeline = [];
let countryTimeline = [];
let countries = [];
let currentArray = [];
let activeColumn = 'Cases';
const globalChartArray = [];
let countryChartArray = [];
const statisticsLink = 'https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false';
const globalLink = 'https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=false';
const populationLink = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag;latlng';
const globalTimelineLink = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';

const radioBtns = document.querySelectorAll('.radio');
const input = document.querySelector('.search');
const mainTable = document.querySelector('.main-table');

async function start() {
  statisticsObject = await getData(statisticsLink);
  globalObject = await getData(globalLink);
  population = await getData(populationLink);
  globalTimeline = await getData(globalTimelineLink);

  main();
}

function clearTable() {
  while (mainTable.childElementCount > 1) {
    mainTable.removeChild(mainTable.lastChild);
  }
}

function drawMainTable() {
  clearTable();
  for (let i = 0; i < currentArray.length; i++) {
    const row = document.createElement('tr');
    if (currentArray[i].flag !== '') {
      row.innerHTML = `<tr><td class="country"><img class="flag" src="${currentArray[i].flag}" alt="flag">${currentArray[i].country}</td><td>${currentArray[i].cases_c}</td><td>${currentArray[i].deaths_c}</td><td>${currentArray[i].recovered_c}</td></tr>`;
      mainTable.appendChild(row);
    }
  }
  selectCountryOnClick();
}

function isGlobal() {
  const currentElement = document.querySelector('.selected-table td.country');
  const currentCountry = currentElement.innerText;
  return (currentCountry === 'Global');
}

function synchronizeRadio(elem) {
  const radioClass = elem.classList[1];
  const sameRadio = document.querySelectorAll(`.${radioClass}`);
  for (let i = 0; i < sameRadio.length; i++) {
    sameRadio[i].setAttribute('checked', 'checked');
    sameRadio[i].checked = true;
  }
}

function addRadioEvents() {
  let k = 1;
  for (let i = 0; i < radioBtns.length; i++) {
    radioBtns[i].addEventListener('click', (e) => {
      const currentElement = document.querySelector('.selected-table td.country');
      const currentCountry = currentElement.innerText;
      synchronizeRadio(e.target);
      k = transformArrayToDraw(activeColumn, countries);
      drawSelectedTable();
      drawMainTable();
      clearMap();
      drawMap(countries, activeColumn, currentArray,
        drawSelectedTable, clearMainChart, drawChartsForSelectedCountry);
      k = checkState(k);
      clearMainChart();
      if (isGlobal()) {
        countryChartArray = globalChartArray;
      } else { redrawPopup(currentCountry, currentArray); }
      drawMainChart(countryChartArray[0], countryChartArray[k], activeColumn);
    });
  }
}

function filterArray(item) {
  const regExp = new RegExp(`^${item}`, 'i');
  if (item !== '') {
    currentArray = countries.filter((el) => regExp.test(el.country));
  } else {
    currentArray = countries;
  }
}

function addSearch() {
  let searchItem = '';
  input.addEventListener('input', () => {
    searchItem = input.value;
    filterArray(searchItem);
    transformArrayToDraw(activeColumn, countries);
    drawMainTable();
  });
}

function changeActive(headers, elem) {
  for (let j = 0; j < headers.length; j++) {
    headers[j].classList.remove('active');
  }
  elem.classList.add('active');
}

// eslint-disable-next-line no-shadow
function synchronizeSort(activeColumn) {
  const sameSort = document.querySelectorAll(`.${activeColumn}`.toLowerCase());
  for (let j = 0; j < sameSort.length; j++) {
    sameSort[j].classList.add('active');
  }
}

function addSortClicks() {
  const tableHeaders = document.querySelectorAll('.sort');
  let k = 1;
  for (let i = 0; i < tableHeaders.length; i++) {
    tableHeaders[i].addEventListener('click', () => {
      const currentElement = document.querySelector('.selected-table td.country');
      const currentCountry = currentElement.innerText;
      activeColumn = tableHeaders[i].textContent;
      changeActive(tableHeaders, tableHeaders[i]);
      synchronizeSort(activeColumn);
      k = tableSort(activeColumn, countries);
      drawMainTable();
      clearMap();
      drawMap(countries, activeColumn, currentArray,
        drawSelectedTable, clearMainChart, drawChartsForSelectedCountry);
      clearMainChart();
      k = checkState(k);
      if (isGlobal()) {
        countryChartArray = globalChartArray;
      } else { redrawPopup(currentCountry, currentArray); }
      drawMainChart(countryChartArray[0], countryChartArray[k], activeColumn);
    });
  }
}

function showGlobal() {
  const tableData = document.querySelectorAll('.selected-table td');
  tableData[1].textContent = globalObject.cases;
  tableData[2].textContent = globalObject.deaths;
  tableData[3].textContent = globalObject.recovered;
}

function showCountry(elem) {
  const table = document.querySelector('.selected-table');
  table.removeChild(table.lastChild);
  const cloneRow = elem.parentNode.cloneNode(true);
  table.appendChild(cloneRow);
  redrawPopup(elem.innerText, currentArray);
}

function selectCountryOnClick() {
  const countriesInTable = document.querySelectorAll('.country');
  for (let i = 0; i < countriesInTable.length; i++) {
    countriesInTable[i].addEventListener('click', (e) => {
      let k = 1;
      showCountry(e.target);
      k = checkState(k);
      clearMainChart();
      drawChartsForSelectedCountry(e.target.innerText, k);
    });
  }
}

async function drawChartsForSelectedCountry(country, k) {
  const countryObject = currentArray.find((el) => el.country === country);
  const slug = countryObject.countryInfo.iso3;
  const countryTimelineLink = `https://disease.sh/v3/covid-19/historical/${slug}?lastdays=all`;
  countryTimeline = await getData(countryTimelineLink);

  if (countryTimeline.message === "Country not found or doesn't have any historical data") {
    // eslint-disable-next-line no-alert
    alert("Country doesn't have any timeline data");
  } else {
    countryChartArray = prepareCountryTimeline(countryTimeline, countryObject, countryChartArray);
    clearMainChart();
    drawMainChart(countryChartArray[0], countryChartArray[k], activeColumn);
  }
}

function drawSelectedTable() {
  const table = document.querySelector('.selected-table');
  const row = document.createElement('tr');
  const currentElement = document.querySelector('.selected-table td.country');
  const currentCountry = currentElement.innerText;
  const countryObject = currentArray.find((el) => el.country === currentCountry);
  table.removeChild(table.lastChild);
  const flag = `<img class="flag" src="${countryObject.flag}" alt="flag">`;
  row.innerHTML = `<tr><td class="country">${countryObject.flag ? flag : ''}${countryObject.country}</td><td>${countryObject.cases_c}</td><td>${countryObject.deaths_c}</td><td>${countryObject.recovered_c}</td></tr>`;
  table.appendChild(row);
}

function addButtonsEvents() {
  const buttons = document.querySelectorAll('.button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (e) => {
      toFullscreen(e.target);
    });
  }
}

function main() {
  preparePopulationArray(population);
  prepareGlobalTimeline(globalTimeline, globalChartArray);
  countries = assembleMainArray(countries, statisticsObject, population, globalObject);
  transformArrayToDraw(activeColumn, countries);
  addRadioEvents();
  addSearch();
  addSortClicks();
  addButtonsEvents();
  currentArray = countries;
  updateHeader(globalObject);
  showGlobal();
  drawMainTable();
  drawMap(countries, activeColumn, currentArray,
    drawSelectedTable, clearMainChart, drawChartsForSelectedCountry);
  drawMainChart(globalChartArray[0], globalChartArray[1], activeColumn);
}

start();
