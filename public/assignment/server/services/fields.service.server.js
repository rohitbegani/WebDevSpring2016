module.exports = function(app, FormModel, FieldsModel) {
    "use strict";

    app.get('/api/assignment/form/:formId/field', findFields);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldById);
    app.post('/api/assignment/form/:formId/field', createFieldById);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldById);

    function findFields(req, res) {
        var fields = FieldsModel.findFieldsByFormId(req.params.formId);
        res.json(fields);
    }

    function findFieldById(req, res) {
        var field = FieldsModel.findField(req.params.formId, req.params.fieldId);
        res.json(field);
    }

    function deleteFieldById(req, res) {
        FieldsModel.deleteField(req.params.formId, req.params.fieldId);
        res.send(200);
    }

    function createFieldById(req, res) {
        var newFields = FieldsModel.createField(req.params.formId, req.body);
        res.json(newFields);
    }

    function updateFieldById(req, res) {
        var newField = FieldsModel.updateField(req.params.formId, req.params.fieldId, req.body);
        res.json(newField);
    }
};