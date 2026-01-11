const scores = new Map();

const THRESHOLD = 100;

function addScore(ip, value) {
    const score = (scores.get(ip) || 0) + value;
    scores.set(ip, score);
    return score;
}

module.exports = {
    onJoin(ip, accountAge) {
        if (accountAge < 24 * 60 * 60 * 1000) addScore(ip, 40);
    },

    onEventSpam(ip) {
        return addScore(ip, 30);
    },

    onFastReconnect(ip) {
        return addScore(ip, 50);
    },

    isRaid(ip) {
        return (scores.get(ip) || 0) >= THRESHOLD;
    }
};
