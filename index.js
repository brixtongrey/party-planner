const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2506-FTB-CT-WEB-PT"; // COHORT ID didn't work in class example - COHORT

const API = `${BASE_URL}/${COHORT}`;

console.log(API);

// ======== STATE =========

let parties = [];

// Get all the parties

// FETCH API start a request to our server 

// await response.json() - turns the body into a real JS object

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
        const response = await fetch(`${API}/parties/{id}`) // need to put id to pull single item 
        const singleParty = await response.json();
        return singleParty.data

    } catch (error) {
        console.error("There was an error /GET party", error);
    }

}


function PartyCard(party) {
    const $card = document.createElement("article");
    $card.classList.add("party"); // default CSS styles 
    $card.innerHTML = `
      <h2>${party.name} #${party.id}</h2>
    <p>${party.date}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>
    `;
    return $card;
}

function PartyCollection() {
    const $collection = document.createElement("article");
    $collection.classList.add("parties");
    const $parties = parties.map(PartyCard);
    $collection.replaceChildren(...$parties); // spread operator ...
    return $collection;
}

// getParties();
// getSingleParty();


// =========== RENDER ============

function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
    <h1>Party Planner</h1>
    <div id="party-collection"></div>  
    `
    $app.querySelector("#party-collection").replaceWith(PartyCollection());

}

// we need to call getParties once at the beginning to get the data
// we don't want to call getParties in render(), since we call render in getParties

async function init() {
    await getParties();
    render();
}

init();