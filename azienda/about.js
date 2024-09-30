document.addEventListener("DOMContentLoaded", function () {
    const text = "E-Corps è un'azienda innovativa nel campo della cybersecurity, con oltre dieci anni di esperienza nel proteggere organizzazioni di ogni dimensione dalle minacce digitali. Il nostro impegno è quello di garantire sicurezza, affidabilità e continuità operativa attraverso soluzioni personalizzate e all'avanguardia.\n\nIl nostro team è composto da esperti certificati che lavorano con passione per proteggere il vostro patrimonio informativo, consentendovi di concentrarvi sul vostro core business in totale tranquillità.";
    
    let charIndex = 0;
    const typingSpeed = 10; // Velocità di digitazione in millisecondi
    const placeholder = document.getElementById("typed-text-placeholder");
    const cursor = document.getElementById("cursor");

    function type() {
        if (charIndex < text.length) {
            // Aggiunge il carattere corrente al placeholder
            placeholder.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            clearTimeout(type);
            cursor.style.display = 'inline-block'; // Mostra il cursore alla fine della digitazione
        }
    }

    type();
});
