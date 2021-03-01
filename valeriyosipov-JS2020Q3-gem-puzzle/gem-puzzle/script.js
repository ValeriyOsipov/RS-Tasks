import {Game} from './game.js';
import './style.css';

window.addEventListener('DOMContentLoaded', () => {
  Game.init();
  Game.shuffle();
  Game.showTime();
});
