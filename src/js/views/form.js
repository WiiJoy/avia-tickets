import {getAutocomleteInstance, getDatepickerInstance} from '../plugins/materialize';

class FormUI {
    constructor(autocomleteInstance, datepickerInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');

        this.originAutocomplete = autocomleteInstance(this.origin);
        this.destinationAutocomplete = autocomleteInstance(this.destination);

        this.departDatepicker = datepickerInstance(this.depart);
        this.returnDatepicker = datepickerInstance(this.return);
    }

    get form() {
        return this.$form;
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocomleteInstance, getDatepickerInstance);

export default formUI;