const fs = require('fs');
const FILE = 'shared_bans.json';

function load() {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE));
}

function save(data) {
    fs.writeFileSync(FILE, JSON.stringify(data));
}

module.exports = {
    ban(ip) {
        const bans = load();
        if (!bans.includes(ip)) {
            bans.push(ip);
            save(bans);
        }
    },

    isBanned(ip) {
        return load().includes(ip);
    }
};
