import ScoreBar from './ScoreBar.js';

class LaptopCard {
    static render(laptop) {
        return `
            <div class="laptop-card bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">${laptop.name}</h3>
                    <div class="w-32">
                        ${ScoreBar.render(laptop.score)}
                    </div>
                </div>
                <img src="${laptop.image}" 
                     alt="${laptop.name}" 
                     class="w-full h-48 object-contain mb-4"
                     onerror="this.src='assets/images/placeholder.jpg'">
                <p class="text-gray-600 dark:text-gray-300 mb-4">${laptop.summary}</p>
                <div class="flex flex-wrap gap-2">
                    ${laptop.priority.map(tag => `
                        <span class="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

export default LaptopCard;