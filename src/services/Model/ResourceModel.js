export default class ResourceModel {
    constructor() {
        this.resource = {
            id: "",
            name: "",
            type: "",
            brand: "",
            model: "",
            greenEnergyType: "",
            country: "",
            region: "",
            city: "",
            availability: [
                {
                    dayOfWeek: "",
                    startTime: "",
                    endTime: ""
                }
            ],
            kwh: 0.0,
            memberEmail: "",
            isAvailable: false,
            architecture: "",
            cores: 0,
            threads: 0,
            baseFrequency: 0.0,
            maxFrequency: 0.0,
            cacheSize: 0,
            tdp: 0.0,
            hyperThreading: false,
            overclokingSupport: false,
            vramType: "",
            vramSize: 0,
            coreClock: 0.0,
            boostClock: 0.0,
            memoryClock: "",
            rayTracingSupport: false,
            dlssSupport: false,
            cpuCores: 0,
            gpuCores: 0,
            cpuBaseFrequency: 0.0,
            cpuMaxFrequency: 0.0,
            gpuBaseFrequency: 0.0,
            gpuMaxFrequency: 0.0,
            singleCoreScore: 0.0,
            multicoreScore: 0.0,
            openclScore: 0.0,
            vulkanScore: 0.0,
            cudaScore: 0.0,
            currentTaskId: ""
        };
    }

    setAllResource(resource) {
        this.resource = resource;
    }

    setResource(name, type, brand, model, greenEnergyType, country, region, city, availability, kwh, memberEmail, isAvailable) {
        this.resource.name = name;
        this.resource.type = type;
        this.resource.brand = brand;
        this.resource.model = model;
        this.resource.greenEnergyType = greenEnergyType;
        this.resource.country = country;
        this.resource.region = region;
        this.resource.city = city;
        this.resource.availability = availability.map(a => ({
            dayOfWeek: a.dayOfWeek,
            startTime: a.startTime,
            endTime: a.endTime
        }));
        this.resource.kwh = kwh;
        this.resource.memberEmail = memberEmail;
        this.resource.isAvailable = isAvailable;
    }

    getResource() {
        return this.resource;
    }

    toJson() {
        return JSON.stringify({
            name: this.resource.name,
            type: this.resource.type,
            brand: this.resource.brand,
            model: this.resource.model,
            greenEnergyType: this.resource.greenEnergyType,
            country: this.resource.country,
            region: this.resource.region,
            city: this.resource.city,
            availability: this.resource.availability,
            kwh: this.resource.kwh,
            memberEmail: this.resource.memberEmail,
            isAvailable: this.resource.isAvailable
        });
    }

    // Metodo per creare un oggetto di risorsa da un JSON
    static fromJson(json) {
        const data = JSON.parse(json);
        return new ResourceModel(
            data.name,
            data.type,
            data.brand,
            data.model,
            data.greenEnergyType,
            data.country,
            data.region,
            data.city,
            data.availability,
            data.kwh,
            data.memberEmail,
            data.isAvailable
        );
    }
}