interface TrainRecord {
    trainNumber: string;
    trainName: string;
    stationName: string;
    location: number;
    weatherCondition: string;
}

export const TRAIN_DB: TrainRecord[] = [
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "ab",
        location: 12348,
        weatherCondition: "Sunny"
    },
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "cd",
        location: 12352,
        weatherCondition: "Cloudy"
    },
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "ef",
        location: 12366,
        weatherCondition: "Rainy"
    },
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "gh",
        location: 12378,
        weatherCondition: "Humid"
    },
    
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "ab",
        location: 12348,
        weatherCondition: "Cloudy"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "cd",
        location: 12352,
        weatherCondition: "Windy"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "ef",
        location: 12366,
        weatherCondition: "Sunny"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "gh",
        location: 12378,
        weatherCondition: "Rainy"
    },
];
