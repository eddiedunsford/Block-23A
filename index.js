const form = document.querySelector(`form`);
const main = document.querySelector('main');

// Fetch all players from the API
const getAllPlayers = async () => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players`
    );
    const responseJson = await response.json();
    console.log(responseJson);
    const allPlayers = responseJson.data.players; // 
    return allPlayers;
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};

// Render all players
const renderAllPlayers = async () => {
  const playerList = await getAllPlayers();

  // Create an li for each player
  const playerNameLIs = playerList.map((singlePlayer) => {
    return `<li>${singlePlayer.name} (ID: ${singlePlayer.id})</li>`;
  });

  // Create an ol element and add the player list items
  const ol = document.createElement(`ol`);
  ol.innerHTML = playerNameLIs.join(``);

  main.replaceChildren(ol);

  // Add event listeners to each li element for clicks
  const LIs = document.querySelectorAll(`li`);

  LIs.forEach((singlePlayerLI) => {
    singlePlayerLI.addEventListener(`click`, async (event) => {
      const playerId = event.target.innerText.split('ID: ')[1];
      renderSinglePlayer(playerId);
    });
  });
};

// Render single player details
const renderSinglePlayer = async (playerId) => {
  try {
    // Fetch the player details by ID
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players/${playerId}`
    );
    const playerDetailsJson = await response.json();
    const playerDetails = playerDetailsJson.data.player; //

    // Rewrite the main's innerHTML to show the player's name and other details
    main.innerHTML = `
      <h2>${playerDetails.name}</h2>
      <img src="${playerDetails.imageUrl}" alt="${playerDetails.name}">
      <p>Breed: ${playerDetails.breed}</p>
      <p>Team: ${playerDetails.team.name}</p>
      <button>Back</button>
    `;

    // Add event listener to the back button
    const button = document.querySelector(`button`);
    button.addEventListener(`click`, () => {
      renderAllPlayers();
    });
  } catch (error) {
    console.error('Error fetching player details:', error);
  }
};

// Initialize the app by rendering all players
renderAllPlayers();


