plain SDK
=============

Mise place d'un SDK viérge afin de construire en fonction des projets un ensemble de librairie.

## Features

- fonctionnel et souplesse
    - rendre modifiable l'url "pattern" pour le chargment des librairie
    - validation jsHint
    - prevoir les cas pas default si pas de deuxiéme paramétre
    - recherche de "extend" possible pour les module chargé avec fonction "init" déjà intégrée

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
    api.load('sample',  handleLoadSample);
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


