import { createIcons, Download, ArrowRight, ExternalLink, ArrowLeft } from 'lucide';

// Initialize Lucide icons
createIcons({
    icons: {
        Download,
        ArrowRight,
        ExternalLink,
        ArrowLeft
    }
});

// Simple Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in classes to sections for a modern feel
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Inject CSS for the animation state
const style = document.createElement('style');
style.textContent = `
    section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Smooth scroll for internal links on the same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// GitHub API Auto-Update Logic
async function fetchLatestRelease() {
    const REPO = 'YogaindoCR/Mine-imator-2.0.2-Simply-Upscaled-Build';
    const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const version = data.tag_name;
        const publishDate = new Date(data.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Find the zip file in assets
        const zipAsset = data.assets.find(asset => asset.name.endsWith('.zip'));
        const downloadUrl = zipAsset ? zipAsset.browser_download_url : data.html_url;

        // Update UI elements if they exist
        const heroVersionEl = document.getElementById('latest-version');
        if (heroVersionEl) heroVersionEl.textContent = version;

        const downloadInfoEl = document.getElementById('download-version-info');
        if (downloadInfoEl) downloadInfoEl.textContent = `Version ${version} (${publishDate})`;

        const mainDownloadBtn = document.getElementById('main-download-link');
        if (mainDownloadBtn) mainDownloadBtn.href = downloadUrl;

    } catch (error) {
        console.error('Error fetching latest release:', error);
    }
}

// Initial fetch
fetchLatestRelease();

// Easter Egg: Double click logo for RGB mode
const logos = document.querySelectorAll('.logo');
logos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('dblclick', () => {
        document.body.classList.toggle('rgb-mode');
        
        // Visual feedback
        if (document.body.classList.contains('rgb-mode')) {
            console.log("RGB Mode Activated! 🌈");
        }
    });
});
