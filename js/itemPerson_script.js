// VARIABLES
DirPer = localStorage.getItem('localDirPer');
DirP = JSON.parse(DirPer)

// FUNCIONES
listBoxPersonas();
UpdateTable();

function listBoxPersonas() {
    d1 = document.getElementById('id_personas');
    for (i = 0; i < Object.keys(DirP).length; i++) {
        nameItem = Object.keys(DirP)[i];
        html_code = `<option id="opciones" value="${nameItem}">${nameItem}</option>`;
        d1.insertAdjacentHTML('beforeend', html_code);
    }
}

function UpdateTable() {
    d1 = document.getElementById('tabla');
    var select = document.getElementById("id_personas");
    var Producto = select.options[select.selectedIndex].value;
    dicAux = DirP[Producto]["items"];
    itm = Object.keys(dicAux);
    html_code = '';
    for (var  i = 0;  i  < itm.length;  i++) {
        pric = Object.values(dicAux)[i].valor;
        perc = Object.values(dicAux)[i].porcentaje;
        html_code = html_code + `
    <tr>
      <th scope="row">${i+1}</th>
      <td>${itm[i]}</td>
      <td>${pric}</td>
      <td>${perc}</td>
    </tr>
    `;
    }
    d1.innerHTML = html_code;
    html_code = '';
}

function back(){
    location.replace("people2item.html")
}

// JQUERY
$("#id_personas").change(function() {
    var select = document.getElementById("id_personas");
    var Producto = select.options[select.selectedIndex].value;
    UpdateTable();
});
