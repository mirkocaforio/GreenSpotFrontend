export function roundValue(value, n) {
    const factor = Math.pow(10, n);
    return Math.round(value * factor) / factor;
}