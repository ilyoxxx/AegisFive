const { exec } = require('child_process');

module.exports.banIP = (ip) => {
    exec(`iptables -A INPUT -s ${ip} -j DROP`, (err) => {
        if (err) {
            console.log(`[AegisFive] Firewall sync error`);
        } else {
            console.log(`[AegisFive] IP synced to firewall: ${ip}`);
        }
    });
};
