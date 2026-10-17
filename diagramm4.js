/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 4
 * Visualisierung der Volumenabhängigkeit der Inneren Energie U (T = konst.)
 */

function toggleDiagram4() {
    const container = document.getElementById('diagramContainer4');
    const link = document.getElementById('diagramLink4');
    
    if (!container || !link) return;

    // FEHLER BEHOBEN: "style" war doppelt geschrieben
    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        // Erst zeichnen, wenn das Canvas sichtbar geschaltet wurde
        zeichneU_V();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'U-V - Diagramm einblenden';
    }
}

function zeichneU_V() {
    const canvas = document.getElementById('uvCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 30);   // U-Achse Spitze (Y)
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // V-Achse Spitze (X)
    ctx.stroke();
    
    // 2. BESCHRIFTUNGEN
    ctx.fillStyle = '#333333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Volumen V', 400, 270);
    ctx.fillText('U', 25, 40);
    
    // System-Kennzeichnung oben links
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Bedingung: T = konst. (Isotherm)', 65, 55);

    // Startvolumen deklarieren (V0)
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555555';
    ctx.fillText('V₀', 50, 265);

    // 3. GRAPHEN ZEICHNEN
    
    // Graph 1: Ideales Gas -> Vollkommen flache, horizontale Gerade
    ctx.strokeStyle = '#0066cc'; // Blau für ideales Gas
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 140);  
    ctx.lineTo(430, 140); 
    ctx.stroke();

    // Graph 2: Reales Gas (Van-der-Waals) -> Asymptotischer Anstieg
    ctx.strokeStyle = '#cc0000'; // Rot für reales Gas
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    
    let startX = 50;
    let endX = 430;
    let firstPoint = true;
    
    for (let x = startX; x <= endX; x++) {
        let simuliertesV = (x - startX) + 35; 
        let y = 140 + (4500 / simuliertesV); 
        
        if (y > 245) y = 245; 
        
        if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // 4. LEGENDE DIREKT INLINE
    ctx.font = '11px sans-serif';
    
    // Ideales Gas Label (Blau)
    ctx.fillStyle = '#0066cc';
    ctx.fillText('Ideales Gas: (∂U/∂V)т = 0', 250, 125);
    
    // Reales Gas Label (Rot)
    ctx.fillStyle = '#cc0000';
    ctx.fillText('Reales Gas (VdW): (∂U/∂V)т = a / Vm² > 0', 250, 205);
}
