let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
let gameActive = true; // Variable zur Überprüfung, ob das Spiel läuft

function init() {
  render();
  updateCurrentPlayerDisplay();
}

function render() {
  const container = document.getElementById("container");
  let tableHTML = '<table id="gameTable">';

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      const fieldIndex = i * 3 + j;
      const fieldValue = fields[fieldIndex];
      let displayValue = "";

      if (fieldValue === "circle") {
        displayValue = generateCircleSVG();
      } else if (fieldValue === "cross") {
        displayValue = generateCrossSVG();
      }

      tableHTML += `<td onclick="playMove(this, ${fieldIndex})">${displayValue}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  container.innerHTML = tableHTML;
}

function playMove(cell, fieldIndex) {
  if (gameActive && fields[fieldIndex] === null) {
    fields[fieldIndex] = currentPlayer;
    cell.innerHTML =
      currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null; // Deaktiviere den Klick auf das Feld nach dem Zug
    checkGameStatus(); // Überprüfe den Spielstatus nach jedem Zug
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Wechsle den Spieler
    updateCurrentPlayerDisplay(); // Aktualisiere die Anzeige des aktuellen Spielers
  }
}

function checkGameStatus() {
  const winningCombos = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // horizontale Gewinnkombinationen
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // vertikale Gewinnkombinationen
    [0, 4, 8],[2, 4, 6], // diagonale Gewinnkombinationen
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      gameActive = false; // Spiel beenden
      highlightWinnerCells(a, b, c); // Markiere die Gewinnzellen
      showResetButton(); // Zeige den Reset-Button
      return;
    }
  }

  // Überprüfe auf Unentschieden
  if (!fields.includes(null)) {
    gameActive = false; // Spiel beenden
    showResetButton(); // Zeige den Reset-Button
  }
}

function showResetButton() {
  const resetButtonHTML = '<button onclick="resetGame()">Neues Spiel</button>';
  const container = document.getElementById('resetbutton');
  container.insertAdjacentHTML('beforeend', resetButtonHTML);
}

function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle";
  gameActive = true;
  render(); // Rendere das Spielbrett neu
  updateCurrentPlayerDisplay();

  // Entferne den Reset-Button und die SVG-Linie
  const resetButton = document.querySelector("button");
  if (resetButton) {
    resetButton.remove();
  }
  const svgElement = document.querySelector("svg.winner-line");
  if (svgElement) {
    svgElement.remove();
  }
}

function updateCurrentPlayerDisplay() {
    const currentPlayerDisplay = document.getElementById("currentPlayer");
    if (currentPlayer === "circle") {
        currentPlayerDisplay.innerHTML = 'Aktueller Spieler: <span class="circle-color">Kreis</span>';
    } else {
        currentPlayerDisplay.innerHTML = 'Aktueller Spieler: <span class="cross-color">Kreuz</span>';
    }
}

function highlightWinnerCells(a, b, c) {
  const cellSize = 125; // Größe der Zellen (anpassen, falls nötig)
  const svgHTML = `
      <svg class="winner-line" width="${3 * cellSize}" height="${3 * cellSize}" viewBox="0 0 ${3 * cellSize} ${3 * cellSize}" xmlns="http://www.w3.org/2000/svg" style="position: absolute; z-index: 1;">
          <line x1="${getCellCenterX(a, cellSize)}" y1="${getCellCenterY(a, cellSize)}" 
                x2="${getCellCenterX(c, cellSize)}" y2="${getCellCenterY(c, cellSize)}"
                stroke="#FFFFFF" stroke-width="10" />
      </svg>
  `;
  
  const container = document.getElementById('container');
  container.insertAdjacentHTML('beforeend', svgHTML);
}

function getCellCenterX(index, cellSize) {
  const columnIndex = index % 3;
  return (columnIndex + 0.5) * cellSize;
}

function getCellCenterY(index, cellSize) {
  const rowIndex = Math.floor(index / 3);
  return (rowIndex + 0.5) * cellSize;
}

function generateCircleSVG() {
  const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#00B0EF" stroke-width="10" fill="none"
                    stroke-dasharray="283" stroke-dashoffset="283" class="animated-circle" />
        </svg>
    `;
  return svgHTML;
}

function generateCrossSVG() {
  const svgHTML = `
        <svg width="85" height="85" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
            <line class="line1" x1="25" y1="25" x2="95" y2="95" stroke="#FFC000" stroke-width="12" />
            <line class="line2" x1="95" y1="25" x2="25" y2="95" stroke="#FFC000" stroke-width="12" />
        </svg>
    `;
  return svgHTML;
}


