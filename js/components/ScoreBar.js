export class ScoreBar {
    static render(score) {
        const percentage = (score / 10) * 100;
        const colorClass = this.getScoreColor(score);
        
        return `
            <div class="score-bar-wrapper">
                <div class="score-bar-container">
                    <div class="score-bar ${colorClass}" style="width: ${percentage}%"></div>
                </div>
                <span class="score-value">${score.toFixed(1)}</span>
            </div>
        `;
    }

    static getScoreColor(score) {
        if (score >= 9) return 'score-excellent';
        if (score >= 8) return 'score-good';
        if (score >= 7) return 'score-average';
        return 'score-poor';
    }
}