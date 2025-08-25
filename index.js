const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2506-FTB-CT-WEB-PT"; // COHORT ID didn't work in class example - COHORT

const API = `${BASE_URL}/${COHORT}`;

console.log(API);

// ======== STATE =========

let parties = [];

// Get all the parties
// FETCH API start a request to our server
// await response.json() - turns the body into a real JS object

// ======== API CALLS ================

async function getParties() {
  try {
    const response = await fetch(`${API}/events`);
    const result = await response.json();
    parties = result.data ?? [];
  } catch (error) {
    console.error("There was an error /GET events", error);
    parties = [];
  }
}

async function getSingleParty(id) {
  try {
    const response = await fetch(`${API}/events/{id}`); // need to put id to pull single item
    const singleParty = await response.json();
    return singleParty.data;
  } catch (error) {
    console.error("There was an error /GET party", error);
  }
}

// ========== COMPONENTS =============

function PartyCard(party) {
  const $card = document.createElement("div");
  $card.classList.add("party"); // default CSS styles

  $card.innerHTML = `
      <h2>${party.name} #${party.id}</h2>
    <p>${party.date}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>
    `;

  // add click event
  $card.addEventListener("click", () => {

    // remove "active" from all cards
    document.querySelectorAll(".party").forEach((card) => {
      card.classList.remove("active");
    });

    $card.classList.add("active");
    getPartyDetails(party);
  });
  return $card;
}

function PartyCollection() {
  const $collection = document.createElement("div");
  $collection.classList.add("parties");
  const $parties = parties.map(PartyCard);
  $collection.replaceChildren(...$parties); // spread operator ...
  return $collection;
}

function getPartyDetails(party) {
  const $details = document.querySelector("#partyDetails");
  if (!$details) return; // safety check

  $details.innerHTML = `
    <h2>${party.name}</h2>
    <p>Date:${party.date}</p>
    <p>Location:${party.location}</p>
    <h3>Description</h3>
    <p>${party.description}</p>
  `;
}

// getParties();
// getSingleParty();
// getPartyDetails();

// =========== RENDER ============

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <div class="container">
      <div class="parties">
        <h2>Upcoming Parties</h2>
        <div id="party-collection"></div>  
      </div>
      <div class="details">
        <h2>Party Details</h2>
        <div id="partyDetails"><em>Select a party to see details</em></div>
      </div>
    </div>
    `;
  $app.querySelector("#party-collection").replaceWith(PartyCollection());
}

// we need to call getParties once at the beginning to get the data
// we don't want to call getParties in render(), since we call render in getParties

// ========= INIT ============

async function init() {
  await getParties();
  render();
}

init();
