const CONFIG = require('./config');
const RateLimiter = require('./rateLimiter');
const IPManager = require('./ipManager');
const Webhook = require('./webhook');
const Utils = require('./utils');
const Firewall = require('./firewallSync');
const ML = require('./mlAntiRaid');
const SharedBan = require('./sharedBan');

const connectionLimiter = new RateLimiter(
    CONFIG.MAX_CONNECTIONS_PER_IP,
    CONFIG.CONNECTION_WINDOW
);

const eventLimiter = new RateLimiter(
    CONFIG.MAX_EVENTS,
    CONFIG.EVENT_WINDOW
);

const strikes = new Map();

/**
 * 🔌 PLAYER CONNECTING
 */
on('playerConnecting', async (name, setKickReason, deferrals) => {
    const src = global.source;
    const ip = Utils.getIP(src);
    if (!ip) return;

    // 🛑 Ban partagé
    if (SharedBan.isBanned(ip) || IPManager.isBanned(ip)) {
        setKickReason('Vous êtes banni.');
        CancelEvent();
        return;
    }

    // 🔥 Connexion abusive
    if (connectionLimiter.hit(ip)) {
        IPManager.ban(ip, CONFIG.BAN_DURATION);
        SharedBan.ban(ip);
        Firewall.banIP(ip);

        Webhook.sendLog(
            '⛔ IP BANNED (CONNECT)',
            `IP: ${ip}\nRaison: Connexions abusives`
        );

        setKickReason('Connexion abusive détectée.');
        CancelEvent();
        return;
    }

    // 🧠 ML : compte récent
    const age = Utils.getAccountAge(src);
    ML.onJoin(ip, age);

    if (ML.isRaid(ip)) {
        IPManager.ban(ip, CONFIG.BAN_DURATION);
        SharedBan.ban(ip);
        Firewall.banIP(ip);

        Webhook.sendLog(
            '🚨 RAID DETECTED (JOIN)',
            `Player: ${name}\nIP: ${ip}`
        );

        setKickReason('Raid détecté.');
        CancelEvent();
    }
});

/**
 * 📡 EVENT GLOBAL PROTECT
 */
onNet('secure:event', () => {
    const src = global.source;
    const ip = Utils.getIP(src);
    if (!ip) return;

    if (eventLimiter.hit(src)) {
        const count = (strikes.get(ip) || 0) + 1;
        strikes.set(ip, count);

        // 🧠 ML score
        ML.onEventSpam(ip);

        if (ML.isRaid(ip) || count >= CONFIG.AUTO_BAN_THRESHOLD) {
            IPManager.ban(ip, CONFIG.BAN_DURATION);
            SharedBan.ban(ip);
            Firewall.banIP(ip);

            Webhook.sendLog(
                '🚨 EVENT SPAM BAN',
                `Player: ${GetPlayerName(src)}\nIP: ${ip}\nStrikes: ${count}`
            );

            DropPlayer(src, 'Spam détecté (ban IP).');
        } else {
            DropPlayer(src, 'Spam détecté.');
        }
    }
});

/**
 * 🧹 CLEANUP AUTO (PERFORMANCE)
 */
setInterval(() => {
    connectionLimiter.cleanup();
    eventLimiter.cleanup();

    // purge strikes
    for (const [ip, count] of strikes) {
        if (count <= 0) strikes.delete(ip);
    }
}, CONFIG.CLEANUP_INTERVAL);
