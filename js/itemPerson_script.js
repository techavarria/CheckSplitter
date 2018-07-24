DirPer = localStorage.getItem('localDirPer');


DirP = JSON.parse(DirPer)



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

  // d1.parentNode.removeChild(d1);

  var select = document.getElementById("id_personas");
  var Producto= select.options[select.selectedIndex].value;

  dicAux = DirP[Producto]["items"];
  itm = Object.keys(dicAux);
  pric = Object.values(dicAux);
  html_code = '';
  for (var  i = 0;  i  < itm.length;  i++) {

    html_code = html_code + `
    <tr>
      <th scope="row">${i+1}</th>
      <td>${itm[i]}</td>
      <td>${pric[i]}</td>
      <td>@mdo</td>
    </tr>
    `;
    // d1.insertAdjacentHTML('beforeend', html_code);
  }
  d1.innerHTML = html_code;
  html_code = '';
}



$("#id_personas").change(function() {

  var select = document.getElementById("id_personas");
  var Producto= select.options[select.selectedIndex].value;
  UpdateTable();


});







//
