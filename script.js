const display = document.getElementById('display');
// Load the last result from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
  const lastResult = localStorage.getItem('lastResult');
  if (lastResult) {
    display.value = lastResult;
  }
});
// Add keyboard input support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  // Check if the key is a number or a basic operator
  if (!isNaN(key) || "+-*/.".includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    // Calculate result on Enter key
    event.preventDefault(); // Prevent default form submission or other Enter key behavior
    calculate();
  } else if (key === 'Escape') {
    // Clear display on Escape key
    clearDisplay();
  } else if (key === '%') {
    // Calculate percentage on '%' key
    calculatePercentage();
  } else if (key === 'Backspace') {
    // Remove last character on Backspace
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
  // Use regex to validate the expression before evaluating
  const validPattern = /^[\d+\-*/.() ]+$/;
  if (!validPattern.test(expression)) {
    alert('Invalid expression');
    return;
  }

  try {
    // Evaluate the expression and update the display
    const result = eval(expression);
    display.value = result;
    // Store the result in localStorage
    localStorage.setItem('lastResult', result);
  } catch (error) {
    alert('Error in calculation');
  }
}
// Calculate percentage of the current value
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
// Delete the last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}
