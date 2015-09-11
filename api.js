(function( global){

    var api = (function construct(){

        var _oScript     = null, _oLib = {}, _oOption = {};
        var _sRootUrl    = location.protocol+'//'+document.domain+'/';
        var _sUrlPattern = _sRootUrl + '[:LIB:]/[:LIB:].js';

        /**
         * [_computeOption description]
         * @param  {[type]} oOption [description]
         * @return {[type]}         [description]
         */
        function _computeOption( oOption){
            var oOptionOut = {};

            if( typeof( oOption) == 'function'){
                oOptionOut          = {} ;
                oOptionOut.callback = oOption;
            }

            for( var sKey in oOption){
                if( !oOptionOut[sKey]) oOptionOut[sKey] = oOption[sKey];
            }

            return oOptionOut;

        }

        /**
         * [_launchEvent description]
         * @return {[type]} [description]
         */
        function _launchEvent( sLib){


            var oAPI = global.api;

            if( oAPI[sLib] && 'function' == typeof( oAPI[sLib].init)){
                oAPI[sLib].init( _oLib[sLib].option);
            }

            if( _oLib[sLib].option && _oLib[sLib].option.callback){
                _oLib[sLib].option.callback.apply( null);
            }
        }

        /**
         * [_computeUrl description]
         * @param  {[type]} sLib [description]
         * @return {[type]}      [description]
         */
        function _computeUrl( sLib){

            var sSeparator = '?';

            sUrl = _sUrlPattern.split( '[:LIB:]').join(  sLib);
            if( sUrl.indexOf("?")>=0) sSeparator = '&';

            return sUrl+sSeparator+(new Date()*1);
        }

        /**
         * [_pushScript description]
         * @param  {[type]} sUrlScript [description]
         * @return {[type]}            [description]
         */
        function _computeScript( sUrlScript) {
            var sTag      = "script",
                oScript   = document.createElement( sTag);
            oScript.src   =  sUrlScript;
            oScript.async = "true";
            return oScript;
        }

        /**
         * [_appendScript description]
         * @param  {[type]} oLib [description]
         * @return {[type]}      [description]
         */
        function _appendScript( oLib){
            if( oLib.dom){

                var oDomParent;

                oLib.dom.addEventListener( 'load', function(){
                    _launchEvent.apply( null, [oLib.name]);
                });

                if(oDomParent = document.getElementsByTagName("script")[0]){
                    oDomParent.parentNode.insertBefore( oLib.dom, oDomParent) ;
                }else{
                    oDomParent = ( document.head || document.body || document.documentElement);
                    oDomParent.appendChild( oLib.dom);
                }
            }
        }

        /**
         * [_preconnectTo description]
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        function _preconnectTo( sUrl) {
            var oLink  = document.createElement("link");

            oLink.rel  = "preconnect";
            oLink.href = sUrl;

            document.head.appendChild( oLink);
        }

        /**
         * [load description]
         * @param  {[type]} sLib    [description]
         * @param  {[type]} oOption [description]
         * @return {[type]}         [description]
         */
        function load( sLib, oOptionIn){

            if( !_oLib[sLib]){

                var oLib       = {};
                oLib.name      = sLib;
                var sUrlScript = _computeUrl( sLib);
                oLib.dom       = _computeScript( sUrlScript);
                oLib.option    = _computeOption( oOptionIn);

                _oLib[sLib]    = oLib;

                _appendScript( oLib);
            }else{
                _launchEvent( sLib);
            }
        }

        /**
         * [loadUrl description]
         * @param  {[type]} sUrl [description]
         * @return {[type]}      [description]
         */
        function loadUrl( sUrl, oOptionIn){

            if( !_oLib[sUrl]){

                var oLib       = {};
                oLib.name      = sUrl;
                var sUrlScript = sUrl;
                oLib.dom       = _computeScript( sUrlScript);
                oLib.option    = _computeOption( oOptionIn);

                _oLib[sUrl]    = oLib;

                _appendScript( oLib);
            }

        }

        /**
         * [setLibPattern description]
         * @param {[type]} sUrl [description]
         */
        function setLibPattern( sUrl){

            var sDomain  = sUrl.substring(0, sUrl.indexOf('/', 8));

            if( sDomain+'/' != _sRootUrl){
                // on fait une preconnection pour la suite des url demandées
                _preconnectTo( sDomain);
            }

            _sUrlPattern = sUrl;

            return oPublic;
        }

        /**
         * [computeLibPattern description]
         * @param {[type]} sUrl [description]
         */
        function computeLibPattern( sUrl){
            _sUrlPattern = _sRootUrl + sUrl;
            return oPublic;
        }

        /************************
        * PUBLIC OUT
        *************************/
        oPublic = {
            load              : load,
            setLibPattern     : setLibPattern,
            computeLibPattern : computeLibPattern,
            loadUrl           : loadUrl
        };

        return oPublic;

    })();

    global.api = api || {};

})(window);