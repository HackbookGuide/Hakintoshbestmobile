// Configuration for validation
const CONFIG = {
    requiredFields: ['name', 'priority', 'image', 'score', 'summary', 'details'],
    requiredDetails: [
        'cpu', 'igpu', 'ram', 'storage', 'macosSupport',
        'minMacosSupport', 'maxMacosSupport', 'wifiBluetooth',
        'audioCodec', 'trackpad', 'screenResolution', 'chartData',
        'dimensions',
        'weight',
        'batteryLife',
        'ports',
        'keyboard',
        'displayFeatures',
        'biosVersion',
        'knownIssues',
        'communitySupport',
        'guides',
        'thermals'
    ],
    chartMetrics: ['ease', 'performance', 'battery', 'stability']
};

// Data validation helper
const validateLaptopData = (data) => {
    const validationResults = {
        errors: [],
        warnings: []
    };

    try {
        for (const [key, laptop] of Object.entries(data)) {
            // Validate required top-level fields
            CONFIG.requiredFields.forEach(field => {
                if (!laptop[field]) {
                    validationResults.errors.push(`Missing ${field} for laptop ${key}`);
                }
            });

            // Validate score range
            if (typeof laptop.score !== 'number' || laptop.score < 0 || laptop.score > 10) {
                validationResults.errors.push(`Invalid score (${laptop.score}) for laptop ${key}`);
            }

            // Validate details object
            if (laptop.details) {
                CONFIG.requiredDetails.forEach(detail => {
                    if (!laptop.details[detail]) {
                        validationResults.warnings.push(`Missing details.${detail} for laptop ${key}`);
                    }
                });

                // Validate chart data
                if (laptop.details.chartData) {
                    CONFIG.chartMetrics.forEach(metric => {
                        const value = laptop.details.chartData[metric];
                        if (typeof value !== 'number' || value < 0 || value > 100) {
                            validationResults.errors.push(
                                `Invalid chartData.${metric} (${value}) for laptop ${key}`
                            );
                        }
                    });
                }
            } else {
                validationResults.errors.push(`Missing details object for laptop ${key}`);
            }
        }
    } catch (error) {
        validationResults.errors.push(`Validation error: ${error.message}`);
    }

    return validationResults;
};

// First, ensure laptopMethods is defined before laptopData
const laptopMethods = {
    getByPriority(priority) {
        return Object.values(this).filter(laptop => 
            laptop.priority && laptop.priority.includes(priority)
        );
    },
    getByScore(minScore) {
        return Object.values(this).filter(laptop => laptop.score >= minScore);
    },
    getTopRated(limit = 5) {
        return Object.values(this)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    },
    getCompatibleWith(macOSVersion) {
        const version = macOSVersion.toLowerCase();
        return Object.values(this).filter(laptop => {
            const support = laptop.details.macosSupport.toLowerCase();
            return support.includes(version) || 
                   laptop.details.minMacosSupport.toLowerCase().includes(version) ||
                   laptop.details.maxMacosSupport.toLowerCase().includes(version);
        });
    }
};

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
            macosSupport: "Ventura", // Primary supported/tested version
            minMacosSupport: "Mojave", 
            maxMacosSupport: "Sonoma (with caveats)", 
            wifiBluetooth: "Intel Wireless-AC 8265 / Realtek BT (Often replaced with Broadcom)",
            audioCodec: "Realtek ALC3287 (ALC257)",
            trackpad: "PS/2 Synaptics/ALPS (Full gestures with kexts)",
            screenResolution: "1920x1080 (FHD)",
            chartData: {
                ease: 90,
                performance: 85,
                battery: 80,
                stability: 95
            },
            dimensions: {
                width: "336.6 mm",
                depth: "232.5 mm",
                height: "19.95 mm"
            },
            weight: "1.58 kg",
            batteryLife: {
                average: "12-15 hours",
                capacity: "72Wh (24 + 48)",
                type: "Dual battery system (internal + external)"
            },
            ports: {
                usb: ["2x USB 3.1 Gen 1", "1x USB 3.1 Type-C Gen 2"],
                thunderbolt: "1x Thunderbolt 3",
                video: ["HDMI 1.4b", "Native DisplayPort 1.2"],
                network: "RJ45 Gigabit Ethernet",
                others: ["SD Card Reader", "3.5mm Audio Jack", "Smart Card Reader (optional)"]
            },
            keyboard: {
                type: "ThinkPad Precision Keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size, spill-resistant"
            },
            displayFeatures: {
                type: "IPS Anti-glare",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "250 nits",
                colorGamut: "45% NTSC",
                panel: "BOE NV140FHM-N49",
                touchscreen: false
            },
            biosVersion: {
                recommended: "1.45",
                notes: "CFG lock must be disabled",
                secureBootSupport: true
            },
            knownIssues: [
                "Sleep works but may require additional patches",
                "SD Card reader requires additional kext",
                "Fingerprint reader not supported"
            ],
            communitySupport: {
                rating: "Excellent",
                resources: [
                    "GitHub guides available",
                    "Active forum support",
                    "Multiple successful builds documented"
                ]
            },
            guides: {
                installation: "https://github.com/EETagent/T480-OpenCore-Hackintosh",
                additional: [
                    "https://github.com/valnoxy/t480-oc",
                    "https://github.com/MSzturc/T480-OpenCore"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Single fan with dual heat pipes",
                undervolting: "Supported via modified BIOS"
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
            minMacosSupport: "Catalina (Placeholder - Verify)", 
            maxMacosSupport: "Ventura (Placeholder - Verify)", 
            wifiBluetooth: "Intel Wi-Fi 6 AX201 (Placeholder - Verify specific model)", 
            audioCodec: "Realtek ALC256 (Placeholder - Verify specific model)", 
            trackpad: "I2C HID (Placeholder - Verify specific model)", 
            screenResolution: "1920x1080 (FHD) (Placeholder - Verify)",
            chartData: {
                ease: 75,
                performance: 80,
                battery: 85,
                stability: 80
            },
            dimensions: {
                width: "323.4 mm",
                depth: "218.9 mm",
                height: "15.95 mm"
            },
            weight: "1.2 kg",
            batteryLife: {
                average: "10-12 hours",
                capacity: "48Wh",
                type: "Li-ion battery"
            },
            ports: {
                usb: ["2x USB 3.2 Gen 1 Type-A", "1x USB 3.2 Gen 2 Type-C"],
                thunderbolt: "No",
                video: ["HDMI 2.0"],
                network: "No built-in Ethernet",
                others: ["3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Standard keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS LED-backlit",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "72% NTSC",
                panel: "AU Optronics (Verify specific model)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "DVMT needs to be set to 64MB minimum",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card may need replacement for better compatibility",
                "Sleep might require additional patches",
                "Battery reporting might need ECEnabler.kext"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Several GitHub repositories available",
                    "Active forum discussions",
                    "Multiple success stories"
                ]
            },
            guides: {
                installation: "https://github.com/username/acer-swift3-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/your-thread-here",
                    "https://github.com/another-repo/swift3-efi"
                ]
            },
            thermals: {
                idleTemp: "30-35°C",
                loadTemp: "70-80°C",
                coolingSystem: "Single fan with copper heat pipe",
                undervolting: "Supported via ThrottleStop"
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
            cpu: "Intel Core i5 10th Gen (i5-1035G4 or similar)",
            igpu: "Intel Iris Plus Graphics G4", 
            ram: "16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey", 
            minMacosSupport: "Big Sur", 
            maxMacosSupport: "Ventura (Untested, may have issues)", 
            wifiBluetooth: "Intel Wireless-AC 7265 (or similar, check model)",
            audioCodec: "Realtek ALC269 (Layout-id may be needed)",
            trackpad: "I2C HID (Verify specific model for VoodooI2C)",
            screenResolution: "2160x1440 (3:2 Aspect Ratio)",
            chartData: {
                ease: 70,
                performance: 75,
                battery: 70,
                stability: 75
            },
            dimensions: {
                width: "317 mm",
                depth: "235 mm",
                height: "17 mm"
            },
            weight: "1.5 kg",
            batteryLife: {
                average: "8-10 hours",
                capacity: "46Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x USB 3.0 Type-A", "1x USB Type-C"],
                thunderbolt: "No",
                video: ["HDMI"],
                network: "No built-in Ethernet",
                others: ["3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Standard keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS Display",
                resolution: "2160x1440",
                aspectRatio: "3:2",
                brightness: "350 nits",
                colorGamut: "100% sRGB",
                panel: "Generic IPS Panel",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "DVMT needs patch, CFG lock must be disabled",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card requires replacement",
                "Sleep may be unstable",
                "Battery monitoring needs patches",
                "Some function keys may not work"
            ],
            communitySupport: {
                rating: "Moderate",
                resources: [
                    "Limited GitHub guides",
                    "Some forum discussions",
                    "Basic documentation available"
                ]
            },
            guides: {
                installation: "https://github.com/username/corebook-x-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/chuwi-corebook-x",
                    "https://github.com/another-repo/chuwi-efi"
                ]
            },
            thermals: {
                idleTemp: "35-45°C",
                loadTemp: "80-90°C",
                coolingSystem: "Single fan cooling",
                undervolting: "Supported via ThrottleStop"
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
            minMacosSupport: "Catalina (Placeholder - Verify)", 
            maxMacosSupport: "Ventura (Placeholder - Verify)", 
            wifiBluetooth: "Killer Wi-Fi 6 AX1650 (Intel based) (Placeholder - Verify)", 
            audioCodec: "Realtek ALC3271 (ALC289) (Placeholder - Verify)", 
            trackpad: "I2C HID Precision (Placeholder - Verify)", 
            screenResolution: "1920x1200 or 3840x2400 (Placeholder - Verify)",
            chartData: {
                ease: 80,
                performance: 90,
                battery: 85,
                stability: 85
            },
            dimensions: {
                width: "296 mm",
                depth: "199 mm",
                height: "14.8 mm"
            },
            weight: "1.2 kg",
            batteryLife: {
                average: "10-12 hours",
                capacity: "52Wh",
                type: "Li-ion"
            },
            ports: {
                usb: ["2x Thunderbolt 3"],
                thunderbolt: "2x Thunderbolt 3",
                video: ["DisplayPort over USB-C"],
                network: "No built-in Ethernet",
                others: ["MicroSD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Edge-to-edge keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "InfinityEdge Touch Display",
                resolution: ["1920x1200", "3840x2400"],
                aspectRatio: "16:10",
                brightness: "500 nits",
                colorGamut: "100% sRGB",
                panel: "Sharp/Samsung (varies by configuration)",
                touchscreen: true
            },
            biosVersion: {
                recommended: "Latest Dell BIOS",
                notes: "CFG lock must be disabled",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card may need replacement",
                "Sleep requires additional patches",
                "Thunderbolt hot-plug might be unstable",
                "Brightness keys need remapping"
            ],
            communitySupport: {
                rating: "Very Good",
                resources: [
                    "Multiple GitHub guides",
                    "Active forum support",
                    "Well-documented solutions"
                ]
            },
            guides: {
                installation: "https://github.com/username/xps-9300-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/dell-xps-13-9300",
                    "https://github.com/another-repo/xps9300-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan cooling",
                undervolting: "Limited by BIOS restrictions"
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
            minMacosSupport: "High Sierra (Placeholder - Verify)", 
            maxMacosSupport: "Ventura (Placeholder - Verify)", 
            wifiBluetooth: "Qualcomm QCA61x4A (Often replaced) (Placeholder - Verify)", 
            audioCodec: "Realtek ALC3271 (ALC299) (Placeholder - Verify)", 
            trackpad: "I2C HID Precision (Placeholder - Verify)", 
            screenResolution: "1920x1080 or 3840x2160 (Placeholder - Verify)",
            chartData: {
                ease: 80,
                performance: 85,
                battery: 85,
                stability: 85
            },
            dimensions: {
                width: "302 mm",
                depth: "199 mm",
                height: "11.6 mm"
            },
            weight: "1.21 kg",
            batteryLife: {
                average: "10-12 hours",
                capacity: "52Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x Thunderbolt 3", "1x USB-C 3.1"],
                thunderbolt: "2x Thunderbolt 3",
                video: ["DisplayPort over USB-C"],
                network: "No built-in Ethernet",
                others: ["MicroSD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Chiclet-style keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "InfinityEdge IPS",
                resolution: ["1920x1080", "3840x2160"],
                aspectRatio: "16:9",
                brightness: "400 nits",
                colorGamut: "100% sRGB",
                panel: "Sharp SHP148B",
                touchscreen: false // Set to true if touch variant
            },
            biosVersion: {
                recommended: "1.12.0",
                notes: "CFG lock must be disabled",
                secureBootSupport: true
            },
            knownIssues: [
                "Sleep may require additional patches",
                "Thunderbolt hot-plug may be unstable",
                "Original Wi-Fi card needs replacement"
            ],
            communitySupport: {
                rating: "Excellent",
                resources: [
                    "Multiple GitHub guides",
                    "Active forum support",
                    "Well-documented solutions"
                ]
            },
            guides: {
                installation: "https://github.com/the-darkvoid/XPS9370-macOS",
                additional: [
                    "https://github.com/3wsoftware/XPS9370-macOS-Mojave",
                    "https://www.tonymacx86.com/threads/guide-dell-xps-13-9370-mojave-virtualbox.286712/"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan cooling",
                undervolting: "Supported via ThrottleStop"
            }
        }
    },
    "dell_xps_15_9570": {
        name: "Dell XPS 15 9570",
        priority: ["performance"],
        image: "assets/images/laptops/Dell XPS 15 9570.png",
        score: 8.5,
        summary: "Powerful laptop with dedicated graphics (dGPU disabled in macOS)",
        details: {
            cpu: "Intel Core i7/i9 8th Gen",
            igpu: "Intel UHD 630",
            ram: "Up to 32GB DDR4",
            storage: "NVMe + SATA",
            macosSupport: "Monterey",
            minMacosSupport: "Mojave (Placeholder - Verify)", 
            maxMacosSupport: "Ventura (dGPU disabled) (Placeholder - Verify)", 
            wifiBluetooth: "Killer 1535 (Qualcomm QCA61x4A - Often replaced) (Placeholder - Verify)", 
            audioCodec: "Realtek ALC3266 (ALC298) (Placeholder - Verify)", 
            trackpad: "I2C HID Precision (Placeholder - Verify)", 
            screenResolution: "1920x1080 or 3840x2160 (Placeholder - Verify)",
            chartData: {
                ease: 70,
                performance: 95, 
                battery: 75,
                stability: 80
            },
            dimensions: {
                width: "357 mm",
                depth: "235 mm",
                height: "17 mm"
            },
            weight: "1.8 kg",
            batteryLife: {
                average: "8-10 hours",
                capacity: "97Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x USB 3.1 Type-A", "1x Thunderbolt 3"],
                thunderbolt: "1x Thunderbolt 3",
                video: ["HDMI 2.0"],
                network: "No built-in Ethernet",
                others: ["SD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Chiclet-style keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS Anti-glare",
                resolution: ["1920x1200", "3840x2400"],
                aspectRatio: "16:10",
                brightness: "500 nits",
                colorGamut: "100% Adobe RGB",
                panel: "Sharp/Dell Premium Panel",
                touchscreen: false
            },
            biosVersion: {
                recommended: "1.17.1",
                notes: "dGPU must be disabled, CFG lock off",
                secureBootSupport: true
            },
            knownIssues: [
                "NVIDIA GPU must be disabled",
                "Sleep issues need patches",
                "Thunderbolt requires careful configuration",
                "Original Wi-Fi card needs replacement"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Several GitHub guides",
                    "Active forum support",
                    "Multiple success stories"
                ]
            },
            guides: {
                installation: "https://github.com/bavariancake/XPS9570-macOS",
                additional: [
                    "https://github.com/LuletterSoul/Dell-XPS-15-9570-macOS",
                    "https://www.tonymacx86.com/threads/guide-dell-xps-15-9570-mojave.267805/"
                ]
            },
            thermals: {
                idleTemp: "40-45°C",
                loadTemp: "80-90°C",
                coolingSystem: "Dual fan with shared heatpipes",
                undervolting: "Recommended via ThrottleStop"
            }
        }
    },
    "hp_elitebook_840": { // Assuming G5/G6 as in original data
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
            minMacosSupport: "Mojave (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Intel AC 8265/9560 (Placeholder - Verify)",
            audioCodec: "Conexant CX8050 (Placeholder - Verify)",
            trackpad: "Synaptics SMBus (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) (Placeholder - Verify)",
            chartData: {
                ease: 85,
                performance: 85,
                battery: 90,
                stability: 90
            },
            dimensions: {
                width: "326 mm",
                depth: "234 mm",
                height: "17.9 mm"
            },
            weight: "1.48 kg",
            batteryLife: {
                average: "13-15 hours",
                capacity: "50Wh",
                type: "Long Life 3-cell Li-ion"
            },
            ports: {
                usb: ["2x USB 3.1 Type-A", "1x USB 3.1 Type-C"],
                thunderbolt: "1x Thunderbolt 3",
                video: ["HDMI 1.4b"],
                network: "RJ45 Gigabit Ethernet",
                others: ["Smart Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "HP Premium Keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size, spill-resistant"
            },
            displayFeatures: {
                type: "IPS Anti-glare",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "400 nits",
                colorGamut: "72% NTSC",
                panel: "CMN14D5 (or similar)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest HP BIOS",
                notes: "CFG lock must be disabled via BIOS mod",
                secureBootSupport: true
            },
            knownIssues: [
                "Built-in Wi-Fi may need replacement",
                "Fingerprint reader not supported",
                "Some sleep states may not work properly"
            ],
            communitySupport: {
                rating: "Very Good",
                resources: [
                    "Multiple GitHub guides",
                    "Active forum discussions",
                    "Well-documented solutions"
                ]
            },
            guides: {
                installation: "https://github.com/username/elitebook-840-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/hp-elitebook-840",
                    "https://github.com/other-repo/840g5-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "70-80°C",
                coolingSystem: "Single fan with dual heat pipes",
                undervolting: "Supported via ThrottleStop"
            }
        }
    },
    "hp_spectre_x360_15": {
        name: "HP Spectre x360 15",
        priority: ["performance"],
        image: "assets/images/laptops/HP Spectre x360 15.png",
        score: 8.3,
        summary: "Premium 2-in-1 with powerful specs (dGPU likely disabled)",
        details: {
            cpu: "Intel Core i7 10th Gen",
            igpu: "Intel Iris Plus",
            ram: "Up to 16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Catalina (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify, dGPU issues)",
            wifiBluetooth: "Intel Wi-Fi 6 AX201 (Placeholder - Verify)",
            audioCodec: "Realtek ALC (Placeholder - Verify specific model)",
            trackpad: "I2C HID Precision (Placeholder - Verify)",
            screenResolution: "3840x2160 (4K) or 1920x1080 (FHD) (Placeholder - Verify)",
            chartData: {
                ease: 75,
                performance: 90,
                battery: 80,
                stability: 80
            },
            dimensions: {
                width: "359.9 mm",
                depth: "226.4 mm",
                height: "19.3 mm"
            },
            weight: "1.92 kg",
            batteryLife: {
                average: "13-15 hours",
                capacity: "72.9Wh",
                type: "6-cell Li-ion polymer"
            },
            ports: {
                usb: ["1x USB 3.1 Type-A", "2x Thunderbolt 3"],
                thunderbolt: "2x Thunderbolt 3",
                video: ["HDMI 2.0b"],
                network: "No built-in Ethernet",
                others: ["MicroSD reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Island-style keyboard",
                backlit: true,
                numpad: true,
                layout: "Full-size with numpad"
            },
            displayFeatures: {
                type: "AMOLED Touch Display",
                resolution: ["1920x1080", "3840x2160"],
                aspectRatio: "16:9",
                brightness: "400 nits",
                colorGamut: "100% DCI-P3",
                panel: "Samsung AMOLED",
                touchscreen: true
            },
            biosVersion: {
                recommended: "Latest HP BIOS",
                notes: "dGPU must be disabled, CFG lock off",
                secureBootSupport: true
            },
            knownIssues: [
                "NVIDIA GPU not supported",
                "Touchscreen may need patches",
                "Some sleep states unstable",
                "Original Wi-Fi card needs replacement"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Several GitHub guides",
                    "Forum support available",
                    "Growing user base"
                ]
            },
            guides: {
                installation: "https://github.com/username/spectre-x360-15-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/hp-spectre-x360-15",
                    "https://github.com/another-repo/spectre-efi"
                ]
            },
            thermals: {
                idleTemp: "35-45°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan cooling solution",
                undervolting: "Limited due to recent BIOS restrictions"
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
            minMacosSupport: "Mojave (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Qualcomm Atheros / Realtek (Placeholder - Often replaced, verify)",
            audioCodec: "Realtek ALC236 (Placeholder - Verify)",
            trackpad: "Synaptics/ELAN I2C/PS2 (Placeholder - Verify)",
            screenResolution: "1366x768 or 1920x1080 (Placeholder - Verify)",
            chartData: {
                ease: 75,
                performance: 75,
                battery: 70,
                stability: 80
            },
            dimensions: {
                width: "323 mm",
                depth: "234 mm",
                height: "18.9 mm"
            },
            weight: "1.67 kg",
            batteryLife: {
                average: "7-9 hours",
                capacity: "45Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x USB 3.0 Type-A", "1x USB 3.1 Type-C"],
                thunderbolt: "No",
                video: ["HDMI 1.4b"],
                network: "No built-in Ethernet",
                others: ["4-in-1 Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Standard keyboard",
                backlit: false,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS LED-backlit",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "72% NTSC",
                panel: "AU Optronics (Verify specific model)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "DVMT needs configuration",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card needs replacement",
                "Sleep may be unstable",
                "Battery life reporting needs patches"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Some GitHub repositories",
                    "Forum discussions available",
                    "Basic documentation exists"
                ]
            },
            guides: {
                installation: "https://github.com/username/ideapad-330s-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/ideapad-330s",
                    "https://github.com/another-repo/330s-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Single fan with heat pipe",
                undervolting: "Supported via ThrottleStop"
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
            minMacosSupport: "Mojave (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Intel AC 3165/8265 (Placeholder - Verify)",
            audioCodec: "Realtek ALC236 (Placeholder - Verify)",
            trackpad: "I2C HID (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) (Placeholder - Verify)",
            chartData: {
                ease: 80,
                performance: 80,
                battery: 75,
                stability: 80
            },
            dimensions: {
                width: "308.3 mm",
                depth: "211 mm",
                height: "16.4 mm"
            },
            weight: "1.49 kg",
            batteryLife: {
                average: "8-10 hours",
                capacity: "45Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x USB 3.0 Type-A", "1x USB 3.1 Type-C"],
                thunderbolt: "No",
                video: ["HDMI 1.4b"],
                network: "No built-in Ethernet",
                others: ["SD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Backlit keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS-level Anti-glare",
                resolution: ["1920x1080", "3840x2160"],
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "100% sRGB",
                panel: "IPS Panel (Verify specific model)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "CFG lock must be disabled",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card may need replacement",
                "Sleep requires additional patches",
                "HDMI audio might be unstable"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Multiple GitHub guides",
                    "Active forum support",
                    "Detailed documentation"
                ]
            },
            guides: {
                installation: "https://github.com/username/ideapad-530s-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/ideapad-530s",
                    "https://github.com/another-repo/530s-efi"
                ]
            },
            thermals: {
                idleTemp: "30-35°C",
                loadTemp: "70-80°C",
                coolingSystem: "Single fan with dual heat pipes",
                undervolting: "Supported via ThrottleStop"
            }
        }
    },
    "dell_latitude_7x90": { // e.g., 7390, 7490
        name: "Dell Latitude 7x90",
        priority: ["stability", "ease"],
        image: "assets/images/laptops/Latitude 7x90.png",
        score: 8.9,
        summary: "Business laptop series with great compatibility",
        details: {
            cpu: "Intel Core i5/i7 8th Gen", // Removed 10th Gen as 7x90 series is 8th Gen
            igpu: "Intel UHD 620",
            ram: "Up to 32GB DDR4",
            storage: "SATA + NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Mojave (Placeholder - Verify)",
            maxMacosSupport: "Sonoma (Placeholder - Verify)",
            wifiBluetooth: "Intel AC 8265/9560 (Placeholder - Verify)",
            audioCodec: "Realtek ALC3246 (ALC295) (Placeholder - Verify)",
            trackpad: "ALPS I2C/Dell Touchpad (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) (Placeholder - Verify)",
            chartData: {
                ease: 90,
                performance: 85,
                battery: 85,
                stability: 95
            },
            dimensions: {
                width: "330.5 mm",
                depth: "229.5 mm",
                height: "17.9 mm"
            },
            weight: "1.4 kg",
            batteryLife: {
                average: "12-14 hours",
                capacity: "60Wh",
                type: "4-cell Li-ion"
            },
            ports: {
                usb: ["3x USB 3.1 Type-A", "1x USB Type-C"],
                thunderbolt: "1x Thunderbolt 3",
                video: ["HDMI 1.4"],
                network: "RJ45 Gigabit Ethernet",
                others: ["SD Card Reader", "3.5mm Audio Jack", "Smart Card Reader"]
            },
            keyboard: {
                type: "Dell Business Keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size, spill-resistant"
            },
            displayFeatures: {
                type: "IPS Anti-glare",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "72% NTSC",
                panel: "AUO/LG (varies by model)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest Dell BIOS",
                notes: "CFG lock can be disabled via setup utility",
                secureBootSupport: true
            },
            knownIssues: [
                "Stock Wi-Fi card may need replacement",
                "Sleep needs additional configuration",
                "Fingerprint reader not supported"
            ],
            communitySupport: {
                rating: "Very Good",
                resources: [
                    "Multiple GitHub guides",
                    "Active Dell forums",
                    "Well-documented solutions"
                ]
            },
            guides: {
                installation: "https://github.com/username/latitude-7x90-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/dell-latitude-7x90",
                    "https://github.com/altro-repo/latitude-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "70-80°C",
                coolingSystem: "Dual heat pipes with single fan",
                undervolting: "Supported via ThrottleStop"
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
            cpu: "Intel Core i5/i7 10th Gen", // Or newer, specify model year if possible
            igpu: "Intel Iris Plus",
            ram: "Up to 16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Catalina (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Intel Wi-Fi 6 AX201 (Placeholder - Verify)",
            audioCodec: "Realtek ALC (Placeholder - Verify specific model)",
            trackpad: "I2C HID Precision (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) or 2560x1600 (WQXGA) (Placeholder - Verify)",
            chartData: {
                ease: 80,
                performance: 85,
                battery: 95,
                stability: 85
            },
            dimensions: {
                width: "323.4 mm",
                depth: "209.8 mm",
                height: "16.8 mm"
            },
            weight: "0.999 kg",
            batteryLife: {
                average: "18-20 hours",
                capacity: "72Wh",
                type: "Li-ion"
            },
            ports: {
                usb: ["2x USB 3.2 Type-A", "2x USB Type-C"],
                thunderbolt: "2x Thunderbolt 4",
                video: ["HDMI"],
                network: "No built-in Ethernet",
                others: ["MicroSD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "LG Premium Keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS Anti-glare",
                resolution: ["1920x1080", "2560x1600"],
                aspectRatio: ["16:9", "16:10"],
                brightness: "350 nits",
                colorGamut: "99% sRGB",
                panel: "LG Display",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest LG BIOS",
                notes: "DVMT must be configured",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card requires replacement",
                "Sleep may be unstable initially",
                "Battery calibration needed"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "GitHub repositories available",
                    "Forum threads with solutions",
                    "Growing user base"
                ]
            },
            guides: {
                installation: "https://github.com/username/lg-gram-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/lg-gram",
                    "https://github.com/another-repo/gram-efi"
                ]
            },
            thermals: {
                idleTemp: "30-35°C",
                loadTemp: "75-85°C",
                coolingSystem: "Single fan with dual heat pipes",
                undervolting: "Supported via ThrottleStop"
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
            cpu: "Intel Core i5/i7 10th Gen", // Or other gens, specify model year
            igpu: "Intel Iris Plus", // Or UHD if older model
            ram: "16GB LPDDR3", // Or LPDDR4X in newer models
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Mojave (Placeholder - Verify for specific year)",
            maxMacosSupport: "Ventura (Placeholder - Verify for specific year)",
            wifiBluetooth: "Intel AX201 / Lite-On (Placeholder - Verify specific model)",
            audioCodec: "Realtek ALC256 (Placeholder - Verify)",
            trackpad: "I2C HID (Placeholder - Verify)",
            screenResolution: "3000x2000 (3K) (Placeholder - Verify)",
            chartData: {
                ease: 85,
                performance: 90,
                battery: 85,
                stability: 85
            },
            dimensions: {
                width: "304 mm",
                depth: "217 mm",
                height: "14.6 mm"
            },
            weight: "1.33 kg",
            batteryLife: {
                average: "12-14 hours",
                capacity: "56Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["1x USB 3.0 Type-A", "2x USB Type-C"],
                thunderbolt: "1x Thunderbolt 3",
                video: ["DisplayPort over USB-C"],
                network: "No built-in Ethernet",
                others: ["3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Full-size backlit keyboard",
                backlit: true,
                numpad: false,
                layout: "Standard layout"
            },
            displayFeatures: {
                type: "LTPS Touch Display",
                resolution: "3000x2000",
                aspectRatio: "3:2",
                brightness: "450 nits",
                colorGamut: "100% sRGB",
                panel: "Custom LTPS Panel",
                touchscreen: true
            },
            biosVersion: {
                recommended: "Latest BIOS",
                notes: "CFG lock must be disabled, DVMT needs configuration",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card needs replacement",
                "Touchscreen requires patches",
                "Sleep mode may be unstable",
                "Brightness keys need remapping"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Several GitHub guides",
                    "Active forum threads",
                    "Good documentation available"
                ]
            },
            guides: {
                installation: "https://github.com/username/matebook-x-pro-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/matebook-x-pro",
                    "https://github.com/another-repo/matebook-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan with shared heat pipes",
                undervolting: "Supported via ThrottleStop"
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
            cpu: "Intel Core i5/i7 8th Gen", // Or newer gens for newer models
            igpu: "Intel UHD 620",
            ram: "Up to 16GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Mojave (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Intel AC 8265/9260 (Placeholder - Verify)",
            audioCodec: "Realtek ALC298 (Placeholder - Verify)",
            trackpad: "Synaptics SMBus (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) (Placeholder - Verify)",
            chartData: {
                ease: 75,
                performance: 80,
                battery: 75,
                stability: 80
            },
            dimensions: {
                width: "357 mm",
                depth: "229 mm",
                height: "15.9 mm"
            },
            weight: "1.8 kg",
            batteryLife: {
                average: "8-10 hours",
                capacity: "60Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x USB 3.0 Type-A", "1x USB Type-C"],
                thunderbolt: "No",
                video: ["HDMI 1.4"],
                network: "No built-in Ethernet",
                others: ["SD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Backlit keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS LED-backlit",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "72% NTSC",
                panel: "BOE NV156FHM-N61",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "DVMT patch required, CFG lock must be disabled",
                secureBootSupport: true
            },
            knownIssues: [
                "Original Wi-Fi card not supported",
                "HDMI audio may be unstable",
                "Fingerprint reader not working",
                "Battery reporting needs patches"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "GitHub repositories available",
                    "Forum support threads",
                    "Regular updates from community"
                ]
            },
            guides: {
                installation: "https://github.com/username/mi-notebook-pro-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/mi-notebook-pro",
                    "https://github.com/other-repo/xiaomi-efi"
                ]
            },
            thermals: {
                idleTemp: "35-45°C",
                loadTemp: "80-90°C",
                coolingSystem: "Dual fan cooling system",
                undervolting: "Supported via ThrottleStop"
            }
        }
    },
    "msi_gs65": {
        name: "MSI GS65 Stealth", // Added Stealth for clarity
        priority: ["performance"],
        image: "assets/images/laptops/MSI GS65.png",
        score: 7.8,
        summary: "Gaming laptop with powerful specs (dGPU disabled)",
        details: {
            cpu: "Intel Core i7 8th/9th Gen",
            igpu: "Intel UHD 630",
            ram: "Up to 32GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Mojave (Placeholder - Verify, dGPU challenges)",
            maxMacosSupport: "Ventura (Placeholder - Verify, dGPU challenges)",
            wifiBluetooth: "Killer E2500 Ethernet / Intel Wireless (Placeholder - Verify exact Wi-Fi)",
            audioCodec: "Nahimic / Realtek ALC1220 (Placeholder - Verify)",
            trackpad: "Synaptics (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) @144Hz/240Hz (Placeholder - Verify)",
            chartData: {
                ease: 65,
                performance: 95,
                battery: 70,
                stability: 75
            },
            dimensions: {
                width: "358 mm",
                depth: "248 mm",
                height: "17.7 mm"
            },
            weight: "1.88 kg",
            batteryLife: {
                average: "6-8 hours",
                capacity: "82Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["3x USB 3.1 Type-A"],
                thunderbolt: "1x Thunderbolt 3",
                video: ["HDMI 2.0", "Mini DisplayPort 1.2"],
                network: "RJ45 Gigabit Ethernet",
                others: ["3.5mm Audio Jack", "3.5mm Microphone Jack"]
            },
            keyboard: {
                type: "SteelSeries RGB keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS-level Anti-glare",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "72% NTSC",
                panel: "LG Display (144Hz/240Hz variants)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "dGPU must be disabled, CFG lock needs mod",
                secureBootSupport: true
            },
            knownIssues: [
                "NVIDIA GPU must be disabled",
                "Original Wi-Fi card needs replacement",
                "Sleep issues require extensive patches",
                "Fan control needs custom solution"
            ],
            communitySupport: {
                rating: "Moderate",
                resources: [
                    "Limited GitHub guides",
                    "Some forum discussions",
                    "Requires advanced knowledge"
                ]
            },
            guides: {
                installation: "https://github.com/username/msi-gs65-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/msi-gs65",
                    "https://github.com/another-repo/gs65-efi"
                ]
            },
            thermals: {
                idleTemp: "40-45°C",
                loadTemp: "85-95°C",
                coolingSystem: "Triple fan Cooler Boost Trinity",
                undervolting: "Recommended via ThrottleStop"
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
            cpu: "Intel Core i5/i7 10th Gen", // Or newer
            igpu: "Intel Iris Plus", // Or newer Xe Graphics
            ram: "Up to 16GB LPDDR3", // Or LPDDR4X
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Catalina (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Intel Wi-Fi 6 AX201 (Placeholder - Verify)",
            audioCodec: "Realtek ALC (Placeholder - Verify specific model)",
            trackpad: "I2C HID (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) or 3840x2160 (4K) (Placeholder - Verify)",
            chartData: {
                ease: 75,
                performance: 90,
                battery: 80,
                stability: 80
            },
            dimensions: {
                width: "319 mm",
                depth: "219 mm",
                height: "15.9 mm"
            },
            weight: "1.29 kg",
            batteryLife: {
                average: "10-12 hours",
                capacity: "52Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x USB 2.0 Type-A", "2x USB Type-C"],
                thunderbolt: "2x Thunderbolt 3",
                video: ["HDMI 2.0"],
                network: "No built-in Ethernet",
                others: ["MicroSD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "White backlit keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS-level Anti-glare",
                resolution: ["1920x1080", "3840x2160"],
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "100% sRGB",
                panel: "IPS Panel (Verify specific model)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "CFG lock must be disabled, DVMT needs configuration",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card may need replacement",
                "Sleep requires additional patches",
                "HDMI audio might be unstable",
                "Battery reporting needs ECEnabler.kext"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Several GitHub guides",
                    "Active forum discussions",
                    "Growing community support"
                ]
            },
            guides: {
                installation: "https://github.com/username/msi-prestige-14-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/msi-prestige-14",
                    "https://github.com/another-repo/prestige-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan cooling system",
                undervolting: "Supported via ThrottleStop"
            }
        }
    },
    "dell_precision_5550": {
        name: "Dell Precision 5550",
        priority: ["performance"],
        image: "assets/images/laptops/Precision 55x0.png",
        score: 8.6,
        summary: "Workstation laptop with powerful specs (dGPU disabled)",
        details: {
            cpu: "Intel Core i7/i9/Xeon 10th Gen",
            igpu: "Intel UHD Graphics (Comet Lake)",
            ram: "Up to 64GB DDR4",
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Catalina (Placeholder - Verify, dGPU challenges)",
            maxMacosSupport: "Ventura (Placeholder - Verify, dGPU challenges)",
            wifiBluetooth: "Intel Wi-Fi 6 AX201 (Placeholder - Verify)",
            audioCodec: "Realtek ALC3204 (Placeholder - Verify)",
            trackpad: "I2C HID Precision (Placeholder - Verify)",
            screenResolution: "1920x1200 or 3840x2400 (Placeholder - Verify)",
            chartData: {
                ease: 70,
                performance: 95,
                battery: 75,
                stability: 85
            },
            dimensions: {
                width: "360.3 mm",
                depth: "234.2 mm",
                height: "11.5 mm"
            },
            weight: "1.84 kg",
            batteryLife: {
                average: "10-12 hours",
                capacity: "86Wh",
                type: "Li-ion"
            },
            ports: {
                usb: ["2x USB Type-C"],
                thunderbolt: "2x Thunderbolt 3",
                video: ["DisplayPort over USB-C"],
                network: "No built-in Ethernet",
                others: ["SD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Dell Premium Keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS Anti-glare",
                resolution: ["1920x1200", "3840x2400"],
                aspectRatio: "16:10",
                brightness: "500 nits",
                colorGamut: "100% Adobe RGB",
                panel: "Sharp/Dell Premium Panel",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest Dell BIOS",
                notes: "dGPU must be disabled, CFG lock needs configuration",
                secureBootSupport: true
            },
            knownIssues: [
                "NVIDIA GPU must be disabled",
                "Wi-Fi card may need replacement",
                "Sleep requires additional patches",
                "Thunderbolt hot-plug might be unstable"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Multiple GitHub guides",
                    "Active forum support",
                    "Regular updates available"
                ]
            },
            guides: {
                installation: "https://github.com/username/precision-5550-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/precision-5550",
                    "https://github.com/another-repo/precision-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan with vapor chamber",
                undervolting: "Limited due to BIOS restrictions"
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
            igpu: "Intel UHD Graphics (Comet Lake)",
            ram: "Up to 32GB DDR4",
            storage: "SATA + NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Catalina (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Intel AX201 / Realtek RTL8822CE (Placeholder - Verify, Realtek often problematic)",
            audioCodec: "Realtek ALC236 (Placeholder - Verify)",
            trackpad: "Synaptics (Placeholder - Verify)",
            screenResolution: "1366x768 or 1920x1080 (Placeholder - Verify)",
            chartData: {
                ease: 85,
                performance: 80,
                battery: 80,
                stability: 85
            },
            dimensions: {
                width: "359 mm",
                depth: "233.8 mm",
                height: "19.9 mm"
            },
            weight: "2 kg",
            batteryLife: {
                average: "10-12 hours",
                capacity: "45Wh",
                type: "3-cell Li-ion"
            },
            ports: {
                usb: ["3x USB 3.1 Type-A", "1x USB Type-C"],
                thunderbolt: "No",
                video: ["HDMI 1.4b"],
                network: "RJ45 Gigabit Ethernet",
                others: ["SD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "HP Premium Keyboard",
                backlit: true,
                numpad: true,
                layout: "Full-size with numpad"
            },
            displayFeatures: {
                type: "IPS Anti-glare LED",
                resolution: ["1366x768", "1920x1080"],
                aspectRatio: "16:9",
                brightness: "250 nits",
                colorGamut: "45% NTSC",
                panel: "HP Value Display",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest HP BIOS",
                notes: "CFG lock must be disabled via BIOS mod",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card needs replacement",
                "Sleep may need additional patches",
                "Fingerprint reader not supported",
                "Battery reporting might need fixes"
            ],
            communitySupport: {
                rating: "Very Good",
                resources: [
                    "GitHub guides available",
                    "Active forum support",
                    "Well-documented solutions"
                ]
            },
            guides: {
                installation: "https://github.com/username/probook-450-g7-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/probook-450-g7",
                    "https://github.com/another-repo/probook-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "70-80°C",
                coolingSystem: "Single fan with heat pipe",
                undervolting: "Supported via ThrottleStop"
            }
        }
    },
    "samsung_notebook_9": { // Might need to specify year/model, e.g., Notebook 9 Pro
        name: "Samsung Notebook 9",
        priority: ["portability"],
        image: "assets/images/laptops/Samsung Notebook 9.png",
        score: 8.3,
        summary: "Ultra-lightweight laptop with good performance",
        details: {
            cpu: "Intel Core i5/i7 8th Gen", // Or newer depending on model
            igpu: "Intel UHD 620",
            ram: "Up to 16GB LPDDR3",
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Mojave (Placeholder - Verify)",
            maxMacosSupport: "Ventura (Placeholder - Verify)",
            wifiBluetooth: "Intel AC 8265/9560 (Placeholder - Verify)",
            audioCodec: "Realtek ALC298 (Placeholder - Verify)",
            trackpad: "ELAN I2C (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) (Placeholder - Verify)",
            chartData: {
                ease: 80,
                performance: 85,
                battery: 85,
                stability: 80
            },
            dimensions: {
                width: "313.5 mm",
                depth: "218.5 mm",
                height: "14.9 mm"
            },
            weight: "1.29 kg",
            batteryLife: {
                average: "10-12 hours",
                capacity: "75Wh",
                type: "Li-Polymer"
            },
            ports: {
                usb: ["2x USB 3.0 Type-A", "1x USB Type-C"],
                thunderbolt: "1x Thunderbolt 3",
                video: ["HDMI"],
                network: "No built-in Ethernet",
                others: ["microSD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "Backlit keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "IPS LED-backlit",
                resolution: "1920x1080",
                aspectRatio: "16:9",
                brightness: "300 nits",
                colorGamut: "72% NTSC",
                panel: "AU Optronics (Verify specific model)",
                touchscreen: false
            },
            biosVersion: {
                recommended: "Latest available",
                notes: "DVMT configuration needed",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card requires replacement",
                "Sleep needs additional patches",
                "Function keys may need remapping",
                "Battery status needs ECEnabler.kext"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Some GitHub guides",
                    "Forum support available",
                    "Growing documentation"
                ]
            },
            guides: {
                installation: "https://github.com/username/samsung-notebook9-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/samsung-notebook-9",
                    "https://github.com/another-repo/notebook9-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan system",
                undervolting: "Supported via ThrottleStop"
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
            cpu: "Intel Core i5/i7 10th Gen", // Or newer, e.g., 11th Gen with Iris Xe
            igpu: "Intel Iris Plus", // Or Iris Xe for newer models
            ram: "Up to 16GB LPDDR4", // Or LPDDR4X
            storage: "NVMe",
            macosSupport: "Monterey",
            minMacosSupport: "Catalina (Placeholder - Verify specific model year)",
            maxMacosSupport: "Ventura (Placeholder - Verify specific model year)",
            wifiBluetooth: "Intel Wi-Fi 6 AX201 (Placeholder - Verify)",
            audioCodec: "Bang & Olufsen / Realtek (Placeholder - Verify specific codec)",
            trackpad: "I2C HID Precision (Placeholder - Verify)",
            screenResolution: "1920x1080 (FHD) or 3840x2160 (4K OLED) (Placeholder - Verify)",
            chartData: {
                ease: 80,
                performance: 90,
                battery: 85,
                stability: 85
            },
            dimensions: {
                width: "306 mm",
                depth: "194.5 mm",
                height: "16.9 mm"
            },
            weight: "1.27 kg",
            batteryLife: {
                average: "12-14 hours",
                capacity: "60Wh",
                type: "4-cell Li-ion"
            },
            ports: {
                usb: ["1x USB 3.1 Type-A"],
                thunderbolt: "2x Thunderbolt 4",
                video: ["DisplayPort over USB-C"],
                network: "No built-in Ethernet",
                others: ["microSD Card Reader", "3.5mm Audio Jack"]
            },
            keyboard: {
                type: "HP Premium Keyboard",
                backlit: true,
                numpad: false,
                layout: "Full-size"
            },
            displayFeatures: {
                type: "OLED/IPS Touch Display",
                resolution: ["1920x1080", "3840x2160"],
                aspectRatio: "16:9",
                brightness: "400 nits",
                colorGamut: "100% DCI-P3",
                panel: "Samsung OLED/HP Sure View",
                touchscreen: true
            },
            biosVersion: {
                recommended: "Latest HP BIOS",
                notes: "CFG lock must be disabled",
                secureBootSupport: true
            },
            knownIssues: [
                "Wi-Fi card needs replacement",
                "Touchscreen requires patches",
                "Sleep states need configuration",
                "Fingerprint reader not supported"
            ],
            communitySupport: {
                rating: "Good",
                resources: [
                    "Multiple GitHub guides",
                    "Active forum support",
                    "Regular updates available"
                ]
            },
            guides: {
                installation: "https://github.com/username/spectre-x360-13-opencore",
                additional: [
                    "https://www.tonymacx86.com/threads/spectre-x360-13",
                    "https://github.com/another-repo/spectre13-efi"
                ]
            },
            thermals: {
                idleTemp: "35-40°C",
                loadTemp: "75-85°C",
                coolingSystem: "Dual fan cooling",
                undervolting: "Limited by BIOS restrictions"
            }
        }
    }
};

// Initialize and validate data
try {
    // Add helper methods to laptopData
    Object.assign(laptopData, laptopMethods);

    // Validate data
    const validation = validateLaptopData(laptopData);
    
    // Log validation results
    console.log(`Data loaded successfully: ${Object.values(laptopData).length} laptop models found`);
    
    if (validation.errors.length > 0) {
        console.error('Validation Errors:', validation.errors);
    }
    
    if (validation.warnings.length > 0) {
        console.warn('Validation Warnings:', validation.warnings);
    }

    // Make data globally available
    window.laptopData = laptopData;

} catch (error) {
    console.error('Error initializing laptop data:', error);
    throw error;
}

// Export if in a module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = laptopData;
}
