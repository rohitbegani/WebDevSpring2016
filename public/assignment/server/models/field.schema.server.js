/**
 * Created by rohitbegani on 4/1/16.
 */
module.exports = function (mongoose) {
    "use strict";
    var FieldSchema = mongoose.Schema({
            label: String,
            type: {type: String, enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS',
                                                'DATE', 'RADIOS', 'CHECKBOXES', 'TEXTAREA'], default: 'TEXT'},
            placeholder: String,
            options: [{label: String, value: String}]

        }, {collection: 'field'});
    return FieldSchema;
};