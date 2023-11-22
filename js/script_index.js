// Header Fixed
window.addEventListener('scroll', function () {
  const docScrollTop = document.documentElement.scrollTop;

  if (window.innerWidth > 991) {
      if (docScrollTop > 100) {
          document.querySelector("header").classList.add("fixed")
      } else {
          document.querySelector("header").classList.remove("fixed")
      }
  }
});

///////Barre de Navigation//////
// Variable pour stocker le délai
let navbarTimeout;
let lastScrollTop = 0; // Variable pour stocker la position de défilement précédente

// Fonction pour montrer la navbar
function showNavbar() {
const navbar = document.querySelector("header");
navbar.classList.remove("hide");

// Si un délai a été défini, le supprimer
if (navbarTimeout) {
  clearTimeout(navbarTimeout);
}
}

// Fonction pour cacher la navbar
function hideNavbar() {
const navbar = document.querySelector("header");

// Si un délai a été défini, le supprimer
if (navbarTimeout) {
  clearTimeout(navbarTimeout);
}

// Définir un nouveau délai pour cacher la navbar
navbarTimeout = setTimeout(() => {
  navbar.classList.add("hide");
}, 10000); // 2000 ms = 2 sec
}

// Ecouter l'événement de défilement de la page
window.addEventListener("scroll", () => {
const docScrollTop = document.documentElement.scrollTop;

// Afficher la navbar si on a défilé de plus de 50px rapidement (en haut ou en bas)
if (Math.abs(lastScrollTop - docScrollTop) > 40) {
  showNavbar();
} else {
  // Cacher la navbar si on n'a pas défilé rapidement
  hideNavbar();
}

// Mettre à jour la position de défilement précédente
lastScrollTop = docScrollTop;
});

// Ecouter l'événement de chargement de la page
window.addEventListener("load", () => {
const mouseY = window.scrollY;

// Ajouter la classe 'hide' à la navbar lors du chargement de la page
document.querySelector("header").classList.add("hide");

// Afficher la navbar si la souris est tout en haut de la page
if (mouseY < 100) {
  showNavbar();
} else {
  // Cacher la navbar si la souris n'est pas tout en haut de la page
  hideNavbar();
}
});




////////////////////////////////////////////////

// Animation page home
const titreSpans = document.querySelectorAll('h1 span');
const btns = document.querySelectorAll('.navbar');
const medias = document.querySelectorAll('.bulle');
const cv = document.querySelector(".cv-btn");
const logo = document.querySelector(".logo");


window.addEventListener('load', () => {

  const TL = gsap.timeline({paused: true});

  TL
  .staggerFrom(titreSpans, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3)
  .staggerFrom(btns, 1, {opacity: 0, ease: "power2.out"}, 0.3, '-=1')
  .staggerFrom(medias, 1, {right: -200, ease: "power2.out"}, 0.3, '-=1')
  .staggerFrom(cv, 1, {opacity: 0, ease: "power2.out"}, 0.3, '-=1')
  .staggerFrom(logo, 1, {opacity: 0, ease: "power2.out"}, 0.3, '-=1');

  TL.play();
})

///////////////SKILL////////////////////
// gestion entre tableauy Skill ET PDF
document.getElementById('btn-pdf').addEventListener('click', function() {
  document.getElementById('pdf-section').classList.add('show');
  document.getElementById('tableau-section').classList.remove('show');
  document.querySelector('.filter-button').style.display = 'none'; 
});

document.getElementById('btn-tableau').addEventListener('click', function() {
  document.getElementById('pdf-section').classList.remove('show');
  document.getElementById('tableau-section').classList.add('show');
  document.querySelector('.filter-button').style.display = 'block'; 
});

//Animation Tableau SKill
// Récupération de la liste des éléments de la liste de filtre
var filterBtns = document.querySelectorAll('#filter-btn li');

// Récupération de toutes les lignes du tableau
var tableRows = document.querySelectorAll('.tableau-skill tbody tr');

// Parcours des boutons de filtre
for (var i = 0; i < filterBtns.length; i++) {
filterBtns[i].addEventListener('click', function() {
  // Suppression de l'attribut "active" de tous les boutons de filtre
  for (var j = 0; j < filterBtns.length; j++) {
    filterBtns[j].classList.remove('active');
  }
  // Ajout de l'attribut "active" sur le bouton de filtre cliqué
  this.classList.add('active');
  
  // Récupération de l'identifiant de l'élément cible (tous ou une compétence spécifique)
  var target = this.getAttribute('data-target');
  
  // Parcours des lignes du tableau pour cacher ou afficher en fonction de l'élément cible
  for (var k = 0; k < tableRows.length; k++) {
    if (target === 'all' || tableRows[k].getAttribute('data-id') === target) {
      tableRows[k].style.display = '';
    } else {
      tableRows[k].style.display = 'none';
    }
  }
});
}


///////////////////projet///////////////////////////
//Affiche les projets en fonction de filter_bts
const filterButtons = document.querySelector("#filter-btns").children;
const items = document.querySelector(".portfolio-gallery").children;

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
      for (let j = 0; j < filterButtons.length; j++) {
          filterButtons[i].classList.remove("active")
      }
      this.classList.add("active");
      const targets = this.getAttribute("data-targets")
      for (let k = 0; k < items.length; k++) {
        items[k].style.display = "none";  // Modifiez cette ligne
        if (targets == items[k].getAttribute("data-ids")) {
            items[k].style.display = "flex";  // Modifiez cette ligne
        }
        if (targets == "all") {
            items[k].style.display = "flex";  // Modifiez cette ligne
        }
      }    
  })
}

//fonction aggrandir image
function agrandirImage() {
  this.style.transform = "scale(1.2)";
  this.style.zIndex = "1";
  this.style.cursor = "pointer";
}
//Fonction reduire image
function retrecirImage() {
  this.style.transform = "scale(1)";
  this.style.zIndex = "0";
  this.style.cursor = "default";
}

//utiliser les fonctions agrandir et réduire
let images = document.querySelectorAll(".inner");

for (let i = 0; i < images.length; i++) {
images[i].addEventListener("mouseover", agrandirImage);
images[i].addEventListener("mouseout", retrecirImage);
}
  
//Ouverture d'une page HTML d'un projet avec le clic sur une image
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", (event) => {
    const page = event.target.getAttribute("data-page");
    window.location.href = page;
  });
}


//  MENU BURGER
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('#filter-btns').style.display = 
    document.querySelector('#filter-btns').style.display === 'none' ? 'flex' : 'none';
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 576) {
    document.querySelector('#filter-btns').style.display = 'flex';
    document.querySelector('.hamburger').style.display = 'none';
  } else {
    document.querySelector('.hamburger').style.display = 'block';
  }
});


//veille technologique //
fetch('/PHP/news.php')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('news-container');
        data.items.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p><a href="${item.link}" target="_blank">Read more</a>`;
            newsContainer.appendChild(newsItem);
        });
    });

// image code php pour explication de la veille technologique //
document.addEventListener('DOMContentLoaded', (event) => {
document.getElementById('showImageBtn').onclick = function() {
  console.log("Bouton cliqué"); //debug
  document.getElementById('imagePopup').style.display = 'block';
}

document.getElementById('closeBtn').onclick = function() {
    document.getElementById('imagePopup').style.display = 'none';
}
}) 



//C3PO ////////////

// Sélectionnez le lien "C3PO" dans la navbar
const c3poLink = document.querySelector('a[href="#C3PO"]');
const chatbotButton = document.getElementById("chatbotButton");

// Lorsque vous cliquez sur le lien "C3PO", affichez l'image de C3PO
c3poLink.addEventListener('click', function(event) {
    event.preventDefault();  // Empêche le comportement par défaut du lien

    // Affichez l'image de C3PO
    chatbotButton.style.display = "block";

    // Cachez l'image après 10 secondes si le chatbot n'est pas ouvert
    setTimeout(function() {
        if(chatbotDialog.style.display !== "block") {
            chatbotButton.style.display = "none";
        }
    }, 10000);  // 10000 millisecondes = 10 secondes
});

// Lorsque vous cliquez sur l'image de C3PO, affichez le dialogue
chatbotButton.addEventListener('click', function() {
    chatbotDialog.style.display = "block";
    chatbotButton.style.display = "none"; // Cachez l'image lorsque le dialogue est ouvert
});



const chatbotDialog = document.getElementById("chatbotDialog");
const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const sendMessageButton = document.getElementById("sendMessageButton");
const closeButton = document.getElementById("closeButton"); // Ajoutez ceci

// Quand l'utilisateur clique sur le bouton du chatbot
chatbotButton.addEventListener("click", () => {
  chatbotDialog.style.display = "block";
  chatContainer.innerHTML = ""; // Videz le contenu de chatContainer à chaque nouvelle ouverture de dialogue
});


// Quand l'utilisateur envoie un message
sendMessageButton.addEventListener("click", () => {
  const userMessage = userInput.value;
  addUserMessage(userMessage);
  sendMessageToChatbot(userMessage);
  userInput.value = "";
});

// Fonction pour ajouter un message de l'utilisateur à la boîte de dialogue
function addUserMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<span style="color: blue;">Vous</span> : ${message}`;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Fonction pour envoyer le message au chatbot
function sendMessageToChatbot(message) {
  fetch("/PHP/API_Key.php", {  // le chemin vers le fichier PHP qui contient la Khey
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          model: "gpt-3.5-turbo", // Ajoutez le modèle ici
          messages: [{ role: "user", content: message }]
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data && data.choices && data.choices.length > 0) {
          const botMessage = data.choices[0].message.content;
          addBotMessage(botMessage);
      } else {
          console.log("Réponse de l'API invalide.");
      }
  });  
}

// Quand l'utilisateur clique sur le bouton de fermeture
closeButton.addEventListener("click", () => {
  chatbotDialog.style.display = "none";
});

// Fonction pour ajouter la réponse du chatbot à la boîte de dialogue
function addBotMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<span style="color: green;">C3PO</span> : ${message}`;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}






