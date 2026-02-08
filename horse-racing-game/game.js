// === Equine Legacy - Game Engine ===

// --- Constants ---
const HORSE_NAMES = [
    "Thunder Bolt","Midnight Star","Golden Arrow","Shadow Dancer","Storm Chaser",
    "Silver Wind","Lucky Strike","Iron Will","Fire Spirit","Dark Knight",
    "Ocean Breeze","Wild Heart","Crystal Moon","Brave Soul","Desert Rose",
    "Mountain King","River Song","Sky Dancer","Noble Quest","Iron Horse",
    "Swift Justice","Velvet Dream","Crimson Tide","Arctic Fox","Diamond Dust",
    "Phoenix Rise","Copper Penny","Blazing Trail","Night Rider","Solar Flare",
    "Royal Flush","Thunder Road","Mystic Dawn","Steel Reign","Fortune Seeker",
    "Blue Comet","Red Baron","Ghost Pepper","Silk Road","Amber Wave"
];
const BREEDS = ["Thoroughbred","Arabian","Quarter Horse","Mustang","Appaloosa","Standardbred","Morgan","Andalusian"];
const COAT_COLORS = ["#8B4513","#2C1810","#696969","#F5F5DC","#D2691E","#A0522D","#1a1a1a","#DEB887","#CD853F","#8B0000"];
const OWNER_NAMES = ["Kingsley Racing","Emerald Stables","Thornton & Co","Velocity Racing","Blue Diamond Stud","Highland Runners","Prestige Equine","Windswept Farm","Iron Gate Stable","Crown Racing Ltd","Sapphire Meadows","Summit Stables"];

const VISIBLE_TRAITS = [
    {name:"Early Burst",stat:"acceleration",bonus:8,desc:"+8 Accel"},
    {name:"Iron Legs",stat:"stamina",bonus:8,desc:"+8 Stamina"},
    {name:"Wind Runner",stat:"speed",bonus:8,desc:"+8 Speed"},
    {name:"Quick Feet",stat:"agility",bonus:8,desc:"+8 Agility"},
    {name:"Heart of Lion",stat:"guts",bonus:8,desc:"+8 Guts"},
    {name:"Second Wind",stat:"stamina",bonus:5,desc:"Late stamina surge"},
    {name:"Gate Dasher",stat:"acceleration",bonus:6,desc:"Fast starts"},
    {name:"Mud Lover",stat:"agility",bonus:5,desc:"Good on wet tracks"},
    {name:"Sprinter",stat:"speed",bonus:6,desc:"Short distance specialist"},
    {name:"Marathon Man",stat:"stamina",bonus:6,desc:"Long distance specialist"},
    {name:"Lucky Charm",stat:"guts",bonus:5,desc:"Clutch performer"},
    {name:"Steady Eddie",stat:"guts",bonus:4,desc:"Consistent runs"}
];

const HIDDEN_AFFINITIES = ["short","medium","long","turf","dirt","wet","dry","frontrunner","closer"];

const FOODS = [
    {name:"Hay",icon:"\u{1F33E}",cost:50,energy:15,mood:0,desc:"Basic feed"},
    {name:"Oats",icon:"\u{1F33E}",cost:100,energy:20,mood:5,statBoost:"stamina",boostAmt:1,desc:"Energy + stamina"},
    {name:"Carrots",icon:"\u{1F955}",cost:80,energy:10,mood:15,desc:"Mood booster"},
    {name:"Apples",icon:"\u{1F34E}",cost:120,energy:15,mood:20,desc:"Horse favorite"},
    {name:"Premium Mix",icon:"\u{2B50}",cost:250,energy:30,mood:10,statBoost:"speed",boostAmt:1,desc:"Speed + energy"},
    {name:"Sugar Cubes",icon:"\u{1F36C}",cost:60,energy:5,mood:25,desc:"Sweet treat"},
    {name:"Protein Pellets",icon:"\u{1F4AA}",cost:200,energy:25,mood:0,statBoost:"guts",boostAmt:1,desc:"Guts builder"},
    {name:"Electrolytes",icon:"\u{1F4A7}",cost:150,energy:35,mood:5,desc:"Fast recovery"}
];

const ACTIVITIES = [
    {name:"Groom",icon:"\u{1FAA5}",cost:0,energy:0,mood:20,desc:"Bond with horse"},
    {name:"Walk",icon:"\u{1F6B6}",cost:0,energy:-5,mood:10,desc:"Gentle exercise"},
    {name:"Rest",icon:"\u{1F634}",cost:0,energy:40,mood:5,desc:"Full rest (next week)"},
    {name:"Vet Check",icon:"\u{1FA7A}",cost:300,energy:10,mood:-5,desc:"Health checkup"}
];

const RACE_TYPES = [
    {name:"Maiden Sprint",distance:800,entryFee:200,prize:1000,minRaces:0,fields:6,surface:"dirt"},
    {name:"Novice Dash",distance:1000,entryFee:400,prize:2000,minRaces:1,fields:7,surface:"dirt"},
    {name:"City Stakes",distance:1200,entryFee:600,prize:4000,minRaces:3,fields:8,surface:"turf"},
    {name:"County Cup",distance:1600,entryFee:1000,prize:7000,minRaces:5,fields:8,surface:"dirt"},
    {name:"Silver Trophy",distance:2000,entryFee:1500,prize:12000,minRaces:8,fields:8,surface:"turf"},
    {name:"Gold Classic",distance:2400,entryFee:2500,prize:20000,minRaces:12,fields:8,surface:"turf"},
    {name:"Champion Derby",distance:3000,entryFee:5000,prize:50000,minRaces:18,fields:8,surface:"dirt"},
    {name:"Grand National",distance:3600,entryFee:10000,prize:100000,minRaces:25,fields:8,surface:"turf"}
];

const COMMENTARIES = {
    start:["And they're off!","The gates fly open!","And the race begins!","They break from the gate!"],
    early:["{horse} takes the early lead!","{horse} bursts to the front!","{horse} shows great acceleration!","It's {horse} with the early advantage!"],
    middle:["{horse} making a strong move!","The pack is tightly bunched.","{horse} surging through the field!","{horse} finding another gear!"],
    late:["{horse} kicks for home!","{horse} giving everything in the stretch!","Down the stretch! {horse} is flying!","{horse} digging deep!"],
    finish:["{horse} crosses the line first!","It's {horse} who takes it!","{horse} wins in style!","Victory for {horse}!"],
    close:["Neck and neck! {horse} and {horse2}!","Photo finish! {horse} and {horse2}!","Nothing between {horse} and {horse2}!"],
    whip:["{horse} gets the whip!","The jockey urges {horse} on!","{horse} responds to the whip!"],
    hold:["{horse}'s jockey is holding back, saving energy.","Smart riding - holding {horse} in reserve."]
};

const ACHIEVEMENTS = [
    {id:"first_win",name:"First Victory",desc:"Win your first race",icon:"\u{1F3C6}",check:s=>s.records.some(r=>r.position===1)},
    {id:"five_wins",name:"Winning Streak",desc:"Win 5 races total",icon:"\u{1F31F}",check:s=>s.records.filter(r=>r.position===1).length>=5},
    {id:"first_breed",name:"New Life",desc:"Breed your first foal",icon:"\u{1F434}",check:s=>s.totalBred>=1},
    {id:"gen2",name:"Legacy Begins",desc:"Race a Gen 2+ horse",icon:"\u{1F9EC}",check:s=>s.horses.some(h=>h.generation>=2&&h.races>0)},
    {id:"rich",name:"Big Spender",desc:"Have $50,000+",icon:"\u{1F4B0}",check:s=>s.money>=50000},
    {id:"full_stable",name:"Full House",desc:"Fill your stable (8 horses)",icon:"\u{1F3E0}",check:s=>s.horses.length>=8},
    {id:"grand_national",name:"Grand Champion",desc:"Win the Grand National",icon:"\u{1F451}",check:s=>s.records.some(r=>r.raceName==="Grand National"&&r.position===1)},
    {id:"ten_breeds",name:"Master Breeder",desc:"Breed 10 foals",icon:"\u{1F48E}",check:s=>s.totalBred>=10},
    {id:"perfect_train",name:"Perfect Form",desc:"Get a Perfect in training",icon:"\u{1F4AF}",check:s=>s.perfectTrains>=1},
    {id:"retire_champ",name:"Hall of Fame",desc:"Retire a horse with 10+ wins",icon:"\u{1F3C5}",check:s=>s.retired.some(h=>h.wins>=10)}
];

// --- Utility ---
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v))}
function fmt$(n){return"$"+n.toLocaleString()}
function uid(){return Date.now().toString(36)+Math.random().toString(36).substr(2,6)}

// --- Genetics ---
function generateGenes(quality){
    const base=15+(quality-1)*10, top=40+(quality-1)*12;
    const stats={speed:rand(base,top),stamina:rand(base,top),acceleration:rand(base,top),agility:rand(base,top),guts:rand(base,top)};
    const numTraits=Math.random()<0.3?2:(Math.random()<0.6?1:0);
    const traits=[];
    const pool=[...VISIBLE_TRAITS];
    for(let i=0;i<numTraits;i++){const t=pool.splice(rand(0,pool.length-1),1)[0];if(t)traits.push({...t});}
    const hidden=[];
    if(Math.random()<0.5)hidden.push(pick(["short","medium","long"]));
    if(Math.random()<0.4)hidden.push(pick(["turf","dirt"]));
    if(Math.random()<0.3)hidden.push(pick(["frontrunner","closer"]));
    return{stats,traits,hidden};
}

function breedGenes(sire,dam){
    const stats={};
    for(const k of ["speed","stamina","acceleration","agility","guts"]){
        const avg=(sire.stats[k]+dam.stats[k])/2;
        const variance=rand(-8,8);
        stats[k]=clamp(Math.round(avg+variance),5,99);
    }
    // inherit traits
    const parentTraits=[...sire.traits,...dam.traits];
    const traits=[];
    for(const t of parentTraits){
        if(Math.random()<0.45&&!traits.find(x=>x.name===t.name))traits.push({...t});
    }
    // chance of new trait
    if(Math.random()<0.15){const nt=pick(VISIBLE_TRAITS);if(!traits.find(x=>x.name===nt.name))traits.push({...nt});}
    if(traits.length>3)traits.length=3;
    // inherit hidden
    const allHidden=[...sire.hidden,...dam.hidden];
    const hidden=[...new Set(allHidden.filter(()=>Math.random()<0.5))];
    if(Math.random()<0.1){const nh=pick(HIDDEN_AFFINITIES);if(!hidden.includes(nh))hidden.push(nh);}
    return{stats,traits,hidden};
}

function generateHorse(quality,gen=1,parents=null){
    const genes=gen>1&&parents?breedGenes(parents.sire,parents.dam):generateGenes(quality);
    return{
        id:uid(),name:pick(HORSE_NAMES)+(Math.random()>0.75?" "+pick(["II","Jr","III"]):""),
        breed:parents?pick([parents.sire.breed,parents.dam.breed]):pick(BREEDS),
        color:parents?(Math.random()<0.5?parents.sire.color:parents.dam.color):pick(COAT_COLORS),
        stats:genes.stats,traits:genes.traits,hidden:genes.hidden,
        energy:100,mood:70,age:gen>1?0:rand(2,5),
        races:0,wins:0,places:0,earnings:0,
        generation:gen,
        sireId:parents?parents.sire.id:null,sireName:parents?parents.sire.name:null,
        damId:parents?parents.dam.id:null,damName:parents?parents.dam.name:null,
        breedCyclesLeft:3,retired:false,maxRaces:rand(25,40)
    };
}

function generateNPCHorse(quality){const h=generateHorse(quality);h.owner=pick(OWNER_NAMES);return h;}
function horseOverall(h){const s=h.stats;return Math.round((s.speed+s.stamina+s.acceleration+s.agility+s.guts)/5);}
function horsePrice(h){const o=horseOverall(h);return Math.round(o*o*2.5+h.traits.length*500+rand(100,400));}
function horseSellPrice(h){return Math.round(horsePrice(h)*0.45);}

function getAgePhase(h){
    if(h.age<=1)return"foal";
    if(h.age<=3)return"young";
    if(h.age<=7)return"peak";
    if(h.age<=10)return"mature";
    return"declining";
}

function moodClass(m){return m>=60?"mood-good":(m>=30?"mood-ok":"mood-bad");}

// --- State ---
const State={
    owner:"",stable:"",money:5000,week:1,season:1,
    horses:[],retired:[],market:[],studMarket:[],records:[],
    totalRaces:0,totalBred:0,perfectTrains:0,
    selectedTrainHorse:null,selectedFeedHorse:null,
    selectedRaceHorse:null,currentRace:null,
    betHorse:null,betAmount:0,
    breedSire:null,breedDam:null,pendingFoal:null,
    unlockedAchievements:[]
};

// --- Save/Load ---
function saveGame(){
    const d={owner:State.owner,stable:State.stable,money:State.money,week:State.week,season:State.season,
        horses:State.horses,retired:State.retired,records:State.records,
        totalRaces:State.totalRaces,totalBred:State.totalBred,perfectTrains:State.perfectTrains,
        unlockedAchievements:State.unlockedAchievements};
    localStorage.setItem("equineLegacy_save",JSON.stringify(d));
}
function loadSave(){
    const r=localStorage.getItem("equineLegacy_save");
    if(!r)return null;
    try{return JSON.parse(r)}catch{return null}
}

// --- UI ---
const UI={
    showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");},

    switchTab(name){
        document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
        document.querySelector(`.tab[data-tab="${name}"]`).classList.add("active");
        document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));
        document.getElementById("tab-"+name).classList.add("active");
        const map={stable:UI.renderStable,market:UI.renderMarket,train:UI.renderTraining,
            feed:UI.renderCare,race:UI.renderRaceSetup,breed:UI.renderBreeding,records:UI.renderRecords};
        if(map[name])map[name]();
    },

    notify(msg,type=""){
        const el=document.getElementById("notification");
        el.textContent=msg;el.className="notification show "+type;
        setTimeout(()=>el.className="notification",2500);
    },

    updateHUD(){
        document.getElementById("hud-owner").textContent=State.owner;
        document.getElementById("hud-stable").textContent=State.stable;
        document.getElementById("hud-money").textContent=fmt$(State.money);
        document.getElementById("hud-season").textContent="Season "+State.season;
        document.getElementById("hud-day").textContent="Week "+State.week;
    },

    closeModal(){document.getElementById("horse-detail-modal").style.display="none";},

    horseCard(h,opts={}){
        const o=horseOverall(h),phase=getAgePhase(h),mc=moodClass(h.mood);
        let badge="";
        if(h.retired)badge='<span class="status-badge retired">Retired</span>';
        else if(phase==="foal")badge='<span class="status-badge foal">Foal</span>';
        else if(phase==="declining")badge='<span class="status-badge declining">Aging</span>';
        else if(phase==="peak")badge='<span class="status-badge peak">Peak</span>';

        let html=`<div class="horse-card ${opts.selected?'selected':''}" ${opts.onClick?'onclick="'+opts.onClick+'"':''}>`;
        html+=badge;
        html+=`<div class="horse-header"><span class="horse-name">${h.name}</span><div class="horse-color" style="background:${h.color}"></div></div>`;
        html+=`<div class="horse-breed">${h.breed} | Age ${h.age} | OVR ${o}`;
        if(h.generation>1)html+=` <span class="horse-gen-tag">Gen ${h.generation}</span>`;
        html+=`</div>`;
        html+=`<div class="stat-bars">`;
        html+=UI.statBar("Speed",h.stats.speed,"speed");
        html+=UI.statBar("Stam",h.stats.stamina,"stamina");
        html+=UI.statBar("Accel",h.stats.acceleration,"accel");
        html+=UI.statBar("Agil",h.stats.agility,"agility");
        html+=UI.statBar("Guts",h.stats.guts,"guts");
        html+=`</div>`;
        // mood & energy
        html+=`<div class="mood-energy">
            <div class="mini-bar-group"><div class="mini-bar-label"><span>Energy</span><span>${h.energy}%</span></div><div class="mini-bar"><div class="mini-bar-fill energy" style="width:${h.energy}%"></div></div></div>
            <div class="mini-bar-group"><div class="mini-bar-label"><span>Mood</span><span>${h.mood}</span></div><div class="mini-bar"><div class="mini-bar-fill ${mc}" style="width:${h.mood}%"></div></div></div>
        </div>`;
        // traits
        if(h.traits.length>0){
            html+=`<div class="traits-row">${h.traits.map(t=>`<span class="trait-tag" title="${t.desc}">${t.name}</span>`).join("")}</div>`;
        }
        html+=`<div class="horse-meta"><span>Races: ${h.races}</span><span>Wins: ${h.wins}</span><span>${fmt$(h.earnings)}</span></div>`;
        if(opts.showBuy){
            const p=horsePrice(h);
            html+=`<div class="price">${fmt$(p)}</div>`;
            html+=`<button class="btn-buy" ${State.money<p?'disabled':''} onclick="event.stopPropagation();Game.buyHorse('${h.id}')">BUY</button>`;
        }
        if(opts.showStable&&!h.retired){
            html+=`<div class="btn-row">`;
            html+=`<button class="btn-sell" onclick="event.stopPropagation();Game.sellHorse('${h.id}')">Sell ${fmt$(horseSellPrice(h))}</button>`;
            if(h.races>=5&&!h.retired)html+=`<button class="btn-retire" onclick="event.stopPropagation();Game.retireHorse('${h.id}')">Retire</button>`;
            html+=`</div>`;
        }
        html+=`</div>`;
        return html;
    },

    statBar(label,val,cls){
        return`<div class="stat-row"><span class="stat-label">${label}</span><div class="stat-bar"><div class="stat-fill ${cls}" style="width:${val}%"></div></div><span class="stat-value">${val}</span></div>`;
    },

    renderStable(){
        const c=document.getElementById("stable-horses"),e=document.getElementById("stable-empty");
        const active=State.horses.filter(h=>!h.retired);
        if(active.length===0){c.innerHTML="";e.style.display="block";return;}
        e.style.display="none";
        c.innerHTML=active.map(h=>UI.horseCard(h,{showStable:true})).join("");
    },

    renderMarket(){
        if(State.market.length===0)Game.generateMarket();
        document.getElementById("market-horses").innerHTML=State.market.map(h=>UI.horseCard(h,{showBuy:true})).join("");
    },

    renderTraining(){
        const list=document.getElementById("train-horse-list"),opts=document.getElementById("train-options");
        const active=State.horses.filter(h=>!h.retired&&getAgePhase(h)!=="foal");
        if(active.length===0){list.innerHTML='<div class="empty-state"><p>No horses to train.</p></div>';opts.style.display="none";return;}
        list.innerHTML=active.map(h=>`
            <div class="horse-list-item ${State.selectedTrainHorse===h.id?'selected':''}" onclick="Game.selectTrainHorse('${h.id}')">
                <div class="horse-info"><div class="mini-color" style="background:${h.color}"></div><span>${h.name} (OVR ${horseOverall(h)})</span></div>
                <span class="energy-mini">E:${h.energy}% M:${h.mood}</span>
            </div>`).join("");
        if(State.selectedTrainHorse){
            const h=State.horses.find(x=>x.id===State.selectedTrainHorse);
            if(h){
                opts.style.display="block";
                document.getElementById("train-selected-horse").innerHTML=UI.horseCard(h,{});
                document.getElementById("training-programs").innerHTML=`
                    <div class="program" onclick="Game.launchTraining('speed')"><div class="program-icon">\u{1F3C3}</div><h4>Sprint Drills</h4><p>Boost Speed</p><span class="cost">$300</span></div>
                    <div class="program" onclick="Game.launchTraining('stamina')"><div class="program-icon">\u{1F4AA}</div><h4>Endurance Run</h4><p>Boost Stamina</p><span class="cost">$300</span></div>
                    <div class="program" onclick="Game.launchTraining('acceleration')"><div class="program-icon">\u{26A1}</div><h4>Gate Practice</h4><p>Boost Accel</p><span class="cost">$300</span></div>
                    <div class="program" onclick="Game.launchTraining('agility')"><div class="program-icon">\u{1F3AF}</div><h4>Agility Course</h4><p>Boost Agility</p><span class="cost">$300</span></div>
                    <div class="program" onclick="Game.launchTraining('guts')"><div class="program-icon">\u{1F525}</div><h4>Guts Builder</h4><p>Boost Guts</p><span class="cost">$300</span></div>`;
            }
        }else{opts.style.display="none";}
    },

    renderCare(){
        const list=document.getElementById("feed-horse-list"),opts=document.getElementById("feed-options");
        const active=State.horses.filter(h=>!h.retired);
        if(active.length===0){list.innerHTML='<div class="empty-state"><p>No horses to care for.</p></div>';opts.style.display="none";return;}
        list.innerHTML=active.map(h=>`
            <div class="horse-list-item ${State.selectedFeedHorse===h.id?'selected':''}" onclick="Game.selectFeedHorse('${h.id}')">
                <div class="horse-info"><div class="mini-color" style="background:${h.color}"></div><span>${h.name}</span></div>
                <span class="energy-mini">E:${h.energy}% M:${h.mood}</span>
            </div>`).join("");
        if(State.selectedFeedHorse){
            const h=State.horses.find(x=>x.id===State.selectedFeedHorse);
            if(h){
                opts.style.display="block";
                document.getElementById("feed-selected-horse").innerHTML=UI.horseCard(h,{});
                document.getElementById("food-grid").innerHTML=FOODS.map((f,i)=>`
                    <div class="food-item" onclick="Game.feedHorse(${i})">
                        <div class="food-icon">${f.icon}</div><h4>${f.name}</h4><p>${f.desc}</p>
                        <span class="cost">${fmt$(f.cost)}</span>
                        <div class="effects">E+${f.energy} M+${f.mood}${f.statBoost?" "+f.statBoost.slice(0,3).toUpperCase()+"+"+f.boostAmt:""}</div>
                    </div>`).join("");
                document.getElementById("activity-grid").innerHTML=ACTIVITIES.map((a,i)=>`
                    <div class="activity-item" onclick="Game.doActivity(${i})">
                        <div class="act-icon">${a.icon}</div><h4>${a.name}</h4><p>${a.desc}</p>
                        <span class="cost">${a.cost>0?fmt$(a.cost):'Free'}</span>
                    </div>`).join("");
            }
        }else{opts.style.display="none";}
    },

    renderRaceSetup(){
        const entries=document.getElementById("race-entries");
        entries.innerHTML=RACE_TYPES.map((r,i)=>{
            const locked=State.totalRaces<r.minRaces;
            return`<div class="race-entry ${locked?'locked':''}" onclick="${locked?'':`Game.selectRace(${i})`}">
                <div class="race-info"><h4>${locked?'???':r.name}</h4><p>${r.distance}m ${r.surface} | ${r.fields} runners${locked?' | Need '+r.minRaces+' races':''}</p></div>
                <div class="race-prize"><div class="prize-amount">${locked?'???':fmt$(r.prize)}</div><div class="entry-fee">${locked?'':'Entry '+fmt$(r.entryFee)}</div></div>
            </div>`;
        }).join("");
        document.getElementById("race-entry-form").style.display="none";
        document.getElementById("race-list").style.display="block";
    },

    showRaceList(){document.getElementById("race-entry-form").style.display="none";document.getElementById("race-list").style.display="block";},

    showRaceEntry(idx){
        const r=RACE_TYPES[idx];
        document.getElementById("race-list").style.display="none";
        document.getElementById("race-entry-form").style.display="block";
        document.getElementById("race-title").textContent=r.name;
        document.getElementById("race-details").innerHTML=`
            <p><strong>Distance:</strong> ${r.distance}m (${r.surface})</p>
            <p><strong>Field:</strong> ${r.fields} runners</p>
            <p><strong>Entry:</strong> ${fmt$(r.entryFee)}</p>
            <p><strong>1st:</strong> ${fmt$(r.prize)} | 2nd: ${fmt$(Math.round(r.prize*0.4))} | 3rd: ${fmt$(Math.round(r.prize*0.2))}</p>`;
        const sel=document.getElementById("race-horse-select");
        const active=State.horses.filter(h=>!h.retired&&getAgePhase(h)!=="foal");
        if(active.length===0){sel.innerHTML='<div class="empty-state"><p>No eligible horses!</p></div>';return;}
        sel.innerHTML=active.map(h=>`
            <div class="horse-list-item ${State.selectedRaceHorse===h.id?'selected':''}" onclick="Game.selectRaceHorse('${h.id}')">
                <div class="horse-info"><div class="mini-color" style="background:${h.color}"></div><span>${h.name} (OVR ${horseOverall(h)})</span></div>
                <span class="energy-mini">E:${h.energy}% M:${h.mood}</span>
            </div>`).join("");
        const betSel=document.getElementById("bet-horse");
        betSel.innerHTML='<option value="">-- No Bet --</option>';
        if(State.selectedRaceHorse){const ph=State.horses.find(x=>x.id===State.selectedRaceHorse);if(ph)betSel.innerHTML+=`<option value="${ph.id}">${ph.name}</option>`;}
        document.getElementById("bet-amount").value=0;
    },

    renderBreeding(){
        const retiredList=document.getElementById("breed-retired-list");
        const studList=document.getElementById("stud-market-list");
        const retired=State.retired.filter(h=>h.breedCyclesLeft>0);
        if(retired.length===0)retiredList.innerHTML='<div class="empty-state"><p>No retired horses. Retire a horse with 5+ races first!</p></div>';
        else retiredList.innerHTML=retired.map(h=>`
            <div class="horse-list-item ${State.breedSire===h.id||State.breedDam===h.id?'selected':''}" onclick="Game.selectBreedHorse('${h.id}')">
                <div class="horse-info"><div class="mini-color" style="background:${h.color}"></div><span>${h.name} (OVR ${horseOverall(h)})</span></div>
                <span class="energy-mini">Breeds left: ${h.breedCyclesLeft}</span>
            </div>`).join("");
        if(State.studMarket.length===0)Game.generateStudMarket();
        studList.innerHTML=State.studMarket.map(h=>`
            <div class="horse-list-item ${State.breedDam===h.id||State.breedSire===h.id?'selected':''}" onclick="Game.selectBreedHorse('${h.id}','stud')">
                <div class="horse-info"><div class="mini-color" style="background:${h.color}"></div><span>${h.name} (OVR ${horseOverall(h)})</span></div>
                <span class="energy-mini">Stud Fee: $1000</span>
            </div>`).join("");
        const pairing=document.getElementById("breed-pairing");
        const result=document.getElementById("breed-result");
        if(State.pendingFoal){pairing.style.display="none";result.style.display="block";document.getElementById("foal-card").innerHTML=UI.horseCard(State.pendingFoal,{});return;}
        result.style.display="none";
        if(State.breedSire&&State.breedDam){
            pairing.style.display="block";
            const s=State.retired.find(x=>x.id===State.breedSire)||State.studMarket.find(x=>x.id===State.breedSire);
            const d=State.retired.find(x=>x.id===State.breedDam)||State.studMarket.find(x=>x.id===State.breedDam);
            document.getElementById("breed-sire").innerHTML=s?`<strong>${s.name}</strong><br>OVR ${horseOverall(s)}<br>${s.traits.map(t=>t.name).join(", ")||"No traits"}`:"Select sire";
            document.getElementById("breed-dam").innerHTML=d?`<strong>${d.name}</strong><br>OVR ${horseOverall(d)}<br>${d.traits.map(t=>t.name).join(", ")||"No traits"}`:"Select dam";
            const avgOvr=s&&d?Math.round((horseOverall(s)+horseOverall(d))/2):0;
            document.getElementById("breed-prediction").innerHTML=`<strong>Predicted Offspring:</strong> ~OVR ${avgOvr} | Traits may inherit from either parent | Generation ${Math.max(s?s.generation:1,d?d.generation:1)+1}`;
        }else{pairing.style.display="none";}
    },

    renderRecords(){
        const list=document.getElementById("records-list"),empty=document.getElementById("records-empty");
        if(State.records.length===0){list.innerHTML="";empty.style.display="block";return;}
        empty.style.display="none";
        list.innerHTML=State.records.slice().reverse().slice(0,30).map(r=>{
            const pc=r.position===1?'win':(r.position<=3?'place':'loss');
            const pt=r.position===1?'1st':(r.position===2?'2nd':(r.position===3?'3rd':r.position+'th'));
            return`<div class="record-entry"><div class="record-info"><h4>${r.raceName} - S${r.season}W${r.week}</h4><p>${r.horseName} | ${r.distance}m | ${r.time}</p></div><span class="record-result ${pc}">${pt}</span></div>`;
        }).join("");
    },

    showRecordTab(tab){
        document.querySelectorAll(".rec-tab").forEach(t=>t.classList.remove("active"));
        document.querySelectorAll(".records-section").forEach(s=>s.classList.remove("active"));
        event.target.classList.add("active");
        document.getElementById("records-"+tab).classList.add("active");
        if(tab==="bloodlines")UI.renderBloodlines();
        if(tab==="achievements")UI.renderAchievements();
    },

    renderBloodlines(){
        const all=[...State.horses,...State.retired];
        const bred=all.filter(h=>h.generation>1);
        if(bred.length===0){document.getElementById("bloodline-tree").innerHTML='<div class="empty-state"><p>Breed horses to see bloodlines here.</p></div>';return;}
        document.getElementById("bloodline-tree").innerHTML=bred.map(h=>`
            <div class="bloodline-entry"><h4>${h.name} <span class="gen-badge">Gen ${h.generation}</span></h4>
            <p class="parents">Sire: ${h.sireName||'Unknown'} | Dam: ${h.damName||'Unknown'}</p>
            <p class="parents">OVR: ${horseOverall(h)} | Traits: ${h.traits.map(t=>t.name).join(", ")||"None"}</p></div>`).join("");
    },

    renderAchievements(){
        document.getElementById("achievements-list").innerHTML=ACHIEVEMENTS.map(a=>{
            const unlocked=State.unlockedAchievements.includes(a.id);
            return`<div class="achievement ${unlocked?'':'locked'}"><span class="ach-icon">${a.icon}</span><div class="ach-info"><h4>${unlocked?a.name:'???'}</h4><p>${a.desc}</p></div></div>`;
        }).join("");
    }
};

// --- Game ---
const Game={
    startNewGame(){UI.showScreen("screen-setup");Game.genStarters();},

    loadGame(){
        const d=loadSave();if(!d){UI.notify("No saved game!","error");return;}
        Object.assign(State,d);State.market=[];State.studMarket=[];State.selectedTrainHorse=null;State.selectedFeedHorse=null;State.selectedRaceHorse=null;State.breedSire=null;State.breedDam=null;State.pendingFoal=null;
        Game.generateMarket();Game.generateStudMarket();
        UI.showScreen("screen-stable");UI.updateHUD();UI.renderStable();UI.notify("Game loaded!","success");
    },

    genStarters(){
        const s=[generateHorse(1),generateHorse(1),generateHorse(2)];
        window._starters=s;
        document.getElementById("starter-horses").innerHTML=s.map(h=>
            `<div class="horse-card" onclick="document.querySelectorAll('#starter-horses .horse-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._starterPick='${h.id}';document.getElementById('btn-confirm-setup').disabled=false;">
            ${UI.horseCard(h,{}).replace(/^<div class="horse-card[^"]*">/,'').replace(/<\/div>$/,'')}</div>`
        ).join("");
    },

    confirmNewGame(){
        const o=document.getElementById("input-owner").value.trim();
        const s=document.getElementById("input-stable").value.trim();
        if(!o){UI.notify("Enter your name!","error");return;}
        if(!s){UI.notify("Enter stable name!","error");return;}
        if(!window._starterPick){UI.notify("Pick a horse!","error");return;}
        const h=window._starters.find(x=>x.id===window._starterPick);if(!h)return;
        State.owner=o;State.stable=s;State.money=5000;State.week=1;State.season=1;
        State.horses=[h];State.retired=[];State.records=[];State.totalRaces=0;State.totalBred=0;State.perfectTrains=0;State.unlockedAchievements=[];
        Game.generateMarket();Game.generateStudMarket();saveGame();
        UI.showScreen("screen-stable");UI.updateHUD();UI.renderStable();
        UI.notify("Welcome to Equine Legacy, "+o+"!","success");
    },

    generateMarket(){State.market=[];for(let i=0;i<rand(4,6);i++)State.market.push(generateHorse(rand(1,Math.min(5,1+Math.floor(State.season/3)))));},
    generateStudMarket(){State.studMarket=[];for(let i=0;i<3;i++){const h=generateHorse(rand(2,Math.min(5,2+Math.floor(State.season/2))));h.retired=true;h.owner="Stud Farm";State.studMarket.push(h);}},

    refreshMarket(){if(State.money<500){UI.notify("Need $500!","error");return;}State.money-=500;Game.generateMarket();UI.updateHUD();UI.renderMarket();UI.notify("New horses!","success");saveGame();},

    buyHorse(id){
        if(State.horses.filter(h=>!h.retired).length>=8){UI.notify("Stable full (max 8)!","error");return;}
        const h=State.market.find(x=>x.id===id);if(!h)return;
        const p=horsePrice(h);if(State.money<p){UI.notify("Not enough money!","error");return;}
        State.money-=p;State.horses.push(h);State.market=State.market.filter(x=>x.id!==id);
        UI.updateHUD();UI.renderMarket();UI.notify(`Bought ${h.name}!`,"success");saveGame();Game.checkAchievements();
    },

    sellHorse(id){
        const h=State.horses.find(x=>x.id===id);if(!h)return;
        const p=horseSellPrice(h);State.money+=p;State.horses=State.horses.filter(x=>x.id!==id);
        UI.updateHUD();UI.renderStable();UI.notify(`Sold ${h.name} for ${fmt$(p)}!`,"success");saveGame();
    },

    retireHorse(id){
        const h=State.horses.find(x=>x.id===id);if(!h)return;
        h.retired=true;State.retired.push(h);State.horses=State.horses.filter(x=>x.id!==id);
        UI.renderStable();UI.notify(`${h.name} retired! Available for breeding.`,"success");saveGame();Game.checkAchievements();
    },

    // --- Training ---
    selectTrainHorse(id){State.selectedTrainHorse=id;UI.renderTraining();},

    launchTraining(stat){
        if(!State.selectedTrainHorse)return;
        const h=State.horses.find(x=>x.id===State.selectedTrainHorse);if(!h)return;
        if(State.money<300){UI.notify("Need $300!","error");return;}
        if(h.energy<15){UI.notify("Too tired! Rest first.","error");return;}
        State.money-=300;UI.updateHUD();
        MiniGame.start(stat,h);
    },

    applyTraining(stat,grade,horse){
        // grade: 0-1 (0=fail, 1=perfect)
        const maxGain=Math.max(1,5-Math.floor(horse.stats[stat]/25));
        const gain=Math.max(1,Math.round(maxGain*grade));
        horse.stats[stat]=Math.min(99,horse.stats[stat]+gain);
        horse.energy=Math.max(0,horse.energy-rand(15,25));
        const moodChange=grade>0.8?10:(grade>0.5?5:-5);
        horse.mood=clamp(horse.mood+moodChange,0,100);
        if(grade>=0.95)State.perfectTrains++;
        UI.updateHUD();UI.renderTraining();
        const label=grade>=0.95?"PERFECT":grade>=0.7?"Great":grade>=0.4?"Good":"Poor";
        UI.notify(`${label}! ${horse.name}'s ${stat} +${gain}`,"success");
        saveGame();Game.checkAchievements();
    },

    // --- Care ---
    selectFeedHorse(id){State.selectedFeedHorse=id;UI.renderCare();},

    feedHorse(idx){
        if(!State.selectedFeedHorse)return;
        const h=State.horses.find(x=>x.id===State.selectedFeedHorse);if(!h)return;
        const f=FOODS[idx];
        if(State.money<f.cost){UI.notify("Not enough money!","error");return;}
        State.money-=f.cost;h.energy=clamp(h.energy+f.energy,0,100);h.mood=clamp(h.mood+f.mood,0,100);
        if(f.statBoost)h.stats[f.statBoost]=Math.min(99,h.stats[f.statBoost]+f.boostAmt);
        UI.updateHUD();UI.renderCare();UI.notify(`Fed ${h.name} ${f.name}!`,"success");saveGame();
    },

    doActivity(idx){
        if(!State.selectedFeedHorse)return;
        const h=State.horses.find(x=>x.id===State.selectedFeedHorse);if(!h)return;
        const a=ACTIVITIES[idx];
        if(State.money<a.cost){UI.notify("Not enough money!","error");return;}
        State.money-=a.cost;
        if(a.name==="Rest"){h.energy=clamp(h.energy+a.energy,0,100);h.mood=clamp(h.mood+a.mood,0,100);Game.advanceWeek();}
        else{h.energy=clamp(h.energy+(a.energy||0),0,100);h.mood=clamp(h.mood+a.mood,0,100);}
        UI.updateHUD();UI.renderCare();UI.notify(`${a.name} done for ${h.name}!`,"success");saveGame();
    },

    // --- Racing ---
    selectRace(i){State.currentRace=i;State.selectedRaceHorse=null;UI.showRaceEntry(i);},
    selectRaceHorse(id){State.selectedRaceHorse=id;UI.showRaceEntry(State.currentRace);},

    startRace(){
        if(State.currentRace===null)return;
        if(!State.selectedRaceHorse){UI.notify("Select a horse!","error");return;}
        const race=RACE_TYPES[State.currentRace];
        const ph=State.horses.find(x=>x.id===State.selectedRaceHorse);if(!ph)return;
        if(State.money<race.entryFee){UI.notify("Not enough for entry fee!","error");return;}
        if(ph.energy<10){UI.notify("Horse too tired!","error");return;}
        State.money-=race.entryFee;
        const betId=document.getElementById("bet-horse").value;
        const betAmt=parseInt(document.getElementById("bet-amount").value)||0;
        if(betAmt>0&&betAmt>State.money){UI.notify("Not enough for bet!","error");State.money+=race.entryFee;return;}
        if(betAmt>0){State.money-=betAmt;State.betAmount=betAmt;State.betHorse=betId;}else{State.betAmount=0;State.betHorse=null;}
        UI.updateHUD();
        const q=Math.max(1,Math.min(5,Math.floor(State.currentRace/1.5)+1));
        const runners=[{...ph,isPlayer:true}];
        for(let i=1;i<race.fields;i++){const n=generateNPCHorse(rand(Math.max(1,q-1),Math.min(5,q+1)));n.energy=rand(60,100);n.mood=rand(50,90);runners.push(n);}
        for(let i=runners.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[runners[i],runners[j]]=[runners[j],runners[i]];}
        RaceEngine.run(race,runners,ph.id);
    },

    finishRace(race,results,playerId){
        const pr=results.find(r=>r.id===playerId);
        const pos=results.indexOf(pr)+1;
        let earn=0;
        if(pos===1)earn=race.prize;else if(pos===2)earn=Math.round(race.prize*0.4);else if(pos===3)earn=Math.round(race.prize*0.2);
        State.money+=earn;
        const h=State.horses.find(x=>x.id===playerId);
        let moodDelta=0;
        if(h){
            h.races++;h.energy=Math.max(0,h.energy-rand(20,40));
            if(pos===1){h.wins++;moodDelta=15;}else if(pos<=3){h.places++;moodDelta=5;}else{moodDelta=-10;}
            h.mood=clamp(h.mood+moodDelta,0,100);h.earnings+=earn;
            h.age+=0;// age advances per season not per race
            if(h.races>=h.maxRaces&&!h.retired){UI.notify(`${h.name} should retire soon - performance declining!`,"");}
        }
        State.totalRaces++;
        let betWin=0,betWon=false;
        if(State.betAmount>0&&State.betHorse){
            const br=results.find(r=>r.id===State.betHorse);
            if(br&&results.indexOf(br)===0){betWin=Math.round(State.betAmount*(3+Math.random()*4));betWon=true;State.money+=betWin;}
        }
        State.records.push({raceName:race.name,season:State.season,week:State.week,horseName:pr.name,distance:race.distance,position:pos,time:pr.finishTime});
        Game.advanceWeek();saveGame();Game.checkAchievements();
        // Results screen
        UI.showScreen("screen-results");
        document.getElementById("results-title").textContent=race.name+" Results";
        document.getElementById("results-podium").innerHTML=results.slice(0,3).map((r,i)=>{
            const c=["first","second","third"][i],l=["1st","2nd","3rd"][i];
            return`<div class="podium-place ${c}"><div class="podium-position">${l}</div><div class="podium-horse">${r.name}</div><div class="podium-owner">${r.isPlayer?State.stable:(r.owner||'NPC')}</div></div>`;
        }).join("");
        document.getElementById("results-table").innerHTML=results.map((r,i)=>{
            const c=i===0?'first':i===1?'second':i===2?'third':'';
            return`<div class="result-row ${c}"><span class="pos">${i+1}</span><span class="name">${r.name}${r.isPlayer?' *':''}</span><span class="time">${r.finishTime}</span></div>`;
        }).join("");
        const ee=document.getElementById("results-earnings");
        if(earn>0){ee.className="earnings won";ee.textContent=`You earned ${fmt$(earn)}!`;}else{ee.className="earnings lost";ee.textContent="No prize money.";}
        const be=document.getElementById("results-bet");
        if(State.betAmount>0){if(betWon){be.className="bet-result won";be.textContent=`Bet won! +${fmt$(betWin)}`;}else{be.className="bet-result lost";be.textContent=`Bet lost: -${fmt$(State.betAmount)}.`;}}else{be.className="bet-result";be.textContent="";}
        document.getElementById("results-mood").textContent=moodDelta!==0?`Horse mood ${moodDelta>0?'+':''}${moodDelta}`:'';
    },

    returnToStable(){
        State.currentRace=null;State.selectedRaceHorse=null;State.betHorse=null;State.betAmount=0;
        State.horses.forEach(h=>{if(!h.retired)h.energy=clamp(h.energy+rand(5,12),0,100);});
        if(State.week%4===0)Game.generateMarket();
        UI.showScreen("screen-stable");UI.updateHUD();UI.renderStable();saveGame();
    },

    advanceWeek(){
        State.week++;
        if(State.week>12){State.week=1;State.season++;Game.advanceSeason();}
        // foals age
        State.horses.forEach(h=>{if(getAgePhase(h)==="foal"&&State.week===1)h.age++;});
    },

    advanceSeason(){
        // all horses age
        State.horses.forEach(h=>h.age++);State.retired.forEach(h=>h.age++);
        // declining horses lose stats slightly
        State.horses.filter(h=>getAgePhase(h)==="declining").forEach(h=>{
            for(const k of Object.keys(h.stats))h.stats[k]=Math.max(5,h.stats[k]-rand(1,3));
        });
        Game.generateMarket();Game.generateStudMarket();
        UI.notify(`Season ${State.season} begins! Horses aged.`,"");
    },

    // --- Breeding ---
    selectBreedHorse(id,source){
        const all=[...State.retired,...State.studMarket];
        const h=all.find(x=>x.id===id);if(!h)return;
        if(!State.breedSire)State.breedSire=id;
        else if(!State.breedDam&&id!==State.breedSire)State.breedDam=id;
        else{State.breedSire=id;State.breedDam=null;}
        UI.renderBreeding();
    },

    cancelBreed(){State.breedSire=null;State.breedDam=null;State.pendingFoal=null;UI.renderBreeding();},

    confirmBreed(){
        if(!State.breedSire||!State.breedDam)return;
        if(State.money<2000){UI.notify("Need $2000 to breed!","error");return;}
        if(State.horses.filter(h=>!h.retired).length>=8){UI.notify("Stable full!","error");return;}
        const all=[...State.retired,...State.studMarket];
        const sire=all.find(x=>x.id===State.breedSire);
        const dam=all.find(x=>x.id===State.breedDam);
        if(!sire||!dam)return;
        let cost=2000;
        if(State.studMarket.find(x=>x.id===sire.id)||State.studMarket.find(x=>x.id===dam.id))cost+=1000;
        if(State.money<cost){UI.notify(`Need ${fmt$(cost)}!`,"error");return;}
        State.money-=cost;
        const gen=Math.max(sire.generation||1,dam.generation||1)+1;
        const foal=generateHorse(0,gen,{sire,dam});
        foal.age=0;
        // reduce breed cycles
        const ownSire=State.retired.find(x=>x.id===sire.id);if(ownSire)ownSire.breedCyclesLeft--;
        const ownDam=State.retired.find(x=>x.id===dam.id);if(ownDam)ownDam.breedCyclesLeft--;
        State.pendingFoal=foal;State.totalBred++;
        UI.updateHUD();UI.renderBreeding();UI.notify("A new foal is born!","success");saveGame();Game.checkAchievements();
    },

    acceptFoal(){
        if(!State.pendingFoal)return;
        State.horses.push(State.pendingFoal);
        State.pendingFoal=null;State.breedSire=null;State.breedDam=null;
        UI.renderBreeding();UI.notify("Foal added to stable!","success");saveGame();
    },

    checkAchievements(){
        for(const a of ACHIEVEMENTS){
            if(!State.unlockedAchievements.includes(a.id)&&a.check(State)){
                State.unlockedAchievements.push(a.id);
                UI.notify(`Achievement: ${a.name}!`,"success");
            }
        }
    }
};

// --- Mini-Games ---
const MiniGame={
    stat:null,horse:null,anim:null,

    start(stat,horse){
        this.stat=stat;this.horse=horse;
        UI.showScreen("screen-minigame");
        document.getElementById("mg-title").textContent=stat.charAt(0).toUpperCase()+stat.slice(1)+" Training";
        document.getElementById("mg-stat").textContent=horse.name;
        document.getElementById("mg-result").style.display="none";
        const arena=document.getElementById("mg-arena");
        arena.innerHTML="";
        if(stat==="speed")this.startTiming();
        else if(stat==="stamina")this.startEndurance();
        else if(stat==="acceleration")this.startGateReaction();
        else if(stat==="agility")this.startAgility();
        else if(stat==="guts")this.startGutsMash();
    },

    showResult(grade){
        if(this.anim)cancelAnimationFrame(this.anim);
        const label=grade>=0.95?"PERFECT!":grade>=0.7?"Great!":grade>=0.4?"Good":grade>=0.2?"OK":"Poor";
        const color=grade>=0.7?"var(--gold)":grade>=0.4?"var(--green)":"var(--accent)";
        document.getElementById("mg-result").style.display="block";
        document.getElementById("mg-result-title").textContent=label;
        document.getElementById("mg-result-title").style.color=color;
        document.getElementById("mg-result-detail").textContent=`Score: ${Math.round(grade*100)}%`;
        this._grade=grade;
    },

    finish(){
        Game.applyTraining(this.stat,this._grade,this.horse);
        UI.showScreen("screen-stable");UI.switchTab("train");
    },

    // === Sprint Timing ===
    startTiming(){
        document.getElementById("mg-instructions").textContent="Tap when the cursor hits the gold zone! 3 rounds.";
        const arena=document.getElementById("mg-arena");
        arena.innerHTML=`<div class="timing-bar" id="tb"><div class="timing-zone perfect" style="left:42%;width:8%"></div><div class="timing-zone" style="left:30%;width:12%"></div><div class="timing-zone" style="left:50%;width:12%"></div><div class="timing-cursor" id="tc"></div></div><button class="mg-tap-btn" id="tb-btn">TAP!</button><p id="tb-round" style="margin-top:12px;color:var(--text-dim)">Round 1/3</p>`;
        let round=0,scores=[],pos=0,dir=1,speed=0.8,running=true;
        const cursor=document.getElementById("tc");
        const btn=document.getElementById("tb-btn");
        const roundEl=document.getElementById("tb-round");
        const animate=()=>{
            if(!running)return;
            pos+=dir*speed;
            if(pos>=96||pos<=0)dir*=-1;
            cursor.style.left=pos+"%";
            this.anim=requestAnimationFrame(animate);
        };
        this.anim=requestAnimationFrame(animate);
        btn.onclick=()=>{
            running=false;cancelAnimationFrame(this.anim);
            let score=0;
            if(pos>=42&&pos<=50)score=1;
            else if(pos>=30&&pos<=62)score=0.6;
            else if(pos>=20&&pos<=72)score=0.3;
            else score=0.1;
            scores.push(score);round++;
            if(round<3){
                roundEl.textContent=`Round ${round+1}/3`;
                speed+=0.3;pos=0;dir=1;running=true;
                this.anim=requestAnimationFrame(animate);
            }else{
                const avg=scores.reduce((a,b)=>a+b)/scores.length;
                this.showResult(avg);
            }
        };
    },

    // === Endurance Hold ===
    startEndurance(){
        document.getElementById("mg-instructions").textContent="Hold the button to fill the meter. Release before it overheats! Target: 75-85%";
        const arena=document.getElementById("mg-arena");
        arena.innerHTML=`<div class="endurance-meter"><div class="endurance-danger"></div><div class="endurance-target" style="bottom:80%"></div><div class="endurance-target" style="bottom:70%"></div><div class="endurance-fill" id="ef"></div></div><button class="mg-tap-btn" id="eb">HOLD</button><p id="ep" style="margin-top:12px;color:var(--text-dim)">0%</p>`;
        let fill=0,holding=false,done=false,draining=false;
        const bar=document.getElementById("ef"),btn=document.getElementById("eb"),pct=document.getElementById("ep");
        const animate=()=>{
            if(done)return;
            if(holding){fill+=0.8;if(fill>=100){done=true;this.showResult(0.05);return;}}
            else if(fill>0){draining=true;fill-=0.3;}
            bar.style.height=fill+"%";pct.textContent=Math.round(fill)+"%";
            this.anim=requestAnimationFrame(animate);
        };
        this.anim=requestAnimationFrame(animate);
        btn.onmousedown=btn.ontouchstart=e=>{e.preventDefault();holding=true;draining=false;};
        btn.onmouseup=btn.ontouchend=e=>{
            e.preventDefault();holding=false;
            if(draining||done)return;
            done=true;
            let grade=0;
            if(fill>=75&&fill<=85)grade=1;
            else if(fill>=65&&fill<=90)grade=0.7;
            else if(fill>=50&&fill<=95)grade=0.4;
            else grade=Math.max(0.05,1-Math.abs(fill-80)/80);
            this.showResult(grade);
        };
    },

    // === Gate Reaction ===
    startGateReaction(){
        document.getElementById("mg-instructions").textContent="Wait for GREEN, then tap as fast as you can! 3 rounds.";
        const arena=document.getElementById("mg-arena");
        arena.innerHTML=`<div class="gate-display" id="gd">\u{1F6D1}</div><button class="mg-tap-btn" id="gb" disabled>WAIT...</button><p id="gp" style="margin-top:12px;color:var(--text-dim)">Round 1/3</p>`;
        const gate=document.getElementById("gd"),btn=document.getElementById("gb"),info=document.getElementById("gp");
        let round=0,scores=[],goTime=0,canTap=false,waiting=false;
        const runRound=()=>{
            gate.className="gate-display ready";gate.textContent="\u{1F534}";btn.disabled=true;btn.textContent="WAIT...";canTap=false;waiting=true;
            const delay=1500+Math.random()*2500;
            setTimeout(()=>{
                if(!waiting)return;
                gate.className="gate-display go";gate.textContent="\u{1F7E2}";btn.disabled=false;btn.textContent="TAP!";
                goTime=performance.now();canTap=true;
            },delay);
        };
        btn.onclick=()=>{
            if(!canTap)return;
            const reaction=performance.now()-goTime;
            canTap=false;waiting=false;
            let score=0;
            if(reaction<200)score=1;else if(reaction<350)score=0.8;else if(reaction<500)score=0.5;else if(reaction<700)score=0.3;else score=0.1;
            scores.push(score);round++;
            info.textContent=`${Math.round(reaction)}ms! Round ${Math.min(round+1,3)}/3`;
            if(round<3)setTimeout(runRound,800);
            else{const avg=scores.reduce((a,b)=>a+b)/scores.length;this.showResult(avg);}
        };
        // early tap
        arena.onclick=e=>{
            if(e.target===btn)return;
            if(waiting&&!canTap){waiting=false;scores.push(0);round++;info.textContent=`Too early! Round ${Math.min(round+1,3)}/3`;gate.className="gate-display early";gate.textContent="\u{274C}";
            if(round<3)setTimeout(runRound,1000);else{const avg=scores.reduce((a,b)=>a+b)/scores.length;this.showResult(avg);}}
        };
        runRound();
    },

    // === Agility Targets ===
    startAgility(){
        document.getElementById("mg-instructions").textContent="Tap the targets in order as fast as you can!";
        const arena=document.getElementById("mg-arena");
        arena.innerHTML=`<div class="agility-field" id="af"></div><p id="ap" style="margin-top:12px;color:var(--text-dim)">Targets: 0/8</p>`;
        const field=document.getElementById("af"),info=document.getElementById("ap");
        const targets=[];const total=8;let current=0,startTime=0;
        for(let i=0;i<total;i++){
            const x=rand(5,80),y=rand(5,80);
            targets.push({x,y});
        }
        const renderTargets=()=>{
            field.innerHTML=targets.map((t,i)=>{
                let cls=i<current?"hit":(i===current?"active":"");
                return`<div class="agility-target ${cls}" style="left:${t.x}%;top:${t.y}%" data-idx="${i}">${i+1}</div>`;
            }).join("");
        };
        renderTargets();startTime=performance.now();
        field.onclick=e=>{
            const el=e.target.closest(".agility-target");if(!el)return;
            const idx=parseInt(el.dataset.idx);
            if(idx===current){current++;info.textContent=`Targets: ${current}/${total}`;renderTargets();
            if(current>=total){const elapsed=(performance.now()-startTime)/1000;
                let grade=0;if(elapsed<4)grade=1;else if(elapsed<6)grade=0.8;else if(elapsed<8)grade=0.5;else if(elapsed<12)grade=0.3;else grade=0.1;
                this.showResult(grade);}}
        };
    },

    // === Guts Mash ===
    startGutsMash(){
        document.getElementById("mg-instructions").textContent="Mash the button as fast as you can! 5 seconds.";
        const arena=document.getElementById("mg-arena");
        arena.innerHTML=`<div class="guts-timer" id="gt">5.0</div><div class="guts-meter"><div class="guts-fill" id="gf" style="width:0%"></div></div><button class="mg-tap-btn" id="gmb">MASH!</button><div class="guts-count" id="gc">0 taps</div>`;
        const timer=document.getElementById("gt"),bar=document.getElementById("gf"),btn=document.getElementById("gmb"),counter=document.getElementById("gc");
        let taps=0,timeLeft=5,done=false;const target=40;
        const start=performance.now();
        const update=()=>{
            if(done)return;
            timeLeft=Math.max(0,5-(performance.now()-start)/1000);
            timer.textContent=timeLeft.toFixed(1);
            bar.style.width=Math.min(100,(taps/target)*100)+"%";
            if(timeLeft<=0){done=true;let grade=Math.min(1,taps/target);this.showResult(grade);return;}
            this.anim=requestAnimationFrame(update);
        };
        this.anim=requestAnimationFrame(update);
        btn.onclick=()=>{if(!done){taps++;counter.textContent=taps+" taps";}};
    }
};

// --- Race Engine ---
const RaceEngine={
    runners:[],race:null,playerId:null,anim:null,raceTime:0,finished:false,finishOrder:[],
    commentaryTimer:0,phase:"start",
    // player controls
    holding:false,whipCooldown:0,playerStamina:100,

    run(race,runners,playerId){
        this.race=race;this.playerId=playerId;
        this.runners=runners.map((r,i)=>({...r,lane:i,distance:0,currentSpeed:0,finished:false,finishTime:null,position:i+1,raceStamina:50+r.stats.stamina*0.5,drafting:false}));
        this.finishOrder=[];this.raceTime=0;this.finished=false;this.commentaryTimer=0;this.phase="start";
        this.holding=false;this.whipCooldown=0;
        const playerRunner=this.runners.find(r=>r.id===playerId);
        this.playerStamina=playerRunner?playerRunner.raceStamina:100;
        UI.showScreen("screen-race");
        document.getElementById("race-name-display").textContent=race.name;
        document.getElementById("race-distance-display").textContent=race.distance+"m "+race.surface;
        document.getElementById("race-stamina-fill").style.width=this.playerStamina/1.5+"%";
        this.buildTrack();
        document.getElementById("race-commentary").textContent="Horses approaching the gate...";
        setTimeout(()=>{
            document.getElementById("race-commentary").textContent=pick(COMMENTARIES.start);
            this.lastFrame=performance.now();
            this.anim=requestAnimationFrame(t=>this.update(t));
        },1200);
    },

    buildTrack(){
        const lanes=document.getElementById("race-lanes");
        lanes.innerHTML=this.runners.map((r,i)=>`
            <div class="race-lane ${r.isPlayer?'player-lane':''}">
                <span class="lane-number">${i+1}</span>
                <div class="horse-sprite" id="sprite-${i}">
                    <span class="horse-body" style="color:${r.color}">&#127943;</span>
                    <span class="horse-label ${r.isPlayer?'player-label':''}">${r.name}</span>
                </div>
            </div>`).join("");
        document.getElementById("race-positions").innerHTML="";
    },

    // Controls
    holdStart(){this.holding=true;document.getElementById("btn-hold").classList.add("active");},
    holdEnd(){this.holding=false;document.getElementById("btn-hold").classList.remove("active");},

    whip(){
        if(this.whipCooldown>0||this.finished)return;
        const p=this.runners.find(r=>r.id===this.playerId);if(!p||p.finished)return;
        if(this.playerStamina<8){UI.notify("No stamina for whip!","error");return;}
        this.playerStamina-=8;p.currentSpeed+=15;this.whipCooldown=2;
        // mood impact
        const h=State.horses.find(x=>x.id===this.playerId);
        if(h)h.mood=clamp(h.mood-2,0,100);
        document.getElementById("btn-whip").classList.add("cooldown");
        const leader=this.runners.reduce((a,b)=>b.distance>a.distance?b:a);
        document.getElementById("race-commentary").textContent=pick(COMMENTARIES.whip).replace("{horse}",p.name);
    },

    moveInside(){
        const p=this.runners.find(r=>r.id===this.playerId);if(!p||p.finished)return;
        if(p.lane>0){
            const newLane=p.lane-1;
            const other=this.runners.find(r=>r.lane===newLane&&!r.finished);
            if(!other||Math.abs(other.distance-p.distance)>this.race.distance*0.02){
                if(other)other.lane=p.lane;
                p.lane=newLane;this.rebuildLanes();
            }
        }
    },

    moveOutside(){
        const p=this.runners.find(r=>r.id===this.playerId);if(!p||p.finished)return;
        if(p.lane<this.runners.length-1){
            const newLane=p.lane+1;
            const other=this.runners.find(r=>r.lane===newLane&&!r.finished);
            if(!other||Math.abs(other.distance-p.distance)>this.race.distance*0.02){
                if(other)other.lane=p.lane;
                p.lane=newLane;this.rebuildLanes();
            }
        }
    },

    rebuildLanes(){this.buildTrack();},

    update(ts){
        const dt=Math.min((ts-this.lastFrame)/1000,0.05);
        this.lastFrame=ts;this.raceTime+=dt;
        if(this.whipCooldown>0){this.whipCooldown-=dt;if(this.whipCooldown<=0)document.getElementById("btn-whip").classList.remove("cooldown");}
        const maxDist=Math.max(...this.runners.map(r=>r.distance));
        const progress=maxDist/this.race.distance;
        if(progress<0.15)this.phase="early";else if(progress<0.5)this.phase="middle";else if(progress<0.85)this.phase="late";else this.phase="finish";

        for(const r of this.runners){
            if(r.finished)continue;
            const s=r.stats,e=(r.energy||80)/100,m=(r.mood||70)/100;
            const isPlayer=r.id===this.playerId;
            const rp=r.distance/this.race.distance;
            // trait bonuses
            let traitBonus=0;
            if(r.traits){
                for(const t of r.traits){
                    if(t.name==="Gate Dasher"&&rp<0.15)traitBonus+=4;
                    if(t.name==="Second Wind"&&rp>0.7)traitBonus+=4;
                    if(t.name==="Sprinter"&&this.race.distance<=1200)traitBonus+=3;
                    if(t.name==="Marathon Man"&&this.race.distance>=2000)traitBonus+=3;
                }
            }
            // hidden affinity
            let affinityBonus=0;
            if(r.hidden){
                if(r.hidden.includes("short")&&this.race.distance<=1200)affinityBonus+=2;
                if(r.hidden.includes("medium")&&this.race.distance>1200&&this.race.distance<=2000)affinityBonus+=2;
                if(r.hidden.includes("long")&&this.race.distance>2000)affinityBonus+=2;
                if(r.hidden.includes(this.race.surface))affinityBonus+=2;
                if(r.hidden.includes("frontrunner")&&rp<0.4)affinityBonus+=2;
                if(r.hidden.includes("closer")&&rp>0.6)affinityBonus+=3;
            }
            let base=(s.speed*0.35+s.acceleration*0.2+s.stamina*0.15+s.agility*0.15+s.guts*0.15);
            let accel=rp<0.15?s.acceleration*0.25:0;
            let drain=rp>0.5?(1-s.stamina/100)*18*(rp-0.5):0;
            let sprint=rp>0.8?(s.speed*0.12+s.guts*0.1)*e:0;
            let variance=(Math.random()-0.45)*(3+s.agility*0.04);

            // Player controls
            if(isPlayer){
                if(this.holding){base*=0.6;this.playerStamina=Math.min(100,this.playerStamina+dt*5);}
                else{this.playerStamina-=dt*(3+rp*4);if(this.playerStamina<=0){this.playerStamina=0;base*=0.5;}}
                base+=this.playerStamina*0.05;
                document.getElementById("race-stamina-fill").style.width=(this.playerStamina/1.5)+"%";
            }else{
                // NPC stamina AI
                r.raceStamina-=dt*(2.5+rp*3);
                if(r.raceStamina<=0){r.raceStamina=0;base*=0.5;}
                if(rp>0.7&&r.raceStamina>10)r.raceStamina-=dt*2;// NPC sprint push
            }

            let target=(base+accel+sprint-drain+variance+traitBonus+affinityBonus)*e*(0.7+m*0.3)*0.85;
            r.currentSpeed+=(target-r.currentSpeed)*0.12;
            r.currentSpeed=Math.max(5,r.currentSpeed);
            r.distance+=r.currentSpeed*dt*3;
            if(r.distance>=this.race.distance){r.distance=this.race.distance;r.finished=true;r.finishTime=this.fmtTime(this.raceTime);this.finishOrder.push(r);}
        }

        const sorted=[...this.runners].sort((a,b)=>b.distance-a.distance);
        sorted.forEach((r,i)=>r.position=i+1);
        this.render(sorted);
        this.commentaryTimer+=dt;
        if(this.commentaryTimer>2.5){this.commentaryTimer=0;this.showCommentary(sorted);}
        if(this.holding){
            const leader=sorted[0];
            if(this.commentaryTimer<0.1){
                const p=this.runners.find(r=>r.id===this.playerId);
                if(p&&p.position>1&&Math.random()<0.3)document.getElementById("race-commentary").textContent=pick(COMMENTARIES.hold).replace("{horse}",p.name);
            }
        }
        if(this.runners.every(r=>r.finished)){
            this.finished=true;
            document.getElementById("race-commentary").textContent=pick(COMMENTARIES.finish).replace("{horse}",this.finishOrder[0].name);
            setTimeout(()=>Game.finishRace(this.race,this.finishOrder,this.playerId),2000);
            return;
        }
        this.anim=requestAnimationFrame(t=>this.update(t));
    },

    render(sorted){
        const tw=document.getElementById("racetrack").offsetWidth;
        const sx=55,ex=tw-40,range=ex-sx;
        for(const r of this.runners){
            const sp=document.getElementById(`sprite-${r.lane}`);if(!sp)continue;
            sp.style.left=sx+r.distance/this.race.distance*range+"px";
        }
        document.getElementById("race-positions").innerHTML=sorted.slice(0,5).map((r,i)=>{
            const c=i===0?'first':i===1?'second':i===2?'third':'';
            return`<div class="pos-entry ${c}"><span class="pos-number">${i+1}.</span><span>${r.name}${r.isPlayer?' *':''}</span></div>`;
        }).join("");
    },

    showCommentary(sorted){
        const l=sorted[0],s=sorted[1];
        let pool=COMMENTARIES[this.phase]||COMMENTARIES.middle;
        if(s&&(l.distance-s.distance)<this.race.distance*0.03)pool=[...pool,...COMMENTARIES.close];
        let t=pick(pool);t=t.replace("{horse}",l.name);if(s)t=t.replace("{horse2}",s.name);
        document.getElementById("race-commentary").textContent=t;
    },

    fmtTime(sec){const m=Math.floor(sec/60),s=(sec%60).toFixed(2);return m>0?m+":"+s.padStart(5,"0"):s+"s";}
};

// --- Init ---
document.addEventListener("DOMContentLoaded",()=>UI.showScreen("screen-title"));
