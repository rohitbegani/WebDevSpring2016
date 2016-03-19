/**
 * Created by rohitbegani on 3/18/16.
 */
var form_data = require("./form.mock.js");

module.exports = function(app) {
    "use strict";
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById
    };

    return api;

    function findFormByTitle(title) {
        for (var form in form_data) {
            if (form_data(form).title === title){
                return form_data(form)
            }
        }
        return null;
    }
}();