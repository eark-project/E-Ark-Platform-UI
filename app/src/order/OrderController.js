angular.module('angularStubApp.order').controller('OrderController', OrderController);

/**
 * Main controller for the order module
 * @param searchService
 * @param fileUtilsService
 * @param basketService
 * @constructor
 */
function OrderController(searchService, fileUtilsService, basketService) {
    var ordCtrl = this;
    ordCtrl.searchTerm = '';
    ordCtrl.searchContext = 'content';
    ordCtrl.searchResults = {};
    ordCtrl.basket = [];
    ordCtrl.layout = 'list';

    ordCtrl.executeSearch = executeSearch;
    ordCtrl.addToBasket = basketCheck;

    function executeSearch(){
        var queryObj = {
            q: ordCtrl.searchContext + ':' + ordCtrl.searchTerm,
            rows: 25,
            start: 0,
            wt: "json"
        };
        var encTerm = searchService.objectToQueryString(queryObj);

        searchService.aipSearch(encTerm).then(function(response){
            //debugger;
            if (response.numFound > 0) {
                ordCtrl.searchResults = {
                    documents: response.docs, //An array of objects
                    numberFound: response.numFound
                };

                //Let's clean up some of the properties. Temporary solution
                ordCtrl.searchResults.documents.forEach(function (item) {
                    item.title = item.path.substring(item.path.lastIndexOf('/') + 1, item.path.lastIndexOf('.'));
                    item.packageId = item.package.substring(item.package.indexOf('_') + 1);
                    item.thumbnail = fileUtilsService.getFileIconByMimetype(item.contentType, 24)
                    item.displaySize = formatBytes(item.size);
                });
            }
        });
    }

    function basketCheck(item){
        debugger;
        if(item.baskOp == 'add')
            basketService.addToBasket(item, ordCtrl.basket);
        if(item.baskOp == 'delete')
            basketService.removeFromBasket(item, ordCtrl.basket).then(function(result){
                console.log('Removal status: '+ result);
            });
    }

    function formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}