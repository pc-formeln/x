/**
 * PC-Formelsammlung v1.0 - Modul: Diagramm 8
 * Visualisierung der Van-der-Waals-Isothermen und der Maxwell-Konstruktion
 */

function toggleDiagram8() {
    const container = document.getElementById('diagramContainer8');
    const link = document.getElementById('diagramLink8');
    
    if (!container || !link) return;

    if (container.style.display === 'none') {
        container.style.display = 'block';
        link.innerHTML = 'Diagramm ausblenden';
        zeichneVdW_Isothermen();
    } else {
        container.style.display = 'none';
        link.innerHTML = 'p-V-Isothermen (VdW) einblenden';
    }
}

function zeichneVdW_Isothermen() {
    const canvas = document.getElementById('vdwCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas leeren für sauberen Neuaufbau
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. ACHSEN SYSTEM & TEXTE (Farbe 1: Schwarz)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 20);   // p-Achse Spitze (Y)
    ctx.lineTo(50, 250);  // Ursprung
    ctx.lineTo(450, 250); // V-Achse Spitze (X)
    ctx.stroke();
    
    // Beschriftungen
    ctx.fillStyle = '#000000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Molares Volumen Vm', 380, 270);
    ctx.fillText('p', 25, 30);
    
    // System-Kennzeichnung oben links
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Van-der-Waals-Isothermen & Phasenübergang', 65, 40);

    // Kritischer Punkt (CP) Markierung (Schwarz)
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('Kritischer Punkt (K)', 185, 105);
    ctx.beginPath(); ctx.arc(185, 115, 3, 0, 2 * Math.PI); ctx.fill();

    // 2. ISOTHERMEN ZEICHNEN

    // Kurve 1: Überkritisch T > T_krit (Farbe 2: Rot) -> Glatter, hyperbelartiger Verlauf
    ctx.strokeStyle = '#cc0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 45);
    ctx.bezierCurveTo(90, 75, 150, 85, 430, 95);
    ctx.stroke();

    // Kurve 2: Kritische Isotherme T = T_krit (Farbe 3: Blau) -> Besitzt exakten Sattelpunkt bei K
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(58, 65);
    ctx.bezierCurveTo(90, 115, 140, 115, 185, 115); // Nähert sich dem Sattelpunkt horizontal
    ctx.bezierCurveTo(230, 115, 270, 130, 430, 140);
    ctx.stroke();

    // Kurve 3: Unterkritisch T < T_krit (Farbe 1: Schwarz) -> Unphysikalische VdW-Schlaufe
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(55, 110);
    // Simulation der S-Form (Kompression -> Flüssig-Anstieg -> Welle -> Gas-Ast)
    ctx.lineTo(65, 160);
    ctx.bezierCurveTo(80, 230, 110, 230, 130, 180);  // Wellental (instabil)
    ctx.bezierCurveTo(150, 130, 180, 130, 210, 195); // Wellenberg (instabil)
    ctx.bezierCurveTo(240, 240, 310, 210, 430, 215);
    ctx.stroke();

    // 3. MAXWELL-KONSTRUKTION / GERADE (Farbe 3: Blau)
    // Ersetzt die unphysikalische Schlaufe im Nassdampfgebiet durch eine Horizontale
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(68, 195);  // Beginn Kondensation (Siedelinie)
    ctx.lineTo(210, 195); // Ende Kondensation (Taulinie)
    ctx.stroke();

    // Gestrichelte Begrenzungslinien nach unten zur Verdeutlichung der Phasengrenzen (Schwarz, dünn)
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(68, 195);  ctx.lineTo(68, 250);
    ctx.moveTo(210, 195); ctx.lineTo(210, 250);
    ctx.stroke();
    ctx.setLineDash([]); // Reset

    // Beschriftungen an den Grenzen (Schwarz)
    ctx.fillStyle = '#000000';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('V_flüssig', 68, 262);
    ctx.fillText('V_gas', 210, 262);

    // 4. LEGENDE (3-Farben-Schema)
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cc0000'; ctx.fillText('T > T_krit', 350, 85);
    ctx.fillStyle = '#0066cc'; ctx.fillText('T = T_krit', 350, 130);
    ctx.fillStyle = '#000000'; ctx.fillText('T < T_krit (mit VdW-Schlaufe)', 240, 235);
    ctx.fillStyle = '#0066cc'; ctx.fillText('Horizontale = Maxwell-Gerade (reale Verflüssigung)', 65, 15);
}
