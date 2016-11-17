angular
    .module('eArkPlatform.ipview')
    .service('ipFileTreeService', ipFileTreeService);

function ipFileTreeService($http, ipViewService) {

    var ftSvc = this;
    var tree = {};
    
    ftSvc.getTree = getTree;
    
    
    function buildTree(path){
        var action = ipViewService.serializeObj({ action: 'gettree', path: path });
        return $http({
            method: 'POST',
            url: '/ip_viewer?',
            data: action,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(
            function (response) {
                return response;
            },
            function (err) {
                console.log('no gettree response ' + err);    
            }
        );
    }
    
    
    function getTree(path){
        return buildTree(path).then(
            function (response) {
                return response;
            },
            function (err) {
                console.log('Error getting tree data: ' + err);
            }
        );
    }
    
    
    return ftSvc;
}
