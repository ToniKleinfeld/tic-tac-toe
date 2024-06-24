let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    const container = document.getElementById('container');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const fieldIndex = i * 3 + j;
            const fieldValue = fields[fieldIndex];
            let displayValue = '';
            
            if (fieldValue === 'circle') {
                displayValue = generateCircleSVG();
            } else if (fieldValue === 'cross') {
                displayValue = generateCrossSVG();
            }
            
            tableHTML += `<td onclick="playMove(this, ${fieldIndex})">${displayValue}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}

function playMove(cell, fieldIndex) {
 if (fields[fieldIndex] === null) {
    fields[fieldIndex] = currentPlayer;
    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null;
    
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
 }
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

document.getElementById('container').innerHTML = generateCrossSVG();











