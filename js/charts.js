const ChartManager = (() => {
    /**
     * Stores all active Chart.js instances on the current page.
     * This allows them to be updated or destroyed collectively.
     * @type {Chart[]}
     */
    const chartInstances = [];

    /**
     * Creates a new radar chart or updates an existing one on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {string} label - The label for the dataset (e.g., laptop name).
     * @param {number[]} chartData - An array of data points for the radar chart.
     * @param {string} theme - The current theme ('dark' or 'light').
     * @param {boolean} [isComparisonChart=false] - Flag to adjust styling for smaller comparison charts.
     * @returns {Chart} The new Chart.js instance.
     */
    function createRadarChart(ctx, label, chartData, theme, isComparisonChart = false) {
        if (!ctx) {
            console.error("ChartManager: Canvas context is undefined. Cannot create chart.");
            return null;
        }
        if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
            console.error("ChartManager: Invalid chartData for label:", label);
            // Optionally render a placeholder or error message on the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.font = "16px Inter";
            ctx.fillStyle = theme === 'dark' ? '#a0aec0' : '#495057';
            ctx.textAlign = "center";
            ctx.fillText("No chart data available.", ctx.canvas.width / 2, ctx.canvas.height / 2);
            return null;
        }


        const isDark = theme === 'dark';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
        const pointLabelColor = isDark ? '#e2e8f0' : '#495057';
        const angleLinesColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        const tickColor = pointLabelColor;
        const legendLabelColor = pointLabelColor;

        // Destroy previous chart on the same canvas context if it exists
        // Chart.js v3+ stores charts globally by canvas id or canvas element.
        const existingChart = Chart.getChart(ctx.canvas);
        if (existingChart) {
            const index = chartInstances.indexOf(existingChart);
            if (index > -1) {
                chartInstances.splice(index, 1); // Remove from our tracking array
            }
            existingChart.destroy();
        }

        const newChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Ease', 'Perf', 'Port', 'Budget'], 
                datasets: [{
                    label: label,
                    data: chartData,
                    backgroundColor: 'rgba(74, 144, 226, 0.2)',
                    borderColor: 'rgba(74, 144, 226, 1)',
                    pointBackgroundColor: 'rgba(74, 144, 226, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(74, 144, 226, 1)',
                    borderWidth: 1.5, // Slightly thicker line
                    pointRadius: isComparisonChart ? 2 : 3,
                    pointHoverRadius: isComparisonChart ? 4 : 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: angleLinesColor },
                        grid: { color: gridColor },
                        pointLabels: { 
                            font: { 
                                size: isComparisonChart ? 9 : 11, // Smaller font for comparison charts
                                family: 'Inter, sans-serif'
                            }, 
                            color: pointLabelColor 
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1,
                            backdropColor: isDark ? 'rgba(45, 55, 72, 0.75)' : 'rgba(255, 255, 255, 0.75)',
                            color: tickColor,
                            showLabelBackdrop: !isComparisonChart, // Hide backdrop for cleaner comparison charts
                            font: {
                                size: isComparisonChart ? 8 : 10,
                                family: 'Inter, sans-serif'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: !isComparisonChart, // Hide legend for individual comparison charts for space
                        position: 'top',
                        labels: { 
                            color: legendLabelColor,
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        titleFont: { family: 'Inter, sans-serif' },
                        bodyFont: { family: 'Inter, sans-serif' },
                        footerFont: { family: 'Inter, sans-serif' },
                    }
                },
                elements: {
                    line: {
                        tension: 0.1 // Slight curve to lines
                    }
                }
            }
        });
        chartInstances.push(newChart); // Add new chart to the list
        return newChart;
    }
    
    /**
     * Updates the theme for all currently tracked chart instances.
     * @param {string} theme - The new theme ('dark' or 'light').
     */
    function updateAllChartThemes(theme) { 
        chartInstances.forEach(chart => {
            if (chart && chart.options && chart.options.scales && chart.options.scales.r) {
                const isDark = theme === 'dark';
                const gridColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
                const pointLabelColor = isDark ? '#e2e8f0' : '#495057';
                const angleLinesColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                const tickColor = pointLabelColor; // Ticks color same as point labels
                
                chart.options.scales.r.grid.color = gridColor;
                chart.options.scales.r.pointLabels.color = pointLabelColor;
                chart.options.scales.r.angleLines.color = angleLinesColor;
                chart.options.scales.r.ticks.backdropColor = isDark ? 'rgba(45, 55, 72, 0.75)' : 'rgba(255, 255, 255, 0.75)';
                chart.options.scales.r.ticks.color = tickColor;
                if (chart.options.plugins && chart.options.plugins.legend) {
                   chart.options.plugins.legend.labels.color = pointLabelColor;
                }
                chart.update();
            }
        });
    }
    
    /**
     * Destroys all tracked chart instances. Call this when navigating away from a page
     * that uses charts to prevent memory leaks or rendering issues.
     */
    function clearChartInstances() { 
        chartInstances.forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        chartInstances.length = 0; // Empty the array
    }

    // Expose public methods
    return {
        createRadarChart,
        updateAllChartThemes,
        clearChartInstances
    };
})();
