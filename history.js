document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.section-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-value');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});