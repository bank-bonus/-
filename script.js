// Игровые данные
let gameData = {
    balance: 1000,
    inventory: [],
    clickValue: 1,
    autoClickValue: 0,
    clickUpgradeLevel: 1,
    autoClickUpgradeLevel: 0,
    clickUpgradePrice: 10,
    autoClickUpgradePrice: 50,
    casesOpened: 0,
    playerName: null
};

// Флаг для отслеживания состояния вращения
let isSpinning = false;

// Обновленный массив предметов с рабочими ссылками на изображения
const items = [
    {
        name: "AK-47 | Nightwish",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV08u_mpSOhcjnI7TDglRd4cJ5ntbN9J7yjRrhrUFuZ2vzJYfDJ1U_ZQmGrFO4xL3t0ZG8tZ_JzHQ16HVw-z-DyA2O4lp3/330x192",
        rarity: "covert",
        price: 15000
    },
    {
        name: "M4A4 | Temukau",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW09--kY-EmMj4OrzZglRd6dd2j6eUo9Sj2gXk-UU6NWv0cYKRIwVvMgnQ8lm3xO7ngsK7up_KmHBmuHFw-z-DyMqXkyvZ/330x192",
        rarity: "covert",
        price: 12000
    },
    {
        name: "USP-S | Printstream",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8bP4jVC9vh5yYGr7IYeVdQNoNF6F_1O-kOu515ftvZjPmHpguCAh4XjYnBK0n1gSOZNJ_r5Q/330x192",
        rarity: "classified",
        price: 8000
    },
    {
        name: "AWP | Chromatic Aberration",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJB5M65mYG0h_76OITck29Y_cg_3ruZo9nziwXj-EBkN2zxdtSRJlRqZFHWqFe3yeu90ZC-v5mYzSFk7j5iuygAeEUWVQ/330x192",
        rarity: "classified",
        price: 7000
    },
    {
        name: "MAC-10 | Toybox",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v73fDxBvYyJm4OOlvn9DLPUl31I18lwmO7Eu4_x2VKx_RVrMmz2INCWJlM6YVrT_lm8xezrhZC97ZzJwCNq6yRw7S3D30vgc01Zl7E/330x192",
        rarity: "restricted",
        price: 2000
    },
    {
        name: "P250 | Re.built",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09-5mpSEguXLPr7Vn35c18lwmO7Eu46h2QS1r0tvZjryd4_GcwJrYw3W_1O9k-7uhZbqvM6bzHFnviUgtynD30vgYyt-5ds/330x192",
        rarity: "restricted",
        price: 1500
    },
    {
        name: "MP9 | Featherweight",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZt7P7YKAJB49C5mpnbxsj4OrzZglRd6dd2j6eQ9N2t2wK3-ENsZ23wcIKRdQE2NwyD_FK_kLq9gJDu7p_KyyRr7yglnX7D30vgUTu7hiw/330x192",
        rarity: "mil-spec",
        price: 500
    },
    {
        name: "Five-SeveN | Scrawl",
        image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goWYkuHxPYTDk39D58dknuDO-7P5gVO8v11tMmD6IobEdFRsMFmB8lPvlL-dh8K_v5_MyXZg7nR25i2LnhS_1BlFcKUx0ncP6_UM/330x192",
        rarity: "mil-spec",
        price: 400
    }
];

// DOM элементы
const balanceElement = document.getElementById('balance');
const openButton = document.getElementById('openCase');
const showContentsButton = document.getElementById('showContents');
const rouletteContainer = document.querySelector('.roulette-container');
const itemsContainer = document.querySelector('.items-container');
const inventoryItems = document.getElementById('inventoryItems');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');
const clickerButton = document.getElementById('clickerButton');
const clickValueElement = document.getElementById('clickValue');
const autoClickValueElement = document.getElementById('autoClickValue');
const clickUpgradeButton = document.querySelector('#clickUpgrade .upgrade-button');
const autoClickUpgradeButton = document.querySelector('#autoClickUpgrade .upgrade-button');
const clickUpgradePriceElement = document.getElementById('clickUpgradePrice');
const autoClickUpgradePriceElement = document.getElementById('autoClickUpgradePrice');
const sellAllButton = document.getElementById('sellAll');

// Цена кейса
const CASE_PRICE = 299;

// Определение кейсов и их содержимого
const cases = {
    dreams: {
        name: "Dreams & Nightmares Case",
        price: 299,
        items: [
            // Существующие предметы остаются как есть
            ...items
        ]
    }
};

// Обновляем переменные DOM
const caseElements = document.querySelectorAll('.case');
const openButtons = document.querySelectorAll('.open-button');
const showContentsButtons = document.querySelectorAll('.show-contents-button');

let currentCase = 'dreams';

// Загрузка сохранения
function loadGame() {
    const savedData = localStorage.getItem('cs2CaseGameData');
    if (savedData) {
        const loadedData = JSON.parse(savedData);
        gameData = { ...gameData, ...loadedData };
        updateUI();
    }
}

// Сохранение игры
function saveGame() {
    localStorage.setItem('cs2CaseGameData', JSON.stringify(gameData));
}

// Обновление интерфейса
function updateUI() {
    balanceElement.textContent = gameData.balance;
    clickValueElement.textContent = gameData.clickValue;
    autoClickValueElement.textContent = gameData.autoClickValue;
    clickUpgradePriceElement.textContent = gameData.clickUpgradePrice;
    autoClickUpgradePriceElement.textContent = gameData.autoClickUpgradePrice;
    
    // Обновляем состояние кнопок улучшений
    clickUpgradeButton.disabled = gameData.balance < gameData.clickUpgradePrice;
    autoClickUpgradeButton.disabled = gameData.balance < gameData.autoClickUpgradePrice;
    
    // Обновляем инвентарь
    updateInventory();
}

// Обновление баланса
function updateBalance() {
    gameData.balance = Math.floor(gameData.balance);
    balanceElement.textContent = gameData.balance;
    updateUI();
    saveGame();
}

// Клик по кнопке
function handleClick(event) {
    if (!event) return;
    
    // Добавляем деньги
    gameData.balance += gameData.clickValue;
    
    // Создаем эффект клика
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    effect.style.left = (x - 25) + 'px';
    effect.style.top = (y - 25) + 'px';
    effect.style.width = '50px';
    effect.style.height = '50px';
    event.target.appendChild(effect);
    
    // Удаляем эффект после анимации
    setTimeout(() => effect.remove(), 500);
    
    // Создаем летящий текст с суммой
    const moneyText = document.createElement('div');
    moneyText.className = 'money-text';
    moneyText.textContent = '+' + gameData.clickValue + '₽';
    moneyText.style.left = x + 'px';
    moneyText.style.top = y + 'px';
    event.target.appendChild(moneyText);
    
    // Удаляем текст после анимации
    setTimeout(() => moneyText.remove(), 1000);
    
    updateBalance();
    updateLeaderboard();
}

// Авто-клик
function autoClick() {
    if (gameData.autoClickValue > 0) {
        gameData.balance += gameData.autoClickValue;
        updateBalance();
    }
}

// Улучшение клика
function upgradeClick() {
    if (gameData.balance >= gameData.clickUpgradePrice) {
        gameData.balance -= gameData.clickUpgradePrice;
        gameData.clickValue += 1;
        gameData.clickUpgradeLevel += 1;
        gameData.clickUpgradePrice = Math.floor(gameData.clickUpgradePrice * 1.5);
        updateUI();
        saveGame();
    }
}

// Улучшение авто-клика
function upgradeAutoClick() {
    if (gameData.balance >= gameData.autoClickUpgradePrice) {
        gameData.balance -= gameData.autoClickUpgradePrice;
        gameData.autoClickValue += 1;
        gameData.autoClickUpgradeLevel += 1;
        gameData.autoClickUpgradePrice = Math.floor(gameData.autoClickUpgradePrice * 1.8);
        updateUI();
        saveGame();
    }
}

// Продажа всех предметов
function sellAllItems() {
    if (gameData.inventory.length === 0) {
        return;
    }
    
    let totalValue = 0;
    gameData.inventory.forEach(item => {
        totalValue += item.price;
    });
    
    gameData.balance += totalValue;
    gameData.inventory = [];
    
    // Создаем уведомление о продаже
    const notification = document.createElement('div');
    notification.textContent = `Продано предметов на ${totalValue}₽`;
    notification.className = 'money-text';
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.fontSize = '24px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.padding = '15px 30px';
    notification.style.borderRadius = '10px';
    notification.style.zIndex = '9999';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
    
    updateBalance();
    updateInventory();
    updateLeaderboard();
}

// Создание элемента предмета с улучшенной обработкой ошибок
function createItemElement(item, showSellButton = true) {
    const itemElement = document.createElement('div');
    itemElement.className = `weapon-item ${item.rarity}`;
    
    // Создаем контейнер для изображения
    const imageContainer = document.createElement('div');
    imageContainer.className = 'weapon-image-container';
    
    // Создаем изображение с несколькими резервными вариантами
    const image = document.createElement('img');
    image.alt = item.name;
    
    // Функция для попытки загрузки изображения из разных источников
    const tryLoadImage = (sources, index = 0) => {
        if (index >= sources.length) {
            // Если все источники не сработали, используем базовое изображение оружия
            const weaponType = item.name.split('|')[0].trim().toLowerCase();
            const baseWeaponImage = getBaseWeaponImage(weaponType);
            image.src = baseWeaponImage;
            return;
        }

        image.src = sources[index];
        image.onerror = () => tryLoadImage(sources, index + 1);
    };

    // Пробуем разные домены Steam CDN
    const imageSources = [
        item.image,
        item.image.replace('community.akamai.steamstatic.com', 'community.steamstatic.com'),
        item.image.replace('community.akamai.steamstatic.com', 'steamcommunity-a.akamaihd.net'),
        item.image.replace('community.akamai.steamstatic.com', 'cdn.cloudflare.steamstatic.com')
    ];

    tryLoadImage(imageSources);
    
    // Добавляем изображение в контейнер
    imageContainer.appendChild(image);
    
    // Создаем название предмета
    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.textContent = item.name;
    
    // Добавляем все элементы
    itemElement.appendChild(imageContainer);
    itemElement.appendChild(nameElement);
    
    if (showSellButton) {
        const sellButton = document.createElement('button');
        sellButton.className = 'sell-button';
        sellButton.textContent = `Продать за ${item.price}₽`;
        sellButton.addEventListener('click', (e) => {
            e.stopPropagation();
            sellItem(item);
        });
        itemElement.appendChild(sellButton);
    }
    
    return itemElement;
}

// Функция для получения базового изображения оружия
function getBaseWeaponImage(weaponType) {
    const baseImages = {
        'ak-47': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV086jloKOhcj8NrrHj1Rd6dd2j6eQ9N2t2wK3-ENsZ23wcIKRdQE2NwyD_FK_kLq9gJDu7p_KyyRr7yglnX7D30vgUTu7hiw/360fx360f',
        'm4a4': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOzAot-jiQa3-hBqYzvzLdSVJlQ3NQvR-FfsxL3qh5e77ZXKwCQysyArsC3eyh22n1gSOQS_sTxj/360fx360f',
        'awp': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xO-Qod2i2lCy_EdoMW_7cYaQcQ5taFHW_1jvl-i8h8O_78zJznBnvHYl5y7YnUG3n1gSOXpk8gWs/360fx360f',
        'usp-s': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8bP4jVC9vh5yYGr7IoWVdABrYQ3Y-1m8xezp0ZTtvpjNmHpguCAhtnndzRW10x9KOvsv26KUE4Zjng/360fx360f',
        'mac-10': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v73fDxBvYyJkYyOlOPmOrjYgnJu5Mx2gv3--Y3nj1H6qhE9Y2HyIdKQewVvZ1zX_wW5xrjrhZC97ZXAzXs1vD5iuygK1K2JFw/360fx360f',
        'p250': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09-5mpSEguXLP7LWnn8f6cZ037uY8ImjjASxrhU5amj2LdPEJAE4YAvR-FG_k-3v1pC1tZrJnGwj5HcvxVHNBQ/360fx360f',
        'mp9': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZt7P7YKAJB49C5mpnbxsj4OrzZgiUFu8By27iQ9t2giQa3-hBrNWuhLYKRcgM4Z1_V_1K7wO7sg8K77pXXiSw0U0odZoE/360fx360f',
        'five-seven': 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goWYkuHxPYTDk39D58dknuDO-7P5gVO8v11tMmD6IobEdFRsMFmB8lPvlL-dh8K_v5_MyXZg7nR25i2LnhS_1BlFcKUx0ncP6_UM/360fx360f'
    };
    
    return baseImages[weaponType] || baseImages['ak-47'];
}

// Продажа отдельного предмета
function sellItem(item) {
    const index = gameData.inventory.findIndex(i => i === item);
    if (index !== -1) {
        gameData.inventory.splice(index, 1);
        gameData.balance += item.price;
        updateBalance();
        updateInventory();
        
        // Создаем уведомление о продаже
        const notification = document.createElement('div');
        notification.textContent = `Продан ${item.name} за ${item.price}₽`;
        notification.className = 'money-text';
        notification.style.position = 'fixed';
        notification.style.top = '50%';
        notification.style.left = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 2000);
    }
}

// Инициализация содержимого кейса
function initializeCaseContents() {
    const covertItems = document.querySelector('.covert-items');
    const classifiedItems = document.querySelector('.classified-items');
    const restrictedItems = document.querySelector('.restricted-items');
    const milspecItems = document.querySelector('.milspec-items');

    items.forEach(item => {
        const itemElement = createItemElement(item);
        switch(item.rarity) {
            case 'covert':
                covertItems.appendChild(itemElement.cloneNode(true));
                break;
            case 'classified':
                classifiedItems.appendChild(itemElement.cloneNode(true));
                break;
            case 'restricted':
                restrictedItems.appendChild(itemElement.cloneNode(true));
                break;
            case 'mil-spec':
                milspecItems.appendChild(itemElement.cloneNode(true));
                break;
        }
    });
}

// Генерация случайного предмета с учетом вероятностей
function getRandomItem() {
    const rand = Math.random() * 100;
    if (rand < 2) { // 2% шанс на Covert
        return items.filter(item => item.rarity === 'covert')[Math.floor(Math.random() * 2)];
    } else if (rand < 7) { // 5% шанс на Classified
        return items.filter(item => item.rarity === 'classified')[Math.floor(Math.random() * 2)];
    } else if (rand < 20) { // 13% шанс на Restricted
        return items.filter(item => item.rarity === 'restricted')[Math.floor(Math.random() * 2)];
    } else { // 80% шанс на Mil-spec
        return items.filter(item => item.rarity === 'mil-spec')[Math.floor(Math.random() * 2)];
    }
}

// Добавление предмета в инвентарь
function addToInventory(item) {
    gameData.inventory.push(item);
    const itemElement = createItemElement(item);
    itemElement.classList.add('new-item');
    inventoryItems.prepend(itemElement);
    saveGame();
}

// Обновление инвентаря
function updateInventory() {
    inventoryItems.innerHTML = '';
    gameData.inventory.forEach(item => {
        const itemElement = createItemElement(item);
        inventoryItems.appendChild(itemElement);
    });
}

// Функции для работы с таблицей рекордов
function getLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('cs2CaseLeaderboard')) || {
        balance: [],
        inventory: [],
        cases: []
    };
    return leaderboard;
}

function updateLeaderboard() {
    if (!gameData.playerName) return;

    const leaderboard = getLeaderboard();
    const inventoryValue = gameData.inventory.reduce((sum, item) => sum + item.price, 0);
    const playerData = {
        name: gameData.playerName,
        balance: gameData.balance,
        inventoryValue: inventoryValue,
        casesOpened: gameData.casesOpened
    };

    // Обновляем каждую категорию
    ['balance', 'inventory', 'cases'].forEach(category => {
        const value = category === 'balance' ? playerData.balance :
                     category === 'inventory' ? playerData.inventoryValue :
                     playerData.casesOpened;

        const existingIndex = leaderboard[category].findIndex(p => p.name === gameData.playerName);
        if (existingIndex !== -1) {
            leaderboard[category][existingIndex] = { name: playerData.name, value };
        } else {
            leaderboard[category].push({ name: playerData.name, value });
        }

        // Сортируем по убыванию
        leaderboard[category].sort((a, b) => b.value - a.value);
        // Оставляем только топ-10
        leaderboard[category] = leaderboard[category].slice(0, 10);
    });

    localStorage.setItem('cs2CaseLeaderboard', JSON.stringify(leaderboard));
    displayLeaderboard(document.querySelector('.category-button.active').dataset.category);
}

function displayLeaderboard(category) {
    const leaderboard = getLeaderboard();
    const leaderboardList = document.querySelector('.leaderboard-list');
    leaderboardList.innerHTML = '';

    leaderboard[category].forEach((player, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'leaderboard-item';
        itemElement.innerHTML = `
            <div class="leaderboard-position">${index + 1}</div>
            <div class="leaderboard-name">${player.name}</div>
            <div class="leaderboard-value">${player.value}${category === 'cases' ? '' : '₽'}</div>
        `;
        leaderboardList.appendChild(itemElement);
    });
}

// Обработчики событий для таблицы рекордов
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.category-button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        displayLeaderboard(e.target.dataset.category);
    });
});

// Обработчики событий для кейсов
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initializePlayer();
    updateUI();
    initializeCaseContents();
    displayLeaderboard('balance');
    
    // Добавляем обработчики для кейсов
    document.querySelectorAll('.case').forEach(caseElement => {
        const caseId = caseElement.dataset.case;
        const openButton = caseElement.querySelector('.open-button');
        const showContentsButton = caseElement.querySelector('.show-contents-button');

        openButton.addEventListener('click', () => {
            if (gameData.balance >= cases[caseId].price) {
                currentCase = caseId;
                // Обновляем информацию о выбранном кейсе
                document.getElementById('selected-case-image').src = caseElement.querySelector('img').src;
                document.getElementById('selected-case-name').textContent = cases[caseId].name;
                document.getElementById('selected-case-price').textContent = cases[caseId].price;
                
                // Показываем рулетку
                document.querySelector('.roulette-container').style.display = 'block';
                document.querySelector('.case-opening-header').style.display = 'block';
                document.getElementById('case-contents').style.display = 'none';
                document.querySelector('.cases-grid').style.display = 'none';
                
                // Запускаем рулетку
                spinRoulette();
            } else {
                alert('Недостаточно средств для открытия кейса!');
            }
        });

        showContentsButton.addEventListener('click', () => {
            currentCase = caseId;
            // Скрываем рулетку и показываем содержимое
            document.querySelector('.roulette-container').style.display = 'none';
            document.querySelector('.case-opening-header').style.display = 'none';
            document.getElementById('case-contents').style.display = 'block';
            document.querySelector('.cases-grid').style.display = 'block';
            updateCaseContents();
        });
    });
});

// Обновление содержимого кейса
function updateCaseContents() {
    const caseData = cases[currentCase];
    if (!caseData) return;

    const covertItems = document.querySelector('.covert-items');
    const classifiedItems = document.querySelector('.classified-items');
    const restrictedItems = document.querySelector('.restricted-items');
    const milspecItems = document.querySelector('.milspec-items');

    // Очищаем предыдущее содержимое
    covertItems.innerHTML = '';
    classifiedItems.innerHTML = '';
    restrictedItems.innerHTML = '';
    milspecItems.innerHTML = '';

    // Заполняем новым содержимым
    caseData.items.forEach(item => {
        const itemElement = createItemElement(item, false);
        switch(item.rarity) {
            case 'covert':
                covertItems.appendChild(itemElement);
                break;
            case 'classified':
                classifiedItems.appendChild(itemElement);
                break;
            case 'restricted':
                restrictedItems.appendChild(itemElement);
                break;
            case 'mil-spec':
                milspecItems.appendChild(itemElement);
                break;
        }
    });
}

// Функция для запуска рулетки
function spinRoulette() {
    if (isSpinning) return;
    
    const caseData = cases[currentCase];
    if (!caseData || gameData.balance < caseData.price) return;
    
    isSpinning = true;
    gameData.balance -= caseData.price;
    gameData.casesOpened++;
    updateBalance();
    
    // Очищаем предыдущие предметы
    const itemsContainer = document.querySelector('.items-container');
    itemsContainer.innerHTML = '';
    itemsContainer.style.transform = 'translateX(0)';
    
    // Добавляем индикатор выбора, если его нет
    if (!document.querySelector('.roulette-pointer')) {
        const pointer = document.createElement('div');
        pointer.className = 'roulette-pointer';
        document.querySelector('.roulette-container').appendChild(pointer);
    }
    
    // Генерируем случайные предметы для анимации
    const displayItems = [];
    // Добавляем предметы перед выигрышным
    for (let i = 0; i < 30; i++) {
        const randomItem = getRandomItem();
        displayItems.push({...randomItem, id: `item-${i}`});
    }
    
    // Выбираем выигрышный предмет
    const winningItem = getRandomItem();
    displayItems.push({...winningItem, id: 'winning-item'});
    
    // Добавляем предметы после выигрышного
    for (let i = 0; i < 30; i++) {
        const randomItem = getRandomItem();
        displayItems.push({...randomItem, id: `item-after-${i}`});
    }
    
    // Создаем элементы для рулетки
    displayItems.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.className = `weapon-item ${item.rarity}`;
        itemElement.id = item.id;
        
        // Создаем контейнер для изображения
        const imageContainer = document.createElement('div');
        imageContainer.className = 'weapon-image-container';
        
        // Создаем изображение
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        image.onerror = function() {
            // Используем соответствующее базовое изображение оружия в зависимости от типа
            const weaponType = item.name.split('|')[0].trim().toLowerCase();
            let fallbackImage = '';
            switch(weaponType) {
                case 'ak-47':
                    fallbackImage = 'weapon_ak47';
                    break;
                case 'm4a4':
                    fallbackImage = 'weapon_m4a1';
                    break;
                case 'awp':
                    fallbackImage = 'weapon_awp';
                    break;
                case 'usp-s':
                    fallbackImage = 'weapon_usp_silencer';
                    break;
                case 'mac-10':
                    fallbackImage = 'weapon_mac10';
                    break;
                case 'p250':
                    fallbackImage = 'weapon_p250';
                    break;
                case 'mp9':
                    fallbackImage = 'weapon_mp9';
                    break;
                case 'five-seven':
                    fallbackImage = 'weapon_fiveseven';
                    break;
                default:
                    fallbackImage = 'weapon_ak47';
            }
            this.src = `https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapons/base_weapons/${fallbackImage}.png`;
        };
        
        // Добавляем изображение в контейнер
        imageContainer.appendChild(image);
        
        // Создаем название предмета
        const nameElement = document.createElement('div');
        nameElement.className = 'name';
        nameElement.textContent = item.name;
        
        // Добавляем элементы в itemElement
        itemElement.appendChild(imageContainer);
        itemElement.appendChild(nameElement);
        
        itemsContainer.appendChild(itemElement);
    });
    
    // Вычисляем смещение для центрирования выигрышного предмета
    const itemWidth = 200; // Ширина элемента + отступы
    const offset = (30 * itemWidth) - (window.innerWidth / 2) + (itemWidth / 2);
    
    // Запускаем анимацию с задержкой
    setTimeout(() => {
        // Добавляем звук прокрутки
        playSpinSound();
        
        // Анимация прокрутки
        itemsContainer.style.transform = `translateX(-${offset}px)`;
        
        setTimeout(() => {
            // Находим выигрышный элемент и добавляем эффект
            const winningElement = document.getElementById('winning-item');
            winningElement.classList.add('winning');
            
            // Звук выигрыша
            playWinSound();
            
            // Добавляем предмет в инвентарь
            addToInventory(winningItem);
            isSpinning = false;
            updateLeaderboard();
            
            // Показываем уведомление о выигрыше
            showWinNotification(winningItem);
            
            // Возвращаем отображение сетки кейсов через 3 секунды
            setTimeout(() => {
                document.querySelector('.roulette-container').style.display = 'none';
                document.querySelector('.case-opening-header').style.display = 'none';
                document.querySelector('.cases-grid').style.display = 'block';
            }, 3000);
        }, 8000);
    }, 100);
}

function showWinNotification(item) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
            <div class="notification-text">
                <div>Вы получили</div>
                <div class="item-name">${item.name}</div>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
        // Переключаемся на вкладку инвентаря
        document.querySelectorAll('.tab-button').forEach(button => {
            if (button.dataset.tab === 'inventory') {
                button.click();
            }
        });
    }, 3000);
}

// Функции для звуков
function playSpinSound() {
    // Здесь можно добавить звук прокрутки
}

function playWinSound() {
    // Здесь можно добавить звук выигрыша
}

// Обработка переключения вкладок
function switchTab(event) {
    const targetTab = event.target.dataset.tab;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Обновляем активную панель
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(targetTab).classList.add('active');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initializePlayer();
    updateUI();
    initializeCaseContents();
    displayLeaderboard('balance');
    
    // Добавляем обработчики событий для вкладок
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', switchTab);
    });
    
    // Добавляем остальные обработчики событий
    clickerButton.addEventListener('click', handleClick);
    clickUpgradeButton.addEventListener('click', upgradeClick);
    autoClickUpgradeButton.addEventListener('click', upgradeAutoClick);
    sellAllButton.addEventListener('click', sellAllItems);
    
    // Запускаем авто-клик каждую секунду
    setInterval(autoClick, 1000);
    
    // Автосохранение каждые 30 секунд
    setInterval(saveGame, 30000);
    
    // Добавляем кнопку поделиться в верхнюю часть интерфейса
    addShareButton();
});

// Запрашиваем имя игрока при первом запуске
function initializePlayer() {
    if (!gameData.playerName) {
        const name = prompt('Введите ваше имя для таблицы рекордов:');
        if (name) {
            gameData.playerName = name;
            saveGame();
        }
    }
}

// Обновляем стили
const updatedStyles = document.createElement('style');
updatedStyles.textContent = `
    .weapon-image-container {
        width: 140px;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        overflow: hidden;
        position: relative;
    }
    
    .weapon-image-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
        z-index: 1;
    }
    
    .weapon-image-container img {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        transition: transform 0.3s ease;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    }
    
    .weapon-item:hover .weapon-image-container img {
        transform: scale(1.1);
    }
    
    .weapon-item {
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        border-radius: 12px;
        padding: 15px;
        transition: all 0.3s ease;
    }
    
    .weapon-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .weapon-item .name {
        margin-top: 10px;
        color: white;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .sell-button {
        width: 100%;
        margin-top: 10px;
        padding: 8px;
        border: none;
        border-radius: 6px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .sell-button:hover {
        background: linear-gradient(135deg, #45a049, #4CAF50);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(updatedStyles);

// Добавляем кнопку поделиться в верхнюю часть интерфейса
function addShareButton() {
    const shareButton = document.createElement('button');
    shareButton.className = 'share-button';
    shareButton.innerHTML = `
        <i class="fas fa-share-alt"></i>
        Поделиться
    `;
    shareButton.onclick = shareWebsite;
    
    // Добавляем кнопку в header или другой подходящий контейнер
    const header = document.querySelector('.header') || document.querySelector('.container');
    if (header) {
        header.appendChild(shareButton);
    }
}

// Функция для копирования ссылки и отображения уведомления
function shareWebsite() {
    const currentUrl = window.location.href;
    
    // Создаем временный input для копирования
    const tempInput = document.createElement('input');
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Создаем и показываем уведомление
    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.textContent = 'Ссылка скопирована в буфер обмена!';
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 2 секунды
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Добавляем стили для кнопки поделиться и уведомления
const shareStyles = document.createElement('style');
shareStyles.textContent = `
    .share-button {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .share-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        background: linear-gradient(135deg, #45a049, #4CAF50);
    }
    
    .share-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 8px;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(shareStyles); 