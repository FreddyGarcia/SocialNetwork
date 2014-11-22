$(document).on('ready', main);

function main() {
	$("form").submit(function (e) {
		validar_password(e)
	});
}

function validar_password(e) {
  var campos_password 		= $("form .form-group input.form-control[type=password]");
  var campo_password  		= $(campos_password[0]);  
  var campo_confirmacion	= $(campos_password[1]);  

  if (campos_password.val() !== campo_confirmacion.val()) {
  	$(campo_password).parent().addClass("has-error");
  	$(campo_confirmacion).parent().addClass("has-error");
  	e.preventDefault();
  } else {
  	$(campo_password).parent().removeClass("has-error");
  	$(campo_confirmacion).parent().removeClass("has-error");
  }
}


