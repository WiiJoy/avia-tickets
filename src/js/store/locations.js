import api from '../services/apiService';

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);

        console.log(response);

        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        console.log(this.airlines);
        return response;
    }

    getCityCodeByKey(key) {
        return this.cities[key].code;
    }

    createShortCitiesList(cities) {
        // { 'City, Country': null }
        // Object.entries => [key, value]
        return Object.entries(cities).reduce((acc, [key]) => {
            acc[key] = null;
            return acc;
        }, {});
    }

    serializeCountries(countries) {
        // { 'Country code': { ... } }
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        // { 'City name, Country name': { ... } }
        return cities.reduce((acc, city) => {
            const countryName = this.getCountryNameByCode(city.country_code);
            const cityName = city.name || city.name_translations.en;
            const key = `${cityName},${countryName}`;
            acc[key] = city;
            return acc;
        }, {});
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
            item.name = item.name || item.name_translations.en;
            acc[item.code] = item;
            return acc;
        }, {});
    }

    getCountryNameByCode(code) {
        return this.countries[code].name;
    }

    // getCitiesByCountryCode(code) {
    //     return this.cities.filter(city => city.country_code === code);
    // }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        console.log(response);
    }
}

const locations = new Locations(api);

export default locations;