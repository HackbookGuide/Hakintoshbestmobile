// Define the main data object
const laptopData = {
    "thinkpad_t480": {
        name: "ThinkPad T480",
        priority: ["ease", "budget"],
        image: "assets/images/laptops/T480.png",
        score: 9.2,
        summary: "Excellent Hackintosh compatibility with great community support",
        details: {
            cpu: "Intel Core i5/i7 8th Gen",
            igpu: "Intel UHD 620",
            ram: "Up to 32GB DDR4",
            storage: "SATA + NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 90,
                performance: 85,
                battery: 80,
                stability: 95
            }
        }
    },
    "acer_swift_3": {
        name: "Acer Swift 3",
        priority: ["budget", "portability"],
        image: "assets/images/laptops/Acer Swift 3.png",
        score: 8.0,
        summary: "Budget-friendly ultrabook with good performance",
        details: {
            cpu: "Intel Core i5/i7 10th Gen",
            igpu: "Intel UHD/Iris Plus",
            ram: "Up to 16GB LPDDR4X",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 75,
                performance: 80,
                battery: 85,
                stability: 80
            }
        }
    },
    "chuwi_corebook_x": {
        name: "Chuwi CoreBook X",
        priority: ["budget"],
        image: "assets/images/laptops/Chuwi CoreBookX.png",
        score: 7.5,
        summary: "Affordable laptop with decent build quality",
        details: {
            cpu: "Intel Core i5 10th Gen",
            igpu: "Intel UHD",
            ram: "16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 70,
                performance: 75,
                battery: 70,
                stability: 75
            }
        }
    },
    "dell_xps_13_9300": {
        name: "Dell XPS 13 9300",
        priority: ["performance", "portability"],
        image: "assets/images/laptops/Dell XPS 13 9300.png",
        score: 8.9,
        summary: "Premium ultrabook with excellent build quality",
        details: {
            cpu: "Intel Core i5/i7 10th Gen",
            igpu: "Intel Iris Plus",
            ram: "Up to 32GB LPDDR4X",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 80,
                performance: 90,
                battery: 85,
                stability: 85
            }
        }
    },
    "dell_xps_13_9370": {
        name: "Dell XPS 13 9370",
        priority: ["performance", "portability"],
        image: "assets/images/laptops/Dell XPS 13 9370.png",
        score: 8.7,
        summary: "Compact ultrabook with great display",
        details: {
            cpu: "Intel Core i5/i7 8th Gen",
            igpu: "Intel UHD 620",
            ram: "Up to 16GB LPDDR3",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 80,
                performance: 85,
                battery: 85,
                stability: 85
            }
        }
    },
    "dell_xps_15_9570": {
        name: "Dell XPS 15 9570",
        priority: ["performance"],
        image: "assets/images/laptops/Dell XPS 15 9570.png",
        score: 8.5,
        summary: "Powerful laptop with dedicated graphics",
        details: {
            cpu: "Intel Core i7/i9 8th Gen",
            igpu: "Intel UHD 630",
            ram: "Up to 32GB DDR4",
            storage: "NVMe + SATA",
            macosSupport: "Monterey",
            chartData: {
                ease: 70,
                performance: 95,
                battery: 75,
                stability: 80
            }
        }
    },
    "hp_elitebook_840": {
        name: "HP EliteBook 840 G5/G6",
        priority: ["stability", "ease"],
        image: "assets/images/laptops/EliteBook 840 G56.png",
        score: 8.8,
        summary: "Business laptop with excellent reliability",
        details: {
            cpu: "Intel Core i5/i7 8th Gen",
            igpu: "Intel UHD 620",
            ram: "Up to 32GB DDR4",
            storage: "NVMe + SATA",
            macosSupport: "Monterey",
            chartData: {
                ease: 85,
                performance: 85,
                battery: 90,
                stability: 90
            }
        }
    },
    "hp_spectre_x360_15": {
        name: "HP Spectre x360 15",
        priority: ["performance"],
        image: "assets/images/laptops/HP Spectre x360 15.png",
        score: 8.3,
        summary: "Premium 2-in-1 with powerful specs",
        details: {
            cpu: "Intel Core i7 10th Gen",
            igpu: "Intel Iris Plus",
            ram: "Up to 16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 75,
                performance: 90,
                battery: 80,
                stability: 80
            }
        }
    },
    "lenovo_ideapad_330s": {
        name: "Lenovo IdeaPad 330S",
        priority: ["budget"],
        image: "assets/images/laptops/IdeaPad 330S.png",
        score: 7.8,
        summary: "Budget-friendly laptop with good value",
        details: {
            cpu: "Intel Core i3/i5/i7 8th Gen",
            igpu: "Intel UHD 620",
            ram: "Up to 16GB DDR4",
            storage: "SATA + NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 75,
                performance: 75,
                battery: 70,
                stability: 80
            }
        }
    },
    "lenovo_ideapad_530s": {
        name: "Lenovo IdeaPad 530S",
        priority: ["budget", "portability"],
        image: "assets/images/laptops/IdeaPad530S.png",
        score: 8.0,
        summary: "Mid-range laptop with good build quality",
        details: {
            cpu: "Intel Core i5/i7 8th Gen",
            igpu: "Intel UHD 620",
            ram: "Up to 16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 80,
                performance: 80,
                battery: 75,
                stability: 80
            }
        }
    },
    "dell_latitude_7x90": {
        name: "Dell Latitude 7x90",
        priority: ["stability", "ease"],
        image: "assets/images/laptops/Latitude 7x90.png",
        score: 8.9,
        summary: "Business laptop series with great compatibility",
        details: {
            cpu: "Intel Core i5/i7 8th/10th Gen",
            igpu: "Intel UHD/Iris Plus",
            ram: "Up to 32GB DDR4",
            storage: "SATA + NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 90,
                performance: 85,
                battery: 85,
                stability: 95
            }
        }
    },
    "lg_gram_14": {
        name: "LG Gram 14",
        priority: ["portability"],
        image: "assets/images/laptops/LG Gram 14.png",
        score: 8.6,
        summary: "Ultra-lightweight laptop with excellent battery life",
        details: {
            cpu: "Intel Core i5/i7 10th Gen",
            igpu: "Intel Iris Plus",
            ram: "Up to 16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 80,
                performance: 85,
                battery: 95,
                stability: 85
            }
        }
    },
    "huawei_matebook_x_pro": {
        name: "Huawei MateBook X Pro",
        priority: ["performance", "portability"],
        image: "assets/images/laptops/MateBook X Pro.png",
        score: 8.7,
        summary: "Premium ultrabook with 3:2 display",
        details: {
            cpu: "Intel Core i5/i7 10th Gen",
            igpu: "Intel Iris Plus",
            ram: "16GB LPDDR3",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 85,
                performance: 90,
                battery: 85,
                stability: 85
            }
        }
    },
    "xiaomi_mi_notebook_pro": {
        name: "Xiaomi Mi Notebook Pro",
        priority: ["performance", "budget"],
        image: "assets/images/laptops/Mi Notebook Pro.png",
        score: 8.4,
        summary: "High-performance laptop with premium build",
        details: {
            cpu: "Intel Core i5/i7 8th Gen",
            igpu: "Intel UHD 620",
            ram: "Up to 16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 75,
                performance: 85,
                battery: 80,
                stability: 85
            }
        }
    },
    "msi_gs65": {
        name: "MSI GS65",
        priority: ["performance"],
        image: "assets/images/laptops/MSI GS65.png",
        score: 7.8,
        summary: "Gaming laptop with powerful specs",
        details: {
            cpu: "Intel Core i7 8th/9th Gen",
            igpu: "Intel UHD 630",
            ram: "Up to 32GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 65,
                performance: 95,
                battery: 70,
                stability: 75
            }
        }
    },
    "msi_prestige_14": {
        name: "MSI Prestige 14",
        priority: ["performance", "portability"],
        image: "assets/images/laptops/MSI Prestige 14.png",
        score: 8.2,
        summary: "Creator-focused laptop with good performance",
        details: {
            cpu: "Intel Core i5/i7 10th Gen",
            igpu: "Intel Iris Plus",
            ram: "Up to 16GB LPDDR3",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 75,
                performance: 90,
                battery: 80,
                stability: 80
            }
        }
    },
    "dell_precision_5550": {
        name: "Dell Precision 5550",
        priority: ["performance"],
        image: "assets/images/laptops/Precision 55x0.png",
        score: 8.6,
        summary: "Workstation laptop with powerful specs",
        details: {
            cpu: "Intel Core i7/i9/Xeon",
            igpu: "Intel UHD",
            ram: "Up to 64GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 70,
                performance: 95,
                battery: 75,
                stability: 85
            }
        }
    },
    "hp_probook_450_g7": {
        name: "HP ProBook 450 G7",
        priority: ["budget", "ease"],
        image: "assets/images/laptops/ProBook 450 G7.png",
        score: 8.5,
        summary: "Business laptop with good value",
        details: {
            cpu: "Intel Core i5/i7 10th Gen",
            igpu: "Intel UHD",
            ram: "Up to 32GB DDR4",
            storage: "SATA + NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 85,
                performance: 80,
                battery: 80,
                stability: 85
            }
        }
    },
    "samsung_notebook_9": {
        name: "Samsung Notebook 9",
        priority: ["portability"],
        image: "assets/images/laptops/Samsung Notebook 9.png",
        score: 8.3,
        summary: "Ultra-lightweight laptop with good performance",
        details: {
            cpu: "Intel Core i5/i7 8th Gen",
            igpu: "Intel UHD 620",
            ram: "Up to 16GB LPDDR3",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 80,
                performance: 85,
                battery: 85,
                stability: 80
            }
        }
    },
    "hp_spectre_x360_13": {
        name: "HP Spectre x360 13",
        priority: ["performance", "portability"],
        image: "assets/images/laptops/Spectre x360 13.png",
        score: 8.7,
        summary: "Premium 2-in-1 with excellent build quality",
        details: {
            cpu: "Intel Core i5/i7 10th Gen",
            igpu: "Intel Iris Plus",
            ram: "Up to 16GB LPDDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            chartData: {
                ease: 80,
                performance: 90,
                battery: 85,
                stability: 85
            }
        }
    }
};

// Add error handling and module exports
try {
    // Verify data loaded correctly
    if (typeof laptopData !== 'undefined') {
        console.log(`Data loaded successfully: ${Object.keys(laptopData).length} laptop models found`);
    } else {
        throw new Error('laptopData is undefined after initialization');
    }

    // Add data validation helper
    const validateLaptopData = (data) => {
        const requiredFields = ['name', 'priority', 'image', 'score', 'summary', 'details'];
        const requiredDetails = ['cpu', 'igpu', 'ram', 'storage', 'macosSupport'];
        
        for (const [key, laptop] of Object.entries(data)) {
            // Check required top-level fields
            requiredFields.forEach(field => {
                if (!laptop[field]) {
                    console.warn(`Warning: Missing ${field} for laptop ${key}`);
                }
            });
            
            // Check required detail fields
            if (laptop.details) {
                requiredDetails.forEach(detail => {
                    if (!laptop.details[detail]) {
                        console.warn(`Warning: Missing details.${detail} for laptop ${key}`);
                    }
                });
            }
        }
    };

    // Run validation
    validateLaptopData(laptopData);

    // Export for module usage
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = laptopData;
    }

} catch (error) {
    console.error('Error in data.js:', error);
}
