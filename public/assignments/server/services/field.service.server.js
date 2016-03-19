/**
 * Created by rohitbegani on 3/19/16.
 */
module.exports = function(app, formModel) {
    "use strict";

    app.get('/api/assignment/form/:formId/field', findFields);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldById);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);

    function findFields(req, res) {
        var fields = formModel.findAllFieldsByFormId(req.params.formId);
        res.json(fields);
    }

    function findFieldById(req, res) {
        var field = formModel.findFieldByFormId(req.params.formId, req.params.fieldId);
        res.json(field);
    }

    function deleteFieldById(req, res) {
        formModel.deleteFieldById(req.params.formId, req.params.fieldId);
        res.send(200);
    }

    function createField(req, res) {
        var newFields = formModel.createFieldById(req.params.formId, req.body);
        res.json(newFields);
    }

    function updateField(req, res) {
        var newField = formModel.updateFieldById(req.params.formId, req.params.fieldId, req.body);
        res.json(newField);
    }
}();