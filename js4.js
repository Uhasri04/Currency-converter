import { countryList } from './codes.js';
const baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@1/latest/currencies";

// Select the dropdowns and button
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");

// Populate the dropdowns with the country currency codes
for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to update the flag when a currency is selected
const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

// Event listener for the convert button
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "") {
        amtval = 1;
        amount.value = "1";
    }

    // Fetch conversion rate from the API
    let fromCurrValue = fromcurr.value;
    let toCurrValue = tocurr.value;
    
    try {
        let response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrValue.toLowerCase()}.json`);
        console.log(response.status);
        let data = await response.json();
        var rate = data[fromCurrValue.toLowerCase()][toCurrValue.toLowerCase()];
        console.log(rate);
        
        if (rate) {
            let convertedAmount = amtval * rate;
            console.log(`Converted Amount: ${convertedAmount}`);
        } else {
            console.log("Conversion rate not available.");
        }
    } catch (error) {
        console.error("Error fetching conversion rate:", error);
    }
    let convertedAmount=amtval*rate;
    msg.innerText=`${amtval}${fromCurrValue}=${convertedAmount} ${toCurrValue}`;
});