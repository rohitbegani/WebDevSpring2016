/**
 * Created by rohitbegani on 3/18/16.
 */
var q = require("q");

module.exports = function(app) {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById
    };

    return api;
}();