const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    stt: false,
    sound: true,
    lang: 0
  },

  keyLayout: {
    keyLayout: [
      "done", ["`", "~", "ё", "Ё", "Backquote"], ["1", "!", "1", "!", "Digit1"], ["2", "@", "2", '"', "Digit2"], ["3", "#", "3", "№", "Digit3"], ["4", "$", "4", ";", "Digit4"], ["5", "%", "5", "%", "Digit5"], ["6", "^", "6", ":", "Digit6"], ["7", "&", "7", "?", "Digit7"], ["8", "*", "8", "*", "Digit8"], ["9", "(", "9", "(", "Digit9"], ["0", ")", "0", ")", "Digit0"], "backspace",
      ["q", "Q", "й", "Й", "KeyQ"], ["w", "W", "ц", "Ц", "KeyW"], ["e", "E", "у", "У", "KeyE"], ["r", "R", "к", "К", "KeyR"], ["t", "T", "е", "Е", "KeyT"], ["y", "Y", "н", "Н", "KeyY"], ["u", "U", "г", "Г", "KeyU"], ["i", "I", "ш", "Ш", "KeyI"], ["o", "O", "щ", "Щ", "KeyO"], ["p", "P", "з", "З", "KeyP"], ["[", "{", "х", "Х", "BracketLeft"], ["]", "}", "ъ", "Ъ", "BracketRight"], ["\\", "|", "\\", "/", "Backslash"],
      "caps", ["a", "A", "ф", "Ф", "KeyA"], ["s", "S", "ы", "Ы", "KeyS"], ["d", "D", "в", "В", "KeyD"], ["f", "F", "а", "А", "KeyF"], ["g", "G", "п", "П", "KeyG"], ["h", "H", "р", "Р", "KeyH"], ["j", "J", "о", "О", "KeyJ"], ["k", "K", "л", "Л", "KeyK"], ["l", "L", "д", "Д", "KeyL"], [";", ":", "ж", "Ж", "Semicolon"], ["'", '"', "э", "Э", "Quote"], "sound",
      "shift", ["z", "Z", "я", "Я", "KeyZ"], ["x", "X", "ч", "Ч", "KeyX"], ["c", "C", "с", "С", "KeyC"], ["v", "V", "м", "М", "KeyV"], ["b", "B", "и", "И", "KeyB"], ["n", "N", "т", "Т", "KeyN"], ["m", "M", "ь", "Ь", "KeyM"], [",", "<", "б", "Б", "Comma"], [".", ">", "ю", "Ю", "Period"], ["/", "?", ".", ",", "Slash"], "enter",
      "en/ru", "StT", "space", "left", "right"
    ]
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    this.keyLayout.keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      let insertBr = false;
      if (key === "backspace" || key === "enter" || key[0] === "\\" || key === "sound") {
        insertBr = true;
      }
      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide", "Backspace");
          keyElement.innerHTML = createIconHTML("backspace");
      
          keyElement.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            const cursor = document.querySelector("textarea").selectionStart;
            if (document.querySelector("textarea").selectionStart === document.querySelector("textarea").selectionEnd && document.querySelector("textarea").selectionStart !== 0) {
              this.properties.value = this.properties.value.substring(0, document.querySelector("textarea").selectionStart - 1) + this.properties.value.substring(document.querySelector("textarea").selectionStart, document.querySelector("textarea").textLength);
              this._triggerEvent("oninput", cursor - 1);
            } else {
              this.properties.value = this.properties.value.substring(0, document.querySelector("textarea").selectionStart) + this.properties.value.substring(document.querySelector("textarea").selectionEnd, document.querySelector("textarea").textLength);
              this._triggerEvent("oninput", cursor);
            }
            this._playSound("Backspace");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "CapsLock");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggle("capsLock");
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            this._playSound("CapsLock");
            document.querySelector("textarea").focus();
          });

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "ShiftLeft", "ShiftRight");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

          keyElement.addEventListener("click", () => {
            this._toggle("shift");
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            this._playSound("Shift");
            document.querySelector("textarea").focus();
          });

          break;  

        case "enter":
          keyElement.classList.add("keyboard__key--wide", "Enter");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            const cursor = document.querySelector("textarea").selectionStart;
            this.properties.value = this.properties.value.slice(0, document.querySelector("textarea").selectionStart) + "\n" + this.properties.value.slice(document.querySelector("textarea").selectionEnd, document.querySelector("textarea").textLength);;
            this._triggerEvent("oninput", cursor + 1);
            this._playSound("Enter");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide", "Space");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            const cursor = document.querySelector("textarea").selectionStart;
            this.properties.value = this.properties.value.slice(0, document.querySelector("textarea").selectionStart) + " " + this.properties.value.slice(document.querySelector("textarea").selectionEnd, document.querySelector("textarea").textLength);;
            this._triggerEvent("oninput", cursor + 1);
            this._playSound("general");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._playSound("general");
            this._triggerEvent("onclose");
          });

          break;

        case "StT":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "stt");
          keyElement.innerHTML = createIconHTML("keyboard_voice");

          keyElement.addEventListener("click", () => {
            this._toggleStT();
            keyElement.classList.toggle("keyboard__key--active", this.properties.stt);
            this._playSound("general");
            document.querySelector("textarea").focus();
          });

          break; 

        case "sound":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "keyboard__key--active", "sound");
          keyElement.innerHTML = createIconHTML("volume_up");

          keyElement.addEventListener("click", () => {
            this.properties.sound = !this.properties.sound;
            keyElement.classList.toggle("keyboard__key--active", this.properties.sound);
            this._playSound("general");
            document.querySelector("textarea").focus();
          });

          break; 

        case "en/ru":
          keyElement.classList.add("keyboard__key--wide", "lang");
          keyElement.innerHTML = "<b><u>en</u></b>/ru";

          keyElement.addEventListener("click", () => {
            this._swapLanguage();
            this._playSound("general");
            document.querySelector("textarea").focus();
          });

          break;

        case "left":
          keyElement.classList.add("keyboard__key--wide", "left", "ArrowLeft");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

          keyElement.addEventListener("click", () => {
            this._toLeft();
            this._playSound("general");
            document.querySelector("textarea").focus();
          });

          break; 

        case "right":
          keyElement.classList.add("keyboard__key--wide", "right", "ArrowRight");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            this._toRight();
            this._playSound("general");
            document.querySelector("textarea").focus();
          });

          break; 

        default:
          keyElement.classList.add("changeable", key[4]);
          keyElement.textContent = key[0];

          keyElement.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            const cursor = document.querySelector("textarea").selectionStart;
            if (this.properties.capsLock) {
              if (this.properties.shift) {
                this.properties.value = this.properties.value.slice(0, document.querySelector("textarea").selectionStart) + key[0 + this.properties.lang] + this.properties.value.slice(document.querySelector("textarea").selectionEnd, document.querySelector("textarea").textLength);
                this._toggle("shift");
                document.querySelector(".ShiftLeft").classList.remove("keyboard__key--active");
              } else {
                this.properties.value = this.properties.value.slice(0, document.querySelector("textarea").selectionStart) + key[1 + this.properties.lang] + this.properties.value.slice(document.querySelector("textarea").selectionEnd, document.querySelector("textarea").textLength);
              }
            } else {
                if (this.properties.shift) {
                this.properties.value = this.properties.value.slice(0, document.querySelector("textarea").selectionStart) + key[1 + this.properties.lang] + this.properties.value.slice(document.querySelector("textarea").selectionEnd, document.querySelector("textarea").textLength);
                this._toggle("shift");
                document.querySelector(".ShiftLeft").classList.remove("keyboard__key--active");
              } else {
                this.properties.value = this.properties.value.slice(0, document.querySelector("textarea").selectionStart) + key[0 + this.properties.lang] + this.properties.value.slice(document.querySelector("textarea").selectionEnd, document.querySelector("textarea").textLength);
              }
            }
            this._triggerEvent("oninput", cursor + 1);
            this._playSound("general");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertBr) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName, cursor = 0) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
      document.querySelector("textarea").selectionStart = cursor;
      document.querySelector("textarea").selectionEnd = document.querySelector("textarea").selectionStart;
    }
  },

  _resetKeys() {
    const keyArr = this.keyLayout.keyLayout.filter(elem => elem instanceof Array);
    let i = 0;
    for (const key of document.querySelectorAll(".changeable")) {
      key.textContent = (this.properties.capsLock ^ this.properties.shift) ? keyArr[i][1 + this.properties.lang] : keyArr[i][0 + this.properties.lang];
      i++;
    }
  },

  _toggle(elem) {
    if (elem == "capsLock") {
      this.properties.capsLock = !this.properties.capsLock;
    } else {
      this.properties.shift = !this.properties.shift;
    }
    this._resetKeys();
  },

  _swapLanguage() {
    let language = this.properties.lang;
    if (language === 0) {
      this.properties.lang = 2;
      document.querySelector(".lang").innerHTML = "en/<b><u>ru</u></b>";
    } else {
      this.properties.lang = 0;
      document.querySelector(".lang").innerHTML = "<b><u>en</u></b>/ru";
    }
    this._resetKeys();
  },

  _toRight() {
    const text = document.querySelector("textarea");
    if (text.selectionStart <= text.textLength) {
      text.selectionStart = text.selectionStart + 1;
      text.selectionEnd = text.selectionStart;
    }
  },

  _toLeft() {
    const text = document.querySelector("textarea");
    if (text.selectionStart > 0) {
      text.selectionStart = text.selectionStart - 1;
      text.selectionEnd = text.selectionStart;
    }
  },

  _playSound(e) {
    if (!this.properties.sound) 
      {return;}
    let audio = document.querySelector(".audio" + this.properties.lang);
    if (e !== "general") {
      audio = document.querySelector(".audio" + e);
    }
    audio.currentTime = 0;
    audio.play();
  },

  _toggleStT() {
    this.properties.stt = !this.properties.stt;
    if (this.properties.lang === 0) {
      recognition.lang = "en-US";
    } else {
      recognition.lang = "ru";
    }
    if (this.properties.stt) {
      recognition.start();
    } else {
      recognition.stop();
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
  document.querySelector("textarea").focus();
});

document.addEventListener ('keydown', function (event){
  let caps = document.querySelector(".CapsLock");
  let shift = document.querySelector(".ShiftLeft");
  let currentKey = document.querySelector("." + event.code);
  if (event.keyCode === 20) {
    if (event.getModifierState("CapsLock") && !caps.classList.contains("keyboard__key--active")) {
      Keyboard._toggle("capsLock");
      caps.classList.add("keyboard__key--active");
    } else if (!event.getModifierState("CapsLock") && caps.classList.contains("keyboard__key--active")) {
      Keyboard._toggle("capsLock");
      caps.classList.remove("keyboard__key--active");
    }
  }
  if (event.keyCode === 16) {
    if (event.getModifierState("Shift") && !shift.classList.contains("keyboard__key--active")) {
      Keyboard._toggle("shift");
      shift.classList.add("keyboard__key--active");
    } else if (event.getModifierState("Shift") && shift.classList.contains("keyboard__key--active")) {
      Keyboard._toggle("shift");
      shift.classList.remove("keyboard__key--active");
    }
  }
  if (currentKey !== null) {
    if (Keyboard.properties.shift && event.keyCode !== 16) {
      Keyboard._toggle("shift");
      shift.classList.remove("keyboard__key--active");
    }
    currentKey.classList.remove("animate");
    void currentKey.offsetWidth;
    currentKey.classList.add("animate");
  }
  
});

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interimResults = false;

recognition.addEventListener("result", e => {
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
  document.querySelector("textarea").value = document.querySelector("textarea").value + transcript + "\n";
});
recognition.addEventListener("end", e => {
  if (Keyboard.properties.stt) {
    recognition.start();
  }
});