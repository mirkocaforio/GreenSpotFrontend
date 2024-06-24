function getComputingPowerRange(analytics) {
    let maxComputingPower = Math.max(...analytics.map(item => item?.computingPowerUsed));
    let minComputingPower = Math.min(...analytics.map(item => item?.computingPowerUsed));
    if( minComputingPower === maxComputingPower){
        minComputingPower = 0;
    }

    return [maxComputingPower,minComputingPower]

}

function getEnergyConsumptionRange(analytics) {
    let maxEnergyConsumption = Math.max(...analytics.map(item => item?.energySaved));
    let minEnergyConsumption = Math.min(...analytics.map(item => item?.energySaved));
    if( minEnergyConsumption === maxEnergyConsumption){
        minEnergyConsumption = 0;
    }

    return [maxEnergyConsumption,minEnergyConsumption]

}

export const getTaskAnalytics = (analytics , taskId, type) => {
    let computingPower = 0;
    let energyConsumption = 0;
    switch (type){
        case 'computingPower':
            computingPower = analytics.find(item => item?.taskId === taskId)?.computingPowerUsed;
            return computingPower ? computingPower : 0;
        case 'energyConsumption':
            energyConsumption = analytics.find(item => item?.taskId === taskId)?.energySaved;
            return energyConsumption ? energyConsumption : 0;
    }

}

export const getAnalyticsRange = (analytics = [], type) => {
    switch (type){
        case 'computingPower':
            return getComputingPowerRange(analytics);
        case 'energyConsumption':
            return getEnergyConsumptionRange(analytics);
    }

}
