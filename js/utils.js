const scoreToPercentage = (score) => {
    return (score / 10) * 100;
};

const getScoreColor = (score) => {
    if (score >= 9) return 'bg-green-500';
    if (score >= 8) return 'bg-blue-500';
    if (score >= 7) return 'bg-yellow-500';
    return 'bg-red-500';
};