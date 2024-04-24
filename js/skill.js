// Gestion entre tableau de compétences et section PDF
document.getElementById('btn-pdf').addEventListener('click', function() {
 
  // Initialement, on masque la section tableau et on affiche la section pour la liste des fichiers
  document.getElementById('tableau-section').style.display = 'none';
  document.querySelector('.filter-button').style.display = 'none';
  
  // Appel AJAX pour récupérer la liste des fichiers
  fetch('/php/list-files.php')
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