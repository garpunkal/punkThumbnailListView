angular.module("umbraco").controller("punkDropDownListController",

    function ($scope, $q) {

        $scope.isLoaded = false;

        var await = [];
            
        // Wait for queue to end
        $q.all(await).then(function () {

            // Check whether the model is initialized
            if (!$scope.model.value) {
                if ($scope.model.config.multiple == 1) {
                    $scope.model.value = [];
                }
                else {
                    $scope.model.value = "";
                }
            }
            else if (!angular.isArray($scope.model.value)) {
                if ($scope.model.config.multiple == 1) {
                    var value = $scope.model.value;
                    $scope.model.value = [];
                    $scope.model.value.push(value);
                }
            }
            else if ($scope.model.config.multiple != 1) {
                $scope.model.value = $scope.model.value[0];
            }

            // Remove any empty item from the list
            $scope.model.config.items.items = $scope.model.config.items.items.filter(function (item) {
                return item.key !== "" && item.value !== "";
            });

            // Add an empty item in order to allow users to deselect when the 'chosen' option is ticked
            if ($scope.model.config.useChosen == 1 && $scope.model.config.multiple != 1) {
                $scope.model.config.items.items.push({ key: '', value: '' });
            }

            // Populate the dropdown list
            $scope.items = $scope.model.config.items.items;

            // Remove from the model any previously selected item that doesn't exist in the list anymore
            if ($scope.model.config.multiple == 1) {
                var onlyValidSelectedItems = [];
                angular.forEach($scope.items, function (value, key) {
                    var index = $scope.model.value.indexOf(value.key);
                    if (index > -1) {
                        onlyValidSelectedItems.push(value.key);
                    }
                });
                $scope.model.value = onlyValidSelectedItems;
            }
            $scope.isLoaded = true;
        });
    });