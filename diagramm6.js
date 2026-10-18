/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 6
 * Visualisierung des Joule-Thomson-Effekts im T-p-Diagramm (Isenthalpen)
 */

function toggleDiagram6() {
    const container = document.getElementById('diagramContainer6');
    const link = document.getElementById('diagramLink6');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        // Erst zeichnen, wenn das Canvas sichtbar geschaltet wurde
        zeichneH_p();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'H-p - Diagramm einblenden';
    }
}

function zeichneH_p() {
    const canvas = document.getElementById('hpCanvas');
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
    ctx.lineTo(450, 250); // p-Achse Spitze (X)
    ctx.stroke();
    
    // 2. BESCHRIFTUNGEN
    ctx.fillStyle = '#333333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Druck p', 400, 270);
    ctx.fillText('T', 25, 40);
    
    // System-Kennzeichnung oben links
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Joule-Thomson-Effekt: Isenthalpen H = konst.', 65, 55);

    // 3. INVERSIONSKURVE ZEICHNEN (Gestreifte Parabel)
    // Trennt Abkühlungs- von Erwärmungsgebiet
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    
    // Parabel-Simulation: p = f(T) -> im Canvas gedreht
    ctx.moveTo(50, 60);
    ctx.quadraticCurveTo(320, 140, 50, 220);
    ctx.stroke();
    ctx.setLineDash([]); // Reset

    // Beschriftung Inversionskurve
    ctx.font = 'italic 10px sans-serif';
    ctx.fillStyle = '#222222';
    ctx.fillText('Inversionskurve (μ_JT = 0)', 150, 115);

    // 4. ISENTHALPEN ZEICHNEN (Punktweise gekrümmte Kurven)
    // Jede Isenthalpe hat ihr Maximum genau auf der Inversionskurve
    const isenthalpenParameter = [
        { startY: 100, peakX: 180, peakY: 125, endY: 105 },
        { startY: 80,  peakX: 200, peakY: 140, endY: 90  },
        { startY: 60,  peakX: 210, peakY: 155, endY: 75  }
    ];

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    isenthalpenParameter.forEach((p, index) => {
        // Linker Ast (Innerhalb der Inversionskurve -> Abkühlungsgebiet, positive Steigung)
        ctx.strokeStyle = '#0066cc'; // Blau für Abkühlung bei Expansion
        ctx.beginPath();
        ctx.moveTo(50, p.startY + 50);
        ctx.quadraticCurveTo(p.peakX * 0.6, p.peakY + 30, p.peakX, p.peakY);
        ctx.stroke();

        // Rechter Ast (Außerhalb der Inversionskurve -> Erwärmungsgebiet, negative Steigung)
        ctx.strokeStyle = '#cc0000'; // Rot für Erwärmung bei Expansion
        ctx.beginPath();
        ctx.moveTo(p.peakX, p.peakY);
        ctx.quadraticCurveTo(p.peakX + (430 - p.peakX) * 0.4, p.peakY - 15, 430, p.endY + 60);
        ctx.stroke();

        // Kleiner Text-Stempel für H
        ctx.fillStyle = '#666666';
        ctx.font = '9px sans-serif';
        ctx.fillText('H_' + (index + 1), 435, p.endY + 63);
    });

    // 5. GEBIETSBESCHRIFTUNGEN
    ctx.font = 'bold 11px sans-serif';
    
    // Abkühlungsbereich (innerhalb der Parabel)
    ctx.fillStyle = '#0066cc';
    ctx.fillText('Abkühlungsgebiet', 80, 150);
    ctx.font = '10px sans-serif';
    ctx.fillText('μ_JT > 0', 80, 165);
    
    // Erwärmungsbereich (außerhalb der Parabel)
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#cc0000';
    ctx.fillText('Erwärmungsgebiet', 260, 180);
    ctx.font = '10px sans-serif';
    ctx.fillText('μ_JT < 0', 260, 195);
}
