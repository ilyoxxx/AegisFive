module.exports.getIP = (src) => {
    try {
        return GetPlayerEndpoint(src);
    } catch {
        return null;
    }
};

module.exports.getAccountAge = (src) => {
    const ids = GetPlayerIdentifiers(src);
    const rockstar = ids.find(i => i.startsWith('license:'));
    return rockstar ? Date.now() - GetPlayerLastLogin(src) : Infinity;
};
