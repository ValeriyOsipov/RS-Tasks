/* eslint-disable no-new */
/* eslint-disable no-undef */
export function clearMainChart() {
  const chartWrapper = document.querySelector('.charts-wrapper');
  while (chartWrapper.childElementCount > 0) {
    chartWrapper.removeChild(chartWrapper.lastChild);
  }
  const canvas = document.createElement('canvas');
  canvas.classList.add('charts');
  chartWrapper.appendChild(canvas);
}

export function drawMainChart(arr1, arr2, activeColumn) {
  const ctx = document.querySelector('.charts').getContext('2d');
  const currentElement = document.querySelector('.selected-table td.country');
  const currentCountry = currentElement.innerText;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: arr1,
      datasets: [{
        label: `${currentCountry} ${activeColumn}`,
        data: arr2,
        backgroundColor: 'rgba(255, 0, 51, 0.5)',
        borderColor: 'red',
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
    },
  });
}
