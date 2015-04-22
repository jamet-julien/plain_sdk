<?php

$aPost = array(
	'client' => 'vide',
	'key'     => 'vide',
);

if( isset( $_POST) && !empty( $_POST)){
	$aPost = array_merge( $aPost, $_POST);
}

extract( $aPost);

?>

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<style>

			.connect {
			  background: #d6d6d6;
			  background-image: -webkit-linear-gradient(top, #d6d6d6, #a6a6a6);
			  background-image: -moz-linear-gradient(top, #d6d6d6, #a6a6a6);
			  background-image: -ms-linear-gradient(top, #d6d6d6, #a6a6a6);
			  background-image: -o-linear-gradient(top, #d6d6d6, #a6a6a6);
			  background-image: linear-gradient(to bottom, #d6d6d6, #a6a6a6);
			  -webkit-border-radius: 4;
			  -moz-border-radius: 4;
			  border-radius: 4px;
			  font-family: Arial;
			  color: #ffffff;
			  font-size: 13px;
			  padding: 10px 20px 10px 20px;
			  text-decoration: none;
			  width:48px;
			  cursor: pointer;
			  display:inline-block;
			}

			.connect:hover {
			  background: #3cb0fd;
			  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
			  text-decoration: none;

			}

		</style>
	</head>
	<body class="theme-1">

		<div>
			user_id : <?= $client;?><br/>
			key     : <?= $key;?><br/>
		</div>
		<br/>
		<br/>
		<div class="connect" id="btn_ok">ok</div>
		<div class="connect" id="btn_canceled">canceled</div>


	<script>

		var oEventParent = null

		window.addEventListener('message', function( oEvent){
			oEventParent = oEvent;
		});


		/**
		 * [description]
		 * @return {[type]} [description]
		 */

		document.getElementById('btn_ok').addEventListener( 'click', function(){

			oEventParent.source.postMessage( "OK", oEventParent.origin);
		});

		document.getElementById('btn_canceled').addEventListener( 'click', function(){

			oEventParent.source.postMessage( "CANCELED", oEventParent.origin);
		});

	</script>

	</body>
</html>