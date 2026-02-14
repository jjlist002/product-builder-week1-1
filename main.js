const lottoRowsContainer = document.getElementById('lotto-rows');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme toggle
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// Lotto number generator
function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getColorClass(num) {
    if (num < 10) return 'range-1';
    if (num < 20) return 'range-10';
    if (num < 30) return 'range-20';
    if (num < 40) return 'range-30';
    return 'range-40';
}

function displayAllRows() {
    lottoRowsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const numbers = generateNumbers();
        const row = document.createElement('div');
        row.classList.add('lotto-row');

        const label = document.createElement('span');
        label.classList.add('row-label');
        label.textContent = String.fromCharCode(65 + i);
        row.appendChild(label);

        for (const num of numbers) {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number', getColorClass(num));
            numberDiv.textContent = num;
            row.appendChild(numberDiv);
        }
        lottoRowsContainer.appendChild(row);
    }
}

generateBtn.addEventListener('click', displayAllRows);
