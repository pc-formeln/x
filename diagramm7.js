/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 7 (Optimiert)
 * Visualisierung der Temperaturabhängigkeit der Freien Enthalpie G = G(T)
 * Fokus: Reines Schneiden der Phasenkurven bei p = konst. (3-Farben-Schema)
 */

function toggleDiagram7() {
    const container = document.getElementById('diagramContainer7');
    const link = document.getElementById('diagramLink7');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        zeichneG_T();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'G(T) - Diagramm einblenden';
    }
}

function zeichneG_T() {
    const canvas = document.getElementById('gpCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM & INNERER TEXT (Farbe 1: Schwarz)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 30);   // G-Achse Spitze (Y)
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // T-Achse Spitze (X)
    ctx.stroke();
    
    // Beschriftungen (Schwarz)
    ctx.fillStyle = '#000000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Temperatur T', 400, 270);
    ctx.fillText('G', 25, 40);
    
    // System-Kennzeichnung oben links (Schwarz)
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Phasenkurven: G = G(T) bei p = konst.', 65, 45);

    // Schnittpunkt-Markierungen auf X-Achse (Schwarz)
    ctx.font = '10px sans-serif';
    ctx.fillText('T_m', 160, 265); 
    ctx.fillText('T_b', 310, 265); 
    
    // Dezente Hilfslinien von den Schnittpunkten zur X-Achse (Schwarz, dünn)
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(160, 250); ctx.lineTo(160, 110);
    ctx.moveTo(310, 250); ctx.lineTo(310, 140);
    ctx.stroke();

    // 2. DIE DREI PHASENKURVEN (Drucklose, reine Liniendarstellung)

    // Phase 1: Feststoff (Farbe 2: Rot) -> Geringe Entropie (flacher Abfall)
    ctx.strokeStyle = '#cc0000';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(250, 126);
    ctx.stroke();

    // Phase 2: Flüssigkeit (Farbe 3: Blau) -> Mittlere Entropie (mittlerer Abfall)
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(90, 96);
    ctx.lineTo(360, 150);
    ctx.stroke();

    // Phase 3: Gas (Farbe 1: Schwarz) -> Enorme Entropie (stürzt steil nach unten)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(240, 105);
    ctx.lineTo(430, 200);
    ctx.stroke();

    // 3. TEXT-LABELS FÜR DIE BEREICHE (Angepasst an das 3-Farben-Schema)
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cc0000'; ctx.fillText('Feststoff', 65, 80);
    ctx.fillStyle = '#0066cc'; ctx.fillText('Flüssigkeit', 210, 105);
    ctx.fillStyle = '#000000'; ctx.fillText('Gas', 370, 160);
}
