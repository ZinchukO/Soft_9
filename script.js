const display = document.getElementById('display');
const historyList = document.getElementById('historyList');

// Load the last result and history from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
  const lastResult = localStorage.getItem('lastResult');
  const history = JSON.parse(localStorage.getItem('history')) || [];
  
  if (lastResult) {
    display.value = lastResult;
  }
  loadHistory(history);
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === '%') {
    calculatePercentage();
  } else if (key === 'Backspace') {
    deleteLast();
  }
});

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  const expression = display.value;

  const validPattern = /^[\d+\-*/.() ]+$/;
  if (!validPattern.test(expression)) {
    alert('Invalid expression');
    return;
  }

  try {
    const result = eval(expression);
    display.value = result;

    // Store the result and save it in history
    localStorage.setItem('lastResult', result);
    addToHistory(expression, result);
  } catch (error) {
    alert('Error in calculation');
  }
}

function calculatePercentage() {
  try {
    const currentValue = parseFloat(display.value);
    if (!isNaN(currentValue)) {
      display.value = currentValue / 100;
    } else {
      alert('Invalid value for percentage calculation');
    }
  } catch (error) {
    alert('Error in percentage calculation');
  }
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Add calculation to history
function addToHistory(expression, result) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const newEntry = `${expression} = ${result}`;
  history.push(newEntry);

  // Keep only the last 10 entries
  if (history.length > 10) history.shift();

  localStorage.setItem('history', JSON.stringify(history));
  loadHistory(history);
}

// Load and display history
function loadHistory(history) {
  historyList.innerHTML = '';
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}
