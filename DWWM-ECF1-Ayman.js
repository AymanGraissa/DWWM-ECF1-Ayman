const audioPlayer = document.getElementById("audioPlayer");
      const playButton = document.getElementById("playButton");

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


      fetch("DWWM-ECF1-Ayman.json")
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById("concerts-container");
        const maxCapacity = 1000; // Capacité maximale des concerts

        data.forEach((concert) => {
          // Calculer le pourcentage de places vendues
          const percentageSold = (
            (concert.ticketsSold / maxCapacity) *
            100
          ).toFixed(1);

          // Créer l'élément card
          const card = document.createElement("div");
          card.classList.add("card");

          // Créer le contenu de la card
          card.innerHTML = `
      <h3>${concert.artist}</h3>
      <p class="description">${concert.description}</p>
      <p class="price">Prix : ${concert.price}€</p>
      <p class="date">Date : ${concert.date}</p>
      <p class="horaire">Horaire : ${concert.time}</p>/* 
      <p>Places vendues : ${concert.ticketsSold} ()</p> */

      <h4>Places vendues</h4>

      <div class="progress-bar">
        <div class="progress"
             style="width:${percentageSold}%; 
                    background-color: ${
                      percentageSold > 90 ? "#FF0000" : ""
                    };">
          <span>${percentageSold}%</span>
        </div>
      </div>
    `;

          // Ajouter la card au container
          container.appendChild(card);
        });
      });
      