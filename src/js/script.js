import './plugins/';
import '../css/style.css';

import locations from './store/locations';

import formUI from './views/form';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;

    // Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });


    // Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        // Собрать данные из инпутов
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.distinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        // CODE, CODE, 2019-09, 2019-10
        console.log(origin, destination, depart_date, return_date);

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });
    }

});

// locations.init().then(res => {
//     console.log(res);
//     console.log(locations);
//     console.log(locations.getCitiesByCountryCode('PE'));
// });