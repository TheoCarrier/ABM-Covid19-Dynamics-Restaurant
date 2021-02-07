window.addEventListener('keydown', function (e) {
  var key = e.keyCode;
  if (key === 65) //r key
  {
	var NbParticules = document.getElementById('NbParticules').value;
	var NbMask = document.getElementById('NbMask').value;
	var NbPerTable = document.getElementById('NbPerTable').value;
	// var r0 = document.getElementById('r0').value; //Not use
	var lethal = document.getElementById('lethal').value; //Not use
	// var Desinfection = document.getElementById('Desinfection').value;

	var InfectiousRate = document.getElementById('infectiousRate').value;
	var Virulence =  document.getElementById('virulence').value;
	var guerison = document.getElementById('guerison').value;


	var vaccinated = document.getElementById('Vaccinated').value;

	var newCovidEntry = document.getElementById('newCovidEntry').value;

	// if(document.getElementById('tableDesin').checked){
	// 	localStorage.setItem('tableDesin', true);
	// }
	// else{
	// 	localStorage.setItem('tableDesin', false);
	// }

	if(document.getElementById('MaskWaiter').checked){
		localStorage.setItem('MaskWaiter', true);
	}
	else{
		localStorage.setItem('MaskWaiter', false);
	}

	if(document.getElementById('expert').checked){
		localStorage.setItem('expert', true);
	}
	else{
		localStorage.setItem('expert', false);
	}


	localStorage.setItem('NbParticules', NbParticules);
	localStorage.setItem('NbMask', NbMask);
	localStorage.setItem('NbPerTable', NbPerTable);
	// localStorage.setItem('r0', r0);
	localStorage.setItem('lethal', lethal);
	localStorage.setItem('callReload', true);
	// localStorage.setItem('Desinfection', Desinfection);

	localStorage.setItem('infectiousRate', InfectiousRate);
	localStorage.setItem('virulence', Virulence);
	localStorage.setItem('guerison', guerison);
	localStorage.setItem('vaccinated', vaccinated);

	localStorage.setItem('newCovidEntry', newCovidEntry);


	window.location.reload();

  }
});

