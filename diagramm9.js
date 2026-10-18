/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 9
 * Visualisierung des Kohlrausch-Quadratwurzelgesetzes (Starke vs. Schwache Elektrolyte)
 */

function toggleDiagram9() {
    const container = document.getElementById('diagramContainer9');
    const link = document.getElementById('diagramLink9');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        zeichneKohlrausch();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'Kohlrausch-Diagramm (Λm gegen √c) einblenden';
    }
}

function zeichneKohlrausch() {
    const canvas = document.getElementById('kohlrauschCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM & TEXTE (Farbe 1: Schwarz)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 30);   // Λm-Achse Spitze (Y)
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // √c-Achse Spitze (X)
    ctx.stroke();
    
    // Beschriftungen
    ctx.fillStyle = '#000000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Wurzel aus Konzentration √c', 380, 270);
    ctx.fillText('Λm', 25, 40);
    
    // System-Kennzeichnung oben links
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Kohlrausch-Diagramm: Molare Leitfähigkeit', 65, 45);

    // Markierung für die Grenzleitfähigkeit Λm⁰ an der Y-Achse
    ctx.font = '10px sans-serif';
    ctx.fillText('Λm⁰ (stark)', 25, 75);
    ctx.fillText('Λm⁰ (schwach)', 20, 110);

    // 2. DIE GRAPHEN ZEICHNEN

    // Kurve 1: Starker Elektrolyt (Farbe 2: Rot) -> Fast lineare Gerade nach unten
    ctx.strokeStyle = '#cc0000';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(50, 75);   // Startet oben auf der Y-Achse (Extrapoliertes Λm0)
    ctx.lineTo(420, 150); // Fällt flach und linear ab
    ctx.stroke();

    // Kurve 2: Schwacher Elektrolyt (Farbe 3: Blau) -> Steiler, asymptotischer Abfall
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    
    // Punktweise Berechnung einer Hyperbel-ähnlichen Kurve (Ostwald-Verdünnungssimulation)
    let startX = 52;
    let endX = 420;
    let firstPoint = true;
    
    for (let x = startX; x <= endX; x++) {
        let simuliertesWurzelC = (x - 50) / 40;
        // Simuliert den steilen Absturz bei Konzentrationserhöhung
        let y = 110 + (120 * simuliertesWurzelC) / (simuliertesWurzelC + 0.15);
        
        if (y > 245) y = 245;

        if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // 3. LEGENDE (3-Farben-Schema)
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cc0000'; ctx.fillText('Starker Elektrolyt (z.B. HCl)', 160, 85);
    ctx.fillStyle = '#0066cc'; ctx.fillText('Schwacher Elektrolyt (z.B. Essigsäure):', 160, 160);
    ctx.fillStyle = '#000000'; ctx.fillText('', 160, 180);
}
