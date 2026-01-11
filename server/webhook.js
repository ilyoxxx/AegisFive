const fetch = require('node-fetch');
const { WEBHOOK_URL } = require('./config');

module.exports.sendLog = async (title, message, color = 16711680) => {
    if (!WEBHOOK_URL) return;

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title,
                    description: message,
                    color,
                    timestamp: new Date().toISOString()
                }]
            })
        });
    } catch (e) {
        console.log('[ANTI-DDOS] Webhook error');
    }
};
