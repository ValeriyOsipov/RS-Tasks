import { levels } from './levels';
import { assemblyLine, editor, markup, headerCheck, menuLevels, elementTag,
attributesToString, getLevelMarkup, loadLevelVisual, prepareTag, isAnimatedParen, setTagPosition, showElementTag, hideElementTag, addEventListeners, colorCheck, animateElementsToFind, updateStatus, animate, gameCompleteMessage, animateRoundComplete, animateText, formMenu, } from './DOM-rendering';
import './style.css';

export let level;
export let currentLevel = parseInt(localStorage.currentLevel) || 0;
export const newProgress = [];
for (let i = 0; i < levels.length; i++) {
  newProgress.push('unsolved');
}
export let progress = JSON.parse(localStorage.getItem('progress')) || newProgress;

export const input = document.querySelector('.answer');
const enter = document.querySelector('.enter_button');
const help = document.querySelector('.help_button');
const asideHeader = document.querySelector('.aside_header_text');
const task = document.querySelector('.task');
const description = document.querySelector('.aside_text');
const reset = document.querySelector('.reset_button');
const next = document.querySelector('.next_wrapper');
const prev = document.querySelector('.prev_wrapper');
const shield = document.querySelector('.shield');

function isAllSolved() {
  return (progress.indexOf('unsolved') === -1);
}

export function loadLevel() {
  level = levels[currentLevel];
  localStorage.setItem('currentLevel', currentLevel);
  loadLevelVisual();
  asideHeader.childNodes[0].textContent = `Level ${currentLevel + 1} of ${levels.length}`;
  task.innerText = level.task;
  description.innerText = level.description;
  addEventListeners();
  updateStatus();
  animateElementsToFind(`.assembly_line ${level.answer}`);
  if (isAllSolved()) {
    gameCompleteMessage();
  }
}

function nextLevel() {
  input.value = '';
  if (currentLevel < levels.length - 1) {
    currentLevel += 1;
  } else { currentLevel = 0; }
  loadLevel();
}

function prevLevel() {
  input.value = '';
  currentLevel -= 1;
  loadLevel();
}

function compareCollections(col1, col2) {
  if (col1.length === col2.length) {
    for (let i = 0; i < col1.length; i++) {
      if (col1[i] !== col2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isCheater() {
  return (input.value.indexOf('.animated_element') !== -1);
}

function checkAnswer(elems) {
  const correctElements = document.querySelectorAll(`.assembly_line ${level.answer}`);
  if (compareCollections(elems, correctElements)) {
    if (progress[currentLevel] !== 'solved_with_help') {
      progress[currentLevel] = 'solved';
      localStorage.setItem('progress', JSON.stringify(progress));
    }
    animateRoundComplete(elems);
    setTimeout(nextLevel, 500);
  } else {
    wrongAnswer();
  }
}

function getAnswerFromUser() {
  const userAnswer = `.assembly_line ${input.value}`;
  try {
    return document.querySelectorAll(userAnswer);
  } catch (err) {
    return ' ';
  }
}

function pressEnter() {
  const userSelectedElements = getAnswerFromUser();
  if (isCheater()) {
    input.value = 'Cheater caught!';
    return;
  }
  checkAnswer(userSelectedElements);
}

input.addEventListener('keypress', (e) => {
  e.stopPropagation();
  if (e.key === 'Enter') {
    animate(enter, 'editor_buttons_animation');
    pressEnter();
  }
});

enter.addEventListener('click', () => {
  animate(enter, 'editor_buttons_animation');
  pressEnter();
});

function resetProgress() {
  progress = [];
  for (let i = 0; i < levels.length; i++) {
    progress.push('unsolved');
  }
  currentLevel = 0;
  localStorage.setItem('progress', JSON.stringify(progress));
  loadLevel();
}

export function showAnswer() {
  if (progress[currentLevel] !== 'solved') {
    progress[currentLevel] = 'solved_with_help';
    localStorage.setItem('progress', JSON.stringify(progress));
  }
  return level.answer;
}

reset.addEventListener('click', () => {
  animate(reset, 'menu_click_animation');
  reset.classList.remove('animated_element');
  shield.style.display = 'none';
  resetProgress();
});

help.addEventListener('click', () => {
  animate(help, 'editor_buttons_animation');
  input.value = '';
  animateText();
  updateStatus();
});

next.addEventListener('click', () => {
  if (currentLevel < levels.length - 1) {
    animate(next, 'menu_click_animation');
    nextLevel();
  }
});

prev.addEventListener('click', () => {
  if (currentLevel > 0) {
    animate(prev, 'menu_click_animation');
    prevLevel();
  }
});

formMenu();
loadLevel();
