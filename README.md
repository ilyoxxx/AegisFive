
![Logo](./Aegis.png)

# 🛡️ AegisFive

**AegisFive** is an advanced **FiveM server security framework** written in **JavaScript**, designed to protect servers against **raids, floods, abusive connections, event spam and malicious behavior**.

⚠️ AegisFive is **NOT** a network-level DDoS protection.  
It is an **application-layer security system**, meant to be used **alongside a firewall, Cloudflare and txAdmin**.

---

## 🚀 Features

### 🔌 Connection Protection
- Rate limit connections per IP
- Detect fast reconnect attempts
- Block abusive IPs automatically
- Account age verification

### 📡 Event & Flood Protection
- Global event rate limiter
- Per-player spam detection
- Automatic kick or ban escalation
- Zero client trust

### 🧠 Anti-Raid Intelligence (Behavior Scoring)
- Lightweight ML-style scoring system
- Detects raid patterns instead of static rules
- Very low false positives
- Scales to 500+ players

### 🔥 Native / Packet Abuse Protection
- Detect abnormal native spam
- Crash attempt prevention
- Anti-cheat friendly (no engine hooks)

### ⛔ IP Ban System
- Temporary or permanent IP bans
- Local ban manager
- Shared bans across multiple servers

### 📡 Firewall Synchronization (Optional)
- Sync banned IPs to VPS firewall (iptables / ufw)
- Instant network-level blocking
- Optional and configurable

### 🔒 Event Encryption (Optional)
- Prevent event injection
- Prevent replay attacks
- Payload integrity validation

### 📊 Discord Logging
- Real-time security alerts
- Clean embeds
- Fully configurable webhook

---

## 📁 Resource Structure
```
aegisfive/
├── fxmanifest.lua
├── README.md
└── server/
├── main.js
├── config.js
├── rateLimiter.js
├── ipManager.js
├── mlAntiRaid.js
├── firewallSync.js
├── sharedBan.js
├── eventCrypto.js
├── nativeProtection.js
├── webhook.js
└── utils.js
```
---

## ⚙️ Configuration

Edit `server/config.js`:

```js
module.exports = {
    MAX_CONNECTIONS_PER_IP: 3,
    CONNECTION_WINDOW: 60000,

    MAX_EVENTS: 12,
    EVENT_WINDOW: 5000,

    MIN_ACCOUNT_AGE: 2 * 24 * 60 * 60 * 1000,

    AUTO_BAN_THRESHOLD: 3,
    BAN_DURATION: 24 * 60 * 60 * 1000,

    WEBHOOK_URL: "PUT_YOUR_DISCORD_WEBHOOK",

    CLEANUP_INTERVAL: 60000
};
```
# **🔐 Secure Event Usage (MANDATORY)**

All sensitive server events **MUST** pass through the secure event channel.

### **Client-side example**
```js
emitNet('secure:event');
```
**❌ Never trust client-side logic**

**✅ Always validate on server-side**

# 🧠 **Anti-Raid Logic (How It Works)**

AegisFive uses a **behavior scoring system:**

- New account joins → score increase

- Event spam → score increase

- Fast reconnects → score increase

- When a score threshold is reached:

- Player is kicked

- IP is banned

- Firewall sync (if enabled)

- Ban is shared across servers

**This approach:**
- ✔ Adapts to new attack patterns
- ✔ Reduces false positives
- ✔ Scales efficiently

# 📡 **Firewall Sync (Optional)**

### ⚠️ *WARNING*
Enable only if:

- You are on a Linux VPS

- You have root privileges

- You understand firewall rules

Example ```(server/firewallSync.js):```
```js
iptables -A INPUT -s IP -j DROP
```
Disable this module if not applicable.

# 🔒 **Event Encryption (Optional)**

**Protects against:**

- Event injection

- Payload tampering

- Replay attacks

**Recommended for:**

- Economy events

- Inventory systems

- Admin actions

# 🛑 Shared Ban System

**Allows multiple FiveM servers to share the same ban list:**

- Useful for server clusters

- Shared hosting environments

- Network-wide protection

*Simple file-based implementation (can be upgraded to Redis / DB).*

# ⚡ Performance

- ✔ Optimized Maps

- ✔ Periodic cleanup

- ✔ No heavy loops

- ✔ No blocking I/O

- ✔ No memory leaks

Tested logic supports **500–1000 concurrent players.**

# 🔐 Anti-Cheat Compatibility

**AegisFive is fully compatible with:**

- txAdmin

- Custom anti-cheats

- Commercial anti-cheats

It does **NOT**:
- ❌ Hook natives
- ❌ Modify engine behavior
- ❌ Inject code
- ❌ Spoof identifiers

# **🧠 Best Practices (IMPORTANT)**

- Combine with Cloudflare

- Always use a firewall

- Keep txAdmin enabled

- Never expose sensitive events

- Monitor logs regularly

# ❗ Limitations

- Does NOT stop volumetric DDoS attacks

- Requires proper server configuration

- Firewall sync requires Linux VPS

# ⭐ Credits

**Developed for FiveM servers that require real security, not gimmicks.**

**AegisFive – Secure your FiveM servers.**

-- --------------------------------------------------
# Creative Commons Attribution-NonCommercial 4.0
--------------------------------------------------

*This work is licensed under the Creative Commons
Attribution-NonCommercial 4.0 International License.*

You are free to:
- Share
- Adapt

Under the following terms:
- Attribution is required
- No commercial use allowed

Full license text:
https://creativecommons.org/licenses/by-nc/4.0/
--------------------------------------------------

## Authors

- [@ilyox.fr](https//github.com/ilyoxxx)

