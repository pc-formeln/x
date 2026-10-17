function toggleDiagram() {
    const container = document.getElementById('diagramContainer');
    const link = document.getElementById('diagramLink');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        // Zeichne den Graphen erst, wenn das Canvas sichtbar ist
        zeichneEntropie();    
    } else {
    container.style.display = 'none';
    link.innerHTML = 'S(T) - Diagramm einblenden';
}
}

function zeichneEntropie() {
    const canvas = document.getElementById('entropieCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 30);   // S-Achse Spitze
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // T-Achse Spitze
    ctx.stroke();
    
    // 2. BESCHRIFTUNGEN
    ctx.fillStyle = '#333333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('T / K', 440, 270);
    ctx.fillText('Sm', 25, 40);
    
    // T-Markierungen
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555555';
    ctx.fillText('273 K', 180, 265);
    ctx.fillText('373 K', 280, 265);
    
    ctx.beginPath();
    ctx.moveTo(180, 250); ctx.lineTo(180, 242);
    ctx.moveTo(280, 250); ctx.lineTo(280, 242);
    ctx.stroke();

    // Phasen-Labels
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('fest (Eis)', 115, 215);
    ctx.fillText('flüssig', 230, 120);
    ctx.fillText('gasförmig', 360, 65);

    // 3. KONTINUIERLICHE ANSTIEGE (Blau)
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Eis-Phase
    ctx.beginPath(); ctx.moveTo(50, 250); ctx.quadraticCurveTo(120, 245, 180, 210); ctx.stroke();
    // Flüssig-Phase
    ctx.beginPath(); ctx.moveTo(180, 160); ctx.quadraticCurveTo(230, 145, 280, 125); ctx.stroke();
    // Dampf-Phase
    ctx.beginPath(); ctx.moveTo(280, 55); ctx.quadraticCurveTo(350, 48, 430, 40); ctx.stroke();

    // 4. VERTIKALE SPRÜNGE (Gestreift)
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(180, 210); ctx.lineTo(180, 160);
    ctx.moveTo(280, 125); ctx.lineTo(280, 55);
    ctx.stroke();
    ctx.setLineDash([]); // Dash-Style zurücksetzen

    // 5. PHASEN-MARKER (Rot)
    ctx.fillStyle = '#ff3333';
    const punkte = [
        {x: 180, y: 210}, {x: 180, y: 160},
        {x: 280, y: 125}, {x: 280, y: 55}
    ];
    punkte.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}
