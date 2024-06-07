
function openTable(){
  // Find the button with title "Opening explorer & tablebase"
  var explorerBtn = document.querySelector('button[title="Opening explorer & tablebase"]');
  console.log(explorerBtn);

  // Check the class of explorerBtn
  if (explorerBtn.className === "fbt active hidden") {
      // Find the button with title "Menu" and class "fbt active"
      var menuBtn = document.querySelector('button[title="Menu"]');
      // Click the menu button
      if (menuBtn) {
          menuBtn.click();
      }
  }

  // Check the id of explorerBtn
  if (explorerBtn.className === "fbt") {
      // Click the explorer button
      console.log("Clicking explorer button");
      explorerBtn.click();
  }
}

function clickRandomMove() {

  openTable();

  // Get the table with class name "moves"
  const movesTable = document.querySelector('table.moves');

  //console.log(movesTable);


  // Get all the move elements on the board with a valid text
  const moveElements = Array.from(movesTable.querySelectorAll('td')).filter(td => {
    const textValue = parseFloat(td.innerText);
    return !isNaN(textValue) && !td.innerText.includes('%');
  });
  // Drop the row of the sum
  if (moveElements.length >= 2) {
    moveElements.pop();
  }
  //console.log(moveElements);


  // Create an array to store the frequency of each move
  const moveFrequencies = [];

  // Loop through each move element and add its frequency to the array
  for (const move of moveElements) {
    moveFrequencies.push(parseFloat(move.innerText.replace(/,/g, '')) / 100);
  }
  //console.log(moveFrequencies);

  // Generate a random index based on the frequency array
  const randomIndex = weightedRandomIndex(moveFrequencies);

  // Click the move element at the random index
  moveElements[randomIndex].click();
}

// Helper function to generate a random index based on an array of frequencies
function weightedRandomIndex(frequencies) {
  const total = frequencies.reduce((acc, val) => acc + val, 0);
  let random = Math.random() * total;
  for (let i = 0; i < frequencies.length; i++) {
    random -= frequencies[i];
    if (random < 0) {
      return i;
    }
  }
  return frequencies.length - 1;
}


// Get the header with ID 'top'
const topHeader = document.getElementById('top');

//const siteButtons = document.getElementsByClassName('site-buttons');

// Create a button element
const button = document.createElement('button');

button.setAttribute('type', 'button');
button.innerText = 'Click for a random move!';
button.style.display = 'block';
button.style.margin = 'auto';

button.style.backgroundColor = "#dfdbd6"; 
button.style.color = "#090909"; 

// Append the button to the top header
//topHeader.insertAdjacentElement('afterend', button);
topHeader.appendChild(button);

// Add a click event listener to the button
button.addEventListener('click', clickRandomMove);


document.addEventListener('keydown', function(event) {
  if (event.key === 'q' || event.key === 'Q') {
      clickRandomMove();
  }
});