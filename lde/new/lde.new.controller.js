/**
 * Created by kolesnikov-a on 28/10/2016.
 */
myApp.controller('newLdeCtrl', ['$scope', 'Lde', 'dialogsService', 'ldeFactory', 'validatorService', 'containersService',
	function($scope, Lde, dialogsService, ldeFactory, validatorService, containersService){

		$scope.newContainer = new Lde();
		$scope.statesContainers = containersService.statusContainersAsArray();
		$scope.terminals = containersService.terminalsArray;
		$scope.returnPlaces = [];

		$scope.validCuit = false;

		ldeFactory.getReturnPlaces((data) => {
			$scope.returnPlaces = data.data
		});

		$scope.validateCuit = function(){
			$scope.validCuit = validatorService.validateCuit($scope.newContainer.CUIT);
		};

		$scope.saveLde = function(){
			$scope.newContainer.save().then((data) => {
				console.log(data);
				dialogsService.notify('Nuevo LDE', `Los datos se han guardado correctamente.\n${data.message || ''}`);
				$scope.$emit('updateData');
				$scope.newContainer = new Lde();
			}).catch((error) => {
				console.log(error);
				dialogsService.error('Error', error.message);
			});
		};

		$scope.datePopUp = {
			opened: false,
			format: 'dd/MM/yyyy',
			options: {
				formatYear: 'yyyy',
				startingDay: 1
			}
		};

		$scope.openDate = function(){
			$scope.datePopUp.opened = true;
		};

		$scope.eraseField = function(field){
			$scope.newContainer[field] = '';
		};

		$scope.formatStatus = function(model){
			for (let state of $scope.statesContainers) {
				if (model === state.id) return state.formatted
			}
		};

		$scope.formatPlace = function(model){
			for (let place of $scope.returnPlaces) {
				if (model === place._id) return place.NOMBRE
			}
		};


	}]);