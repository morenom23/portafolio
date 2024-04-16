function calcular(){

    let option = parseInt(document.getElementById('opcion').value);
    let canIngresada = document.getElementById('cantIngresada').value;
    let extra =parseInt( document.getElementById('ingrediente').value);
    let queso = 14000;
    let jamonQueso = 16000;
    let especial = 20000;
    let extraMaiz = 2000;
    let extraQueso = 10000;

    switch (option){
            
        case 1:
            pizza = queso * canIngresada;
            document.getElementById('pizaSeleccionada').innerHTML = "Pizza seleccionada : Queso";
            
            if (extra == 1){
                pizza = pizza + extraMaiz;
                document.getElementById('costo').innerHTML = "Costo = $"+queso;
                document.getElementById('cantidad').innerHTML = "Cantidad = "+canIngresada;
                document.getElementById('extra').innerHTML = "Extra Maiz = $ "+extraMaiz;
                document.getElementById('totalPago').innerHTML = "Total a pagar = $"+pizza;
                document.getElementById('gracias').innerHTML = "-------";
            }else if(extra == 2){
                pizza = pizza + extraQueso;
                document.getElementById('costo').innerHTML = "Costo = $"+queso;
                document.getElementById('cantidad').innerHTML = "Cantidad = "+canIngresada;
                document.getElementById('extra').innerHTML = "Extra Queso = $"+extraQueso;
                document.getElementById('totalPago').innerHTML = "Total a pagar = $"+pizza;
                document.getElementById('gracias').innerHTML = "-------";
            }
            
            break;

        case 2:
            pizza = jamonQueso * canIngresada;
            document.getElementById('pizaSeleccionada').innerHTML = "Pizza seleccionada : Jamon y Queso";

            if (extra == 1){
                pizza = pizza + extraMaiz;
                document.getElementById('costo').innerHTML = "Costo = $"+jamonQueso;
                document.getElementById('cantidad').innerHTML = "Cantidad = "+canIngresada;
                document.getElementById('extra').innerHTML = "Extra Maiz = $ "+extraMaiz;
                document.getElementById('totalPago').innerHTML = "Total a pagar = $"+pizza;
                document.getElementById('gracias').innerHTML = "-------";
            }else if(extra == 2){
                pizza = pizza + extraQueso;
                document.getElementById('costo').innerHTML = "Costo = $"+jamonQueso;
                document.getElementById('cantidad').innerHTML = "Cantidad = "+canIngresada;
                document.getElementById('extra').innerHTML = "Extra Queso $ "+extraQueso;
                document.getElementById('totalPago').innerHTML = "Total a pagar = $"+pizza;
                document.getElementById('gracias').innerHTML = "-------";
            }
            break;
        case 3:
            document.getElementById('pizaSeleccionada').innerHTML = "Pizza seleccionada : Especial";
            pizza = especial * canIngresada;

            if (extra == 1){
                pizza = pizza + extraMaiz;
                document.getElementById('costo').innerHTML = "Costo = $"+especial;
                document.getElementById('cantidad').innerHTML = "Cantidad = "+canIngresada;
                document.getElementById('extra').innerHTML = "Extra Maiz = $ "+extraMaiz;
                document.getElementById('totalPago').innerHTML = "Total a pagar = $"+pizza;
                document.getElementById('gracias').innerHTML = "-------";
            }else if(extra == 2){
                pizza = pizza + extraQueso;
                document.getElementById('costo').innerHTML = "Costo = $ "+especial;
                document.getElementById('cantidad').innerHTML = "Cantidad = "+canIngresada;
                document.getElementById('extra').innerHTML = "Extra Queso = $ "+extraQueso;
                document.getElementById('totalPago').innerHTML = "Total a pagar = $"+pizza;
                document.getElementById('gracias').innerHTML = "-------";
            }
            break;

    }


}