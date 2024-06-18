
class TaskModel {
    constructor(name, emailUtente, maxComputingPower, taskDuration, maxEnergyConsumption, maxCudaPower, minCudaPower, minComputingPower, minEnergyConsumption, minWorkingTime, description, script, running, enabled, startTime, endTime, assignedResources,id) {
        this.name = name;
        this.emailUtente = emailUtente;
        this.maxComputingPower = maxComputingPower;
        this.taskDuration = taskDuration;
        this.maxEnergyConsumption = maxEnergyConsumption;
        this.maxCudaPower = maxCudaPower;
        this.minCudaPower = minCudaPower;
        this.minComputingPower = minComputingPower;
        this.minEnergyConsumption = minEnergyConsumption;
        this.minWorkingTime = minWorkingTime;
        this.description = description;
        this.script = script;
        this.running = running;
        this.enabled = enabled;
        this.startTime = startTime;
        this.endTime = endTime;
        this.assignedResources = assignedResources;
        this.id = id;
    }



    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        let obj = json;
        return new TaskModel(obj.name, obj.emailUtente, obj.maxComputingPower, obj.taskDuration, obj.maxEnergyConsumption, obj.maxCudaPower, obj.minCudaPower, obj.minComputingPower, obj.minEnergyConsumption, obj.minWorkingTime, obj.description, obj.script, obj.running, obj.enabled, obj.startTime, obj.endTime, obj.assignedResources,obj.id);
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setEmailUtente(emailUtente) {
        this.emailUtente = emailUtente;
    }

    setMaxComputingPower(maxComputingPower) {
        this.maxComputingPower = maxComputingPower;
    }

    setTaskDuration(taskDuration) {
        this.taskDuration = taskDuration;
    }

    setMaxEnergyConsumption(maxEnergyConsumption) {
        this.maxEnergyConsumption = maxEnergyConsumption;
    }

    setMaxCudaPower(maxCudaPower) {
        this.maxCudaPower = maxCudaPower;
    }

    setMinCudaPower(minCudaPower) {
        this.minCudaPower = minCudaPower;
    }

    setMinComputingPower(minComputingPower) {
        this.minComputingPower = minComputingPower;
    }

    setMinEnergyConsumption(minEnergyConsumption) {
        this.minEnergyConsumption = minEnergyConsumption;
    }

    setMinWorkingTime(minWorkingTime) {
        this.minWorkingTime = minWorkingTime;
    }

    setDescription(description) {
        this.description = description;
    }

    setScript(script) {
        this.script = script;
    }

    setRunning(running) {
        this.running = running;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    setStartTime(startTime) {
        this.startTime = startTime;
    }

    setEndTime(endTime) {
        this.endTime = endTime;
    }

    setAssignedResources(assignedResources) {
        this.assignedResources = assignedResources;
    }

    getName() {
        return this.name;
    }

    getEmailUtente() {
        return this.emailUtente;
    }

    getMaxComputingPower() {
        return this.maxComputingPower;
    }

    getTaskDuration() {
        return this.taskDuration;
    }

    getMaxEnergyConsumption() {
        return this.maxEnergyConsumption;
    }

    getMaxCudaPower() {
        return this.maxCudaPower;
    }

    getMinCudaPower() {
        return this.minCudaPower;
    }

    getMinComputingPower() {
        return this.minComputingPower;
    }

    getMinEnergyConsumption() {
        return this.minEnergyConsumption;
    }

    getMinWorkingTime() {
        return this.minWorkingTime;
    }

    getDescription() {
        return this.description;
    }

    getScript() {
        return this.script;
    }

    getRunning() {
        return this.running;
    }

    getEnabled() {
        return this.enabled;
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.endTime;
    }

    getAssignedResources() {
        return this.assignedResources;
    }

    getId(){
        return this.id;
    }

}

export default TaskModel;