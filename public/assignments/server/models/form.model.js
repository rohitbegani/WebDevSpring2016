/**
 * Created by rohitbegani on 3/18/16.
 */
var form_data = require("./form.mock.js");

module.exports = function(app) {
    "use strict";
    var api = {
        // form
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,

        // fields
        findFields: findFields,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateField: updateField
    };

    return api;

    function findFormByTitle(title) {
        var form = null;

        for (var f in form_data) {
            if (form_data[f].title === title){
                form = form_data[f];
                return form;
            }
        }
    }
}();