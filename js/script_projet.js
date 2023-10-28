function toggleTransparencyOnMouseEnter(enteredImg) {
  var images = document.querySelectorAll(".image img");
  for (var i = 0; i < images.length; i++) {
    if (images[i] !== enteredImg) {
      images[i].classList.add("transparent");
    }
  }
}

function toggleTransparencyOnMouseLeave(enteredImg) {
  var images = document.querySelectorAll(".image img");
  for (var i = 0; i < images.length; i++) {
    if (images[i] !== enteredImg) {
      images[i].classList.remove("transparent");
    }
  }
}
  