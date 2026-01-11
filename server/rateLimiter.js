class RateLimiter {
    constructor(limit, window) {
        this.limit = limit;
        this.window = window;
        this.map = new Map();
    }

    hit(key) {
        const now = Date.now();
        let data = this.map.get(key);

        if (!data) {
            data = [];
        }

        data = data.filter(t => now - t < this.window);
        data.push(now);
        this.map.set(key, data);

        return data.length > this.limit;
    }

    cleanup() {
        const now = Date.now();
        for (const [key, data] of this.map) {
            const filtered = data.filter(t => now - t < this.window);
            if (filtered.length === 0) this.map.delete(key);
            else this.map.set(key, filtered);
        }
    }
}

module.exports = RateLimiter;
