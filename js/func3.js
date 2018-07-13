var subtotal = 0;
var localItems = localStorage.getItem('localItems');
var localPeople = localStorage.getItem('localPeople');

localItems = JSON.parse(localItems)
localPeople = JSON.parse(localPeople)
// console.log('localItems: ', localItems);
// console.log('localPeople: ', localPeople);




var ItemDiccJ = {};

for (i = 0; i < Object.keys(localItems).length; i++) {
  if (localItems[Object.keys(localItems)[i]][0] > 1) {
    for (j = 1; j < localItems[Object.keys(localItems)[i]][0] + 1; j++) {
      nameItem = Object.keys(localItems)[i];
      ItemDiccJ[nameItem.concat(j)] = localItems[Object.keys(localItems)[i]][1]/localItems[Object.keys(localItems)[i]][0];
    }
  } else {
    ItemDiccJ[Object.keys(localItems)[i]] = localItems[Object.keys(localItems)[i]][1];
  }
}


for (i = 0; i < Object.keys(ItemDiccJ).length; i++) {
  pricevec = (ItemDiccJ[Object.keys(ItemDiccJ)[i]]);
  ItemDiccJ[Object.keys(ItemDiccJ)[i]] = {"valor":pricevec, "people": {}};
}





CheckPeople();
CheckItems();

function CheckPeople() {
  d1 = document.getElementById('people');
  for (i = 0; i < Object.keys(localPeople).length; i++) {
    namePeople = Object.keys(localPeople)[i];
    html_code = `
    <input type="checkbox" id="idCheck_${i}" onchange="peopleChecked(this)" name="${namePeople}"> ${namePeople}
    <input type="text" name="porcentaje" value="" id="idText_${i}" size="4" disabled>
    <br>
    `;
    d1.insertAdjacentHTML('beforeend', html_code);
  }
}

function CheckItems() {
  d1 = document.getElementById('items');
  for (i = 0; i < Object.keys(ItemDiccJ).length; i++) {
    nameItem = Object.keys(ItemDiccJ)[i];
    html_code = `<option id="opciones" value="${nameItem}">${nameItem}</option>`;
    d1.insertAdjacentHTML('beforeend', html_code);
  }
}

function peopleChecked(element) {
  numero_persona = element.id.split("_").slice(-1);
  id_texto = "idText_" + numero_persona;
  if (element.checked) {
    document.getElementById(id_texto).disabled = false;
  } else {
    document.getElementById(id_texto).disabled = true;
  }
}

 var Porcentaje = 0
$(document).ready(function() {
  $("input").change(function() {
    var idChanged = event.target.id;
    var select = document.getElementById("items");
    var Producto= select.options[select.selectedIndex].value;

    if (idChanged.indexOf("Text") >= 0) {
        var Porcentaje = document.getElementById(idChanged).value;
        // console.log(Porcentaje);
        numero_persona = idChanged.split("_").slice(-1);
        id_persona = "idCheck_" + numero_persona;
        Persona = document.getElementById(id_persona).name;
        ItemDiccJ[Producto]["people"][Persona] = Porcentaje;
    } else {
        Persona = document.getElementById(idChanged).name;
        // console.log(Persona);
    }
  });
});




function checkboxlist(){
  for (i = 0; i < Object.keys(localPeople).length; i++) {   //Por personas
    namePeople = Object.keys(localPeople)[i];
    for (j = 0; j < Object.keys(ItemDiccJ).length; j++) {   //Por items
      nameProduct = Object.keys(ItemDiccJ)[j];
      // PerPorProd =
      ProdPrice = Object.values(ItemDiccJ)[j]["valor"];
      PeoDic = Object.values(ItemDiccJ)[j]["people"];
      for (k = 0; k < Object.keys(PeoDic).length; k++){     //Por personas de ese item
        NomPorProd = Object.keys(PeoDic)[k];
        PercPorProd = Object.values(PeoDic)[k];
        // if es igual a namePeople
        if (namePeople == NomPorProd) {
          // agreguelo a localPeople
          DirPer = localPeople;
          // DirPer["and"] = {"items":{"it1":2}, "total":0};
          AuxDic = {};
          AuxDic[nameProduct] = (PercPorProd*ProdPrice)/100;
          // dicjson = {NomProd:(PercPorProd*ProdPrice)/100};
          DirPer[namePeople] = {"items":AuxDic, "total":0};
        }
      }
    }
  }
}






//
