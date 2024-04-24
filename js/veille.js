 //veille technologique //
  fetch('/php/news.php')
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