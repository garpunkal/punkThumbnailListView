(function () {
    "use strict";

    function punkThumbnailListViewController($scope, listViewHelper, $location, mediaHelper, mediaResource, entityResource, notificationsService) {

        var vm = this;
        var umbracoSettings = Umbraco.Sys.ServerVariables.umbracoSettings;

        vm.nodeId = $scope.contentId;

        // Use list of allowed file types if provided
        vm.acceptedFileTypes = mediaHelper.formatFileTypes(umbracoSettings.allowedUploadFiles);
        if (vm.acceptedFileTypes === '') {
            // If not provided, we pass in a disallowed list by adding ! to the file extensions, allowing everything EXCEPT for disallowedUploadFiles
            vm.acceptedFileTypes = !mediaHelper.formatFileTypes(umbracoSettings.disallowedUploadFiles);
        }

        vm.maxFileSize = umbracoSettings.maxFileSize + "KB";
        vm.activeDrag = false;
        vm.isRecycleBin = $scope.contentId === '-21' || $scope.contentId === '-20';
        vm.acceptedMediatypes = [];

        vm.selectItem = selectItem;
        vm.clickItem = clickItem;
        vm.selectAll = selectAll;
        vm.isSelectedAll = isSelectedAll;
        vm.isSortDirection = isSortDirection;
        vm.sort = sort;
        vm.dragEnter = dragEnter;
        vm.dragLeave = dragLeave;
        vm.onFilesQueue = onFilesQueue;
        vm.onUploadComplete = onUploadComplete;
        markAsSensitive();

        function activate() {

            if ($scope.entityType === 'media') {
                mediaTypeHelper.getAllowedImagetypes(vm.nodeId).then(function (types) {
                    vm.acceptedMediatypes = types;
                });
            }

            angular.forEach($scope.options.includeProperties, function (column) {
                if (!column.isSystem) {
                    angular.forEach($scope.items, function (item) {
                        try {

                            if (item[column.alias].src) {
                                item[column.alias] = mediaHelper.getThumbnailFromPath(item[column.alias].src);
                                clearColumn(column);
                            }

                            if (item[column.alias][0].mediaKey) {
                                mediaResource.getById(item[column.alias][0].mediaKey)
                                    .then(function (media) {
                                        item[column.alias] = (media != null && media.mediaLink != null) ? mediaHelper.getThumbnailFromPath(media.mediaLink) : '';
                                        clearColumn(column);
                                    }, (err) => console.log(err));
                            }

                            if (item[column.alias].indexOf('umb://media/') === 0) {
                                mediaResource.getById(getIdFromUdi(item[column.alias]))
                                    .then(function (media) {
                                        item[column.alias] = (media != null && media.mediaLink != null) ? mediaHelper.getThumbnailFromPath(media.mediaLink) : '';
                                        clearColumn(column);
                                    }, (err) => console.log(err));
                            }

                            if (item[column.alias].indexOf('umb://document/') === 0) {
                                entityResource.getById(getIdFromUdi(item[column.alias]), "Document")
                                    .then(function (document) {
                                        if (document != null) {
                                            item[column.alias] = document.name;
                                            clearColumn(column);
                                        }
                                    }, (err) => console.log(err));
                            }


                        } catch { }
                    });
                }

            });
        }

        function clearColumn(column) {
            notificationsService.removeAll();
            column.allowSorting = false;
        }

        function selectAll() {
            if ($scope.options.readonly) return;
            listViewHelper.selectAllItemsToggle($scope.items, $scope.selection);
        }

        function isSelectedAll() {
            return listViewHelper.isSelectedAll($scope.items, $scope.selection);
        }

        function selectItem(selectedItem, $index, $event) {
            if ($scope.options.readonly) return;
            listViewHelper.selectHandler(selectedItem, $index, $scope.items, $scope.selection, $event);
        }

        function clickItem(item) {
            listViewHelper.editItem(item, $scope);
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

        // Dropzone upload functions
        function dragEnter(el, event) {
            vm.activeDrag = true;
        }

        function dragLeave(el, event) {
            vm.activeDrag = false;
        }

        function onFilesQueue() {
            vm.activeDrag = false;
        }

        function onUploadComplete() {
            $scope.getContent($scope.contentId);
        }

        function markAsSensitive() {
            $scope.options.includeProperties.forEach(function (option) {
                option.isSensitive = false;

                if ($scope.items && $scope.items.length) {
                    $scope.items.forEach(function (item) {
                        item.properties.forEach(function (property) {
                            if (option.alias === property.alias) {
                                option.isSensitive = property.isSensitive;
                            }
                        });
                    });
                }
            });
        }

        function getIdFromUdi(udi) {
            return udi.substring(udi.lastIndexOf('/') + 1, udi.length);
        }

        activate();
    }

    angular.module("umbraco").controller("punkThumbnailListView.punkThumbnailListViewController", punkThumbnailListViewController);
})();