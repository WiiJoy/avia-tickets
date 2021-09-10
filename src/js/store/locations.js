import api from '../services/apiService';
import { formatDate } from '../helpers/date';

class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
        this.formatDate = helpers.formatDate;
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
        return response;
    }

    getCityCodeByKey(key) {
        // return this.cities[key].code;
        const city = Object.values(this.cities).find((item) => item.fullName === key);
        return city.code;
    }

    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    createShortCitiesList(cities) {
        // { 'City, Country': null }
        // Object.entries => [key, value]
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.fullName] = null;
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
            city.name = city.name || city.name_translations.en;
            const fullName = `${city.name},${countryName}`;
            acc[city.code] = {
                ...city,
                countryName,
                fullName,
            };
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
        this.lastSearch = this.serializeTickets(response.data);
        console.log(this.lastSearch);
    }

    serializeTickets(tickets) {
        console.log(tickets);
        return Object.values(tickets).map(ticket => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
                return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
            };
        });
    }
}

const locations = new Locations(api, { formatDate });

export default locations;