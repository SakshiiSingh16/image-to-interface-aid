interface TrainRecord {
    trainNumber: string;
    trainName: string;
    stationName: string;
    latitude: number;
    longitude: number;
    weatherCondition: string;
}

export const TRAIN_DB: TrainRecord[] = [
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "ab",
        latitude: 18.7342,
        longitude: 82.4561,
        weatherCondition: "Sunny"
    },
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "cd",
        latitude: 22.1456,
        longitude: 75.8923,
        weatherCondition: "Cloudy"
    },
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "ef",
        latitude: 15.3289,
        longitude: 88.2134,
        weatherCondition: "Rainy"
    },
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "gh",
        latitude: 26.8745,
        longitude: 73.5621,
        weatherCondition: "Humid"
    },
    {
        trainNumber: "12345",
        trainName: "ABC",
        stationName: "ij",
        latitude: 12.5678,
        longitude: 79.3456,
        weatherCondition: "Windy"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "ab",
        latitude: 20.4523,
        longitude: 85.7812,
        weatherCondition: "Cloudy"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "cd",
        latitude: 14.2891,
        longitude: 71.4567,
        weatherCondition: "Windy"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "ef",
        latitude: 25.6734,
        longitude: 89.1234,
        weatherCondition: "Sunny"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "gh",
        latitude: 10.8912,
        longitude: 77.6543,
        weatherCondition: "Rainy"
    },
    {
        trainNumber: "22531",
        trainName: "DEF",
        stationName: "ij",
        latitude: 27.3456,
        longitude: 81.9876,
        weatherCondition: "Humid"
    }
];
