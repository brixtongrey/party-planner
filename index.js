const BASE_URL = "";
const COHORT = "2506-FTB-CT-WEB-PT";

const API = `${BASE_URL}/${COHORT}`;

console.log(API);

// ======== STATE =========

const parties = [];

// Get all the parties

// FETCH API start a request to our server 

// await response.json() - turns the body into a real JS object

async function getParties() {

    try {
    const response = await fetch(`${API}/parties`);
    const result = await response.json();
    console.log("response", result.data); // fetch request

    } catch (error) {
        console.error("There was an error /GET parties", error);
    }
    
}

getParties();