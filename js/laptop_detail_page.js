function initLaptopDetailPage() {
    console.log("LaptopDetailPage: initLaptopDetailPage called");

    const laptopDetailContent = document.getElementById('laptop-detail-content');
    const loadingMessage = document.getElementById('loading-laptop-details');
    const urlParams = new URLSearchParams(window.location.search);
    const laptopId = urlParams.get('id');

    // Error handling for missing data
    if (typeof laptopData === 'undefined') {
        showError('Error: Core application data (laptopData) could not be loaded.');
        return;
    }

    if (!laptopId || !laptopData[laptopId]) {
        showError(`Error: Laptop with ID "${laptopId || 'none provided'}" not found.`);
        return;
    }

    if (loadingMessage) loadingMessage.style.display = 'none';

    const data = laptopData[laptopId];
    renderLaptopDetails(data);
}

function renderLaptopDetails(data) {
    const laptopDetailContent = document.getElementById('laptop-detail-content');
    if (!laptopDetailContent) return;

    laptopDetailContent.innerHTML = `
        <div class="laptop-detail-wrapper p-6">
            <a href="explorer.html" class="inline-block mb-6 text-primary hover:underline slide-in-right">&larr; Back to Explorer</a>
            <h2 class="text-3xl font-bold mb-2 text-dark dark:text-gray-100 slide-up">${data.name}</h2>
            <p class="text-lg text-medium dark:text-gray-300 mb-6 slide-up">${data.summary}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-animate">
                <div class="laptop-image scale-in">
                    <img src="${data.image}" alt="${data.name}" class="rounded-lg shadow-lg w-full" 
                         onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                
                <div class="laptop-specs slide-up">
                    <div class="specs-grid grid grid-cols-2 gap-4">
                        <div class="spec-item fade-in">
                            <strong>CPU:</strong> ${data.details.cpu}
                        </div>
                        <div class="spec-item fade-in">
                            <strong>GPU:</strong> ${data.details.igpu}
                        </div>
                        <div class="spec-item fade-in">
                            <strong>RAM:</strong> ${data.details.ram}
                        </div>
                        <div class="spec-item fade-in">
                            <strong>Storage:</strong> ${data.details.storage}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="chart-container mt-8 scale-in">
                <canvas id="laptopChart"></canvas>
            </div>
        </div>
    `;

    initializeChart(data);
}

function showError(message) {
    const laptopDetailContent = document.getElementById('laptop-detail-content');
    const loadingMessage = document.getElementById('loading-laptop-details');

    if (loadingMessage) loadingMessage.style.display = 'none';
    
    if (laptopDetailContent) {
        laptopDetailContent.innerHTML = `
            <div class="p-6">
                <p class="text-center text-xl text-red-500 py-10">${message}</p>
                <a href="explorer.html" class="block text-center text-primary hover:underline mt-4">
                    &larr; Back to Explorer
                </a>
            </div>
        `;
    }
}

function initializeChart(data) {
    if (typeof ChartManager === 'undefined') {
        console.error('ChartManager not found');
        return;
    }

    const chartCtx = document.getElementById('laptopChart')?.getContext('2d');
    if (!chartCtx) {
        console.error('Chart canvas not found');
        return;
    }

    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    ChartManager.createRadarChart(chartCtx, data.name, data.details.chartData, currentTheme);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initLaptopDetailPage);
