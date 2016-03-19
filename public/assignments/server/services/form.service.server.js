/**
 * Created by rohitbegani on 3/19/16.
 */
module.exports = function(app, formModel){
    "use strict";

    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateForm);

    function findFormByUserId(req, res) {
        var userId = parseInt(req.params.userId);
        var form = formModel.findFormByUserId(userId);
        res.json(form);
    }

    function findFormById(req, res) {
        var form = formModel.findFormById(req.params.formId);
        res.json(form);
    }

    function deleteForm(req, res) {
        formModel.deleteForm(req.params.formId);
        res.send(200);
    }

    function createForm(req, res) {
        var userId = parseInt(req.params.userId);
        var newForm = req.body;
        newForm.userId = userId;
        var form = formModel.createForm(newForm);
        res.json(form);
    }

    function updateForm(req, res) {
        var form = formModel.updateForm(req.params.formId, req.body);
        res.json(form);
    }
}();