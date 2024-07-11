export function roundValue(value, n) {
    if(!value) return 0;
    const factor = Math.pow(10, n);
    return Math.round(value * factor) / factor;
}