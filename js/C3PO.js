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
