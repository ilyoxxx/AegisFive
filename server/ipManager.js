const bannedIPs = new Map();

module.exports = {
    ban(ip, duration) {
        bannedIPs.set(ip, Date.now() + duration);
    },

    isBanned(ip) {
        const expiry = bannedIPs.get(ip);
        if (!expiry) return false;

        if (Date.now() > expiry) {
            bannedIPs.delete(ip);
            return false;
        }
        return true;
    }
};
