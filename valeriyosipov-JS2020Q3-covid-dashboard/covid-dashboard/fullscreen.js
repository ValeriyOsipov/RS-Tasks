import { resizeMap } from './map';

function normalizeChildNodes(section) {
  const tableSection = document.querySelector('.table-section-content');
  const mapSection = document.querySelector('.map-section-content');
  const chartsSection = document.querySelector('.charts-section-content');
  const chart = document.querySelector('.charts');
  if (section === tableSection) {
    section.classList.remove('flex', 'flex-column', 'flex-center');
  } else if (section === mapSection) {
    section.childNodes[1].style.width = '50vw';
    section.childNodes[1].style.height = '27vh';
    resizeMap(1);
  } else if (section === chartsSection) {
    section.childNodes[1].style.width = '50vw';
    section.childNodes[1].style.height = '27vw';
    chart.style.width = '50vw';
    chart.style.height = '27vh';
  }
}

function childNodesOnFullScreen(section) {
  const tableSection = document.querySelector('.table-section-content');
  const mapSection = document.querySelector('.map-section-content');
  const chartsSection = document.querySelector('.charts-section-content');
  if (section === tableSection) {
    section.classList.add('flex', 'flex-column', 'flex-center');
  } else if (section === mapSection) {
    section.childNodes[1].style.width = '90vw';
    section.childNodes[1].style.height = '90vh';
    resizeMap(2);
  } else if (section === chartsSection) {
    section.childNodes[1].style.width = '75vw';
    section.childNodes[1].style.height = '40.5vw';
  }
}

export function toFullscreen(elem) {
  const section = elem.parentNode;
  section.parentNode.classList.add('empty');
  document.querySelector('body').appendChild(section);
  section.style.position = 'fixed';
  section.style.top = 0;
  section.style.zIndex = 100000;
  section.style.width = `${window.innerWidth - 15}px`;
  section.style.height = `${window.innerHeight - 15}px`;
  section.style.border = '2px solid rgba(255, 0, 51, 0.5)';
  section.style.borderRadius = '10px';
  childNodesOnFullScreen(section);
  const clone = elem.cloneNode();
  section.replaceChild(clone, elem);
  clone.style.background = 'url(./assets/back.svg)';
  clone.addEventListener('click', (e) => {
    toNormalView(e.target);
  });
}

function toNormalView(elem) {
  const section = elem.parentNode;
  const emptyCont = document.querySelector('.empty');
  section.style.position = 'relative';
  section.style.zIndex = 0;
  section.style.border = 'none';
  section.style.width = 'calc(100% - 10px)';
  section.style.height = 'calc(100% - 10px)';
  normalizeChildNodes(section);
  emptyCont.appendChild(section);
  const clone = elem.cloneNode();
  section.replaceChild(clone, elem);
  clone.style.background = 'url(./assets/full.svg)';
  clone.addEventListener('click', (e) => {
    toFullscreen(e.target);
  });
  emptyCont.classList.remove('empty');
}
