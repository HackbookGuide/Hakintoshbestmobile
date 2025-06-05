class ScoreBar {
    static render(score) {
        const percentage = scoreToPercentage(score);
        const colorClass = getScoreColor(score);
        
        return `
            <div class="flex items-center space-x-4">
                <div class="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                    <div class="${colorClass} h-full transition-all duration-500 ease-out"
                         style="width: ${percentage}%"
                         role="progressbar"
                         aria-valuenow="${score}"
                         aria-valuemin="0"
                         aria-valuemax="10">
                    </div>
                </div>
                <span class="text-lg font-semibold min-w-[3ch] text-right">
                    ${score.toFixed(1)}
                </span>
            </div>
        `;
    }
}

export default ScoreBar;