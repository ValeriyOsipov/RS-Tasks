export function getData(url) {
  return fetch(url, {
    method: 'GET',
    redirect: 'follow',
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    // eslint-disable-next-line no-console
    .catch((error) => console.log('error', error));
}

export function updateHeader(globalObject) {
  const header = document.querySelector('.header');
  const date = new Date(globalObject.updated);
  header.innerText += ` ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export function prepareGlobalTimeline(globalTimeline, globalChartArray) {
  const coef = 100000;
  const globalPopulation = 7827000000;
  const dates = Object.keys(globalTimeline.cases);
  const totalCases = Object.values(globalTimeline.cases);
  const totalDeaths = Object.values(globalTimeline.deaths);
  const totalRecovered = Object.values(globalTimeline.recovered);
  globalChartArray.push(dates);
  globalChartArray.push(totalCases);
  globalChartArray.push(totalDeaths);
  globalChartArray.push(totalRecovered);
  const diff = [[], [], [], []];
  for (let k = 1; k < 4; k++) {
    diff[k] = [globalChartArray[k][0]];
    for (let i = 1; i < globalChartArray[k].length; i++) {
      diff[k].push(globalChartArray[k][i] > globalChartArray[k][i - 1]
        ? globalChartArray[k][i] - globalChartArray[k][i - 1] : 0);
    }
    globalChartArray.push(diff[k]);
  }
  for (let i = 1; i < 7; i++) {
    globalChartArray.push(globalChartArray[i].map(
      (el) => Math.ceil((el * coef) / globalPopulation),
    ));
  }
}

export function prepareCountryTimeline(countryTimeline, countryObject, countryChartArray) {
  const coef = 100000;
  countryChartArray = [];

  const dates = Object.keys(countryTimeline.timeline.cases);
  const totalCases = Object.values(countryTimeline.timeline.cases);
  const totalDeaths = Object.values(countryTimeline.timeline.deaths);
  const totalRecovered = Object.values(countryTimeline.timeline.recovered);
  countryChartArray.push(dates);
  countryChartArray.push(totalCases);
  countryChartArray.push(totalDeaths);
  countryChartArray.push(totalRecovered);
  const diff = [[], [], [], []];
  for (let k = 1; k < 4; k++) {
    diff[k] = [countryChartArray[k][0]];
    for (let i = 1; i < countryChartArray[k].length; i++) {
      diff[k].push(countryChartArray[k][i] > countryChartArray[k][i - 1]
        ? countryChartArray[k][i] - countryChartArray[k][i - 1] : 0);
    }
    countryChartArray.push(diff[k]);
  }
  for (let i = 1; i < 7; i++) {
    countryChartArray.push(countryChartArray[i].map(
      (el) => Math.ceil((el * coef) / countryObject.population),
    ));
  }
  return countryChartArray;
}

function addGlobal(countries, globalObject) {
  countries.push(globalObject);
  const global = countries[countries.length - 1];
  global.country = 'Global';
  global.population = 7827000000;
  global.flag = '';
  global.coords = [0, 0];
}

export function assembleMainArray(countries, statisticsObject, population, globalObject) {
  const popNames = population.map((c) => (c.name));
  let index = -1;
  countries = statisticsObject;
  for (let i = 0; i < countries.length; i++) {
    index = popNames.indexOf(countries[i].country);
    countries[i].id = `id${i}`;
    if (index === -1) {
      countries[i].flag = '';
      countries[i].population = 1;
      countries[i].coords = [0, 0];
    } else {
      countries[i].flag = population[index].flag;
      countries[i].population = population[index].population;
      countries[i].coords = population[index].latlng;
    }
  }
  addGlobal(countries, globalObject);
  return countries;
}

export function preparePopulationArray(population) {
  const popNames = population.map((c) => (c.name));
  let index = -1;

  index = popNames.indexOf('Bolivia (Plurinational State of)');
  population[index].name = 'Bolivia';
  index = popNames.indexOf('Congo (Democratic Republic of the)');
  population[index].name = 'DRC';
  index = popNames.indexOf('Holy See');
  population[index].name = 'Holy See (Vatican City State)';
  index = popNames.indexOf('Iran (Islamic Republic of)');
  population[index].name = 'Iran';
  index = popNames.indexOf('Korea (Republic of)');
  population[index].name = 'S. Korea';
  index = popNames.indexOf('Macedonia (the former Yugoslav Republic of)');
  population[index].name = 'Macedonia';
  index = popNames.indexOf('Moldova (Republic of)');
  population[index].name = 'Moldova';
  index = popNames.indexOf('Palestine, State of');
  population[index].name = 'Palestine';
  index = popNames.indexOf('United Kingdom of Great Britain and Northern Ireland');
  population[index].name = 'UK';
  index = popNames.indexOf('Venezuela (Bolivarian Republic of)');
  population[index].name = 'Venezuela';
  index = popNames.indexOf('United States of America');
  population[index].name = 'USA';
  index = popNames.indexOf('Russian Federation');
  population[index].name = 'Russia';
  index = popNames.indexOf('Czech Republic');
  population[index].name = 'Czechia';
  index = popNames.indexOf('United Arab Emirates');
  population[index].name = 'UAE';
  index = popNames.indexOf('Bosnia and Herzegovina');
  population[index].name = 'Bosnia';
  index = popNames.indexOf('Libya');
  population[index].name = 'Libyan Arab Jamahiriya';
  index = popNames.indexOf('Sint Maarten (Dutch part)');
  population[index].name = 'Sint Maarten';
  index = popNames.indexOf('Viet Nam');
  population[index].name = 'Vietnam';
  index = popNames.indexOf('Saint Martin (French part)');
  population[index].name = 'Saint Martin';
  index = popNames.indexOf('Tanzania, United Republic of');
  population[index].name = 'Tanzania';
  index = popNames.indexOf('Brunei Darussalam');
  population[index].name = 'Brunei';
  index = popNames.indexOf('Virgin Islands (British)');
  population[index].name = 'British Virgin Islands';
}

function isCumulative() {
  return document.querySelector('.cumulative').checked;
}

function isAbs() {
  return document.querySelector('.abs').checked;
}

export function transformArrayToDraw(sortColumn, countries) {
  const coef = 100000;
  if (isCumulative() && isAbs()) {
    for (let i = 0; i < countries.length; i++) {
      countries[i].cases_c = countries[i].cases;
      countries[i].deaths_c = countries[i].deaths;
      countries[i].recovered_c = countries[i].recovered;
      countries[i].coef2 = 1;
    }
  } else if (!isCumulative() && isAbs()) {
    for (let i = 0; i < countries.length; i++) {
      countries[i].cases_c = countries[i].todayCases;
      countries[i].deaths_c = countries[i].todayDeaths;
      countries[i].recovered_c = countries[i].todayRecovered;
      countries[i].coef2 = 0.008;
    }
  } else if (isCumulative() && !isAbs()) {
    for (let i = 0; i < countries.length; i++) {
      countries[i].cases_c = Math.ceil((countries[i].cases * coef) / countries[i].population);
      countries[i].deaths_c = Math.ceil((countries[i].deaths * coef) / countries[i].population);
      countries[i].recovered_c = Math.ceil((countries[i].recovered * coef)
      / countries[i].population);
      countries[i].coef2 = 0.002;
    }
  } else {
    for (let i = 0; i < countries.length; i++) {
      countries[i].cases_c = Math.ceil((countries[i].todayCases * coef) / countries[i].population);
      countries[i].deaths_c = Math.ceil((countries[i].todayDeaths * coef)
      / countries[i].population);
      countries[i].recovered_c = Math.ceil((countries[i].todayRecovered * coef)
      / countries[i].population);
      countries[i].coef2 = 0.0001;
    }
  }
  return tableSort(sortColumn, countries);
}

export function tableSort(sortColumn, countries) {
  let k = 1;
  if (sortColumn === 'Cases') {
    countries.sort((a, b) => b.cases_c - a.cases_c);
    k = 1;
    return k;
  } if (sortColumn === 'Deaths') {
    countries.sort((a, b) => b.deaths_c - a.deaths_c);
    k = 2;
    return k;
  }
  countries.sort((a, b) => b.recovered_c - a.recovered_c);
  k = 3;
  return k;
}

export function checkState(k) {
  if (!isCumulative()) {
    if (isAbs()) {
      k += 3;
    } else {
      k += 9;
    }
  } else if (!isAbs()) {
    k += 6;
  }
  return k;
}
