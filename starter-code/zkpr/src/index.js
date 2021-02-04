/********** Event Listeners **********/
document
  .querySelector("#toggle-dark-mode")
  .addEventListener("click", handleToggleDarkMode);

document
  .querySelector("#animal-form")
  .addEventListener("submit", handleAnimalFormSubmit);

document
  .querySelector("#animal-list")
  .addEventListener("click", handleAnimalListClick);

/********** Event Handlers **********/
function handleToggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Create Animal
function handleAnimalFormSubmit(event) {
  // Step 0: always prevent default for form submit events
  event.preventDefault();

  // Step 1: get user input from the form input fields
  const animalObj = {
    name: event.target.name.value,
    imageUrl: event.target.image_url.value,
    description: event.target.description.value,
    donations: 0,
  };

  // TODO: create animal on the server

  // Step 2: slap it on the DOM
  renderOneAnimal(animalObj);

  // (optional) Step 3: clear the input fields
  event.target.reset();
}

function handleAnimalListClick(event) {
  if (event.target.matches(".delete-button")) {
    // Delete Animal
    const button = event.target;

    // traverse the DOM to find elements we care about, relative to the button
    const card = button.closest(".card");

    // remove the animal card
    card.remove();

    // TODO: delete animal from the server
  } else if (event.target.dataset.action === "donate") {
    // Update Animal
    const button = event.target;

    // traverse the DOM to find elements we care about, relative to the button
    const card = button.closest(".card");
    const donationCountSpan = card.querySelector(".donation-count");

    // get the donation amount from the DOM
    const donationCount = parseInt(donationCountSpan.textContent);

    // update the DOM
    donationCountSpan.textContent = donationCount + 10;

    // TODO: update animal on the server
  }
}

/********** Render Functions **********/
// takes one animal object and creates the necessary DOM elements
function renderOneAnimal(animalObj) {
  // step 1. create the outer element using createElement (& assign necessary attributes)
  const card = document.createElement("li");
  card.className = "card";

  // step 2. use innerHTML to create all of its children
  card.innerHTML = `
  <div class="image">
    <img src="${animalObj.imageUrl}" alt="${animalObj.name}">
    <button class="button delete-button" data-action="delete">X</button>
  </div>
  <div class="content">
    <h4>${animalObj.name}</h4>
    <div class="donations">
      $<span class="donation-count">${animalObj.donations}</span> Donated
    </div>
    <p class="description">${animalObj.description}</p>
  </div>
  <button class="button donate-button" data-action="donate">
    Donate $10
  </button>
  `;

  // step 3. slap it on the DOM!
  document.querySelector("#animal-list").append(card);
}

/********** Initial Render **********/
function initialize() {
  // TODO: get animals from the server
  // animalData is an array of animal objects from data.js
  animalData.forEach((animal) => {
    renderOneAnimal(animal);
  });
}

initialize();
