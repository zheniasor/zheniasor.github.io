function renderPlayers(players) {
    const playersContainer = document.getElementById("players");
    playersContainer.innerHTML = "";
    players.forEach((player, index) => {
      const playerDiv = document.createElement("div");
      playerDiv.className = "player";
      playerDiv.innerHTML = `<h3>Игрок ${index + 1}</h3>`;
      const numbersDiv = document.createElement("div");
      numbersDiv.className = "numbers";
      player.numbers.forEach((number) => {
        const numberDiv = document.createElement("div");
        numberDiv.className = "number";
        numberDiv.textContent = number;
        numbersDiv.appendChild(numberDiv);
      });
      playerDiv.appendChild(numbersDiv);
      playersContainer.appendChild(playerDiv);
    });
  }