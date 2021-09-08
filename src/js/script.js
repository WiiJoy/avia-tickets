import './plugins/';
import '../css/style.css';

import locations from './store/locations';

import formUI from './views/form';

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Events



    // Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

});

// locations.init().then(res => {
//     console.log(res);
//     console.log(locations);
//     console.log(locations.getCitiesByCountryCode('PE'));
// });