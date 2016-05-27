
    angular
        .module('angularStubApp')
        .filter('nodeRefUri', nodeRefUriFilterFactory);
    
    function nodeRefUriFilterFactory(alfrescoNodeUtils){
        function nodeRefUriFilter(nodeRef) {
            return alfrescoNodeUtils.processNodeRef(nodeRef).uri;
        }
        return nodeRefUriFilter;
    }
    