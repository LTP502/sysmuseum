document.getElementById('menuButton').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('hide');
        setTimeout(() => {
            menu.style.display = 'none';
        }, 500); // Match this duration to the CSS transition duration
    } else {
        menu.style.display = 'block';
        setTimeout(() => {
            menu.classList.remove('hide');
            menu.classList.add('show');
        }, 10); // Delay to trigger transition
    }
});