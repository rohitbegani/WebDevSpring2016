/**
 * Created by rohitbegani on 3/19/16.
 */
module.exports = function(app, userModel){
    "use strict";

    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateForm);
}();