const nativeHits = new Map();

const MAX_NATIVE_CALLS = 50;
const WINDOW = 5000;

on('gameEventTriggered', (name, args) => {
    const src = global.source;
    const now = Date.now();

    const key = `${src}:${name}`;
    const data = nativeHits.get(key) || [];
    const recent = data.filter(t => now - t < WINDOW);
    recent.push(now);
    nativeHits.set(key, recent);

    if (recent.length > MAX_NATIVE_CALLS) {
        DropPlayer(src, 'Abus de natives détecté.');
        console.log(`[AegisFive] Native spam: ${name} (${src})`);
    }
});
