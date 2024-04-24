///////////////////projet///////////////////////////
// Affiche les projets en fonction des filtres sélectionnés
const filterButtons = document.querySelector("#filter-btns").children;
const items = document.querySelector(".portfolio-gallery").children;

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    // Supprime la classe active de tous les boutons de filtre
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    this.classList.add("active"); // Ajoute la classe active au bouton de filtre sélectionné
    const targets = this.getAttribute("data-targets").split(" "); // Sépare les catégories cibles en une liste

    // Parcours tous les éléments et les affiche ou les masque en fonction des catégories cibles
    for (let k = 0; k < items.length; k++) {
      items[k].style.display = "none";
      const projectCategories = items[k].getAttribute("data-ids").split(" "); // Récupère les catégories du projet en cours
      // Vérifie si le projet correspond à au moins l'une des catégories cibles ou si "all" est sélectionné
      if (targets.includes("all") || targets.some(target => projectCategories.includes(target))) {
        items[k].style.display = "flex";
      }
    }
  });
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


