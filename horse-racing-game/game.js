// === Derby Champions Club - Game Engine ===

// --- Data ---
const HORSE_NAMES = [
    "Thunder Bolt", "Midnight Star", "Golden Arrow", "Shadow Dancer", "Storm Chaser",
    "Silver Wind", "Lucky Strike", "Iron Will", "Fire Spirit", "Dark Knight",
    "Ocean Breeze", "Wild Heart", "Crystal Moon", "Brave Soul", "Desert Rose",
    "Mountain King", "River Song", "Sky Dancer", "Noble Quest", "Iron Horse",
    "Swift Justice", "Velvet Dream", "Crimson Tide", "Arctic Fox", "Diamond Dust",
    "Phoenix Rise", "Copper Penny", "Blazing Trail", "Night Rider", "Solar Flare",
    "Royal Flush", "Thunder Road", "Mystic Dawn", "Steel Reign", "Fortune Seeker"
];

const BREEDS = [
    "Thoroughbred", "Arabian", "Quarter Horse", "Mustang",
    "Appaloosa", "Standardbred", "Morgan", "Andalusian"
];

const COAT_COLORS = [
    "#8B4513", "#2C1810", "#696969", "#F5F5DC", "#D2691E",
    "#A0522D", "#1a1a1a", "#DEB887", "#CD853F", "#8B0000"
];

const RACE_TYPES = [
    { name: "Maiden Sprint", distance: 800, entryFee: 200, prize: 1000, minRaces: 0, fields: 6 },
    { name: "Novice Dash", distance: 1000, entryFee: 400, prize: 2000, minRaces: 1, fields: 7 },
    { name: "City Stakes", distance: 1200, entryFee: 600, prize: 4000, minRaces: 3, fields: 8 },
    { name: "County Cup", distance: 1600, entryFee: 1000, prize: 7000, minRaces: 5, fields: 8 },
    { name: "Silver Trophy", distance: 2000, entryFee: 1500, prize: 12000, minRaces: 8, fields: 8 },
    { name: "Gold Classic", distance: 2400, entryFee: 2500, prize: 20000, minRaces: 12, fields: 8 },
    { name: "Champion Derby", distance: 3000, entryFee: 5000, prize: 50000, minRaces: 18, fields: 8 },
    { name: "Grand National", distance: 3600, entryFee: 10000, prize: 100000, minRaces: 25, fields: 8 }
];

const COMMENTARIES = {
    start: [
        "And they're off!",
        "The gates fly open!",
        "And the race begins!",
        "They break from the gate!"
    ],
    early: [
        "{horse} takes the early lead!",
        "{horse} bursts to the front!",
        "{horse} shows great acceleration out of the gate!",
        "It's {horse} with the early advantage!"
    ],
    middle: [
        "{horse} is making a strong move on the outside!",
        "The pack is tightly bunched, {horse} holding steady.",
        "{horse} surging up through the field!",
        "It's getting tense, {horse} pushing hard!",
        "{horse} is finding another gear!",
        "Look at {horse} go!"
    ],
    late: [
        "{horse} kicks for home!",
        "{horse} is giving it everything in the final stretch!",
        "Down the stretch they come! {horse} is flying!",
        "It's a battle to the line! {horse} vs {horse2}!",
        "{horse} digging deep in the final furlongs!"
    ],
    finish: [
        "{horse} crosses the line first!",
        "It's {horse} who takes it!",
        "{horse} wins in magnificent style!",
        "Victory for {horse}!",
        "What a finish! {horse} takes the crown!"
    ],
    close: [
        "It's incredibly close between {horse} and {horse2}!",
        "Neck and neck! {horse} and {horse2}!",
        "Photo finish between {horse} and {horse2}!",
        "There's nothing between them! {horse} and {horse2}!"
    ]
};

const OWNER_NAMES = [
    "Kingsley Racing", "Emerald Stables", "Thornton & Co", "Velocity Racing",
    "Blue Diamond Stud", "Highland Runners", "Prestige Equine", "Windswept Farm",
    "Iron Gate Stable", "Crown Racing Ltd", "Sapphire Meadows", "Summit Stables"
];

// --- Utility ---
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function formatMoney(n) {
    return "$" + n.toLocaleString();
}

// --- Horse Generation ---
function generateHorse(quality) {
    // quality: 1-5, affects stat ranges
    const baseMin = 20 + (quality - 1) * 10;
    const baseMax = 45 + (quality - 1) * 12;

    return {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        name: pick(HORSE_NAMES) + (Math.random() > 0.7 ? " " + pick(["II", "Jr", "III"]) : ""),
        breed: pick(BREEDS),
        color: pick(COAT_COLORS),
        stats: {
            speed: rand(baseMin, baseMax),
            stamina: rand(baseMin, baseMax),
            acceleration: rand(baseMin, baseMax),
            luck: rand(baseMin, baseMax)
        },
        energy: 100,
        age: rand(2, 6),
        races: 0,
        wins: 0,
        places: 0, // 2nd or 3rd
        earnings: 0
    };
}

function generateNPCHorse(quality) {
    const h = generateHorse(quality);
    h.owner = pick(OWNER_NAMES);
    return h;
}

function horseOverall(horse) {
    const s = horse.stats;
    return Math.round((s.speed + s.stamina + s.acceleration + s.luck) / 4);
}

function horsePrice(horse) {
    const overall = horseOverall(horse);
    return Math.round((overall * overall * 2) + rand(100, 500));
}

function horseSellPrice(horse) {
    return Math.round(horsePrice(horse) * 0.5);
}

// --- Game State ---
const State = {
    owner: "",
    stable: "",
    money: 5000,
    day: 1,
    horses: [],
    market: [],
    records: [],
    totalRaces: 0,
    selectedTrainHorse: null,
    selectedRaceHorse: null,
    currentRace: null,
    betHorse: null,
    betAmount: 0
};

// --- Save / Load ---
function saveGame() {
    const data = {
        owner: State.owner,
        stable: State.stable,
        money: State.money,
        day: State.day,
        horses: State.horses,
        records: State.records,
        totalRaces: State.totalRaces
    };
    localStorage.setItem("derbyChampions_save", JSON.stringify(data));
}

function loadGameData() {
    const raw = localStorage.getItem("derbyChampions_save");
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch { return null; }
}

// --- UI Helper ---
const UI = {
    showScreen(id) {
        document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
    },

    switchTab(name) {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelector(`.tab[data-tab="${name}"]`).classList.add("active");
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        document.getElementById("tab-" + name).classList.add("active");

        // Refresh content when switching
        if (name === "stable") UI.renderStable();
        if (name === "market") UI.renderMarket();
        if (name === "train") UI.renderTraining();
        if (name === "race") UI.renderRaceSetup();
        if (name === "records") UI.renderRecords();
    },

    notify(msg, type = "") {
        const el = document.getElementById("notification");
        el.textContent = msg;
        el.className = "notification show " + type;
        setTimeout(() => el.className = "notification", 2500);
    },

    updateHUD() {
        document.getElementById("hud-owner").textContent = State.owner;
        document.getElementById("hud-stable").textContent = State.stable;
        document.getElementById("hud-money").textContent = formatMoney(State.money);
        document.getElementById("hud-day").textContent = "Day " + State.day;
    },

    renderHorseCard(horse, options = {}) {
        const { showBuy, showSell, showSelect, selectable, selected } = options;
        const overall = horseOverall(horse);

        let html = `<div class="horse-card ${selected ? 'selected' : ''}" ${selectable ? `onclick="${options.onSelect}"` : ''}>`;
        html += `<div class="horse-header">
            <span class="horse-name">${horse.name}</span>
            <div class="horse-color" style="background:${horse.color}"></div>
        </div>`;
        html += `<div class="horse-breed">${horse.breed} | Age ${horse.age} | Overall: ${overall}</div>`;

        html += `<div class="stat-bars">`;
        html += UI.statBar("Speed", horse.stats.speed, "speed");
        html += UI.statBar("Stamina", horse.stats.stamina, "stamina");
        html += UI.statBar("Accel", horse.stats.acceleration, "accel");
        html += UI.statBar("Luck", horse.stats.luck, "luck");
        html += `</div>`;

        if (horse.energy !== undefined) {
            html += `<div class="horse-energy">
                <div class="stat-row">
                    <span class="stat-label">Energy</span>
                    <div class="energy-bar"><div class="energy-fill" style="width:${horse.energy}%"></div></div>
                    <span class="stat-value">${horse.energy}%</span>
                </div>
            </div>`;
        }

        html += `<div class="horse-meta">
            <span>Races: ${horse.races || 0}</span>
            <span>Wins: ${horse.wins || 0}</span>
            <span>Earnings: ${formatMoney(horse.earnings || 0)}</span>
        </div>`;

        if (showBuy) {
            const price = horsePrice(horse);
            html += `<div class="price">${formatMoney(price)}</div>`;
            html += `<button class="btn-buy" ${State.money < price ? 'disabled' : ''} onclick="Game.buyHorse('${horse.id}')">BUY</button>`;
        }

        if (showSell) {
            const price = horseSellPrice(horse);
            html += `<button class="btn-sell" onclick="Game.sellHorse('${horse.id}')">SELL (${formatMoney(price)})</button>`;
        }

        html += `</div>`;
        return html;
    },

    statBar(label, value, cls) {
        return `<div class="stat-row">
            <span class="stat-label">${label}</span>
            <div class="stat-bar"><div class="stat-fill ${cls}" style="width:${value}%"></div></div>
            <span class="stat-value">${value}</span>
        </div>`;
    },

    renderStable() {
        const container = document.getElementById("stable-horses");
        const empty = document.getElementById("stable-empty");

        if (State.horses.length === 0) {
            container.innerHTML = "";
            empty.style.display = "block";
            return;
        }

        empty.style.display = "none";
        container.innerHTML = State.horses.map(h =>
            UI.renderHorseCard(h, { showSell: true })
        ).join("");
    },

    renderMarket() {
        if (State.market.length === 0) Game.generateMarket();
        const container = document.getElementById("market-horses");
        container.innerHTML = State.market.map(h =>
            UI.renderHorseCard(h, { showBuy: true })
        ).join("");
    },

    renderTraining() {
        const list = document.getElementById("train-horse-list");
        const options = document.getElementById("train-options");
        const selectSection = document.getElementById("train-select");

        if (State.horses.length === 0) {
            list.innerHTML = '<div class="empty-state"><p>No horses to train. Buy one first!</p></div>';
            options.style.display = "none";
            return;
        }

        list.innerHTML = State.horses.map(h => `
            <div class="horse-list-item ${State.selectedTrainHorse === h.id ? 'selected' : ''}"
                 onclick="Game.selectTrainHorse('${h.id}')">
                <div class="horse-info">
                    <div class="mini-color" style="background:${h.color}"></div>
                    <span>${h.name}</span>
                </div>
                <span class="energy-mini">Energy: ${h.energy}%</span>
            </div>
        `).join("");

        if (State.selectedTrainHorse) {
            const horse = State.horses.find(h => h.id === State.selectedTrainHorse);
            if (horse) {
                options.style.display = "block";
                document.getElementById("train-selected-horse").innerHTML = UI.renderHorseCard(horse, {});
            }
        } else {
            options.style.display = "none";
        }
    },

    renderRaceSetup() {
        const entries = document.getElementById("race-entries");
        const totalPlayerRaces = State.totalRaces;

        entries.innerHTML = RACE_TYPES.map((race, i) => {
            const locked = totalPlayerRaces < race.minRaces;
            return `<div class="race-entry ${locked ? 'locked' : ''}" onclick="${locked ? '' : `Game.selectRace(${i})`}">
                <div class="race-info">
                    <h4>${locked ? '???' : race.name}</h4>
                    <p>${race.distance}m | ${race.fields} runners${locked ? ` | Unlocks after ${race.minRaces} races` : ''}</p>
                </div>
                <div class="race-prize">
                    <div class="prize-amount">${locked ? '???' : formatMoney(race.prize)}</div>
                    <div class="entry-fee">${locked ? '' : 'Entry: ' + formatMoney(race.entryFee)}</div>
                </div>
            </div>`;
        }).join("");

        document.getElementById("race-entry-form").style.display = "none";
        document.getElementById("race-list").style.display = "block";
    },

    showRaceList() {
        document.getElementById("race-entry-form").style.display = "none";
        document.getElementById("race-list").style.display = "block";
    },

    showRaceEntry(raceIndex) {
        const race = RACE_TYPES[raceIndex];
        document.getElementById("race-list").style.display = "none";
        document.getElementById("race-entry-form").style.display = "block";
        document.getElementById("race-title").textContent = race.name;

        document.getElementById("race-details").innerHTML = `
            <p><strong>Distance:</strong> ${race.distance}m</p>
            <p><strong>Field Size:</strong> ${race.fields} runners</p>
            <p><strong>Entry Fee:</strong> ${formatMoney(race.entryFee)}</p>
            <p><strong>1st Prize:</strong> ${formatMoney(race.prize)}</p>
            <p><strong>2nd Prize:</strong> ${formatMoney(Math.round(race.prize * 0.4))}</p>
            <p><strong>3rd Prize:</strong> ${formatMoney(Math.round(race.prize * 0.2))}</p>
        `;

        const selectEl = document.getElementById("race-horse-select");
        if (State.horses.length === 0) {
            selectEl.innerHTML = '<div class="empty-state"><p>You need a horse to enter a race!</p></div>';
            return;
        }

        selectEl.innerHTML = State.horses.map(h => `
            <div class="horse-list-item ${State.selectedRaceHorse === h.id ? 'selected' : ''}"
                 onclick="Game.selectRaceHorse('${h.id}')">
                <div class="horse-info">
                    <div class="mini-color" style="background:${h.color}"></div>
                    <span>${h.name} (Overall: ${horseOverall(h)})</span>
                </div>
                <span class="energy-mini">Energy: ${h.energy}%</span>
            </div>
        `).join("");

        UI.updateBetOptions(raceIndex);
    },

    updateBetOptions(raceIndex) {
        const race = RACE_TYPES[raceIndex];
        const betSelect = document.getElementById("bet-horse");
        betSelect.innerHTML = '<option value="">-- No Bet --</option>';

        // Player horse
        if (State.selectedRaceHorse) {
            const ph = State.horses.find(h => h.id === State.selectedRaceHorse);
            if (ph) {
                betSelect.innerHTML += `<option value="${ph.id}">${ph.name} (yours)</option>`;
            }
        }

        document.getElementById("bet-amount").value = 0;
        document.getElementById("bet-amount").max = State.money;
    },

    renderRecords() {
        const list = document.getElementById("records-list");
        const empty = document.getElementById("records-empty");

        if (State.records.length === 0) {
            list.innerHTML = "";
            empty.style.display = "block";
            return;
        }

        empty.style.display = "none";
        list.innerHTML = State.records.slice().reverse().map(r => {
            const posClass = r.position === 1 ? 'win' : (r.position <= 3 ? 'place' : 'loss');
            const posText = r.position === 1 ? '1st' : (r.position === 2 ? '2nd' : (r.position === 3 ? '3rd' : `${r.position}th`));
            return `<div class="record-entry">
                <div class="record-info">
                    <h4>${r.raceName} - Day ${r.day}</h4>
                    <p>${r.horseName} | ${r.distance}m | ${r.time}</p>
                </div>
                <span class="record-result ${posClass}">${posText}</span>
            </div>`;
        }).join("");
    }
};

// --- Game Logic ---
const Game = {
    startNewGame() {
        UI.showScreen("screen-setup");
        Game.generateStarterHorses();
    },

    loadGame() {
        const data = loadGameData();
        if (!data) {
            UI.notify("No saved game found!", "error");
            return;
        }
        Object.assign(State, data);
        State.market = [];
        State.selectedTrainHorse = null;
        State.selectedRaceHorse = null;
        Game.generateMarket();
        UI.showScreen("screen-stable");
        UI.updateHUD();
        UI.renderStable();
        UI.notify("Game loaded!", "success");
    },

    generateStarterHorses() {
        const starters = [generateHorse(1), generateHorse(1), generateHorse(2)];
        const container = document.getElementById("starter-horses");

        let selectedId = null;

        function renderStarters() {
            container.innerHTML = starters.map(h => {
                const sel = selectedId === h.id;
                return `<div class="horse-card ${sel ? 'selected' : ''}" onclick="document.querySelectorAll('#starter-horses .horse-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._starterSelected='${h.id}';document.getElementById('btn-confirm-setup').disabled=false;">
                    ${UI.renderHorseCard(h, {}).replace('<div class="horse-card ">', '').replace('<div class="horse-card selected">', '').slice(0, -6)}
                </div>`;
            }).join("");
        }

        // Store starters globally for pickup
        window._starters = starters;
        renderStarters();
    },

    confirmNewGame() {
        const owner = document.getElementById("input-owner").value.trim();
        const stable = document.getElementById("input-stable").value.trim();
        const selectedId = window._starterSelected;

        if (!owner) { UI.notify("Enter your name!", "error"); return; }
        if (!stable) { UI.notify("Enter a stable name!", "error"); return; }
        if (!selectedId) { UI.notify("Pick a starter horse!", "error"); return; }

        const horse = window._starters.find(h => h.id === selectedId);
        if (!horse) return;

        State.owner = owner;
        State.stable = stable;
        State.money = 5000;
        State.day = 1;
        State.horses = [horse];
        State.records = [];
        State.totalRaces = 0;

        Game.generateMarket();
        saveGame();

        UI.showScreen("screen-stable");
        UI.updateHUD();
        UI.renderStable();
        UI.notify("Welcome to Derby Champions Club, " + owner + "!", "success");
    },

    generateMarket() {
        State.market = [];
        const numHorses = rand(4, 6);
        for (let i = 0; i < numHorses; i++) {
            const quality = rand(1, Math.min(5, 1 + Math.floor(State.day / 10)));
            State.market.push(generateHorse(quality));
        }
    },

    refreshMarket() {
        if (State.money < 500) {
            UI.notify("Not enough money to refresh! ($500)", "error");
            return;
        }
        State.money -= 500;
        Game.generateMarket();
        UI.updateHUD();
        UI.renderMarket();
        UI.notify("New horses available!", "success");
        saveGame();
    },

    buyHorse(id) {
        if (State.horses.length >= 6) {
            UI.notify("Stable full! Sell a horse first (max 6).", "error");
            return;
        }

        const horse = State.market.find(h => h.id === id);
        if (!horse) return;

        const price = horsePrice(horse);
        if (State.money < price) {
            UI.notify("Not enough money!", "error");
            return;
        }

        State.money -= price;
        State.horses.push(horse);
        State.market = State.market.filter(h => h.id !== id);

        UI.updateHUD();
        UI.renderMarket();
        UI.notify(`Bought ${horse.name} for ${formatMoney(price)}!`, "success");
        saveGame();
    },

    sellHorse(id) {
        const horse = State.horses.find(h => h.id === id);
        if (!horse) return;

        const price = horseSellPrice(horse);
        State.money += price;
        State.horses = State.horses.filter(h => h.id !== id);

        if (State.selectedTrainHorse === id) State.selectedTrainHorse = null;
        if (State.selectedRaceHorse === id) State.selectedRaceHorse = null;

        UI.updateHUD();
        UI.renderStable();
        UI.notify(`Sold ${horse.name} for ${formatMoney(price)}!`, "success");
        saveGame();
    },

    selectTrainHorse(id) {
        State.selectedTrainHorse = id;
        UI.renderTraining();
    },

    trainHorse(stat) {
        if (!State.selectedTrainHorse) return;
        const horse = State.horses.find(h => h.id === State.selectedTrainHorse);
        if (!horse) return;

        const cost = stat === "luck" ? 200 : 300;
        if (State.money < cost) {
            UI.notify("Not enough money!", "error");
            return;
        }

        if (horse.energy < 15) {
            UI.notify(`${horse.name} is too tired! Rest first.`, "error");
            return;
        }

        State.money -= cost;

        // Training result: gain 1-4 points, affected by luck and current level
        const currentVal = horse.stats[stat];
        const diminishing = Math.max(1, 4 - Math.floor(currentVal / 25));
        const gain = rand(1, diminishing);
        horse.stats[stat] = Math.min(99, currentVal + gain);
        horse.energy = Math.max(0, horse.energy - rand(15, 25));

        UI.updateHUD();
        UI.renderTraining();
        UI.notify(`${horse.name}'s ${stat} improved by +${gain}! (Energy: ${horse.energy}%)`, "success");
        saveGame();
    },

    restHorse() {
        if (!State.selectedTrainHorse) return;
        const horse = State.horses.find(h => h.id === State.selectedTrainHorse);
        if (!horse) return;

        if (horse.energy >= 100) {
            UI.notify(`${horse.name} is already fully rested!`, "");
            return;
        }

        const recovery = rand(25, 45);
        horse.energy = Math.min(100, horse.energy + recovery);
        State.day++;

        UI.updateHUD();
        UI.renderTraining();
        UI.notify(`${horse.name} rested and recovered ${recovery}% energy. A new day dawns!`, "success");
        saveGame();
    },

    selectRace(index) {
        State.currentRace = index;
        State.selectedRaceHorse = null;
        UI.showRaceEntry(index);
    },

    selectRaceHorse(id) {
        State.selectedRaceHorse = id;
        UI.showRaceEntry(State.currentRace);
    },

    startRace() {
        if (State.currentRace === null) return;
        if (!State.selectedRaceHorse) {
            UI.notify("Select a horse to race!", "error");
            return;
        }

        const race = RACE_TYPES[State.currentRace];
        const playerHorse = State.horses.find(h => h.id === State.selectedRaceHorse);
        if (!playerHorse) return;

        if (State.money < race.entryFee) {
            UI.notify("Not enough money for entry fee!", "error");
            return;
        }

        if (playerHorse.energy < 10) {
            UI.notify(`${playerHorse.name} is too tired to race! Rest first.`, "error");
            return;
        }

        // Deduct entry fee
        State.money -= race.entryFee;

        // Collect bet info
        const betHorseId = document.getElementById("bet-horse").value;
        const betAmount = parseInt(document.getElementById("bet-amount").value) || 0;

        if (betAmount > 0 && betAmount > State.money) {
            UI.notify("Not enough money for that bet!", "error");
            State.money += race.entryFee; // refund
            return;
        }

        if (betAmount > 0) {
            State.money -= betAmount;
            State.betAmount = betAmount;
            State.betHorse = betHorseId;
        } else {
            State.betAmount = 0;
            State.betHorse = null;
        }

        UI.updateHUD();

        // Generate NPC horses
        const quality = Math.max(1, Math.min(5, Math.floor(State.currentRace / 1.5) + 1));
        const runners = [{ ...playerHorse, isPlayer: true }];

        for (let i = 1; i < race.fields; i++) {
            const npc = generateNPCHorse(rand(Math.max(1, quality - 1), Math.min(5, quality + 1)));
            npc.energy = rand(60, 100);
            runners.push(npc);
        }

        // Shuffle positions
        for (let i = runners.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [runners[i], runners[j]] = [runners[j], runners[i]];
        }

        // Run the race
        RaceEngine.run(race, runners, playerHorse.id);
    },

    finishRace(race, results, playerHorseId) {
        const playerResult = results.find(r => r.id === playerHorseId);
        const position = results.indexOf(playerResult) + 1;

        // Calculate earnings
        let earnings = 0;
        if (position === 1) earnings = race.prize;
        else if (position === 2) earnings = Math.round(race.prize * 0.4);
        else if (position === 3) earnings = Math.round(race.prize * 0.2);

        State.money += earnings;

        // Update horse stats
        const horse = State.horses.find(h => h.id === playerHorseId);
        if (horse) {
            horse.races++;
            horse.energy = Math.max(0, horse.energy - rand(20, 40));
            if (position === 1) horse.wins++;
            if (position <= 3) horse.places++;
            horse.earnings += earnings;
        }

        State.totalRaces++;
        State.day++;

        // Bet results
        let betWinnings = 0;
        let betWon = false;
        if (State.betAmount > 0 && State.betHorse) {
            const betHorseResult = results.find(r => r.id === State.betHorse);
            const betPos = results.indexOf(betHorseResult) + 1;
            if (betPos === 1) {
                const odds = 3 + Math.random() * 4;
                betWinnings = Math.round(State.betAmount * odds);
                betWon = true;
                State.money += betWinnings;
            }
        }

        // Record
        State.records.push({
            raceName: race.name,
            day: State.day - 1,
            horseName: playerResult.name,
            distance: race.distance,
            position: position,
            time: playerResult.finishTime
        });

        saveGame();

        // Show results screen
        Game.showResults(race, results, position, earnings, betWon, betWinnings);
    },

    showResults(race, results, playerPos, earnings, betWon, betWinnings) {
        UI.showScreen("screen-results");

        document.getElementById("results-title").textContent = race.name + " Results";

        // Podium
        const podium = document.getElementById("results-podium");
        const top3 = results.slice(0, 3);
        const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean); // 2nd, 1st, 3rd
        podium.innerHTML = top3.map((r, i) => {
            const placeClass = ["first", "second", "third"][i];
            const placeLabel = ["1st", "2nd", "3rd"][i];
            return `<div class="podium-place ${placeClass}">
                <div class="podium-position">${placeLabel}</div>
                <div class="podium-horse">${r.name}</div>
                <div class="podium-owner">${r.isPlayer ? State.stable : (r.owner || 'NPC')}</div>
            </div>`;
        }).join("");

        // Full results table
        const table = document.getElementById("results-table");
        table.innerHTML = results.map((r, i) => {
            const posClass = i === 0 ? 'first' : (i === 1 ? 'second' : (i === 2 ? 'third' : ''));
            return `<div class="result-row ${posClass}">
                <span class="pos">${i + 1}</span>
                <span class="name">${r.name}${r.isPlayer ? ' *' : ''}</span>
                <span class="time">${r.finishTime}</span>
            </div>`;
        }).join("");

        // Earnings
        const earningsEl = document.getElementById("results-earnings");
        if (earnings > 0) {
            earningsEl.className = "earnings won";
            earningsEl.textContent = `You earned ${formatMoney(earnings)}!`;
        } else {
            earningsEl.className = "earnings lost";
            earningsEl.textContent = `No prize money this time.`;
        }

        // Bet result
        const betEl = document.getElementById("results-bet");
        if (State.betAmount > 0) {
            if (betWon) {
                betEl.className = "bet-result won";
                betEl.textContent = `Bet won! You won ${formatMoney(betWinnings)}!`;
            } else {
                betEl.className = "bet-result lost";
                betEl.textContent = `Bet lost. You lost ${formatMoney(State.betAmount)}.`;
            }
        } else {
            betEl.className = "bet-result";
            betEl.textContent = "";
        }
    },

    returnToStable() {
        State.currentRace = null;
        State.selectedRaceHorse = null;
        State.betHorse = null;
        State.betAmount = 0;

        // Restore energy for all horses slightly (new day)
        State.horses.forEach(h => {
            h.energy = Math.min(100, h.energy + rand(5, 15));
        });

        // Refresh market occasionally
        if (State.day % 3 === 0) Game.generateMarket();

        UI.showScreen("screen-stable");
        UI.updateHUD();
        UI.renderStable();
        saveGame();
    }
};

// --- Race Engine ---
const RaceEngine = {
    runners: [],
    race: null,
    playerHorseId: null,
    animFrame: null,
    trackWidth: 0,
    startX: 70,
    finishX: 0,
    raceDistance: 0,
    raceTime: 0,
    finished: false,
    finishOrder: [],
    commentaryTimer: 0,
    phase: "start", // start, early, middle, late, finish

    run(race, runners, playerHorseId) {
        this.race = race;
        this.playerHorseId = playerHorseId;
        this.runners = runners.map((r, i) => ({
            ...r,
            lane: i,
            distance: 0,
            currentSpeed: 0,
            finished: false,
            finishTime: null,
            position: i + 1
        }));
        this.finishOrder = [];
        this.raceTime = 0;
        this.finished = false;
        this.commentaryTimer = 0;
        this.phase = "start";

        UI.showScreen("screen-race");
        document.getElementById("race-name-display").textContent = race.name;
        document.getElementById("race-distance-display").textContent = race.distance + "m";

        // Build track
        this.buildTrack();

        // Start animation
        this.raceDistance = race.distance;
        const track = document.getElementById("racetrack");
        this.trackWidth = track.offsetWidth;
        this.finishX = this.trackWidth - 60;

        document.getElementById("race-commentary").textContent = "Horses approaching the starting gate...";

        setTimeout(() => {
            document.getElementById("race-commentary").textContent = pick(COMMENTARIES.start);
            this.lastFrame = performance.now();
            this.animFrame = requestAnimationFrame((t) => this.update(t));
        }, 1500);
    },

    buildTrack() {
        const lanes = document.getElementById("race-lanes");
        lanes.innerHTML = this.runners.map((r, i) => `
            <div class="race-lane">
                <span class="lane-number">${i + 1}</span>
                <div class="horse-sprite" id="sprite-${i}">
                    <span class="horse-body" style="color:${r.color}">&#127943;</span>
                    <span class="horse-label">${r.name}</span>
                </div>
            </div>
        `).join("");

        document.getElementById("race-positions").innerHTML = "";
    },

    update(timestamp) {
        const dt = Math.min((timestamp - this.lastFrame) / 1000, 0.05);
        this.lastFrame = timestamp;
        this.raceTime += dt;

        const progressRatio = this.finishOrder.length > 0
            ? this.finishOrder[0].distance / this.raceDistance
            : Math.max(...this.runners.map(r => r.distance)) / this.raceDistance;

        // Update phase
        if (progressRatio < 0.15) this.phase = "early";
        else if (progressRatio < 0.5) this.phase = "middle";
        else if (progressRatio < 0.85) this.phase = "late";
        else this.phase = "finish";

        // Update each runner
        for (const runner of this.runners) {
            if (runner.finished) continue;

            const stats = runner.stats;
            const energyFactor = (runner.energy || 80) / 100;

            // Base speed from stats
            const baseSpeed = (stats.speed * 0.5 + stats.acceleration * 0.2 + stats.stamina * 0.15 + stats.luck * 0.15);

            // Acceleration phase
            let accelBonus = 0;
            if (runner.distance < this.raceDistance * 0.15) {
                accelBonus = stats.acceleration * 0.3;
            }

            // Stamina drain in later race
            let staminaDrain = 0;
            const raceProgress = runner.distance / this.raceDistance;
            if (raceProgress > 0.5) {
                staminaDrain = (1 - stats.stamina / 100) * 20 * (raceProgress - 0.5);
            }

            // Final sprint
            let sprintBonus = 0;
            if (raceProgress > 0.8) {
                sprintBonus = (stats.speed * 0.15 + stats.luck * 0.1) * energyFactor;
            }

            // Random variance (luck-influenced)
            const variance = (Math.random() - 0.45) * (4 + stats.luck * 0.06);

            // Calculate speed
            const targetSpeed = (baseSpeed + accelBonus + sprintBonus - staminaDrain + variance) * energyFactor * 0.85;
            runner.currentSpeed += (targetSpeed - runner.currentSpeed) * 0.1;
            runner.currentSpeed = Math.max(5, runner.currentSpeed);

            // Move
            runner.distance += runner.currentSpeed * dt * 3;

            // Check finish
            if (runner.distance >= this.raceDistance) {
                runner.distance = this.raceDistance;
                runner.finished = true;
                runner.finishTime = this.formatTime(this.raceTime);
                this.finishOrder.push(runner);
            }
        }

        // Update positions
        const sorted = [...this.runners].sort((a, b) => b.distance - a.distance);
        sorted.forEach((r, i) => r.position = i + 1);

        // Render
        this.render(sorted);

        // Commentary
        this.commentaryTimer += dt;
        if (this.commentaryTimer > 2.5) {
            this.commentaryTimer = 0;
            this.showCommentary(sorted);
        }

        // Check if all finished
        if (this.runners.every(r => r.finished)) {
            this.finished = true;
            const winner = this.finishOrder[0];
            document.getElementById("race-commentary").textContent = pick(COMMENTARIES.finish).replace("{horse}", winner.name);

            setTimeout(() => {
                Game.finishRace(this.race, this.finishOrder, this.playerHorseId);
            }, 2500);
            return;
        }

        this.animFrame = requestAnimationFrame((t) => this.update(t));
    },

    render(sorted) {
        const trackWidth = document.getElementById("racetrack").offsetWidth;
        const startX = 70;
        const endX = trackWidth - 60;
        const range = endX - startX;

        for (const runner of this.runners) {
            const sprite = document.getElementById(`sprite-${runner.lane}`);
            if (!sprite) continue;

            const progress = runner.distance / this.raceDistance;
            const x = startX + progress * range;
            sprite.style.left = x + "px";
        }

        // Position board
        const board = document.getElementById("race-positions");
        board.innerHTML = sorted.slice(0, 5).map((r, i) => {
            const posClass = i === 0 ? 'first' : (i === 1 ? 'second' : (i === 2 ? 'third' : ''));
            const marker = r.isPlayer ? ' *' : '';
            return `<div class="pos-entry ${posClass}">
                <span class="pos-number">${i + 1}.</span>
                <span>${r.name}${marker}</span>
            </div>`;
        }).join("");
    },

    showCommentary(sorted) {
        const leader = sorted[0];
        const second = sorted[1];
        let pool = COMMENTARIES[this.phase] || COMMENTARIES.middle;

        // Close race?
        if (second && (leader.distance - second.distance) < this.raceDistance * 0.03) {
            pool = [...pool, ...COMMENTARIES.close];
        }

        let text = pick(pool);
        text = text.replace("{horse}", leader.name);
        if (second) text = text.replace("{horse2}", second.name);

        document.getElementById("race-commentary").textContent = text;
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toFixed(2);
        return mins > 0 ? `${mins}:${secs.padStart(5, '0')}` : `${secs}s`;
    }
};

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
    UI.showScreen("screen-title");
});
