var subtotal = 0;

if (localStorage.getItem("localPeople") === null) {
    var peopleDicJ = {};
} else {
    var peopleDicJ = JSON.parse(localStorage.getItem('localPeople'));
    setList();
}



function setList(){

    for (var i = 0; i < Object.keys(peopleDicJ).length; i++) {
        p1 = Object.keys(peopleDicJ)[i];

        btn_name = "btn" + p1;
        list_name ="list" + p1;
        d1 = document.getElementById('lista');
        html_code = `
        <li id="${list_name}">
            <p id = "${p1}">
                <button style="font-size:24px" onclick = "eliminar(this)" id= ${btn_name}><i class="fa fa-trash"></i></button>
                ${p1}
            </p>
        </li>

        `
        d1.insertAdjacentHTML('beforeend', html_code);
    }

}




function addpeople(){                                                            // index
    p1 = document.getElementById('newguy').value;
    document.getElementById('newguy').value = "";
    btn_name = "btn" + p1;
    list_name ="list" + p1;
    d1 = document.getElementById('lista');
    html_code = `
    <li id="${list_name}">
        <p id = "${p1}">
            <button style="font-size:24px" onclick = "eliminar(this)" id= ${btn_name}><i class="fa fa-trash"></i></button>
            ${p1}
        </p>
    </li>

    `
    d1.insertAdjacentHTML('beforeend', html_code);
    updateLocalPeople();
}

function eliminar(elem){
    str = elem.id;
    list_id = "list" + str.substring(3, str.length);
    var parent = document.getElementById("lista");
    var child = document.getElementById(list_id);
    parent.removeChild(child);
    console.log('llego9')
    console.log(peopleDicJ)

    updateLocalPeople();

}



function funcfoto(){                                                              // index
    alert('agregar foto');
}

function gotoCheck(){
    updateLocalPeople();
    location.replace('check.html');
}



function updateLocalPeople(){
    lista = document.querySelector('#lista');
    elementos = lista.children;
    console.log(elementos)
    var i;
    var lista_personas = [];
    peopleDicJ = {}
    for (i = 0; i < elementos.length; i++) {
        elemento = elementos[i].id
        peopleDicJ[elemento.substring(4,elemento.length)] = null;
        console.log(peopleDicJ)
    }
    console.log(peopleDicJ)
    localStorage.setItem('localPeople', JSON.stringify(peopleDicJ));
}



$(document).ready(function() {
    $("#newguy").change(function() {
        addpeople();
    });
});
