plain SDK
=============

Mise place d'un SDK viérge afin de construire en fonction des projets un ensemble de librairie.

## Features

- fonctionnel et souplesse
    - validation jsHint
    - recherche de "extend" possible pour les modules chargés avec fonction "init" déjà intégrée

## Fonctionnement

### exemple simple
```javascript
    /**
     * [handleLoadSample description]
     * @return {[type]} [description]
     */
    function handleLoadSample(){
        // la librairie "sample" est stocké dans le module "api" et peut être utilisé.
        // ici nous utilisons la fonction "makeAction" de "sample"
        api.sample.makeAction({
            'client' : 'application_test',
            'key'    : 'key_de_application_test'
        });
    }

    // chargement de la librairie "sample" et lors du chargement lancement de la fonction "handleLoadSample"
    // ICI par défault charge le script "http://localhost:8888/api_sdk/js/api.php?lib=sample"
    api.load('sample',  handleLoadSample);

    // pour modifier le pattern de la librairie
    // ICI le script "http://www.domain.com/sample.class.js" sera chargé
    api.setLibPattern('http://www.domain.com/[:LIB:].class.js')
       .load('sample',  handleLoadSample);
```


### exemple un poil plus complexe
```javascript
    /**
     * [handleLoadSample description]
     * @return {[type]} [description]
     */
    function handleLoadSample(){
        // la librairie "sample" est stocké dans le module "api" et peut être utilisé.
        // ici nous utilisons la fonction "makeAction" de "sample"
        api.sample.makeAction({
            'client' : 'application_test',
            'key'    : 'key_de_application_test'
        });
    }

    // chargement de la librairie "sample" et lors du chargement lancement de la fonction "handleLoadSample"
    // lors de l'initialisation la librairie le JSON est envoyé a la librairie chargé
    // equivalent de : sample.init( { 'callback': handleLoadSample, 'param_1':'hello', 'param_2':'word'});
    api.load('sample',  { 'callback': handleLoadSample, 'param_1':'hello', 'param_2':'word'});
```


