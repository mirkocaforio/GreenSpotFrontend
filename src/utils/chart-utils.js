import {roundValue} from "./math";

export const convertToApexChartData = (data, mapping, categoryMapper) => {
    const categories = data.map(item => categoryMapper(item));
    const series = mapping.map(field => ({
        name: field.displayName,
        data: data.map(item => roundValue(item[field?.fieldName], 2))
    }));

    // Calculate total sums for fields with Total: true
    const totals = mapping.reduce((acc, field) => {
        if (field?.total) {
            acc[field.fieldName] = {
                title: "Total " + field.displayName,
                value: roundValue(data.reduce((sum, item) => sum + item[field.fieldName], 0), 2),
            }
        }
        return acc;
    }, {});

    return { categories, series, totals };
}