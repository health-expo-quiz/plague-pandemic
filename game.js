// DOM Elements
const gameStatus = document.getElementById('game-status');
const virusLevelElement = document.getElementById('virus-level');
const virusImage = document.getElementById('virus-image');
const startButton = document.getElementById('start-button');
const containVirusButton = document.getElementById('contain-virus-button');
const upgradeVaccineButton = document.getElementById('upgrade-vaccine-button');

// Global game variables
let gameStarted = false;
let virusLevel = 0;
let vaccineUpgraded = false;
let climateRefugees = false;
let cyberAttack = false;
let antiScienceMovement = false;

// Event listeners for buttons
startButton.addEventListener('click', startGame);
containVirusButton.addEventListener('click', containVirus);
upgradeVaccineButton.addEventListener('click', upgradeVaccine);

// Start the game
function startGame() {
    gameStarted = true;
    virusLevel = 1;  // Start with low virus level
    updateGameStatus();
    startButton.disabled = true;
    containVirusButton.disabled = false;
    upgradeVaccineButton.disabled = false;

    // Start events cycle (for demonstration, we just simulate events)
    startEventsCycle();
}

// Contain Virus action
function containVirus() {
    if (virusLevel < 10) {
        virusLevel++;
        updateVirusLevel();
    } else {
        gameStatus.innerHTML = "Global Status: Virus contained! You won!";
        containVirusButton.disabled = true;
        upgradeVaccineButton.disabled = true;
        // Optionally, trigger game restart or victory actions
    }
}

// Upgrade Vaccine action
function upgradeVaccine() {
    if (virusLevel > 5 && !vaccineUpgraded) {
        vaccineUpgraded = true;
        virusLevel--;  // Reduce virus level after vaccine upgrade
        gameStatus.innerHTML = "Global Status: Vaccine upgraded! Virus level reduced.";
        updateVirusLevel();
    } else {
        gameStatus.innerHTML = "Global Status: Vaccine upgrade is not possible yet.";
    }
}

// Update virus level and game status
function updateVirusLevel() {
    if (virusLevel <= 3) {
        virusLevelElement.innerText = "Virus Level: Low";
        virusImage.src = "images/low-virus.jpg";
    } else if (virusLevel <= 7) {
        virusLevelElement.innerText = "Virus Level: Moderate";
        virusImage.src = "images/medium-virus.jpg";
    } else {
        virusLevelElement.innerText = "Virus Level: High";
        virusImage.src = "images/high-virus.jpg";
    }
}

// Update the game status message
function updateGameStatus() {
    gameStatus.innerHTML = `Global Status: Containing Virus... <span id="virus-level">Virus Level: Low</span>`;
}

// Simulate global events like cyberattacks, climate refugees, and anti-science movements
function startEventsCycle() {
    setInterval(() => {
        if (gameStarted && virusLevel < 10) {
            triggerRandomEvent();
        }
    }, 5000); // Check for random events every 5 seconds
}

// Trigger random global events that affect the game
function triggerRandomEvent() {
    const eventChance = Math.random();
    if (eventChance < 0.2 && !climateRefugees) {
        activateClimateRefugees();
    } else if (eventChance >= 0.2 && eventChance < 0.4 && !cyberAttack) {
        activateCyberAttack();
    } else if (eventChance >= 0.4 && eventChance < 0.6 && !antiScienceMovement) {
        activateAntiScienceMovement();
    }
}

// Activate Climate Refugees event
function activateClimateRefugees() {
    climateRefugees = true;
    gameStatus.innerHTML += "<br>Global Event: Climate refugees complicate containment efforts!";
    virusLevel++; // Increase virus level as refugees make containment harder
    updateVirusLevel();
}

// Activate Cyberattack event
function activateCyberAttack() {
    cyberAttack = true;
    gameStatus.innerHTML += "<br>Global Event: Cyberattack on vaccine research delays progress!";
    // Disable the vaccine upgrade for a period of time
    upgradeVaccineButton.disabled = true;
    setTimeout(() => {
        upgradeVaccineButton.disabled = false; // Reactivate vaccine upgrade after delay
    }, 10000); // Disable for 10 seconds
}

// Activate Anti-Science Movement event
function activateAntiScienceMovement() {
    antiScienceMovement = true;
    gameStatus.innerHTML += "<br>Global Event: Anti-science movement spreading misinformation!";
    // Increase virus level due to people avoiding vaccines
    virusLevel++;
    updateVirusLevel();
}

// Handle victory or loss conditions
function checkGameEnd() {
    if (virusLevel === 0) {
        gameStatus.innerHTML = "Global Status: Virus contained! You won!";
        containVirusButton.disabled = true;
        upgradeVaccineButton.disabled = true;
    } else if (virusLevel === 10) {
        gameStatus.innerHTML = "Global Status: Virus is uncontrollable! You lost!";
        containVirusButton.disabled = true;
        upgradeVaccineButton.disabled = true;
    }
}
