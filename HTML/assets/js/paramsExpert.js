var checkbox = document.getElementById('expert');
var paramsExpert = document.getElementById('paramsExpert');

if(localStorage.getItem('expert') === 'false'){
	console.log("hey ho");
	var checkingbool = false;
}
if(localStorage.getItem('expert') === 'true'){
	console.log("iashdr");
	var checkingbool = true;
}

if(checkingbool){
	try{
		checkbox.setAttribute("checked", "checked");
	}
	catch{}
}
else{
	try{
		checkbox.removeAttribute("checked");
	}
	catch{}
}

if(checkingbool){
	paramsExpert.style['display'] = 'inline-flex';
	checkbox.checked = true;
	checkbox.value = "on";
}
else{
	checkbox.checked = false;
	paramsExpert.style['display'] = 'none';
	checkbox.value = "off";
}






checkbox.onclick = function() {
   if(this.checked) {
     paramsExpert.style['display'] = 'inline-flex';
   } 
   else {
     paramsExpert.style['display'] = 'none';
   }
};