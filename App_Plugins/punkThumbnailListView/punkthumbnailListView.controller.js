(function () {
    "use strict";

    function punkThumbnailListViewController($scope, listViewHelper, $location, mediaHelper, entityResource, notificationsService) {

        var vm = this;

        vm.nodeId = $scope.contentId;

        vm.selectItem = selectItem;
        vm.clickItem = clickItem;
        vm.selectAll = selectAll;
        vm.isSelectedAll = isSelectedAll;
        vm.isSortDirection = isSortDirection;
        vm.sort = sort;

        function selectAll($event) {
            listViewHelper.selectAllItems($scope.items, $scope.selection, $event);
        }

        function isSelectedAll() {
            return listViewHelper.isSelectedAll($scope.items, $scope.selection);
        }

        function selectItem(selectedItem, $index, $event) {
            listViewHelper.selectHandler(selectedItem, $index, $scope.items, $scope.selection, $event);
        }

        function clickItem(item) {
            // if item.id is 2147483647 (int.MaxValue) use item.key
            $location.path($scope.entityType + '/' + $scope.entityType + '/edit/' + (item.id === 2147483647 ? item.key : item.id));
        }

        function isSortDirection(col, direction) {
            return listViewHelper.setSortingDirection(col, direction, $scope.options);
        }

        function sort(field, allow, isSystem) {
            if (allow) {
                $scope.options.orderBySystemField = isSystem;
                listViewHelper.setSorting(field, allow, $scope.options);
                $scope.getContent($scope.contentId);
            }
        }

        function getIdFromUdi(udi) {
            return udi.substring(udi.lastIndexOf('/') + 1, udi.length);
        }

        function init() {

            angular.forEach($scope.options.includeProperties, function (column) {

                if (!column.isSystem) {

                    angular.forEach($scope.items, function (item) {


                        try {
                            if (item[column.alias][0].mediaKey) {
                                entityResource.getById(item[column.alias][0].mediaKey, "Media")
                                    .then(function (media) {                                       
                                        notificationsService.removeAll();
                                        item[column.alias] = mediaHelper.resolveFileFromEntity(media, true);
                                        column.allowSorting = false;
                                    }, function (err) {
                                        notificationsService.removeAll();
                                        item[column.alias] = '';
                                        column.allowSorting = false;
                                    });
                            }
                            if (item[column.alias].indexOf('umb://media/') === 0) {
                                entityResource.getById(getIdFromUdi(item[column.alias]), "Media")
                                    .then(function (media) {
                                        notificationsService.removeAll();
                                        item[column.alias] = mediaHelper.resolveFileFromEntity(media, true);
                                        column.allowSorting = false;
                                    }, function (err) {
                                        notificationsService.removeAll();
                                        item[column.alias] = '';
                                        column.allowSorting = false;
                                    });
                            }
                            if (item[column.alias].indexOf('umb://document/') === 0) {
                                entityResource.getById(getIdFromUdi(item[column.alias]), "Document")
                                    .then(function (document) {
                                        notificationsService.removeAll();
                                        item[column.alias] = document.name;
                                        column.allowSorting = false;
                                    }, function (err) {
                                        notificationsService.removeAll();
                                        item[column.alias] = '';
                                        column.allowSorting = false;
                                    });
                            }

                        } catch (err) {
                            console.log(err);
                        };
                    });
                }

            });
        }

        init();
    }

    angular.module("umbraco").controller("punkThumbnailListView.punkThumbnailListViewController", punkThumbnailListViewController);
})();