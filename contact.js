document.addEventListener('DOMContentLoaded', function() {
    // Seleziona i tuoi elementi
    var contactForm = document.querySelector('.contact-form');
    var footer = document.querySelector('footer');

    // Funzione per animare l'apparizione del modulo dei contatti
    function animateContactForm() {
        var start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            contactForm.style.opacity = Math.min(progress / 800, 1); // 800ms per l'animazione
            contactForm.style.transform = `translateY(${Math.min(progress / 10, 0)}px)`; // Graduale verso l'alto
            if (progress < 800) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    // Funzione per animare l'apparizione del footer
    function animateFooter() {
        var start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            footer.style.opacity = Math.min(progress / 800, 1); // 800ms per l'animazione
            footer.style.transform = `translateX(${Math.min(progress / 10, 0)}px)`; // Graduale verso l'interno
            if (progress < 800) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    // Chiamata alla funzione per animare il modulo dei contatti dopo un ritardo (es. 500 ms)
    setTimeout(animateContactForm, 500);

    // Chiamata alla funzione per animare il footer dopo un ritardo (es. 1500 ms)
    setTimeout(animateFooter, 700);
});
