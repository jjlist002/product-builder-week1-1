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

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = '전송 중...';
    formStatus.className = 'form-status';

    try {
        const res = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            formStatus.textContent = '문의가 성공적으로 전송되었습니다!';
            formStatus.classList.add('success');
            contactForm.reset();
        } else {
            formStatus.textContent = '전송에 실패했습니다. 다시 시도해주세요.';
            formStatus.classList.add('error');
        }
    } catch {
        formStatus.textContent = '네트워크 오류가 발생했습니다.';
        formStatus.classList.add('error');
    }
});
