// Инициализация VK Bridge
const vkBridge = window.vkBridge;
vkBridge.send('VKWebAppInit');

// ИГРОВЫЕ ДАННЫЕ
let gameData = {
    balance: 1000,
    inventory: [],
    clickValue: 1,
    autoClickValue: 0,
    clickUpgradePrice: 10,
    autoClickUpgradePrice: 50,
    casesOpened: 0,
    playerName: "Игрок"
};

let isSpinning = false;

// ПРЕДМЕТЫ (Вместо картинок теперь просто данные)
// rarity: covert (красный), classified (розовый), restricted (фиолетовый), mil-spec (синий)
const items = [
    { name: "AK-47 | Gold", rarity: "covert", price: 15000 },
    { name: "M4A4 | Robot", rarity: "covert", price: 12000 },
    { name: "USP-S | White", rarity: "classified", price: 8000 },
    { name: "AWP | Neon", rarity: "classified", price: 7000 },
    { name: "MAC-10 | Box", rarity: "restricted", price: 2000 },
    { name: "P250 | Build", rarity: "restricted", price: 1500 },
    { name: "MP9 | Light", rarity: "mil-spec", price: 500 },
    { name: "Five-Seven | Cool", rarity: "mil-spec", price: 400 }
];

const cases = {
    dreams: {
        name: "Dreams Case",
        price: 299,
        items: [...items]
    }
};

let currentCase = 'dreams';

// DOM Elements
const balanceElement = document.getElementById('balance');
const clickerButton = document.getElementById('clickerButton');

// --- ЗАГРУЗКА И СОХРАНЕНИЕ ---
function loadGame() {
    const savedData = localStorage.getItem('cs2CaseGameData');
    if (savedData) {
        const loadedData = JSON.parse(savedData);
        gameData = { ...gameData, ...loadedData };
    }
}

function saveGame() {
    localStorage.setItem('cs2CaseGameData', JSON.stringify(gameData));
}

function updateUI() {
    balanceElement.textContent = Math.floor(gameData.balance);
    document.getElementById('clickValue').textContent = gameData.clickValue;
    document.getElementById('autoClickValue').textContent = gameData.autoClickValue;
    document.getElementById('clickUpgradePrice').textContent = gameData.clickUpgradePrice;
    document.getElementById('autoClickUpgradePrice').textContent = gameData.autoClickUpgradePrice;
    
    // Кнопки улучшений
    document.querySelector('#clickUpgrade .upgrade-button').disabled = gameData.balance < gameData.clickUpgradePrice;
    document.querySelector('#autoClickUpgrade .upgrade-button').disabled = gameData.balance < gameData.autoClickUpgradePrice;
}

// --- КЛИКЕР ---
function handleClick(event) {
    if (!event) return;
    gameData.balance += gameData.clickValue;
    
    // Анимация денег
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const moneyText = document.createElement('div');
    moneyText.className = 'money-text';
    moneyText.textContent = '+' + gameData.clickValue;
    moneyText.style.left = x + 'px';
    moneyText.style.top = y + 'px';
    event.target.appendChild(moneyText);
    
    setTimeout(() => moneyText.remove(), 800);
    updateUI();
}

function autoClick() {
    if (gameData.autoClickValue > 0) {
        gameData.balance += gameData.autoClickValue;
        updateUI();
    }
}

function upgradeClick() {
    if (gameData.balance >= gameData.clickUpgradePrice) {
        gameData.balance -= gameData.clickUpgradePrice;
        gameData.clickValue++;
        gameData.clickUpgradePrice = Math.floor(gameData.clickUpgradePrice * 1.5);
        updateUI();
        saveGame();
    }
}

function upgradeAutoClick() {
    if (gameData.balance >= gameData.autoClickUpgradePrice) {
        gameData.balance -= gameData.autoClickUpgradePrice;
        gameData.autoClickValue++;
        gameData.autoClickUpgradePrice = Math.floor(gameData.autoClickUpgradePrice * 1.8);
        updateUI();
        saveGame();
    }
}

// --- СОЗДАНИЕ ПРЕДМЕТА (ЗАГЛУШКА) ---
function createItemElement(item, showSellButton = true) {
    const itemElement = document.createElement('div');
    itemElement.className = `weapon-item ${item.rarity}`;
    
    // Вместо IMG создаем цветной DIV
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder-img';
    placeholder.innerHTML = '<span>СКИН</span>'; // Текст внутри заглушки
    
    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.textContent = item.name;
    
    itemElement.appendChild(placeholder);
    itemElement.appendChild(nameElement);
    
    if (showSellButton) {
        const sellButton = document.createElement('button');
        sellButton.className = 'sell-button';
        sellButton.textContent = `Продать: ${item.price}`;
        sellButton.onclick = (e) => {
            e.stopPropagation();
            sellItem(item);
        };
        itemElement.appendChild(sellButton);
    }
    
    return itemElement;
}

// --- ИНВЕНТАРЬ ---
function addToInventory(item) {
    gameData.inventory.push(item);
    updateInventory();
    saveGame();
}

function updateInventory() {
    const container = document.getElementById('inventoryItems');
    container.innerHTML = '';
    gameData.inventory.forEach(item => {
        container.appendChild(createItemElement(item));
    });
}

function sellItem(item) {
    const index = gameData.inventory.indexOf(item);
    if (index > -1) {
        gameData.inventory.splice(index, 1);
        gameData.balance += item.price;
        updateUI();
        updateInventory();
        saveGame();
    }
}

function sellAllItems() {
    let total = 0;
    gameData.inventory.forEach(i => total += i.price);
    gameData.balance += total;
    gameData.inventory = [];
    updateUI();
    updateInventory();
    saveGame();
}

// --- РУЛЕТКА И ОТКРЫТИЕ ---
function spinRoulette() {
    if (isSpinning) return;
    const caseData = cases[currentCase];
    if (gameData.balance < caseData.price) {
        alert("Не хватает денег!");
        return;
    }
    
    isSpinning = true;
    gameData.balance -= caseData.price;
    gameData.casesOpened++;
    updateUI();
    
    // UI переключение
    document.querySelector('.cases-grid').style.display = 'none';
    document.querySelector('.roulette-container').style.display = 'block';
    
    const container = document.querySelector('.items-container');
    container.innerHTML = '';
    container.style.transition = 'none';
    container.style.transform = 'translateX(0)';
    
    // Генерация ленты
    const elements = [];
    // 50 предметов до выигрыша
    for(let i=0; i<50; i++) elements.push(getRandomItem());
    const winner = getRandomItem();
    elements.push(winner);
    // 10 после
    for(let i=0; i<10; i++) elements.push(getRandomItem());
    
    elements.forEach(item => {
        const el = createItemElement(item, false);
        container.appendChild(el);
    });
    
    // Запуск вращения
    setTimeout(() => {
        const itemWidth = 150; // 140 width + 10 margin
        // Смещаем так, чтобы 51-й элемент (winner) был по центру
        // 50 элементов * ширина + половина ширины - половина экрана
        const offset = (50 * itemWidth) + (itemWidth / 2) - (document.querySelector('.roulette-container').offsetWidth / 2);
        
        container.style.transition = 'transform 6s cubic-bezier(0.1, 0, 0.2, 1)'; // Эффект замедления
        container.style.transform = `translateX(-${offset}px)`;
        
        setTimeout(() => {
            isSpinning = false;
            addToInventory(winner);
            alert(`Выпал: ${winner.name}`);
            
            // Возврат
            document.querySelector('.roulette-container').style.display = 'none';
            document.querySelector('.cases-grid').style.display = 'grid';
        }, 6500);
    }, 100);
}

function getRandomItem() {
    const r = Math.random() * 100;
    if (r < 1) return items.find(i => i.rarity === 'covert');
    if (r < 5) return items.find(i => i.rarity === 'classified');
    if (r < 20) return items.find(i => i.rarity === 'restricted');
    return items.find(i => i.rarity === 'mil-spec');
}

// --- ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ---
function switchTab(e) {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    
    e.target.classList.add('active');
    document.getElementById(e.target.dataset.tab).classList.add('active');
}

// --- ЗАПУСК ---
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateUI();
    
    // Инициализация кнопок
    document.querySelectorAll('.tab-button').forEach(btn => btn.addEventListener('click', switchTab));
    document.getElementById('clickerButton').addEventListener('click', handleClick);
    document.querySelector('#clickUpgrade .upgrade-button').addEventListener('click', upgradeClick);
    document.querySelector('#autoClickUpgrade .upgrade-button').addEventListener('click', upgradeAutoClick);
    document.getElementById('sellAll').addEventListener('click', sellAllItems);
    
    // Кнопка открытия кейса
    document.querySelectorAll('.open-button').forEach(btn => {
        btn.addEventListener('click', spinRoulette);
    });
    
    // VK Имя
    vkBridge.send('VKWebAppGetUserInfo').then(data => {
        if(data.first_name) {
            gameData.playerName = data.first_name;
            saveGame();
        }
    }).catch(e => console.log(e));
    
    // Таймеры
    setInterval(autoClick, 1000);
    setInterval(saveGame, 10000);
    
    // Заполняем инвентарь при старте
    updateInventory();
});