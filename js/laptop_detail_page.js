function initLaptopDetailPage() {
    console.log("LaptopDetailPage: initLaptopDetailPage called"); // For debugging

    const laptopDetailContent = document.getElementById('laptop-detail-content');
    const loadingMessage = document.getElementById('loading-laptop-details');
    const urlParams = new URLSearchParams(window.location.search);
    const laptopId = urlParams.get('id');

    // Ensure laptopData is available (it should be globally defined by js/data.js or an embedded script)
    if (typeof laptopData === 'undefined') {
        console.error("LaptopDetailPage: laptopData is not defined. Ensure js/data.js is loaded before this script and defines laptopData globally.");
        if(loadingMessage) loadingMessage.textContent = 'Error: Core application data (laptopData) could not be loaded.';
        if (laptopDetailContent && !loadingMessage) {
             laptopDetailContent.innerHTML = `<p class="text-center text-xl text-red-500 py-10">Error: Core application data (laptopData) could not be loaded.</p><a href="explorer.html" class="block text-center text-primary hover:underline mt-4">&larr; Back to Explorer</a>`;
        }
        return;
    }

    if (!laptopId || !laptopData[laptopId]) {
        const errorMessage = `Error: Laptop with ID "${laptopId || 'none provided'}" not found in laptopData.`;
        console.error(errorMessage, 'Available IDs:', Object.keys(laptopData));
        if(loadingMessage) loadingMessage.textContent = errorMessage;
        if (laptopDetailContent && !loadingMessage) { // If loading message was already hidden
             laptopDetailContent.innerHTML = `<p class="text-center text-xl text-red-500 py-10">${errorMessage}</p><a href="explorer.html" class="block text-center text-primary hover:underline mt-4">&larr; Back to Explorer</a>`;
        }
        return;
    }

    if(loadingMessage) loadingMessage.style.display = 'none'; // Hide loading message

    const data = laptopData[laptopId];

    // Dynamically build the HTML for the laptop details
    laptopDetailContent.innerHTML = `
        <div class="laptop-detail-wrapper p-6">
            <a href="explorer.html" class="inline-block mb-6 text-primary hover:underline slide-in-right">&larr; Back to Explorer</a>
            <h2 class="text-3xl font-bold mb-2 text-dark dark:text-gray-100 slide-up">${data.name}</h2>
            <p class="text-lg text-medium dark:text-gray-300 mb-6 slide-up">${data.summary}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-animate">
                <div class="laptop-image scale-in">
                    <img src="${data.image}" alt="${data.name}" class="rounded-lg shadow-lg w-full" onerror="this.onerror=null;this.src='https://placehold.co/600x400/212529/F8F9FA?text=Image+Not+Found';">
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

    // Initialize animations if manager exists
    if (typeof AnimationManager !== 'undefined') {
        AnimationManager.init();
    }

    // Initialize Chart
    if (typeof ChartManager !== 'undefined' && ChartManager.createRadarChart) {
        ChartManager.clearChartInstances(); // Clear charts from any previous page
        const chartCtx = document.getElementById('laptop-detail-chart')?.getContext('2d');
        if (chartCtx) {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            ChartManager.createRadarChart(chartCtx, data.name, data.details.chartData, currentTheme);
        } else {
            console.error("LaptopDetailPage: Canvas context for laptop-detail-chart not found.");
        }
    } else {
        console.error("LaptopDetailPage: ChartManager or ChartManager.createRadarChart is not defined. Ensure js/charts.js is loaded.");
    }

    // Add event listeners for Gemini buttons
    const compatibilityBtn = document.getElementById('gemini-compatibility-btn');
    const checklistBtn = document.getElementById('gemini-checklist-btn');

    if (compatibilityBtn && typeof GeminiAPIManager !== 'undefined' && GeminiAPIManager.callGeminiAPI) {
        compatibilityBtn.addEventListener('click', async () => {
            const outputDiv = document.getElementById('gemini-compatibility-output');
            if (outputDiv) {
                outputDiv.innerHTML = '<p class="text-medium animate-pulse">✨ Generating compatibility insights...</p>';
                const prompt = `
                    As a Hackintosh expert, provide brief compatibility insights for the following laptop configuration. 
                    Focus on key considerations, common pitfalls, and what to double-check during setup.
                    Be concise and helpful for someone planning a Hackintosh build. Output in simple HTML with paragraphs or bullet points if appropriate.

                    Laptop: ${data.name}
                    CPU: ${data.details.cpu}
                    Integrated GPU: ${data.details.igpu}
                    Dedicated GPU: ${data.details.dgpu || "None"}
                    Wi-Fi: ${data.details.wifi}
                    Audio Codec: ${data.details.audio}
                    Trackpad Type: ${data.details.trackpad}
                    Typical Kexts: ${data.details.kexts.join(', ')}
                `;
                const insights = await GeminiAPIManager.callGeminiAPI(prompt);
                outputDiv.innerHTML = insights; 
            }
        });
    } else {
        console.error("LaptopDetailPage: Compatibility button or GeminiAPIManager not found.");
    }

    if (checklistBtn && typeof GeminiAPIManager !== 'undefined' && GeminiAPIManager.callGeminiAPI) {
        checklistBtn.addEventListener('click', async () => {
            const outputDiv = document.getElementById('gemini-checklist-output');
            if (outputDiv) {
                outputDiv.innerHTML = '<p class="text-medium animate-pulse">✨ Generating post-install checklist...</p>';
                const prompt = `
                    Generate a concise, actionable post-installation checklist for a Hackintosh build on a "${data.name}" 
                    with the following key components:
                    CPU: ${data.details.cpu}
                    iGPU: ${data.details.igpu}
                    Wi-Fi: ${data.details.wifi}
                    Audio: ${data.details.audio}
                    Trackpad: ${data.details.trackpad}

                    Focus on common items to verify and tune after macOS is installed. 
                    Format the output as an HTML unordered list (ul and li tags).
                `;
                const checklist = await GeminiAPIManager.callGeminiAPI(prompt);
                outputDiv.innerHTML = checklist; 
            }
        });
    } else {
        console.error("LaptopDetailPage: Checklist button or GeminiAPIManager not found.");
    }
}
