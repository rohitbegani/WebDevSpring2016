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

    function createForm(form) {
        form._id = (new Date).getTime().toString();
        form.label = null;
        form.type = null;
        form.fields = []
        form_data.push(form);
        return form;
    }

    function findAllForms() {
        return form_data;
    }

    function findFormById(formId) {
        var form = null;

        for (var f in form_data) {
            if (form_data[f]._id === formId) {
                return form_data[f];
            }
        }
        return form;
    }

    function updateFormById(formId, form) {
        var form = null;
        for (var f in form_data) {
            if (form_data[f]._id === formId) {
                form_data[f] = form;
                return form_data[f];
            }
        }
        return form;
    }

    function deleteFormById(formId) {
        var newForms = [];
        for (var f in form_data) {
            if (form_data[f]._id !== formId) {
                newForms.push(form_data[f]);
            }
        }
        form_data = newForms;
    }

    function findFields(formId) {
        var form = findFormById(formId)
        if (form) {
            return form.fields;
        }
        return null;
    }

    function findFieldById(formId, fieldId) {
        var fields = findFields(formId);
        var default1 = null;

        for (var f in fields) {
            if (fields[f]._id === fieldId) {
                return fields[f];
            }
        }
        return default1;
    }

    function deleteFieldById(formId, fieldId) {
        var newFields = [];
        var currentFields = findFields(formId);
        for (var f in currentFields) {
            if (currentFields[f]._id !== fieldId) {
                newFields.push(currentFields[f]);
            }
        }

        for (var f in form_data) {
            var default1 = null;

            if (form_data[f]._id === formId) {
                form_data[f].fields = newFields;
                return form_data[f].fields;
            }
        }
        return default1;
    }

    function updateField(formId, fieldId, newField) {
        var default1 = null;

        for (var i in mock) {
            if (mock[i]._id === formId) {
                for (var j in mock[i].fields) {
                    if (mock[i].fields[j]._id === fieldId) {
                        mock[i].fields[j] = newField;
                        return mock[i].fields[j];
                    }
                }
            }
        }
        return default1;
    }

    function createField(formId, newField) {
        var default1 = null;

        newField._id = (new Date).getTime().toString();
        for (var f in form_data) {
            if (form_data[f]._id === formId) {
                form_data[f].fields.push(newField);
                return form_data[f].fields;

            }
        }
        return default1;
    }

}();