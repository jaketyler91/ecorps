// Funzione per mostrare i servizi gradualmente
function showServices() {
    const services = document.querySelectorAll('.service');
    services.forEach((service, index) => {
        setTimeout(() => {
            service.classList.add('visible');
        }, index * 200); // Ritardo graduale per un effetto di materializzazione
    });
}

// Avvia la visualizzazione dei servizi quando il documento è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
    showServices();
});