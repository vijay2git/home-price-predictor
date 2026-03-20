export function createNavigation(container) {
    container.innerHTML = `
        <div class="container">
            <div class="logo">
                <i class="fas fa-home" style="color: var(--primary-color);"></i>
                Home Price Predictor
            </div>
            <ul class="nav-links">
                <li><a href="#home" onclick="scrollToSection('home')">Home</a></li>
                <li><a href="#predict" onclick="scrollToSection('predict')">Predict</a></li>
                <li><a href="#analytics" onclick="scrollToSection('analytics')">Analytics</a></li>
                <li><a href="#about" onclick="scrollToSection('about')">About</a></li>
            </ul>
        </div>
    `;
}

window.scrollToSection = function(section) {
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
