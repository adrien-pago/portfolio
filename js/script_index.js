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

///////  Barre de Navigation   //////
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
// Gestion entre tableau de compétences et section PDF
document.getElementById('btn-pdf').addEventListener('click', function() {
 
  // Initialement, on masque la section tableau et on affiche la section pour la liste des fichiers
  document.getElementById('tableau-section').style.display = 'none';
  document.querySelector('.filter-button').style.display = 'none';
  
  // Appel AJAX pour récupérer la liste des fichiers
  fetch('/PHP/list-files.php')
      .then(response => {
          return response.json();
      })
      .then(files => {
          const fileList = document.getElementById('file-list');
          fileList.innerHTML = ''; // Nettoie la liste précédente
          files.forEach(file => {
              const filePath = '/assets/Epreuve-E5/' + file;
              const listItem = document.createElement('li');
              const link = document.createElement('a');
              link.href = filePath;
              link.textContent = file;
              link.target = '_blank'; // Pour ouvrir dans un nouvel onglet
              listItem.appendChild(link);
              fileList.appendChild(listItem);
          });
          // Affichage de la section de liste des fichiers
          document.getElementById('file-list-section').style.display = 'block';
      })
      .catch(error => console.error('Erreur lors de la récupération des fichiers:', error));
});

document.getElementById('btn-tableau').addEventListener('click', function() {

  // Masquer la section de la liste des fichiers et afficher la section tableau des compétences
  document.getElementById('file-list-section').style.display = 'none';
  document.getElementById('pdf-section').style.display = 'none';
  document.getElementById('tableau-section').style.display = 'block';
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
////// Affiche les projets en fonction de filter_bts
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
        items[k].style.display = "none";  
        if (targets == items[k].getAttribute("data-ids")) {
            items[k].style.display = "flex";  
        }
        if (targets == "all") {
            items[k].style.display = "flex";  
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










