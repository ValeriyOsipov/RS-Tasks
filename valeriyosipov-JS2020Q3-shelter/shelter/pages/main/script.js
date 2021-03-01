let isShown = false;
burger.onclick = function() {
    if (!isShown) {
        burger.classList.add("animateOpen");
        burger.classList.remove("animateClose");
        shade.classList.add("animateOpen");
        shade.classList.remove("animateClose");
        isShown = true;
        vertMenu.onclick = null;
        document.body.style.overflow = "hidden";
    } else {
        burger.classList.add("animateClose");
        burger.classList.remove("animateOpen");
        shade.classList.add("animateClose");
        shade.classList.remove("animateOpen");
        isShown = false;
        document.body.style.overflow = "auto";
    }
}

shade.onclick = function(wrap) {
    if (wrap.target === this) {
        burger.classList.add("animateClose");
        burger.classList.remove("animateOpen");
        shade.classList.add("animateClose");
        shade.classList.remove("animateOpen");
        isShown = false;
        document.body.style.overflow = "auto";
    }
}

const pets = [
    {
      "name": "Jennifer",
      "img": "../../assets/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "../../assets/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "../../assets/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "../../assets/pets-scarlett.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "../../assets/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "../../assets/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "../../assets/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "../../assets/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
]

function getRandomPet(a) {
    return Math.floor(Math.random() * a.length );
}
let arr = [0, 1, 2, 3, 4, 5, 6, 7];
//let arr2 = [0, 2, 4];
let arr2 = [];
function formSlide() {
    let slideElements = document.getElementsByClassName("card");
    let randomPet = 0;
    arr = arr.filter(elem => !arr2.includes(elem));
    arr2 = [];
    for (let i = 0; i < slideElements.length; i++) {
        let slideElem = slideElements[i];
        randomPet = arr[getRandomPet(arr)];
        arr2.push(arr[arr.indexOf(randomPet)]);
        arr.splice(arr.indexOf(randomPet), 1);
        slideElem.childNodes[1].src = pets[randomPet].img;
        slideElem.childNodes[1].alt = pets[randomPet].name;
        slideElem.childNodes[3].innerHTML = pets[randomPet].name;
    }
    arr = [0, 1, 2, 3, 4, 5, 6, 7];
}
next.onclick = function() {
    cardsGrid.classList.remove("slideForward");
    cardsGrid.classList.remove("slideBackward");
    void cardsGrid.offsetWidth;
    cardsGrid.classList.add("slideForward");
    setTimeout(formSlide, 1000);
}
prev.onclick = function() {
    cardsGrid.classList.remove("slideBackward");
    cardsGrid.classList.remove("slideForward");
    void cardsGrid.offsetWidth;
    cardsGrid.classList.add("slideBackward");
    setTimeout(formSlide, 1000);
}

popupWrap.onclick = function(wrap) {
    if (wrap.target === this) {
        document.getElementById("popupWrap").style.display = "none";
        document.body.style.overflow = "auto";
    }
}

closeButton.onclick = function() {
    document.getElementById("popupWrap").style.display = "none";
    document.body.style.overflow = "auto";
}

/*let petButtons = document.getElementsByClassName("petsCardButton");
function openCard() {
    let pet = document.activeElement.previousElementSibling.innerHTML;
    let petId = pets.indexOf(pets.find(p => p.name === pet));
    document.getElementById("popupImg").src = pets[petId].img;
    document.getElementById("popupImg").alt = pets[petId].name;
    document.getElementById("name").innerHTML = pets[petId].name;
    document.getElementById("type").innerHTML = pets[petId].type + " - " + pets[petId].breed;
    document.getElementById("descr").innerHTML = pets[petId].description;
    document.getElementById("age").innerHTML = "<p><b>Age: </b>" + pets[petId].age + "</p>";
    document.getElementById("inoculations").innerHTML = "<p><b>Inoculations: </b>" + pets[petId].inoculations.join(", ") + "</p>";
    document.getElementById("diseases").innerHTML = "<p><b>Diseases: </b>" + pets[petId].diseases.join(", ") + "</p>";
    document.getElementById("parasites").innerHTML = "<p><b>Parasites: </b>" + pets[petId].parasites.join(", ") + "</p>";

    document.getElementById("popupWrap").style.display = "flex";
}
for (let i = 0; i < petButtons.length; i++) {
    let btn = petButtons[i]; 
    btn.addEventListener("click", (e) => openCard());
};*/

let petCards = document.getElementsByClassName("card");
let pet = "";
function openCard(e) {
  if (e.target.className.includes("card ")) {
    pet = e.target.childNodes[3].innerHTML;
  } else {
    pet = e.target.parentNode.childNodes[3].innerHTML;
  }
  let petId = pets.indexOf(pets.find(p => p.name === pet));
  document.getElementById("popupImg").src = pets[petId].img;
  document.getElementById("popupImg").alt = pets[petId].name;
  document.getElementById("name").innerHTML = pets[petId].name;
  document.getElementById("type").innerHTML = pets[petId].type + " - " + pets[petId].breed;
  document.getElementById("descr").innerHTML = pets[petId].description;
  document.getElementById("age").innerHTML = "<p><b>Age: </b>" + pets[petId].age + "</p>";
  document.getElementById("inoculations").innerHTML = "<p><b>Inoculations: </b>" + pets[petId].inoculations.join(", ") + "</p>";
  document.getElementById("diseases").innerHTML = "<p><b>Diseases: </b>" + pets[petId].diseases.join(", ") + "</p>";
  document.getElementById("parasites").innerHTML = "<p><b>Parasites: </b>" + pets[petId].parasites.join(", ") + "</p>";

  document.getElementById("popupWrap").style.display = "flex";
  document.body.style.overflow = "hidden";
}
for (let i = 0; i < petCards.length; i++) {
    let btn = petCards[i]; 
    btn.addEventListener("click", (e) => openCard(e));
};

formSlide();