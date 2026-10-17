/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 5
 * Visualisierung der Volumenabhängigkeit der Freien Energie F = F(V)
 */

function toggleDiagram5() {
    const container = document.getElementById('diagramContainer5');
    const link = document.getElementById('diagramLink5');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        // Erst zeichnen, wenn das Canvas sichtbar geschaltet wurde
        zeichneF_V();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'F(V) - Diagramm einblenden';
    }
}

function zeichneF_V() {
    const canvas = document.getElementById('fvCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 30);   // F-Achse Spitze (Y)
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // V-Achse Spitze (X)
    ctx.stroke();
    
    // 2. BESCHRIFTUNGEN
    ctx.fillStyle = '#333333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Volumen V', 400, 270);
    ctx.fillText('F', 25, 40);
    
    // System-Kennzeichnung oben links
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('System: Ideales Gas (Isotherme Expansion)', 65, 55);

    // Startvolumen V0 auf X-Achse
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555555';
    ctx.textAlign = 'center';
    ctx.fillText('V₀', 65, 265);
    ctx.beginPath(); ctx.moveTo(65, 250); ctx.lineTo(65, 245); ctx.stroke();

    // 3. GRAPHEN ZEICHNEN (Punktweise Berechnung der Logarithmus-Kurven)
    // Formel: F(V) = F0 - n*R*T * ln(V/V0)
    let startX = 65;
    let endX = 430;

    // Kurve 1: Tiefe Temperatur T1 (Blau) -> Flachere Abnahme
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let x = startX; x <= endX; x++) {
        let vVerhaeltnis = (x - startX) / 40 + 1; // Simuliert V/V0
        let y = 100 + 40 * Math.log(vVerhaeltnis); // Logarithmischer Abfall (Y geht nach unten!)
        if (x === startX) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Kurve 2: Höhere Temperatur T2 (Rot) -> Steilere Abnahme, da T2 > T1
    ctx.strokeStyle = '#cc0000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = startX; x <= endX; x++) {
        let vVerhaeltnis = (x - startX) / 40 + 1;
        let y = 80 + 80 * Math.log(vVerhaeltnis); // Stärkerer Abfall durch größeren Faktor (80 statt 40)
        if (x === startX) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 4. LEGENDE DIREKT IM CANVAS
    ctx.font = '11px sans-serif';
    
    // Label T1 (Blau)
    ctx.fillStyle = '#0066cc';
    ctx.fillText('Tiefe Temperatur T₁', 280, 130);
    
    // Label T2 (Rot)
    ctx.fillStyle = '#cc0000';
    ctx.fillText('Höhere Temperatur T₂ (T₂ > T₁)', 280, 210);

    // 5. VISUELLERgradientEN-ZEIGER (Druck-Erklärung)
    // Zeichnet eine Tangente, um zu zeigen, dass die Steigung (-p) links extrem steil ist
    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 50); ctx.lineTo(110, 150); // Steile Tangente links bei T2
    ctx.stroke();
    ctx.fillStyle = '#666666';
    ctx.font = 'italic 10px sans-serif';
    ctx.fillText('Steigung = &minus;p', 100, 95);
}
