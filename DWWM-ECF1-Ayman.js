const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const musicBars = document.getElementById('musicBars');


      // Toggle play/pause when the button is clicked
      playButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
          audioPlayer.play();
          playButton.textContent = "⬛"; // Change button text to "Pause"
        } else {
          audioPlayer.pause();
          playButton.textContent = "▶"; // Change button text to "Play"
        }
      });


// Ajouter un écouteur d'événement au bouton
playButton.addEventListener('click', () => {
  // Si les barres sont cachées, on les affiche et démarre l'animation
  if (musicBars.style.display === 'none' || musicBars.style.display === '') {
    musicBars.style.display = 'flex';
    playButton.textContent = '⏸'; // Change le texte du bouton pour pause
  } else {
    // Sinon, on les cache pour arrêter l'animation
    musicBars.style.display = 'none';
    playButton.textContent = '▶'; // Change le texte pour lecture
  }
});



      // Récupérer le conteneur pour les concerts
const concertsContainer = document.getElementById('concertsContainer');

// Fonction pour afficher les concerts
function displayConcerts(concertsToDisplay) {
  concertsContainer.innerHTML = ''; // Vider le conteneur avant de réafficher les concerts

  concertsToDisplay.forEach(concert => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (concert.ticketsSold >= 990) {
      card.classList.add('sold-out');
    }

    // Création du contenu de la carte
    card.innerHTML = `
      <img src="${concert.image}" alt="${concert.artist}">
      <div class="card-body">
        <h3>${concert.artist}</h3>
        <p>${concert.description}</p>
        <strong><p>${concert.price} euros</p><strong>
        <strong>${concert.ticketsSold} / 1000 places</strong>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${(concert.ticketsSold / 1000) * 100}%;"></div>
          <div class="progress-text">${Math.floor((concert.ticketsSold / 1000) * 100)}%</div>
        </div>
      </div>
      <div class="card-footer">
        ${concert.ticketsSold >= 990 ? '<span class="sold-out">Sold Out</span>' : `<button class="buy-btn">Acheter</button>`}
      </div>
    `;

    // Ajouter la carte au conteneur
    concertsContainer.appendChild(card);
  });
}

// Filtrer les concerts par date
function filterConcertsByDate(date) {
  if (date === 'all') {
    // Si "Toutes les dates" est sélectionné, afficher tous les concerts
    displayConcerts(concerts);
  } else {
    // Sinon, filtrer par la date choisie
    const filteredConcerts = concerts.filter(concert => concert.date === date);
    displayConcerts(filteredConcerts);
  }
}

// Charger les concerts à partir du fichier JSON
function loadConcertsData() {
  fetch('./data.json') // Assurez-vous que le fichier data.json est à la racine de votre projet ou ajustez le chemin
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
      concerts = data; // Affecter les concerts à la variable concerts
      displayConcerts(concerts); // Afficher les concerts
    })
    .catch(error => {
      console.error('Erreur lors du chargement du fichier JSON:', error);
    });
}

// Initialiser l'affichage avec tous les concerts au chargement
window.onload = () => {
  // Charger les concerts depuis le fichier JSON
  loadConcertsData();

  // Filtrage des concerts en fonction de la date sélectionnée
  const dateFilter = document.getElementById('dateFilter');
  dateFilter.addEventListener('change', (event) => {
    filterConcertsByDate(event.target.value); // Filtrer selon la date choisie
  });
};

// Sélectionner les éléments du DOM
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

// Ajouter un événement au clic du menu burger
burgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('show'); // Afficher ou cacher les liens
});

// Réinitialiser le menu burger lorsque la page se charge
window.addEventListener('load', () => {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.remove('show'); // Supprimer la classe 'show' pour fermer le menu
});

      