module.exports = function(app) {
    "use strict";
    var UserModel = require("./models/user.model.js")();
    var FormModel = require("./models/form.model.js")();
    var FieldsModel = require("./models/fields.model.js")(FormModel);
    require("./services/user.service.server.js")(app, UserModel);
    require("./services/form.service.server.js")(app, FormModel);
    require("./services/fields.service.server.js")(app, FormModel, FieldsModel);
};