/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 2
 * Visualisierung des Verlaufs der Wärmekapazität Cp von H2O
 */

function toggleDiagram2() {
    const container = document.getElementById('diagramContainer2');
    const link = document.getElementById('diagramLink2');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        // Erst zeichnen, wenn das Canvas sichtbar geschaltet wurde
        zeichneCp();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'C<sub>p</sub>(T) - Diagramm einblenden';
    }
}

function zeichneCp() {
    const canvas = document.getElementById('cpCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 30);   // Cp-Achse Spitze
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // T-Achse Spitze
    ctx.stroke();
    
    // 2. BESCHRIFTUNGEN
    ctx.fillStyle = '#333333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('T / K', 440, 270);
    ctx.fillText('Cp', 25, 40);
    
    // Substanz-Kennzeichnung oben links
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Medium: H₂O (Wasser)', 65, 55);
    
    // T-Markierungen auf der X-Achse
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555555';
    ctx.textAlign = 'center';
    ctx.fillText('273 K', 180, 265);
    ctx.fillText('373 K', 280, 265);
    
    ctx.beginPath();
    ctx.moveTo(180, 250); ctx.lineTo(180, 242);
    ctx.moveTo(280, 250); ctx.lineTo(280, 242);
    ctx.stroke();

    // Phasen-Labels (Platziert über den jeweiligen Plateaus)
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('fest (Eis)', 115, 175);
    ctx.fillText('flüssig', 230, 85);
    ctx.fillText('gasförmig', 365, 205);

    // 3. ENTLANG DER PHASEN ZEICHNEN (Blau)
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Phase 1: Eis (0K bis 273K) -> Steigt von 0 an auf ca. halbe Höhe des flüssigen Niveaus
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.quadraticCurveTo(120, 240, 180, 190);
    ctx.stroke();
    
    // Phase 2: Flüssiges Wasser (273K bis 373K) -> Konstant sehr hoch angesiedelt
    ctx.beginPath();
    ctx.moveTo(180, 110);
    ctx.lineTo(280, 110);
    ctx.stroke();
    
    // Phase 3: Wasserdampf (373K bis 500K) -> Fällt tief ab und steigt minimal an
    ctx.beginPath();
    ctx.moveTo(280, 220);
    ctx.quadraticCurveTo(350, 218, 430, 215);
    ctx.stroke();

    // 4. NUR NOCH GESTRICHELTE LINIEN AN DEN UNSTETIGKEITSSTELLEN
    // Die blauen durchgehenden Senkrechten wurden entfernt
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0066cc';
    ctx.setLineDash([4, 4]); // Aktiviert die Gestrichelung (4px Linie, 4px Lücke)
    
    // Gestrichelter Peak nach oben am Schmelzpunkt (273 K)
    ctx.beginPath();
    ctx.moveTo(180, 250); // Startet ganz unten auf der T-Achse
    ctx.lineTo(180, 45);  // Zieht steil hoch nach oben offen
    ctx.stroke();
    
    // Gestrichelter Peak nach oben am Siedepunkt (373 K)
    ctx.beginPath();
    ctx.moveTo(280, 250); // Startet ganz unten auf der T-Achse
    ctx.lineTo(280, 45);  // Zieht steil hoch nach oben offen
    ctx.stroke();
    
    ctx.setLineDash([]); // Dash-Style für nachfolgende Elemente zurücksetzen

    // 5. PHASEN-MARKER (Rot) - Kennzeichnet den Beginn und das Ende der stabilen Phasen-Plateaus
    ctx.fillStyle = '#ff3333';
    const punkte = [
        {x: 180, y: 190}, // Ende Eis
        {x: 180, y: 110}, // Beginn Flüssigkeit
        {x: 280, y: 110}, // Ende Flüssigkeit
        {x: 280, y: 220}  // Beginn Gas
    ];
    punkte.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}
