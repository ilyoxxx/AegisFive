module.exports = {
    // 🔌 Connexions
    MAX_CONNECTIONS_PER_IP: 3,
    CONNECTION_WINDOW: 60 * 1000,

    // 📡 Events
    MAX_EVENTS: 12,
    EVENT_WINDOW: 5000,

    // 🧠 Joueurs
    MIN_ACCOUNT_AGE: 2 * 24 * 60 * 60 * 1000, // 2 jours
    MAX_MENTIONS: 5,

    // ⛔ Ban
    BAN_DURATION: 24 * 60 * 60 * 1000, // 24h
    AUTO_BAN_THRESHOLD: 3,

    // 📊 Discord
    WEBHOOK_URL: "PUT_DISCORD_WEBHOOK_HERE",

    // ⚡ Performance
    CLEANUP_INTERVAL: 60 * 1000
};
