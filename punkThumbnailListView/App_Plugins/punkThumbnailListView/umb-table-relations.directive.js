(function () {
    'use strict';

    function TableRelations(iconHelper) {

        var vm = this;

        vm.clickItem = function (item, $event) {
            if (vm.onClick && !($event.metaKey || $event.ctrlKey)) {
                vm.onClick({ item: item });
                $event.preventDefault();
            }
            $event.stopPropagation();
        };

        vm.selectItem = function (item, $index, $event) {
            if (vm.allowSelect !== false && vm.onSelect) {
                vm.onSelect({ item: item, $index: $index, $event: $event });
                $event.stopPropagation();
            }
        };

        vm.selectAll = function ($event) {
            if (vm.onSelectAll) {
                vm.onSelectAll({ $event: $event });
            }
        };

        vm.isSelectedAll = function () {
            if (vm.onSelectedAll && vm.items && vm.items.length > 0) {
                return vm.onSelectedAll();
            }
        };

        vm.isSortDirection = function (col, direction) {
            if (vm.onSortingDirection) {
                return vm.onSortingDirection({ col: col, direction: direction });
            }
        };

        vm.sort = function (field, allow, isSystem) {
            if (vm.onSort) {
                vm.onSort({ field: field, allow: allow, isSystem: isSystem });
            }
        };

        vm.getIcon = function (entry) {
            return iconHelper.convertFromLegacyIcon(entry.icon);
        };

        vm.isArrayFilter = function (o) {        
            return Array.isArray(o); 
        }
    }

    angular
        .module('umbraco.directives')
        .component('umbTableRelations', {
            templateUrl: '/App_Plugins/punkThumbnailListView/umb-table-relations.html',
            controller: TableRelations,
            controllerAs: 'vm',
            bindings: {
                items: '<',
                itemProperties: '<',
                allowSelect: '<',
                allowSelectAll: '<',
                onSelect: '&',
                onClick: '&',
                onSelectAll: '&',
                onSelectedAll: '&',
                onSortingDirection: '&',
                onSort: '&'
            }
        });
})();
