document.addEventListener('DOMContentLoaded', function () {
    // Simulate loading progress
    const loader = document.getElementById('loader');
    if (loader) {
        const progressBar = document.getElementById('progress-bar');
        let progress = 0;

        const interval = setInterval(() => {
            progress += 10;
            progressBar.value = progress;

            if (progress >= 100) {
                clearInterval(interval);
                loader.style.opacity = 0;

                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500); // Allow time for the fade-out transition
            }
        }, 500); // Increase progress every 500ms
    } else {
        console.error("Loader element not found");
    }
});
