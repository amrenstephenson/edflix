function roundDP(value, decimalPlaces = 0) {
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
}

export { roundDP }