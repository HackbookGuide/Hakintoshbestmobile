// Define the main data object
const laptopData = {
    "t480": {
        name: "Lenovo ThinkPad T480",
        priority: ["ease", "budget"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=ThinkPad+T480",
        score: 85,
        summary: "A community favorite known for its robustness, upgradeability, and extensive documentation, making it a top choice for beginners.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7)",
            igpu: "Intel UHD 620 (Well Supported)",
            dgpu: "NVIDIA MX150 (Must be disabled)",
            wifi: "Intel (Replaceable). Works with kexts.",
            audio: "Realtek ALC3287/ALC257",
            trackpad: "Synaptics (SMBus/I2C/PS2)",
            ram: "Up to 32GB DDR4 (2 slots), User Upgradeable",
            storage: "M.2 NVMe SSD + optional 2.5\" SATA SSD/HDD bay",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3200, source: "Geekbench 5 Multi (i5-8250U)" },
            pros: ["Excellent community support", "Highly upgradeable (RAM, SSD, Wi-Fi)", "Robust build quality", "Relatively straightforward setup"],
            cons: ["dGPU models require disabling", "SD card reader can be inconsistent", "Thunderbolt 3 support can be finicky"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooPS2Controller", "VoodooRMI", "VoodooI2C", "IntelMausi", "OpenIntelWireless suite"],
            chartData: [4, 3, 3, 5] 
        }
    },
    "x1c67": { 
        name: "Lenovo ThinkPad X1 Carbon (6th/7th Gen)",
        priority: ["ease", "performance"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=X1+Carbon+6/7",
        score: 80,
        summary: "A premium, lightweight ultrabook that combines portability with strong Hackintosh compatibility, ideal for users on the go.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7, e.g. i7-8650U, i7-8565U)",
            igpu: "Intel UHD 620 (Well Supported)",
            dgpu: "None",
            wifi: "Intel (Replaceable in Gen 6, often soldered in Gen 7 - check specific model). Works with OpenIntelWireless.",
            audio: "Realtek ALC285/ALC3287 (Gen 6) / ALC3287 (Gen 7)",
            trackpad: "Synaptics (I2C/SMBus)",
            ram: "8GB/16GB LPDDR3 (Soldered)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3400, source: "Geekbench 5 Multi (i7-8650U)" },
            pros: ["Premium, lightweight design", "Excellent keyboard", "Good community support"],
            cons: ["RAM is soldered", "Wi-Fi soldered on some Gen 7 models", "Thunderbolt can be finicky"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "VoodooRMI", "OpenIntelWireless suite", "YogaSMC (optional for some features)"],
            chartData: [4, 3, 5, 3] 
        }
    },
    "xps15-9570": { 
        name: "Dell XPS 15 (9570)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=Dell+XPS+15+9570",
        score: 75,
        summary: "A powerhouse with a high-performance H-series CPU and a beautiful display. Requires more setup work but rewards with great performance.",
        details: {
            cpu: "8th Gen Intel H-Series (i5/i7/i9)",
            igpu: "Intel UHD 630 (Well Supported)",
            dgpu: "NVIDIA GTX 1050/Ti (MUST be disabled)",
            wifi: "Killer (Must be replaced with Broadcom/Intel)",
            audio: "Realtek ALC3266/ALC298",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 32GB DDR4 (2 slots), User Upgradeable",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 5500, source: "Geekbench 5 Multi (i7-8750H)" },
            pros: ["Powerful H-series CPU", "Excellent 4K display option", "Good iGPU performance"],
            cons: ["NVIDIA dGPU MUST be disabled via complex ACPI patches", "Stock Killer Wi-Fi card requires replacement", "Thunderbolt hot-plug is often unreliable"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "Custom SSDTs for dGPU disable", "AirportBrcmFixup or OpenIntelWireless for replacement Wi-Fi"],
            chartData: [2, 5, 3, 3] 
        }
    },
    "xps13-9370": { 
        name: "Dell XPS 13 (9370/9380)",
        priority: ["ease"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=Dell+XPS+13+9370",
        score: 65, 
        summary: "A compact and stylish ultrabook with 8th Gen Intel. Good base compatibility, but audio jack and Wi-Fi need attention.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7)",
            igpu: "Intel UHD 620 (Well Supported)",
            dgpu: "None",
            wifi: "Killer (Must be replaced with Broadcom/Intel)",
            audio: "Realtek ALC3271 (Audio jack issues common, may require ComboJack or specific patches)",
            trackpad: "Synaptics/ELAN (I2C)",
            ram: "8GB/16GB LPDDR3 (Soldered)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3300, source: "Geekbench 5 Multi (i7-8550U)" },
            pros: ["Very compact and portable", "Premium design and display"],
            cons: ["3.5mm Audio Jack often non-functional or requires complex fixes", "Stock Killer Wi-Fi card requires replacement", "Soldered RAM"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "AirportBrcmFixup or OpenIntelWireless for replacement Wi-Fi", "ComboJack (for audio jack if needed)"],
            chartData: [3, 3, 5, 2]
        }
    },
    "t470": {
        name: "Lenovo ThinkPad T470",
        priority: ["budget"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=ThinkPad+T470",
        score: 70,
        summary: "An older but still very capable budget option. Great for learning and running modern macOS versions with some community effort.",
        details: {
            cpu: "7th Gen Intel U-Series (i5/i7)",
            igpu: "Intel HD 620 (Well Supported)",
            dgpu: "None",
            wifi: "Intel (Replaceable). Works with kexts.",
            audio: "Realtek ALC3268/ALC298",
            trackpad: "Synaptics (SMBus/PS2)",
            ram: "Up to 32GB DDR4 (2 slots), User Upgradeable",
            storage: "M.2 NVMe SSD (some models) or 2.5\" SATA SSD",
            macosSupport: { min: "macOS Sierra 10.12", max: "macOS Sonoma 14.x (with OCLP for some features)" },
            cpuBenchmark: { score: 2800, source: "Geekbench 5 Multi (i5-7200U)" },
            pros: ["Very affordable", "Good community support for its age", "Upgradeable RAM/Storage"],
            cons: ["Older CPU generation", "Less performance for demanding tasks", "May require more patching for newer macOS features"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooPS2Controller", "VoodooRMI", "IntelMausi", "OpenIntelWireless suite"],
            chartData: [3, 2, 4, 5]
        }
    },
    "xps13-9360": {
        name: "Dell XPS 13 (9360)",
        priority: ["budget", "ease"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=Dell+XPS+13+9360",
        score: 72,
        summary: "A popular older XPS model (7th Gen Intel), good for Hackintoshing on a budget. Requires Wi-Fi card replacement.",
        details: {
            cpu: "7th Gen Intel U-Series (i5/i7)",
            igpu: "Intel HD 620 / Iris Plus 640 (Well Supported)",
            dgpu: "None",
            wifi: "Broadcom/Killer (Usually needs replacement with compatible Broadcom or Intel)",
            audio: "Realtek ALC3246/ALC298",
            trackpad: "Synaptics (I2C)",
            ram: "8GB/16GB LPDDR3 (Soldered)",
            storage: "M.2 NVMe/SATA SSD",
            macosSupport: { min: "macOS Sierra 10.12", max: "macOS Ventura 13.x (Sonoma with OCLP)" },
            cpuBenchmark: { score: 2900, source: "Geekbench 5 Multi (i7-7500U)" },
            pros: ["Good build quality", "Excellent display", "Relatively easy setup once Wi-Fi is sorted"],
            cons: ["Wi-Fi card replacement necessary", "Soldered RAM", "Battery life can be average"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "AirportBrcmFixup or OpenIntelWireless for replacement Wi-Fi"],
            chartData: [4, 2, 5, 4]
        }
    },
    "spectre-x360-15t": { 
        name: "HP Spectre x360 15t (8th/9th Gen Intel H)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=HP+Spectre+x360+15",
        score: 60, 
        summary: "Powerful and stylish 15-inch convertible, but HP laptops can be more challenging for Hackintosh, especially with dGPU.",
        details: {
            cpu: "8th/9th Gen Intel H-Series (e.g., i7-8750H, i7-9750H)",
            igpu: "Intel UHD 630",
            dgpu: "NVIDIA GTX 1050Ti/1650 (Must be disabled)",
            wifi: "Intel (Often soldered, check specific model), works with OpenIntelWireless",
            audio: "Realtek (Varies, may need specific layout ID, Conexant on some models - can be very tricky)",
            trackpad: "Synaptics/ELAN (I2C, can be tricky)",
            ram: "8GB/16GB DDR4 (Often soldered or 1 slot accessible)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 5800, source: "Geekbench 5 Multi (i7-9750H est.)" },
            pros: ["Very powerful CPU", "Excellent 4K display options", "Premium 2-in-1 design"],
            cons: ["HP BIOS can be restrictive (CFG Lock)", "dGPU disabling essential and can be complex", "Touchscreen/Pen support hit-or-miss", "Audio can be very problematic (especially Conexant)"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C (if applicable)", "OpenIntelWireless", "SSDTs for disabling dGPU and fixing functions (HPET, IRQ)"],
            chartData: [2, 5, 4, 2]
        }
    },
    "xps13-9300": {
        name: "Dell XPS 13 (9300, 10th Gen Ice Lake)",
        priority: ["performance", "ease"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=Dell+XPS+13+9300",
        score: 78,
        summary: "Modern XPS with Ice Lake CPU and Iris Plus graphics, generally good compatibility. Check for soldered SSD.",
        details: {
            cpu: "10th Gen Intel Ice Lake U-Series (i5/i7)",
            igpu: "Intel Iris Plus Graphics (G4/G7, Well Supported)",
            dgpu: "None",
            wifi: "Killer AX1650 (Intel based, works with OpenIntelWireless) or AX500-DBS (Soldered, check model!)",
            audio: "Realtek ALC3271/ALC711 (Audio jack issues less common than 9370/80 but possible)",
            trackpad: "Synaptics/ELAN (I2C)",
            ram: "8GB/16GB/32GB LPDDR4X (Soldered)",
            storage: "M.2 NVMe SSD (Soldered on some configs, check!)",
            macosSupport: { min: "macOS Catalina 10.15.4", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 4200, source: "Geekbench 5 Multi (i7-1065G7)" },
            pros: ["Excellent Iris Plus graphics performance", "Modern design, very compact", "Good battery life"],
            cons: ["Soldered RAM and potentially soldered SSD (verify model!)", "Wi-Fi can be tricky if not Intel AX200 based Killer card", "Thermal throttling under heavy load"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless"],
            chartData: [4, 4, 5, 3]
        }
    },
    "t440p": {
        name: "Lenovo ThinkPad T440p",
        priority: ["budget"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=ThinkPad+T440p",
        score: 75, 
        summary: "A classic, highly upgradeable budget Hackintosh. Socketed CPU allows for significant performance boosts.",
        details: {
            cpu: "4th Gen Intel M/MQ-Series (Socketed, i5/i7, upgradeable to Quad Core i7)",
            igpu: "Intel HD 4600 (Well Supported)",
            dgpu: "NVIDIA GT 730M (Optional, must be disabled or not present)",
            wifi: "Various (Usually needs replacement with compatible Broadcom or Atheros)",
            audio: "Realtek ALC3232/ALC292",
            trackpad: "Synaptics (Replaceable 'clunkpad', often swapped for T450s trackpad)",
            ram: "Up to 16GB DDR3L (2 slots), User Upgradeable",
            storage: "2.5\" SATA SSD/HDD + M.2 SATA SSD (via WWAN slot adapter)",
            macosSupport: { min: "OS X Mavericks 10.9", max: "macOS Monterey 12.x (Ventura/Sonoma with OCLP)" },
            cpuBenchmark: { score: 2500, source: "Geekbench 5 Multi (i7-4700MQ upgrade)" },
            pros: ["Extremely affordable", "Highly upgradeable (CPU, RAM, Storage, Trackpad, Screen)", "Robust build", "Large community"],
            cons: ["Stock trackpad is poor", "Requires Wi-Fi card replacement", "Bulky compared to modern laptops", "Needs effort for best results"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooPS2Controller", "AirportBrcmFixup or other Wi-Fi kext"],
            chartData: [3, 3, 2, 5] 
        }
    },
    "x230": {
        name: "Lenovo ThinkPad X230",
        priority: ["budget"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=ThinkPad+X230",
        score: 68,
        summary: "A very cheap and compact older ThinkPad. Great for learning, but limited by its 3rd Gen Intel platform.",
        details: {
            cpu: "3rd Gen Intel M-Series (i5/i7)",
            igpu: "Intel HD 4000 (Well Supported)",
            dgpu: "None",
            wifi: "Various (Usually needs replacement, often with Atheros AR9285 or specific Broadcom)",
            audio: "Conexant CX20671/CX20590",
            trackpad: "Synaptics (Classic ThinkPad trackpad)",
            ram: "Up to 16GB DDR3 (2 slots), User Upgradeable",
            storage: "2.5\" SATA SSD/HDD + mSATA SSD slot",
            macosSupport: { min: "OS X Mountain Lion 10.8", max: "macOS Catalina 10.15 (Monterey/Ventura with OCLP, limited features)" },
            cpuBenchmark: { score: 1500, source: "Geekbench 5 Multi (i5-3320M)" },
            pros: ["Very cheap", "Compact and durable", "Classic ThinkPad keyboard (can be modded with X220 keyboard)", "Good for basic tasks"],
            cons: ["Old platform, limited performance", "Wi-Fi replacement essential", "No native USB3 support without DSDT patches or kexts on some macOS versions", "Screen resolution is low (1366x768) unless IPS modded"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooPS2Controller"],
            chartData: [3, 1, 4, 5]
        }
    },
    "precision-5530": { 
        name: "Dell Precision 5520/5530/5540",
        priority: ["performance"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=Precision+55x0",
        score: 70, 
        summary: "Workstation version of XPS 15 (7th-9th Gen H/Xeon). Powerful but dGPU (Quadro) needs disabling. Similar challenges to XPS 15.",
        details: {
            cpu: "7th-9th Gen Intel H-Series (i5/i7/i9, Xeon)",
            igpu: "Intel HD/UHD 630 / P630 (Xeon)",
            dgpu: "NVIDIA Quadro (e.g., M1200, P1000/P2000, T1000/T2000) (MUST be disabled)",
            wifi: "Intel/Killer (Must be replaced or use OpenIntelWireless)",
            audio: "Realtek ALC3266/ALC298",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 64GB DDR4 (2 slots, ECC option with Xeon), User Upgradeable",
            storage: "M.2 NVMe SSD (Often 2 slots)",
            macosSupport: { min: "macOS Sierra 10.12 (7th Gen) / Mojave 10.14 (8th/9th Gen)", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 6000, source: "Geekbench 5 Multi (Xeon E-2176M est.)" },
            pros: ["Extremely powerful CPU options", "ECC RAM support (with Xeon)", "Often dual NVMe slots", "Robust build"],
            cons: ["Quadro dGPU MUST be disabled (similar complexity to GTX)", "Can be expensive", "Wi-Fi replacement often needed"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "SSDTs for dGPU disable", "AirportBrcmFixup or OpenIntelWireless for replacement Wi-Fi"],
            chartData: [2, 5, 3, 2]
        }
    },
     "t490": {
        name: "Lenovo ThinkPad T490",
        priority: ["ease", "performance"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=ThinkPad+T490",
        score: 82,
        summary: "A solid successor to the T480, offering good performance and compatibility with 8th/10th Gen Intel CPUs. Still a great choice for Hackintosh.",
        details: {
            cpu: "8th/10th Gen Intel U-Series (i5/i7, e.g., i5-8265U, i7-10510U)",
            igpu: "Intel UHD 620 (Well Supported)",
            dgpu: "NVIDIA MX250 (Optional, must be disabled)",
            wifi: "Intel (Usually replaceable or works with OpenIntelWireless)",
            audio: "Realtek ALC3287/ALC257",
            trackpad: "Synaptics (SMBus/I2C/PS2)",
            ram: "Up to 40GB/48GB DDR4 (Some soldered + 1 slot)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3500, source: "Geekbench 5 Multi (i5-8265U)" },
            pros: ["Good community support", "Relatively modern specs", "Good keyboard and build"],
            cons: ["dGPU models require disabling", "Some RAM might be soldered", "Thunderbolt can be tricky"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooPS2Controller", "VoodooRMI", "VoodooI2C", "IntelMausi", "OpenIntelWireless suite"],
            chartData: [4, 3, 4, 3]
        }
    },
    "latitude7x90": { 
        name: "Dell Latitude 7490 / 7390",
        priority: ["ease", "budget"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=Latitude+7x90",
        score: 78,
        summary: "A business-class laptop with 8th Gen Intel CPUs, similar in capability to the T480. Good compatibility and often found at reasonable prices.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7, e.g., i5-8350U, i7-8650U)",
            igpu: "Intel UHD 620 (Well Supported)",
            dgpu: "None",
            wifi: "Intel (Usually replaceable, works with OpenIntelWireless) or Qualcomm (replace)",
            audio: "Realtek ALC3246/ALC295",
            trackpad: "ALPS/Synaptics (I2C/PS2)",
            ram: "Up to 32GB DDR4 (2 slots), User Upgradeable",
            storage: "M.2 NVMe/SATA SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3300, source: "Geekbench 5 Multi (i5-8350U)" },
            pros: ["Solid build quality", "Upgradeable RAM and SSD", "Good keyboard", "Often affordable"],
            cons: ["Trackpad can vary (ALPS sometimes less ideal than Synaptics)", "Check Wi-Fi card before buying, may need replacement if Qualcomm"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "VoodooPS2Controller", "IntelMausi", "OpenIntelWireless suite"],
            chartData: [4, 3, 4, 4]
        }
    },
    "elitebook840g6": { 
        name: "HP EliteBook 840 G5 / G6",
        priority: ["performance", "ease"],
        image: "https://placehold.co/600x400/4A90E2/FFFFFF?text=EliteBook+840+G56",
        score: 75,
        summary: "A sleek business ultrabook with 8th Gen Intel CPUs. HP laptops can be more challenging but G5/G6 have decent compatibility reports.",
        details: {
            cpu: "7th/8th Gen Intel U-Series (i5/i7, e.g., i5-8265U, i7-8565U)",
            igpu: "Intel HD/UHD 620 (Well Supported)",
            dgpu: "Optional AMD Radeon 550X/RX540 (Needs specific configuration/disabling if problematic)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Conexant CX8200 (Can be tricky, may need specific layout-id or even `SSDT-HPET` fixes)",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 32GB DDR4 (2 slots), User Upgradeable",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS High Sierra 10.13 (G5) / Mojave 10.14 (G6)", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3450, source: "Geekbench 5 Multi (i7-8565U)" },
            pros: ["Premium build quality and design", "Good display options", "Upgradeable RAM/SSD"],
            cons: ["HP BIOS can be restrictive (CFG Lock often needs to be disabled via modded BIOS or specific quirks)", "Audio can be problematic (Conexant)", "AMD dGPU version needs careful handling"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC (with correct layout-id)", "VoodooI2C", "OpenIntelWireless suite", "SSDTTime for HPET/IRQ fixes might be needed"],
            chartData: [3, 3, 4, 3]
        }
    },
    "xps15-9550": {
        name: "Dell XPS 15 (9550)",
        priority: ["performance", "budget"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=XPS+15+9550",
        score: 68,
        summary: "Older XPS 15 (6th Gen Intel H-series). Still capable but requires dGPU disable and Wi-Fi replacement.",
        details: {
            cpu: "6th Gen Intel H-Series (Skylake, e.g., i7-6700HQ)",
            igpu: "Intel HD 530 (Well Supported)",
            dgpu: "NVIDIA GTX 960M (MUST be disabled)",
            wifi: "Broadcom/Dell DW1830 (Stock, good) or Killer (Replace)",
            audio: "Realtek ALC298",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 32GB DDR4 (2 slots)",
            storage: "M.2 NVMe/SATA SSD + 2.5\" SATA bay (on some configs)",
            macosSupport: { min: "OS X El Capitan 10.11", max: "macOS Ventura 13.x (Sonoma with OCLP)" },
            cpuBenchmark: { score: 4500, source: "Geekbench 5 Multi (i7-6700HQ est.)" },
            pros: ["Affordable performance", "Good display options"],
            cons: ["NVIDIA dGPU MUST be disabled", "Wi-Fi may need replacement if Killer", "Battery life can be average"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "SSDT-DGPU-DISABLE", "AirportBrcmFixup (if DW1830)"],
            chartData: [2, 4, 3, 4]
        }
    },
    "xps15-9560": {
        name: "Dell XPS 15 (9560)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=XPS+15+9560",
        score: 70,
        summary: "7th Gen Intel H-series XPS. Similar to 9550/9570, dGPU disable and Wi-Fi check are key.",
        details: {
            cpu: "7th Gen Intel H-Series (Kaby Lake, e.g., i7-7700HQ)",
            igpu: "Intel HD 630 (Well Supported)",
            dgpu: "NVIDIA GTX 1050 (MUST be disabled)",
            wifi: "Killer (Must be replaced with Broadcom/Intel)",
            audio: "Realtek ALC298",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 32GB DDR4 (2 slots)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Sierra 10.12", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 5000, source: "Geekbench 5 Multi (i7-7700HQ est.)" },
            pros: ["Good performance for the price", "Excellent display"],
            cons: ["NVIDIA dGPU MUST be disabled", "Stock Killer Wi-Fi requires replacement"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "SSDT-DGPU-DISABLE", "AirportBrcmFixup or OpenIntelWireless for replacement Wi-Fi"],
            chartData: [2, 4, 3, 3]
        }
    },
    "xps15-7590": {
        name: "Dell XPS 15 (7590)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=XPS+15+7590",
        score: 72,
        summary: "9th Gen Intel H-series XPS. Powerful, but dGPU disable and potential Wi-Fi swap needed.",
        details: {
            cpu: "9th Gen Intel H-Series (Coffee Lake Refresh, e.g., i7-9750H)",
            igpu: "Intel UHD 630 (Well Supported)",
            dgpu: "NVIDIA GTX 1650 (MUST be disabled)",
            wifi: "Killer AX1650 (Intel-based, works with OpenIntelWireless) or other (check!)",
            audio: "Realtek ALC298/ALC3266",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 64GB DDR4 (2 slots)",
            storage: "M.2 NVMe SSD (Often 2 slots)",
            macosSupport: { min: "macOS Catalina 10.15", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 6000, source: "Geekbench 5 Multi (i7-9750H est.)" },
            pros: ["Very powerful CPU", "OLED display option", "Often dual M.2 slots"],
            cons: ["NVIDIA dGPU MUST be disabled", "Wi-Fi can be Killer AX based (good) or other (problematic)", "Thermals can be a concern"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "SSDT-DGPU-DISABLE", "OpenIntelWireless (if AX Killer card)"],
            chartData: [2, 5, 3, 2]
        }
    },
    "lenovo-p52s": {
        name: "Lenovo ThinkPad P52s",
        priority: ["performance", "ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ThinkPad+P52s",
        score: 70,
        summary: "Mobile workstation with 8th Gen U-series CPU and NVIDIA Quadro P500 (must be disabled). Similar to T480 with a dGPU.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7)",
            igpu: "Intel UHD 620",
            dgpu: "NVIDIA Quadro P500 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC3287/ALC257",
            trackpad: "Synaptics (I2C/SMBus)",
            ram: "Up to 32GB DDR4 (1 soldered + 1 slot or 2 slots, check config)",
            storage: "M.2 NVMe SSD + optional 2.5\" bay",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3300, source: "Geekbench 5 Multi (i7-8650U est.)" },
            pros: ["Good ThinkPad build", "Upgradeable storage", "Decent iGPU"],
            cons: ["Quadro dGPU MUST be disabled", "Thunderbolt can be tricky"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "VoodooPS2Controller", "OpenIntelWireless", "SSDT-DGPU-DISABLE"],
            chartData: [3, 3, 3, 3]
        }
    },
     "lenovo-p53s": {
        name: "Lenovo ThinkPad P53s",
        priority: ["performance", "ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ThinkPad+P53s",
        score: 72,
        summary: "Similar to P52s but with 8th/10th Gen U-series CPU options and NVIDIA Quadro P520 (must be disabled).",
        details: {
            cpu: "8th/10th Gen Intel U-Series (Whiskey Lake/Comet Lake)",
            igpu: "Intel UHD 620",
            dgpu: "NVIDIA Quadro P520 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC3287/ALC257",
            trackpad: "Synaptics (I2C/SMBus)",
            ram: "Up to 40GB/48GB DDR4 (Soldered + 1 slot)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Catalina 10.15", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3600, source: "Geekbench 5 Multi (i7-10510U est.)" },
            pros: ["Good ThinkPad build", "Modern CPU options", "Decent iGPU"],
            cons: ["Quadro dGPU MUST be disabled", "Some RAM soldered", "Thunderbolt can be tricky"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "VoodooPS2Controller", "OpenIntelWireless", "SSDT-DGPU-DISABLE"],
            chartData: [3, 4, 3, 3]
        }
    },
    "lenovo-l480": {
        name: "Lenovo ThinkPad L480",
        priority: ["budget", "ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ThinkPad+L480",
        score: 77,
        summary: "Budget-friendly 14-inch ThinkPad with 8th Gen Intel U-series. Good alternative to T480.",
        details: {
            cpu: "8th Gen Intel U-Series (i3/i5/i7)",
            igpu: "Intel UHD 620",
            dgpu: "Optional AMD Radeon 530 (MUST be disabled or ensure model is iGPU only)",
            wifi: "Intel/Realtek (Replace if Realtek, Intel works with OpenIntelWireless)",
            audio: "Realtek ALC257/ALC3287",
            trackpad: "Synaptics (I2C/SMBus)",
            ram: "Up to 32GB DDR4 (2 slots)",
            storage: "M.2 NVMe SSD + optional 2.5\" bay",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3100, source: "Geekbench 5 Multi (i5-8250U est.)" },
            pros: ["Affordable", "Upgradeable", "Good keyboard"],
            cons: ["AMD dGPU version needs dGPU disabled", "Check Wi-Fi card"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "VoodooPS2Controller", "OpenIntelWireless (if Intel Wi-Fi)", "SSDT-DGPU-DISABLE (if dGPU present)"],
            chartData: [4, 3, 3, 4]
        }
    },
    "lenovo-l490": {
        name: "Lenovo ThinkPad L490",
        priority: ["budget", "ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ThinkPad+L490",
        score: 78,
        summary: "Successor to L480, with 8th/10th Gen Intel U-series. Solid budget choice.",
        details: {
            cpu: "8th/10th Gen Intel U-Series (Whiskey Lake/Comet Lake)",
            igpu: "Intel UHD 620",
            dgpu: "Optional AMD Radeon 535/RX 550X (MUST be disabled or ensure model is iGPU only)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC257/ALC3287",
            trackpad: "Synaptics (I2C/SMBus)",
            ram: "Up to 64GB DDR4 (2 slots)",
            storage: "M.2 NVMe SSD + optional 2.5\" bay",
            macosSupport: { min: "macOS Catalina 10.15", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3400, source: "Geekbench 5 Multi (i5-8265U est.)" },
            pros: ["Affordable", "Upgradeable", "Modern CPU options"],
            cons: ["AMD dGPU version needs dGPU disabled"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "VoodooPS2Controller", "OpenIntelWireless", "SSDT-DGPU-DISABLE (if dGPU present)"],
            chartData: [4, 3, 3, 4]
        }
    },
    "ideapad-330s-14ikb": {
        name: "Lenovo IdeaPad 330S-14IKB / 330S-15IKB",
        priority: ["budget"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=IdeaPad+330S",
        score: 65,
        summary: "Budget IdeaPad with 8th Gen Intel. Can be Hackintoshed but requires more effort than ThinkPads. Check specific config.",
        details: {
            cpu: "7th/8th Gen Intel U-Series (e.g. i5-8250U)",
            igpu: "Intel HD/UHD 620",
            dgpu: "Optional NVIDIA MX110/MX130/MX150 or AMD Radeon 535/540 (MUST be disabled)",
            wifi: "Qualcomm Atheros/Realtek (Usually needs replacement with Intel/Broadcom)",
            audio: "Realtek ALC236 / Conexant (Conexant is problematic)",
            trackpad: "Synaptics/ELAN (I2C, ELAN can be tricky)",
            ram: "4GB Soldered + 1 Slot (Up to 12GB/20GB)",
            storage: "M.2 SATA/NVMe SSD + optional 2.5\" bay",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Ventura 13.x" },
            cpuBenchmark: { score: 3000, source: "Geekbench 5 Multi (i5-8250U est.)" },
            pros: ["Very affordable"],
            cons: ["dGPU MUST be disabled", "Wi-Fi replacement almost always needed", "Audio can be tricky (especially Conexant)", "Build quality average", "BIOS limitations"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C (and satellites)", "SSDT-DGPU-DISABLE", "Replacement Wi-Fi kexts"],
            chartData: [2, 3, 3, 5]
        }
    },
    "ideapad-530s-14ikb": {
        name: "Lenovo IdeaPad 530S-14IKB / 530S-15IKB",
        priority: ["budget"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=IdeaPad+530S",
        score: 68,
        summary: "Slightly more premium IdeaPad with 8th Gen Intel. Similar Hackintosh challenges to 330S but often better components.",
        details: {
            cpu: "8th Gen Intel U-Series (e.g. i5-8250U, i7-8550U)",
            igpu: "Intel UHD 620",
            dgpu: "Optional NVIDIA MX130/MX150 (MUST be disabled)",
            wifi: "Intel/Realtek (Replace if Realtek, Intel works with OpenIntelWireless)",
            audio: "Realtek ALC236",
            trackpad: "Synaptics/ELAN (I2C)",
            ram: "Up to 16GB DDR4 (Soldered or 1 slot, check config)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Ventura 13.x" },
            cpuBenchmark: { score: 3200, source: "Geekbench 5 Multi (i5-8250U est.)" },
            pros: ["Affordable", "Decent build for the price"],
            cons: ["dGPU MUST be disabled", "Check Wi-Fi card (replace if Realtek)", "BIOS limitations"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C (and satellites)", "SSDT-DGPU-DISABLE", "OpenIntelWireless (if Intel Wi-Fi)"],
            chartData: [3, 3, 4, 4]
        }
    },
    "hp-probook-450g7": {
        name: "HP ProBook 450 G7",
        priority: ["ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ProBook+450+G7",
        score: 70,
        summary: "Mainstream HP business laptop with 10th Gen Intel Comet Lake. Generally compatible but HP quirks apply.",
        details: {
            cpu: "10th Gen Intel U-Series (Comet Lake, i3/i5/i7)",
            igpu: "Intel UHD Graphics (Comet Lake GT1/GT2)",
            dgpu: "Optional NVIDIA MX130/MX250 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC236/ALC3204",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 32GB DDR4 (2 slots)",
            storage: "M.2 NVMe SSD + 2.5\" bay",
            macosSupport: { min: "macOS Catalina 10.15.4", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3500, source: "Geekbench 5 Multi (i5-10210U est.)" },
            pros: ["Upgradeable", "Modern CPU"],
            cons: ["HP BIOS (CFG Lock, etc.)", "dGPU MUST be disabled", "Audio might need specific layout"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless", "SSDTs for HP (HPET, IRQ, DGPU disable)"],
            chartData: [3, 3, 3, 3]
        }
    },
    "hp-spectre-x360-13-intel": { 
        name: "HP Spectre x360 13 (8th-10th Gen Intel U)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=Spectre+x360+13",
        score: 65,
        summary: "Premium 13-inch convertible. Hackintosh possible but expect HP-specific challenges (BIOS, audio, power management).",
        details: {
            cpu: "8th-10th Gen Intel U-Series (Kaby Lake R, Whiskey Lake, Ice Lake, Comet Lake)",
            igpu: "Intel UHD 620 / Iris Plus",
            dgpu: "None",
            wifi: "Intel (Often soldered, works with OpenIntelWireless)",
            audio: "Conexant/Realtek (Conexant is very problematic, Realtek needs specific layout)",
            trackpad: "Synaptics/ELAN (I2C)",
            ram: "8GB/16GB LPDDR3/LPDDR4X (Soldered)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3800, source: "Geekbench 5 Multi (i7-1065G7 est.)" },
            pros: ["Excellent design", "Great display", "Very portable"],
            cons: ["HP BIOS limitations (CFG Lock)", "Audio is often a major pain point (Conexant!)", "Soldered RAM/Wi-Fi", "Touchscreen/pen support unreliable"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC (if Realtek, good luck if Conexant)", "VoodooI2C", "OpenIntelWireless", "Many custom SSDTs likely needed"],
            chartData: [2, 4, 5, 2]
        }
    },
    "hp-zbook-studio-g5": { 
        name: "HP ZBook Studio G5 (Intel H)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ZBook+Studio+G5",
        score: 60,
        summary: "Powerful mobile workstation. Hackintosh is complex due to dGPU (Quadro) and HP specifics. For advanced users.",
        details: {
            cpu: "8th Gen Intel H-Series (i7/Xeon)",
            igpu: "Intel UHD 630 / P630",
            dgpu: "NVIDIA Quadro P1000/P2000 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Conexant (Likely problematic)",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 64GB DDR4 (ECC with Xeon)",
            storage: "M.2 NVMe SSD (Often dual slots)",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 6000, source: "Geekbench 5 Multi (i7-8850H est.)" },
            pros: ["Extremely powerful", "Professional build", "Great displays"],
            cons: ["HP BIOS", "Quadro dGPU MUST be disabled (complex)", "Conexant audio is a nightmare", "Heavy and expensive"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC (maybe?)", "VoodooI2C", "OpenIntelWireless", "Extensive custom SSDTs for DGPU, HPET, IRQ etc."],
            chartData: [1, 5, 2, 1]
        }
    },
    "asus-zenbook-ux430ua": {
        name: "ASUS ZenBook UX430UA/UX331UA (8th Gen)",
        priority: ["ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ZenBook+UX430",
        score: 70,
        summary: "Popular ultrabook series with 8th Gen Intel. Good compatibility overall, but check specific model for Wi-Fi/audio.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7)",
            igpu: "Intel UHD 620",
            dgpu: "Optional NVIDIA MX150 (UX430UN/UX331UN - MUST be disabled)",
            wifi: "Intel/Qualcomm Atheros (Replace if Qualcomm, Intel works with OpenIntelWireless)",
            audio: "Conexant/Realtek (Conexant problematic, Realtek ALC294/ALC255 common)",
            trackpad: "ELAN/FocalTech (I2C - VoodooI2C needed, FocalTech can be less smooth)",
            ram: "8GB/16GB LPDDR3/DDR4 (Often soldered)",
            storage: "M.2 SATA/NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3200, source: "Geekbench 5 Multi (i5-8250U est.)" },
            pros: ["Slim and light", "Good displays"],
            cons: ["dGPU (if present) MUST be disabled", "Wi-Fi may need replacement", "Audio can be tricky (Conexant)", "Soldered RAM common"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C (and ELAN/FocalTech satellites)", "OpenIntelWireless (if Intel Wi-Fi)", "SSDT-DGPU-DISABLE (if dGPU)"],
            chartData: [3, 3, 5, 3]
        }
    },
    "asus-vivobook-s510un": {
        name: "ASUS VivoBook S15 S510UN / S14 S410UN",
        priority: ["budget"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=VivoBook+S510",
        score: 67,
        summary: "Mainstream ASUS VivoBook with 8th Gen Intel and MX150. dGPU disable is key.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7)",
            igpu: "Intel UHD 620",
            dgpu: "NVIDIA MX130/MX150 (MUST be disabled)",
            wifi: "Intel/Qualcomm Atheros/Realtek (Replace if not Intel)",
            audio: "Realtek ALC256/ALC294 or Conexant",
            trackpad: "ELAN/FocalTech/Synaptics (I2C)",
            ram: "4GB/8GB Soldered + 1 Slot (Up to 12GB/20GB/36GB)",
            storage: "M.2 SATA/NVMe SSD + 2.5\" bay",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Ventura 13.x" },
            cpuBenchmark: { score: 3100, source: "Geekbench 5 Multi (i5-8250U est.)" },
            pros: ["Affordable", "Upgradeable storage/some RAM"],
            cons: ["dGPU MUST be disabled", "Wi-Fi usually needs replacement", "Audio can be tricky", "Build quality is average"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C (and satellites)", "SSDT-DGPU-DISABLE", "Replacement Wi-Fi kexts"],
            chartData: [2, 3, 3, 4]
        }
    },
    "asus-rog-intel": { 
        name: "ASUS ROG Laptop (Intel H-Series)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=ASUS+ROG+Intel",
        score: 55,
        summary: "Gaming laptops with powerful Intel H-series CPUs. Hackintosh is very complex due to NVIDIA dGPUs, custom hardware, and aggressive power management. For experts only.",
        details: {
            cpu: "Intel H-Series (Various Gens)",
            igpu: "Intel UHD/Iris Xe (Iris Xe problematic for iGPU output if newer gen)",
            dgpu: "NVIDIA RTX/GTX (MUST be disabled, and often hard to do so effectively for internal display)",
            wifi: "Intel (Usually works with OpenIntelWireless) or Mediatek (Replace)",
            audio: "Realtek (Often with custom AMPs, can be tricky)",
            trackpad: "ELAN/Synaptics (I2C)",
            ram: "16GB+ DDR4/DDR5",
            storage: "M.2 NVMe SSD (Often multiple slots)",
            macosSupport: { min: "Varies by CPU Gen", max: "macOS Sonoma 14.x (highly dependent)" },
            cpuBenchmark: { score: 7000, source: "Geekbench 5 Multi (High-end H-series est.)" },
            pros: ["Extreme performance potential (CPU-wise)"],
            cons: ["NVIDIA dGPU is primary challenge (disabling, routing display)", "Complex ACPI", "Custom keyboard/lighting often unsupported", "Thermals/power management difficult", "Not for beginners"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless", "Many custom SSDTs required"],
            chartData: [1, 5, 2, 1]
        }
    },
    "xiaomi-mi-notebook-pro-2019": { 
        name: "Xiaomi Mi Notebook Pro (2019/2020 Intel)",
        priority: ["ease", "performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=Mi+Notebook+Pro",
        score: 78,
        summary: "Popular for its MacBook-like design and good Hackintosh compatibility. 8th/10th Gen Intel U-series.",
        details: {
            cpu: "8th Gen Whiskey Lake / 10th Gen Comet Lake U-Series (i5/i7)",
            igpu: "Intel UHD 620",
            dgpu: "NVIDIA MX150/MX250/MX350 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC256/ALC298",
            trackpad: "Synaptics/ELAN (I2C)",
            ram: "8GB/16GB DDR4 (Soldered)",
            storage: "M.2 NVMe SSD (Often dual slots on 15-inch)",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3700, source: "Geekbench 5 Multi (i7-10510U est.)" },
            pros: ["Great design", "Good display", "Strong community support", "Relatively straightforward"],
            cons: ["dGPU MUST be disabled", "Soldered RAM", "Fingerprint sensor N/A"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless", "SSDT-DGPU-DISABLE", "Custom SSDTs for brightness keys, etc."],
            chartData: [4, 4, 4, 3]
        }
    },
    "msi-prestige-14-a10sc": {
        name: "MSI Prestige 14 (e.g., A10SC, Intel)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=MSI+Prestige+14",
        score: 65,
        summary: "Thin and light MSI with 10th Gen Intel U and dedicated NVIDIA (must be disabled). BIOS can be tricky.",
        details: {
            cpu: "10th Gen Intel U-Series (Comet Lake, i5/i7)",
            igpu: "Intel UHD Graphics",
            dgpu: "NVIDIA GTX 1650 Max-Q / MX250/MX330 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC298",
            trackpad: "Synaptics (I2C)",
            ram: "8GB/16GB LPDDR3/DDR4 (Soldered or single slot, check config)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Catalina 10.15", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3800, source: "Geekbench 5 Multi (i7-10710U est.)" },
            pros: ["Lightweight", "Good performance (CPU)"],
            cons: ["dGPU MUST be disabled", "MSI BIOS can be limited/quirky", "Soldered RAM on some models", "Cooling might be a concern"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless", "SSDT-DGPU-DISABLE"],
            chartData: [2, 4, 4, 2]
        }
    },
     "msi-gs65-stealth": {
        name: "MSI GS65 Stealth Thin (8th Gen Intel)",
        priority: ["performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=MSI+GS65",
        score: 58,
        summary: "Powerful gaming laptop with 8th Gen Intel H-series. Very complex Hackintosh due to NVIDIA dGPU and custom features.",
        details: {
            cpu: "8th Gen Intel H-Series (i7-8750H)",
            igpu: "Intel UHD 630",
            dgpu: "NVIDIA GTX 1060/1070 Max-Q (MUST be disabled)",
            wifi: "Killer (Intel based - works with OpenIntelWireless, or Rivet - replace)",
            audio: "Realtek ALC298/ALC1220 (Can be tricky with Nahimic)",
            trackpad: "Synaptics (I2C)",
            ram: "Up to 32GB DDR4 (2 slots)",
            storage: "M.2 NVMe SSD (Often dual slots)",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Ventura 13.x" },
            cpuBenchmark: { score: 5500, source: "Geekbench 5 Multi (i7-8750H est.)" },
            pros: ["High CPU performance", "Good display (high refresh rate N/A in macOS)"],
            cons: ["NVIDIA dGPU disable is critical and complex", "MSI BIOS quirks", "Custom lighting/keyboard features N/A", "Audio can be difficult"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless (if Killer AX based)", "Extensive custom SSDTs"],
            chartData: [1, 5, 3, 2]
        }
    },
    "acer-swift-3-sf314-57": { 
        name: "Acer Swift 3 (e.g., SF314-57, 10th Gen Ice Lake)",
        priority: ["budget", "ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=Acer+Swift+3",
        score: 70,
        summary: "Affordable ultrabook with Intel CPUs. Compatibility varies by exact model; Ice Lake versions are decent.",
        details: {
            cpu: "10th Gen Intel U-Series (Ice Lake, i5/i7) or older gens",
            igpu: "Intel Iris Plus (Ice Lake) / UHD 620 (older gens)",
            dgpu: "Optional NVIDIA MX250/MX350 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless) or Atheros/Realtek (Replace)",
            audio: "Realtek ALC255/ALC256",
            trackpad: "Synaptics/ELAN (I2C)",
            ram: "8GB/16GB LPDDR4/DDR4 (Often soldered)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Catalina 10.15.4 (Ice Lake)", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3900, source: "Geekbench 5 Multi (i7-1065G7 est.)" },
            pros: ["Good value", "Lightweight", "Iris Plus graphics (Ice Lake)"],
            cons: ["dGPU (if present) MUST be disabled", "Check Wi-Fi card", "Soldered RAM common", "Acer BIOS can be limited"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless (if Intel Wi-Fi)", "SSDT-DGPU-DISABLE (if dGPU)"],
            chartData: [3, 4, 4, 4]
        }
    },
    "lg-gram-14z990": { 
        name: "LG Gram 14/15 (e.g., 14Z990, 8th Gen Intel)",
        priority: ["ease", "performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=LG+Gram+14",
        score: 76,
        summary: "Incredibly lightweight laptops with good battery life. 8th-10th Gen Intel models are generally compatible.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7)",
            igpu: "Intel UHD 620",
            dgpu: "None",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC256 or Conexant (Conexant is problematic!)",
            trackpad: "Synaptics/ELAN (I2C)",
            ram: "8GB/16GB DDR4 (Often 1 soldered + 1 slot, or fully soldered)",
            storage: "M.2 NVMe SSD (Often dual slots)",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3300, source: "Geekbench 5 Multi (i7-8565U est.)" },
            pros: ["Extremely lightweight", "Long battery life (even on macOS)", "Dual SSD slots common"],
            cons: ["Audio can be Conexant (bad!) - check specific model", "Some RAM soldered", "Build quality is light, can feel flexible"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless"],
            chartData: [4, 3, 5, 3]
        }
    },
    "samsung-notebook9-np900x5t": { 
        name: "Samsung Notebook 9 (NP900X5T, 8th Gen Intel)",
        priority: ["ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=Samsung+Note9",
        score: 68,
        summary: "Lightweight Samsung laptop. Compatibility can be decent but Samsung specific ACPI/drivers might be needed.",
        details: {
            cpu: "8th Gen Intel U-Series (i7-8550U)",
            igpu: "Intel UHD 620",
            dgpu: "Optional NVIDIA MX150 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC256",
            trackpad: "ELAN/Synaptics (I2C)",
            ram: "8GB/16GB DDR4 (Soldered)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Ventura 13.x" },
            cpuBenchmark: { score: 3200, source: "Geekbench 5 Multi (i7-8550U est.)" },
            pros: ["Very light", "Good display"],
            cons: ["dGPU (if present) MUST be disabled", "Soldered RAM", "Samsung specific firmware quirks can make setup harder", "Fewer community guides typically"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless", "SSDT-DGPU-DISABLE (if dGPU)", "Custom SSDTs for Samsung features if needed"],
            chartData: [3, 3, 5, 3]
        }
    },
    "huawei-matebook-x-pro-2019": { 
        name: "Huawei MateBook X Pro (2018-2020 Intel)",
        priority: ["performance", "ease"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=MateBook+X+Pro",
        score: 77,
        summary: "Premium ultrabook with excellent screen and good Hackintosh track record, especially earlier models.",
        details: {
            cpu: "8th/10th Gen Intel U-Series (Kaby Lake R / Comet Lake)",
            igpu: "Intel UHD 620",
            dgpu: "NVIDIA MX150/MX250 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless)",
            audio: "Realtek ALC256 (Layout ID needed)",
            trackpad: "Synaptics/ELAN (I2C, good support)",
            ram: "8GB/16GB LPDDR3 (Soldered)",
            storage: "M.2 NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3600, source: "Geekbench 5 Multi (i7-10510U est.)" },
            pros: ["Stunning 3K display", "Great build quality", "Good community support"],
            cons: ["dGPU MUST be disabled", "Soldered RAM", "Webcam position (in keyboard)"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless", "SSDT-DGPU-DISABLE", "Custom SSDTs for brightness, etc."],
            chartData: [4, 4, 4, 2]
        }
    },
    "toshiba-tecra-z50e": {
        name: "Toshiba Tecra Z50-E (8th Gen Intel)",
        priority: ["budget"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=Tecra+Z50-E",
        score: 65,
        summary: "Business laptop, less common for Hackintosh but potentially workable with 8th Gen Intel. Research specific config.",
        details: {
            cpu: "8th Gen Intel U-Series (i5/i7)",
            igpu: "Intel UHD 620",
            dgpu: "Optional NVIDIA MX130/MX150 (MUST be disabled)",
            wifi: "Intel (Works with OpenIntelWireless) or other (Replace)",
            audio: "Realtek (Varies)",
            trackpad: "Synaptics (I2C/SMBus)",
            ram: "Up to 32GB DDR4 (2 slots)",
            storage: "M.2 SATA/NVMe SSD + 2.5\" bay",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Ventura 13.x" },
            cpuBenchmark: { score: 3000, source: "Geekbench 5 Multi (i5-8250U est.)" },
            pros: ["Upgradeable", "Business build quality"],
            cons: ["dGPU (if present) MUST be disabled", "Less community support than Dell/Lenovo", "BIOS might be restrictive"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "VoodooPS2Controller", "OpenIntelWireless (if Intel Wi-Fi)", "SSDT-DGPU-DISABLE (if dGPU)"],
            chartData: [3, 3, 3, 4]
        }
    },
    "chuwi-corebook-x-i5-8259u": {
        name: "Chuwi CoreBook X (Intel i5-8259U)",
        priority: ["budget", "performance"],
        image: "https://placehold.co/600x400/cccccc/FFFFFF?text=Chuwi+CoreBookX",
        score: 72,
        summary: "Budget laptop with a surprisingly powerful Iris Plus 655 iGPU. Good Hackintosh potential if you get this specific CPU.",
        details: {
            cpu: "Intel Core i5-8259U (Coffee Lake U, 28W)",
            igpu: "Intel Iris Plus Graphics 655 (Excellent support)",
            dgpu: "None",
            wifi: "Intel AC 7265 or similar (Works with OpenIntelWireless)",
            audio: "Realtek ALC269 (Layout ID needed)",
            trackpad: "Generic I2C (VoodooI2C needed)",
            ram: "8GB/16GB DDR4 (Often soldered)",
            storage: "M.2 SATA/NVMe SSD",
            macosSupport: { min: "macOS Mojave 10.14", max: "macOS Sonoma 14.x" },
            cpuBenchmark: { score: 3800, source: "Geekbench 5 Multi (i5-8259U est.)" },
            pros: ["Excellent iGPU performance (Iris Plus 655)", "Affordable for the specs", "Good 3:2 display"],
            cons: ["Build quality is budget", "Soldered RAM common", "Limited BIOS options", "Lesser known brand, fewer guides"],
            kexts: ["Lilu", "WhateverGreen", "VirtualSMC", "AppleALC", "VoodooI2C", "OpenIntelWireless"],
            chartData: [3, 4, 4, 5]
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
