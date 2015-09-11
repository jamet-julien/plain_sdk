(function ( global, _sUrlPopup){

    var apiAuth = (function construct(){

        var _oOption = {}, oPopup = null, _fCallback = null;

        /**
         * [_receiveMessage description]
         * @param  {[type]} oPostMessage [description]
         * @return {[type]}              [description]
         */
        function _receiveMessage( oPostMessage){

            if( _fCallback){
                 _fCallback.apply(null, [ JSON.parse( oPostMessage.data)]);
            }

            if( oPopup){
                oPopup.close();
            }
        }

        /**
         * [_pushPopin description]
         * @param  {[type]} oForm [description]
         * @return {[type]}       [description]
         */
        function _launchPopin( oForm){
            var iWidth, iHeight, iTop, iLeft;

            iHeight = 450;
            iWidth  = 290;

            iTop  = ( screen.height - iHeight) / 2;
            iLeft = ( screen.width - iWidth) / 2;

            oPopup = window.open( '', 'Popup_Window','scrollbars=yes,toolbar=no,resizable=yes,width=' + iWidth + ',height=' + iHeight + ',top=' + iTop + ',left=' + iLeft + ',menubar=no');

            setTimeout( function(){

                oPopup.postMessage( 'ready', '*');
                oPopup.focus();

            }, 1000);

            oForm.submit();
            oForm.parentNode.removeChild( oForm);
        }


         /**  [ Modif : 2015-02-27 09:28:44 ( julien Jamet ) ]
         * [submit description]
         * @param  {[type]} oData [description]
         * @return {[type]}       [description]
         */
        function _submit( oData){

            var sMethod = "POST";
            var sData   = JSON.stringify( oData);

            var oForm = document.createElement("form");
                oForm.setAttribute("method", sMethod);
                oForm.setAttribute("target", 'Popup_Window');
                oForm.setAttribute("action", _sUrlPopup);

            for(var sAttr in oData) {

                var sNewVal = ( typeof( oData[sAttr]) == 'object')? JSON.stringify( oData[sAttr]) : oData[sAttr];

                var oDomInput = document.createElement("input");
                    oDomInput.setAttribute("type", "hidden");
                    oDomInput.setAttribute("name", sAttr);
                    oDomInput.setAttribute("value", sNewVal);
                    oForm.appendChild( oDomInput);

            }

            document.body.appendChild( oForm);

            return oForm;
        }


        /**
         * [sayHello description]
         * @return {[type]} [description]
         */
        function authorize( oConnect, fCallback){

            _fCallback = fCallback;

            var oForm = _submit( oConnect);
            _launchPopin( oForm);

        }

        /**
         * [init !IMPORTANT car utilisé par Api parent]
         * @param  {[type]} oOption [description]
         * @return {[type]}         [description]
         */
        function init( oOption){

            _oOption = oOption;
            window.addEventListener('message', _receiveMessage);

        }

        return {
            init      : init,
            authorize : authorize
        };

    })();

    global.api.auth = apiAuth || {};

})(window, 'http://localhost:8888/web/javascript/02-plugin/plain-sdk/view/connect.php');