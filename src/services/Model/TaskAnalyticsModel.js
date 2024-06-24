class TaskAnalytics {
    constructor(taskId, energySaved, computingPowerUsed) {
        this.taskId = taskId;
        this.energySaved = energySaved;
        this.computingPowerUsed = computingPowerUsed;
    }
}

class TaskAnalyticsList {
    constructor(list) {
        this.list = list.map(task => new TaskAnalytics(task.taskId, task.energySaved, task.computingPowerUsed));
    }
}