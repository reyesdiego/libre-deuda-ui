/**
 * Created by kolesnikov-a on 15/12/2016.
 */

myApp.controller('preGateCtrl', ['$scope', 'preGateFactory', 'dialogsService', function($scope, preGateFactory, dialogsService){

	$scope.search = '';

	$scope.containerPreGate = null;
	$scope.searchContainer = '';

	$scope.panelPreGate = {
		type: 'panel-info',
		message: `Aguarde mientras se cargan los datos.`
	};

	$scope.preGates = [];

	$scope.searchPreGate = function(){
		$scope.containerPreGate = null;
		preGateFactory.getPreGate($scope.searchContainer).then(data => {
			$scope.containerPreGate = data;
		}).catch(error => {
			dialogsService.error('Pre-Gates', error.message);
		})
	};

	$scope.getPreGatesData = function(){
		preGateFactory.getPreGates().then(data => {
			if (data.length > 0){
				$scope.preGates = data;
			} else {
				$scope.panelPreGate = {
					type: 'panel-info',
					message: 'No se encontraron datos.'
				}
			}
		}).catch(error => {
			let message = `Se ha producido un error al cargar los datos de pre-gates. ${error.message}`;
			dialogsService.error('Pre-Gates', message);
			$scope.panelPreGate = {
				type: 'panel-danger',
				message: message
			};
		});
	};

	$scope.update = function(event, operation, pregate){
		event.stopPropagation();
		let promise = null;
		switch (operation){
			case 'disable':
				promise = pregate.disable();
				break;
			case 'deliver':
				promise = pregate.deliver();
				break;
		}
		promise.then(data => {
			console.log(data);
		}).catch(error => {
			console.log(error);
		});
	};

	$scope.getPreGatesData();

	$scope.$on('updateData', $scope.getPreGatesData);

}]);