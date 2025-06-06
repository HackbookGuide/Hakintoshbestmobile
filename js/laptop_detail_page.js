function initLaptopDetailPage() {
    console.log("Initializing laptop detail page...");

    const laptopDetailContent = document.getElementById('laptop-detail-content');
    const loadingMessage = document.getElementById('loading-laptop-details');
    const urlParams = new URLSearchParams(window.location.search);
    const laptopId = urlParams.get('id');

    console.log("Laptop ID from URL:", laptopId);

    // Ensure laptopData is loaded
    if (typeof laptopData === 'undefined') {
        console.error("laptopData is undefined");
        showError('Error: Core application data (laptopData) could not be loaded.');
        return;
    }

    // Check for valid laptopId and corresponding data entry
    if (!laptopId || !laptopData[laptopId]) {
        console.error("Invalid laptop ID or laptop not found:", laptopId);
        showError(`Error: Laptop with ID "${laptopId || 'none provided'}" not found.`);
        return;
    }

    console.log("Found laptop data:", laptopData[laptopId]);

    // Hide loading message if present
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    const data = laptopData[laptopId];

    renderLaptopDetails(data);
}

function renderLaptopDetails(data) {
    const details = {
        ...data.details,
        displayFeatures: data.details.displayFeatures || {
            type: "Not specified",
            brightness: "Not specified",
            colorGamut: "Not specified",
            panel: "Not specified"
        },
        batteryLife: data.details.batteryLife || {
            average: "Not specified",
            capacity: "Not specified",
            type: "Not specified"
        },
        knownIssues: data.details.knownIssues || ["No known issues documented"],
        ports: data.details.ports || {
            usb: ["Not specified"],
            thunderbolt: "Not specified",
            video: ["Not specified"],
            network: "Not specified",
            others: ["Not specified"]
        }
    };

    // Render main content
    document.getElementById('laptop-detail-content').innerHTML = `
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-8 md:p-12 rounded-lg">
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
    `;

    // Render Hardware Details
    document.getElementById('hardware-content').innerHTML = `
        <div class="grid grid-cols-1 gap-4">
            <p><span class="font-medium">CPU:</span> ${details.cpu}</p>
            <p><span class="font-medium">GPU:</span> ${details.igpu}</p>
            <p><span class="font-medium">RAM:</span> ${details.ram}</p>
            <p><span class="font-medium">Storage:</span> ${details.storage}</p>
            <p><span class="font-medium">Wi-Fi/Bluetooth:</span> ${details.wifiBluetooth || 'Not specified'}</p>
            <p><span class="font-medium">Audio:</span> ${details.audioCodec || 'Not specified'}</p>
            <p><span class="font-medium">Trackpad:</span> ${details.trackpad || 'Not specified'}</p>
        </div>
    `;

    // Render Display Features
    document.getElementById('display-content').innerHTML = `
        <div class="grid grid-cols-1 gap-4">
            <p><span class="font-medium">Type:</span> ${details.displayFeatures.type}</p>
            <p><span class="font-medium">Brightness:</span> ${details.displayFeatures.brightness}</p>
            <p><span class="font-medium">Color Gamut:</span> ${details.displayFeatures.colorGamut}</p>
            ${details.displayFeatures.panel ? `
                <p><span class="font-medium">Panel:</span> ${details.displayFeatures.panel}</p>
            ` : ''}
        </div>
    `;

    // Render Battery Information
    document.getElementById('battery-content').innerHTML = `
        <div class="grid grid-cols-1 gap-4">
            <p><span class="font-medium">Average Life:</span> ${details.batteryLife.average}</p>
            <p><span class="font-medium">Capacity:</span> ${details.batteryLife.capacity}</p>
            <p><span class="font-medium">Type:</span> ${details.batteryLife.type}</p>
        </div>
    `;

    // Render macOS Compatibility
    document.getElementById('macos-content').innerHTML = `
        <div class="grid grid-cols-1 gap-4">
            <p><span class="font-medium">Current Support:</span> ${details.macosSupport}</p>
            <p><span class="font-medium">Minimum Version:</span> ${details.minMacosSupport}</p>
            <p><span class="font-medium">Maximum Version:</span> ${details.maxMacosSupport}</p>
        </div>
    `;

    // Render Known Issues
    document.getElementById('issues-content').innerHTML = `
        <ul class="list-disc pl-5 space-y-2">
            ${details.knownIssues.map(issue => 
                `<li class="text-gray-700 dark:text-gray-300">${issue}</li>`
            ).join('')}
        </ul>
    `;

    // Render Ports
    document.getElementById('ports-content').innerHTML = `
        <div class="grid grid-cols-1 gap-4">
            ${Object.entries(details.ports).map(([type, ports]) => `
                <p class="text-gray-700 dark:text-gray-300">
                    <span class="font-medium capitalize">${type}:</span> 
                    ${Array.isArray(ports) ? ports.join(', ') : ports}
                </p>
            `).join('')}
        </div>
    `;
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

    // Destroy any existing chart
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
