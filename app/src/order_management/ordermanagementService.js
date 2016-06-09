angular
    .module('eArkPlatform.ordermanagement')
    .factory('ordermanagementService', ordermanagementService);

function ordermanagementService($http, $filter) {
    var service = {
        getOrders: getOrders,
        getOrder: getOrder,
        getArchivists: getArchivists,
        updateOrder: updateOrder
    };

    return service;

    function getOrders() {
        return $http.get('http://eark.magenta.dk:5000/getOrders').then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };
    
    function getOrder(orderId) {
        return $http.get('http://eark.magenta.dk:5000/getOrderData?orderId=' + orderId).then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };
    
    function updateOrder(queryObj) {
        $filter('json')(queryObj);
        return $http.put('http://eark.magenta.dk:5000/updateOrder', queryObj).then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };
    
    function getArchivists() {
        return $http.get('http://eark.magenta.dk:5000/getArchivists').then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };

}