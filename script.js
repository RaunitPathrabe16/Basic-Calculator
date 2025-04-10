const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const historyList = document.getElementById('historyList');
const clearBtn = document.getElementById('clearHistory');

let current = '';
let history = [];

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.textContent;

        if (val === 'C') {
            current = '';
            display.value = '0';
        } else if (val === '⌫') {
            current = current.slice(0, -1);
            display.value = current || '0';
        } else if (val === '=') {
            try {
                const result = eval(current.replace('×', '*').replace('÷', '/').replace('√', 'Math.sqrt'));
                history.push(`${current} = ${result}`);
                updateHistory();
                current = result.toString();
                display.value = current;
            } catch {
                display.value = 'Error';
                current = '';
            }
        } else {
            if (val === '√') {
                current += '√(';
            } else {
                current += val;
            }
            display.value = current;
        }
    });
});

clearBtn.addEventListener('click', () => {
    history = [];
    updateHistory();
    display.value = '0';
    current = '';
});


function updateHistory() {
    historyList.innerHTML = '';
    history.slice().reverse().forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}
