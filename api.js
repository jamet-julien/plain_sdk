(function (global, _sUrlPattern){

    var api = (function construct(){

        var _oScript = null, _oLib = {}, _oOption = {};

        /**
         * [_computeOption description]
         * @param  {[type]} oOption [description]
         * @return {[type]}         [description]
         */
        function _computeOption( oOption){
            var oOptionOut = {};
            typeof oOption == 'function' && ( oOptionOut = {} , oOptionOut.callback = oOption);
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


            var oLibParent = global.api;

            if( oLibParent[sLib]){
                oLibParent[sLib].init( _oLib[sLib].option);
            }

            if( _oLib[sLib].option.callback){
                _oLib[sLib].option.callback.apply( null);
            }
        }

        /**
         * [_computeUrl description]
         * @param  {[type]} sLib [description]
         * @return {[type]}      [description]
         */
        function _computeUrl( sLib){

            sUrl = _sUrlPattern.replace( '[:LIB:]', sLib);


            var sSeparator = '?';

            if( sUrl.indexOf("?")>=0){
                sSeparator = '&';
            }


            return sUrl+sSeparator+(new Date()*1);
        }

        /**
         * [_pushScript description]
         * @param  {[type]} sUrlScript [description]
         * @return {[type]}            [description]
         */
        function _computeScript( sUrlScript) {
            var sTag  = "script";
            oScript   = document.createElement(sTag);
            oScript.setAttribute("src", sUrlScript);
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
                (oDomParent = document.getElementsByTagName("script")[0])? oDomParent.parentNode.insertBefore( oLib.dom, oDomParent) : (document.head || document.body || document.documentElement).appendChild( oLib.dom);
            }
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

        return {
            load : load
        };

    })();

    global.api = api || {};

})(window, 'http://localhost:8888/api_sdk/js/api.php?lib=[:LIB:]');