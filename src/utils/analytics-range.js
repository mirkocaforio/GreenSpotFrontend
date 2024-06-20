function getComputingPowerRange(analytics) {
    const maxComputingPower = Math.max(...analytics.map(item => item?.computingPowerUsed));
    const minComputingPower = Math.min(...analytics.map(item => item?.computingPowerUsed));

    return [maxComputingPower,minComputingPower]

}

function getEnergyConsumptionRange(analytics) {
    const maxEnergyConsumption = Math.max(...analytics.map(item => item?.energySaved));
    const minEnergyConsumption = Math.min(...analytics.map(item => item?.energySaved));

    return [maxEnergyConsumption,minEnergyConsumption]

}

export const getTaskAnalytics = (analytics , task, type) => {
    let computingPower = 0;
    let energyConsumption = 0;
    switch (type){
        case 'computingPower':
            computingPower = analytics.find(item => item?.taskId === task?.id)?.computingPowerUsed;
            return computingPower ? computingPower : 0;
        case 'energyConsumption':
            energyConsumption = analytics.find(item => item?.taskId === task?.id)?.energySaved;
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
