import { levels } from './levels';
import { level, currentLevel, newProgress, progress, input, loadLevel, showAnswer } from './script';

export const assemblyLine = document.querySelector('.assembly_line');
export const editor = document.querySelector('.editor');
export const markup = document.querySelector('.html_markup');
export const headerCheck = document.querySelector('.aside_header_text .check');
export const menuLevels = document.querySelector('.levels');
export const elementTag = document.querySelector('.element_tag');

export function attributesToString(elem) {
  const elemAttrs = elem.attributes;
  let attrsString = '';
  for (let i = 0; i < elemAttrs.length; i++) {
    if (elemAttrs[i].specified) {
      attrsString += ` ${elemAttrs[i].name}="${elemAttrs[i].value}"`;
    }
  }
  return attrsString;
}

export function getLevelMarkup(elem) {
  const hasNestedItems = elem.children.length > 0;
  const element = elem.tagName.toLowerCase();
  const levelMarkup = document.createElement('div');
  const attrsString = attributesToString(elem);
  levelMarkup.innerText = `${element} ${attrsString}`.trim();
  levelMarkup.innerText = `<${levelMarkup.innerText}>`;
  if (hasNestedItems) {
    for (let i = 0; i < elem.children.length; i++) {
      levelMarkup.append(getLevelMarkup(elem.children[i]));
    }
  }
  levelMarkup.append(`</${element}>`);
  return levelMarkup;
}

export function loadLevelVisual() {
  const newMarkup = document.createElement('div');
  assemblyLine.innerHTML = level.markup;
  for (let i = 0; i < assemblyLine.children.length; i++) {
    if (assemblyLine.children[i].nodeType === 1) {
      newMarkup.append(getLevelMarkup(assemblyLine.children[i]));
    }
  }
  markup.innerHTML = `<div>&ltdiv class="assembly_line"&gt${newMarkup.innerHTML}&lt/div&gt</div>`;
}

export function prepareTag(str) {
  const arr = str.split('\n');
  if (arr.length === 1) {
    return str;
  }
  const newStr = arr[0] + arr[arr.length - 1];
  return newStr;
}

export function isAnimatedParent(elem) {
  return (elem.parentNode.classList.contains('animated_element'));
}

export function setTagPosition(elem) {
  if (isAnimatedParent(elem)) {
    elementTag.style.top = `${elem.parentNode.offsetTop - elem.parentNode.offsetHeight / 2}px`;
    elementTag.style.left = `${elem.parentNode.offsetLeft + elem.parentNode.offsetWidth / 2}px`;
  } else {
    elementTag.style.top = `${elem.offsetTop - elem.offsetHeight / 2 - 20}px`;
    elementTag.style.left = `${elem.offsetLeft + elem.offsetWidth / 2}px`;
  }
}

export function showElementTag(elem) {
  const gameAreaElements = document.querySelectorAll('.assembly_line *');
  const markupElements = document.querySelectorAll('.html_markup > div *');
  const gameAreaElementsArray = Array.prototype.slice.call(gameAreaElements);
  const markupElementsArray = Array.prototype.slice.call(markupElements);
  const index = gameAreaElementsArray.indexOf(elem);

  markupElementsArray[index].classList.add('hovered_markup');
  elem.classList.add('hovered_element');
  elementTag.style.display = 'flex';
  setTagPosition(elem);
  elementTag.innerText = prepareTag(markupElementsArray[index].innerText);
}

export function hideElementTag(elem) {
  const gameAreaElements = document.querySelectorAll('.assembly_line *');
  const markupElements = document.querySelectorAll('.html_markup > div *');
  const gameAreaElementsArray = Array.prototype.slice.call(gameAreaElements);
  const markupElementsArray = Array.prototype.slice.call(markupElements);
  const index = gameAreaElementsArray.indexOf(elem);

  markupElementsArray[index].classList.remove('hovered_markup');
  elem.classList.remove('hovered_element');
  elementTag.style.display = 'none';
}

export function addEventListeners() {
  const gameAreaElements = document.querySelectorAll('.assembly_line *');
  const markupElements = document.querySelectorAll('.html_markup > div *');
  const markupElementsArray = Array.prototype.slice.call(markupElements);

  for (let i = 0; i < gameAreaElements.length; i++) {
    gameAreaElements[i].addEventListener('mouseover', (e) => {
      e.stopPropagation();
      showElementTag(gameAreaElements[i]);
    });
    gameAreaElements[i].addEventListener('mouseout', (e) => {
      e.stopPropagation();
      hideElementTag(gameAreaElements[i]);
    });
  }

  for (let i = 0; i < markupElements.length; i++) {
    markupElements[i].addEventListener('mouseover', (e) => {
      e.stopPropagation();
      const index = markupElementsArray.indexOf(markupElements[i]);
      showElementTag(gameAreaElements[index]);
    });
    markupElements[i].addEventListener('mouseout', (e) => {
      e.stopPropagation();
      const index = markupElementsArray.indexOf(markupElements[i]);
      hideElementTag(gameAreaElements[index]);
    });
  }
}

export function colorCheck(elem, lvlNumber) {
  if (progress[lvlNumber] === 'solved') {
    elem.style.borderColor = 'green';
  } else if (progress[lvlNumber] === 'solved_with_help') {
    elem.style.borderColor = 'blue';
  } else {
    elem.style.borderColor = 'rgba(70, 70, 70, 0.5)';
  }
}

export function animateElementsToFind(elems) {
  const elementsToFind = document.querySelectorAll(elems);
  for (let i = 0; i < elementsToFind.length; i++) {
    elementsToFind[i].classList.add('animated_element');
  }
}

export function updateStatus() {
  const levelsList = document.querySelectorAll('.level .check');
  for (let i = 0; i < levelsList.length; i++) {
    colorCheck(levelsList[i], i);
    if (currentLevel === i) {
      levelsList[i].parentNode.classList.add('active');
    } else {
      levelsList[i].parentNode.classList.remove('active');
    }
  }
  colorCheck(headerCheck, currentLevel);
}

export function animate(elem, animation) {
  elem.classList.remove(animation);
  void elem.offsetWidth;
  elem.classList.add(animation);
}

export function gameCompleteMessage() {
  while (assemblyLine.firstChild) {
    assemblyLine.removeChild(assemblyLine.lastChild);
  }
  while (markup.firstChild) {
    markup.removeChild(markup.lastChild);
  }
  assemblyLine.append('You have solved all tasks!');
  shield.style.display = 'flex';
  reset.classList.remove('menu_click_animation');
  animate(reset, 'animated_element');
}

export function wrongAnswer() {
  animate(editor, 'wrong');
}

export function animateRoundComplete(elems) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.add('level_complete');
  }
}

export function animateText(i = 0) {
  const text = showAnswer();
  const speed = 50;
  if (i < text.length) {
    input.value += text.charAt(i);
    i++;
    setTimeout(() => animateText(i), speed);
  }
}

export function formMenu() {
  for (let i = 0; i < levels.length; i++) {
    const menuElement = document.createElement('div');
    menuElement.classList.add('level', 'flex', 'flex_row');
    const check = document.createElement('div');
    check.classList.add('check');
    const levelNumber = document.createElement('div');
    levelNumber.classList.add('level_number');
    levelNumber.innerText = i + 1;

    // eslint-disable-next-line no-loop-func
    menuElement.addEventListener('click', () => {
      currentLevel = i;
      animate(menuElement, 'menu_click_animation');
      loadLevel();
    });

    menuElement.appendChild(check);
    menuElement.appendChild(levelNumber);
    menuElement.append(`${levels[i].short}`);
    menuLevels.appendChild(menuElement);
  }
}