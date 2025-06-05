function initLaptopDetailPage() {
    console.log("Initializing laptop detail page...");

    const laptopDetailContent = document.getElementById('laptop-detail-content');
    const loadingMessage = document.getElementById('loading-laptop-details');
    const urlParams = new URLSearchParams(window.location.search);
    const laptopId = urlParams.get('id');

    console.log("Laptop ID from URL:", laptopId);

    // Error handling for missing data
    if (typeof laptopData === 'undefined') {
        console.error("laptopData is undefined");
        showError('Error: Core application data (laptopData) could not be loaded.');
        return;
    }

    if (!laptopId || !laptopData[laptopId]) {
        console.error("Invalid laptop ID or laptop not found:", laptopId);
        showError(`Error: Laptop with ID "${laptopId || 'none provided'}" not found.`);
        return;
    }

    console.log("Found laptop data:", laptopData[laptopId]);

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    const data = laptopData[laptopId];
    renderLaptopDetails(data);
}

function renderLaptopDetails(data) {
    const laptopDetailContent = document.getElementById('laptop-detail-content');
    if (!laptopDetailContent) return;

    // Update the chart section HTML
    const chartSection = `
        <div class="p-8 bg-gray-50 dark:bg-gray-700 mt-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-center dark:text-gray-100">Performance Metrics</h2>
            <div class="chart-container" style="position: relative; height:400px; width:100%; max-width:600px; margin:0 auto;">
                <canvas id="laptopChart"></canvas>
            </div>
        </div>
    `;

    laptopDetailContent.innerHTML = `
        <div class="relative">
            <!-- Hero Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-8 md:p-12">
                <a href="explorer.html" class="inline-block mb-6 text-white hover:underline slide-in-right">
                    &larr; Back to Explorer
                </a>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div class="space-y-4 slide-up">
                        <h1 class="text-4xl font-bold text-white">${data.name}</h1>
                        <p class="text-xl text-blue-100">${data.summary}</p>
                        <div class="flex items-center space-x-2">
                            <span class="text-3xl font-bold text-white">${data.score}</span>
                            <span class="text-blue-200">/10</span>
                        </div>
                    </div>
                    <div class="scale-in">
                        <img src="${data.image}" alt="${data.name}" 
                             class="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                             onerror="this.src='assets/images/placeholder.jpg'">
                    </div>
                </div>
            </div>

            <!-- Specs Grid -->
            <div class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animate">
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md fade-in">
                    <h3 class="font-semibold text-gray-600 dark:text-gray-300 mb-2">CPU</h3>
                    <p class="text-lg">${data.details.cpu}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md fade-in">
                    <h3 class="font-semibold text-gray-600 dark:text-gray-300 mb-2">GPU</h3>
                    <p class="text-lg">${data.details.igpu}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md fade-in">
                    <h3 class="font-semibold text-gray-600 dark:text-gray-300 mb-2">RAM</h3>
                    <p class="text-lg">${data.details.ram}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md fade-in">
                    <h3 class="font-semibold text-gray-600 dark:text-gray-300 mb-2">Storage</h3>
                    <p class="text-lg">${data.details.storage}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md fade-in">
                    <h3 class="font-semibold text-gray-600 dark:text-gray-300 mb-2">macOS</h3>
                    <p class="text-lg">${data.details.macosSupport}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md fade-in">
                    <h3 class="font-semibold text-gray-600 dark:text-gray-300 mb-2">Priority</h3>
                    <p class="text-lg">${data.priority.join(', ')}</p>
                </div>
            </div>

            ${chartSection}
        </div>
    `;

    // Initialize chart after DOM is updated
    setTimeout(() => initializeChart(data), 100);
}

function showError(message) {
    const laptopDetailContent = document.getElementById('laptop-detail-content');
    const loadingMessage = document.getElementById('loading-laptop-details');

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }
    
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
    const chartCtx = document.getElementById('laptopChart');
    if (!chartCtx) {
        console.error('Chart canvas element not found');
        return;
    }

    const chartData = {
        labels: ['Ease', 'Performance', 'Battery', 'Stability'],
        datasets: [{
            label: data.name,
            data: [
                data.details.chartData.ease,
                data.details.chartData.performance,
                data.details.chartData.battery,
                data.details.chartData.stability
            ],
            fill: true,
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            borderColor: '#4A90E2',
            borderWidth: 2,
            pointBackgroundColor: '#4A90E2',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4A90E2'
        }]
    };

    const chartOptions = {
        scales: {
            r: {
                min: 0,
                max: 100,
                beginAtZero: true,
                grid: {
                    color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                },
                angleLines: {
                    color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                },
                pointLabels: {
                    color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1a202c',
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1a202c',
                    font: {
                        family: "'Inter', sans-serif"
                    }
                }
            }
        }
    };

    // Clear any existing chart
    if (window.laptopChart instanceof Chart) {
        window.laptopChart.destroy();
    }

    window.laptopChart = new Chart(chartCtx, {
        type: 'radar',
        data: chartData,
        options: chartOptions
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLaptopDetailPage();

    // Update chart on theme change
    document.addEventListener('themeChanged', (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        const laptopId = urlParams.get('id');
        if (laptopId && laptopData[laptopId] && window.laptopChart) {
            initializeChart(laptopData[laptopId]);
        }
    });
});
