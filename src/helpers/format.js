const formatCurrency = amountInCents => {
    return `$ ${(amountInCents / 100).toFixed(2)}`;
};

const formatDistance = distanceInMetres => {
    if (distanceInMetres > 1000) {
        return `${(distanceInMetres / 1000).toFixed(2)} km`;
    } else {
        return `${distanceInMetres} m`;
    }
};

module.exports = {
    formatCurrency, formatDistance
}