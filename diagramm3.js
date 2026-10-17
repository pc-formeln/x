/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 3
 * Vergleich: Isobare vs. Isochore Wärmeaufnahme (Ideales Gas)
 */

function toggleDiagram3() {
    const container = document.getElementById('diagramContainer3');
    const link = document.getElementById('diagramLink3');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        // Erst zeichnen, wenn das Canvas sichtbar geschaltet wurde
        zeichneQ_T();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'T-Q - Diagramm einblenden';
    }
}

function zeichneQ_T() {
    const canvas = document.getElementById('qtCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 30);   // T-Achse Spitze (Y)
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // Q-Achse Spitze (X)
    ctx.stroke();
    
    // 2. BESCHRIFTUNGEN
    ctx.fillStyle = '#333333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Wärmeaufnahme Q', 390, 270);
    ctx.fillText('T', 25, 40);
    
    // System-Kennzeichnung oben links
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('System: Ideales Gas (n = konst.)', 65, 55);

    // Ursprung deklarieren (T0, Q=0)
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555555';
    ctx.fillText('T₀', 35, 253);

    // 3. GRAPHEN ZEICHNEN
    // Startpunkt für beide Graphen bei (50, 250) - Ursprung/Anfangstemperatur
    
    // Graph 1: Isochor (V = konst. -> Q_V = dU) -> Steilerer Anstieg, da Cv kleiner ist
    ctx.strokeStyle = '#cc0000'; // Rot für isochor
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(350, 70); // Endet weiter oben
    ctx.stroke();

    // Graph 2: Isobar (p = konst. -> Q_p = dH) -> Flachere Kurve, da Cp = Cv + R
    ctx.strokeStyle = '#0066cc'; // Blau für isobar
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(350, 130); // Endet weiter unten bei gleicher Wärme Q
    ctx.stroke();

    // 4. LEGENDE DIREKT IM CANVAS PLATZIEREN
    ctx.font = '11px sans-serif';
    
    // Isochor-Label (Rot)
    ctx.fillStyle = '#cc0000';
    ctx.fillText('isochor: Q_V = ΔU (V = konst., dW = 0)', 240, 65);
    
    // Isobar-Label (Blau)
    ctx.fillStyle = '#0066cc';
    ctx.fillText('isobar: Q_p = ΔH (p = konst., dW = &minus;p·ΔV)', 240, 150);

    // 5. ERKLÄRENDE HILFSLINIE BEI GLEICHEM Q
    // Zeigt visuell, dass T_isochor > T_isobar bei gleicher Wärmeaufnahme
    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(350, 250); // Markierung auf X-Achse
    ctx.lineTo(350, 70);  // Hoch bis zum isochoren Graphen
    ctx.stroke();
    ctx.setLineDash([]); // Reset

    ctx.fillStyle = '#555555';
    ctx.font = '10px sans-serif';
    ctx.fillText('gleiches Q', 350, 263);
}
