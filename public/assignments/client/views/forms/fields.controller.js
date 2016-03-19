/**
 * Created by rohitbegani on 2/14/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('FieldController', FieldController);

    FieldController.$inject = ['$rootScope', '$scope', 'FieldService', '$routeParams', '$uibModal'];

    function FieldController($rootScope, $scope, FieldService, $routeParams, $uibModal) {
        formId = $routeParams.formId;
        userId = $rootScope.user._id;
        $scope.model = {};
        $scope.model.fields = [];
        FieldService.getFieldsForForm(formId).then(function(data){
            // console.log(data);
            $scope.model.fields = data.data;
        });

        $scope.editField = editField;
        $scope.removeField = removeField;
        $scope.addField = addField;
        $scope.rearrange = rearrange;
        $scope.open = open;

        $scope.sortableOptions = {
            handle: '.myHandle',
            update: function(e, ui) {
                rearrange();
            }
        };

        function open(size, field) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                controller: 'DialogController',
                templateUrl: './views/forms/dialogContent.html',
                size: size,
                resolve: {
                    field: function (){
                        return field;
                    }
                },
                scope: $scope
            });
        }

        function removeField(field) {
            FieldService.deleteFieldFromForm(formId, field._id).then(function (data) {
                // console.log(data.data);
                $scope.model.fields = data.data;
            }, function (err) {console.log(err);});
        }

        function rearrange() {
            FieldService.rearrangeFields(formId, $scope.model.fields).then(function (data) {
                // console.log($scope.model.fields);
                $scope.model.fields = data.data;
            });
        }

        function addField() {
            var fieldType = $scope.model.fieldType;
            console.log(fieldType);
            if (fieldType === "textarea") {
                var field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType === "date") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType === "options") {
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            } else if (fieldType === "checkboxes") {
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            } else if (fieldType === "radios") {
                // Radio Buttons Field
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            } else {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }

            FieldService.createFieldForForm(formId, field).then(function (data) {
                $scope.model.fields = data.data;
            }, function (err) {console.log(err);});
        }
    }
})();