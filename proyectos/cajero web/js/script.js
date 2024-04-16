
//REGISTRARME----------------
function registrarUsuario() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Obtener el registro de usuarios del localStorage
    var registros = JSON.parse(localStorage.getItem('registrado')) || { uRegistrado: [] };

    // Verificar si el nombre de usuario ya está registrado
    if (registros.uRegistrado.some(registro => registro.username === username)) {
        alert('¡El nombre de usuario ya está registrado!');
    } else {
        // Agregar el nuevo usuario al registro
        var nuevoUsuario = {
            username: username,
            email: email,
            password: password,
            saldo: 200000,
            movimientos: []
        };

        registros.uRegistrado.push(nuevoUsuario);

        // Actualizar el registro en el localStorage
        localStorage.setItem('registrado', JSON.stringify(registros));

        alert('¡Registro exitoso!');
    }
}

//INGRESAR---------------------
function ingresar() {
    var emailLogin = document.getElementById('emailRegistrado').value;
    var passwordLogin = document.getElementById('claveRegistrada').value;

    var registros = JSON.parse(localStorage.getItem('registrado')) || { uRegistrado: [] };

    // Verificar si el correo y la contraseña coinciden con algún usuario registrado
    var usuarioEncontrado = registros.uRegistrado.find(function (usuario) {
        return usuario.email === emailLogin && usuario.password === passwordLogin;
    });

    if (usuarioEncontrado) {
        document.getElementById('app').style.display ='block';
        document.getElementById('box_log').style.display       ='none';
        document.getElementById('bienvenida').innerHTML ="<b> " + " Hola ," + " </b>" + usuarioEncontrado.username;
        document.getElementById('saldoDisponible').innerHTML="<b>"+"$ "+usuarioEncontrado.saldo+"</b>"+" cop";
        
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}


//ENVIAR DINERO-------------------------
function enviarDinero() {
    var monto = parseFloat(document.getElementById('cantidadEnvio').value);
    var destinatario = document.getElementById('ctaDestino').value;

    var registros = JSON.parse(localStorage.getItem('registrado')) || { uRegistrado: [] };

    var usuarioActual = registros.uRegistrado.find(function (usuario) {
        return usuario.email === document.getElementById('emailRegistrado').value;
    });

    
    if (monto <= usuarioActual.saldo) {
        // Validar si el destinatario está registrado en el localStorage
        var destinatarioEncontrado = registros.uRegistrado.find(function (usuario) {
            return usuario.username === destinatario;
        });

        if (destinatarioEncontrado) {
            // Realizar la transferencia y actualizar saldos
            usuarioActual.saldo -= monto;
            destinatarioEncontrado.saldo += monto;

            usuarioActual.movimientos.push({ tipo: 'transferencia', monto: -monto, destinatario: destinatarioEncontrado.username });
            destinatarioEncontrado.movimientos.push({ tipo: 'transferencia', monto: monto, remitente: usuarioActual.username });

            localStorage.setItem('registrado', JSON.stringify(registros));

            // Actualizar los nuevos saldos
            document.getElementById('saldoDisponible').innerHTML = "<b>" + "$ " + usuarioActual.saldo + "</b>" + " cop";

            alert('Transferencia exitosa');
            
            
        } else {
            alert('El destinatario no está registrado.');
        }
    } else {
        alert('Saldo insuficiente.');
    }
}


// INGRESAR DINERO-------------------
function ingresarDinero() {
    var montoIngreso = parseFloat(document.getElementById('montoIngreso').value);

    var registros = JSON.parse(localStorage.getItem('registrado')) || { uRegistrado: [] };
    var usuarioActual = registros.uRegistrado.find(function (usuario) {
        return usuario.email === document.getElementById('emailRegistrado').value;
    });

    // Validar que el monto de ingreso sea un número positivo
    if (!isNaN(montoIngreso) && montoIngreso > 0) {
        usuarioActual.saldo += montoIngreso;

        usuarioActual.movimientos.push({ tipo: 'ingreso', monto: montoIngreso });

        localStorage.setItem('registrado', JSON.stringify(registros));

        document.getElementById('saldoDisponible').innerHTML = "<b>" + "$ " + usuarioActual.saldo + "</b>" + " cop";
        alert('Ingreso exitoso.');
    } else {
        alert('Por favor, ingrese un monto válido y positivo.');
    }
}



// RETIRAR---------------------
function retirar() {
    var montoRetiro = parseFloat(document.getElementById('montoRetiro').value);

    var registros = JSON.parse(localStorage.getItem('registrado')) || { uRegistrado: [] };
    var usuarioActual = registros.uRegistrado.find(function (usuario) {
        return usuario.email === document.getElementById('emailRegistrado').value;
    });

    if (montoRetiro <= usuarioActual.saldo) {
        usuarioActual.saldo -= montoRetiro;

        usuarioActual.movimientos.push({ tipo: 'retiro', monto: -montoRetiro });

        localStorage.setItem('registrado', JSON.stringify(registros));

        document.getElementById('saldoDisponible').innerHTML = "<b>" + "$ " + usuarioActual.saldo + "</b>" + " cop";
        alert('Retiro exitoso');
    } else {
        alert('El monto de retiro supera el saldo disponible.');
    }
}

//MOVIMIENTOS----------------
function movimientos() {
    document.getElementById('movimientos').style.display ='block';
    document.getElementById('mtoCerrar').style.display ='flex'

    var registros = JSON.parse(localStorage.getItem('registrado')) || { uRegistrado: [] };
    var usuarioActual = registros.uRegistrado.find(function (usuario) {
        return usuario.email === document.getElementById('emailRegistrado').value;
    });

    var divMovimientos = document.getElementById('movimientos');

    divMovimientos.innerHTML = '';

    if (usuarioActual.movimientos.length > 0) {
        // Crear una lista para mostrar los movimientos
        var listaMovimientos = document.createElement('ul');

        // Iterar sobre los movimientos y agregarlos a la lista
        usuarioActual.movimientos.forEach(function (movimiento) {
            var itemMovimiento = document.createElement('li');
            var tipoMovimiento = movimiento.tipo === 'ingreso' ? 'Ingreso' : (movimiento.tipo === 'retiro' ? 'Retiro' : 'Transferencia');

            if (movimiento.tipo === 'transferencia') {
                itemMovimiento.textContent = tipoMovimiento + ' : $' + movimiento.monto + ' a ' + movimiento.destinatario;

            } else {
                itemMovimiento.textContent = tipoMovimiento + ' : $' + movimiento.monto;
            }

            listaMovimientos.appendChild(itemMovimiento);
        });

        // Agregar la lista al div
        divMovimientos.appendChild(listaMovimientos);
    } else {
        divMovimientos.textContent = 'No hay movimientos registrados.';
    }

    
}

//CERRAR MOVIMIENTOS---------------------
function cerrarmto(){
    document.getElementById('movimientos').style.display ='none';
    document.getElementById('mtoCerrar').style.display ='none';
}
