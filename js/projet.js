///////////////////projet///////////////////////////
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionnez toutes les images dans le slider
  const images = document.querySelectorAll('.portfolio-details-slider img');

  // Ajoutez un gestionnaire d'événements à chaque image
  images.forEach(function(image) {
    image.addEventListener('click', function() {
      console.log('Image cliquée !');

      // Créez un élément div pour l'image agrandie
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      // Créez un élément img pour afficher l'image agrandie
      const enlargedImage = document.createElement('img');
      enlargedImage.src = this.src;
      enlargedImage.classList.add('enlarged-image');

      // Ajoutez l'image agrandie à l'overlay
      overlay.appendChild(enlargedImage);

      // Ajoutez l'overlay à la page
      document.body.appendChild(overlay);

      // Ajoutez un gestionnaire d'événements pour fermer l'image agrandie en cliquant dessus
      overlay.addEventListener('click', function() {
        console.log('Overlay cliqué !');
        document.body.removeChild(overlay);
      });
    });
  });
});




