<?php
header('content-type: application/javascript');

$sRoot = dirname(__FILE__).'/lib/';

$sLib = ( isset($_GET['lib']) && $_GET['lib'] != '')? $_GET['lib']: 'default';

switch( $sLib){
    case 'auth':
        include( $sRoot.'auth.js');
        break;
    default:
        break;
}
?>