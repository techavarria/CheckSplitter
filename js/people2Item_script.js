var subtotal = 0;
var localItems = JSON.parse(localStorage.getItem('localItems'));
var localPeople = JSON.parse(localStorage.getItem('localPeople'));
localStorage.setItem('localDirPer', JSON.stringify({}));

if (localStorage.getItem("localItemDiccJ") === null) {
    var ItemDiccJ = {};
    startItemDiccJ();
} else {
    var ItemDiccJ = JSON.parse(localStorage.getItem('localItemDiccJ'));

}

CheckPeople();
CheckItems();
actualizarChecks();

function startItemDiccJ(){
    for (i = 0; i < Object.keys(localItems).length; i++) {
        if (localItems[Object.keys(localItems)[i]][0] > 1) {
            for (j = 1; j < localItems[Object.keys(localItems)[i]][0] + 1; j++) {
                nameItem = Object.keys(localItems)[i];
                ItemDiccJ[nameItem.concat(j)] = localItems[Object.keys(localItems)[i]][1] / localItems[Object.keys(localItems)[i]][0];
            }
        } else {
            ItemDiccJ[Object.keys(localItems)[i]] = localItems[Object.keys(localItems)[i]][1];
        }
    }




    for (i = 0; i < Object.keys(ItemDiccJ).length; i++) {
        pricevec = (ItemDiccJ[Object.keys(ItemDiccJ)[i]]);
        ItemDiccJ[Object.keys(ItemDiccJ)[i]] = {
            "valor": pricevec,
            "people": {}
        };
    }
}

function CheckPeople() {
    d1 = document.getElementById('people');
    for (i = 0; i < Object.keys(localPeople).length; i++) {
        namePeople = Object.keys(localPeople)[i];
        html_code = `

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <input type="checkbox" class="form-check-input" id="idCheck_${i}" onchange="peopleChecked(this)" name="${namePeople}">
            <span class="input-group-text" id="inputGroup-sizing-default">${namePeople}</span>
        </div>
        <input type="text" name="porcentaje" class="form-control texts" value="" id="idText_${i}" size="4" disabled>
    </div>
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

function actualizarChecks(){
    x = document.getElementsByClassName("form-check-input")
    y = document.getElementsByClassName("texts")
    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
    for (var i = 0; i < y.length; i++) {
        y[i].disabled = true;
        y[i].value = null;
    }

    select = document.getElementById("items");
    Producto = select.options[select.selectedIndex].value;
    dicAux = ItemDiccJ[Producto]["people"];
    peop = Object.keys(dicAux);
    porcen = Object.values(dicAux);
    for (var i = 0; i < peop.length; i++) {
        console.log(peop[i])
        document.getElementsByName(peop[i])[0].checked = true;
        theID = document.getElementsByName(peop[i])[0].id;

        numero_persona = theID.split("_").slice(-1);
        id_porc = "idText_" + numero_persona;
        document.getElementById(id_porc).value = porcen[i];
        document.getElementById(id_porc).disabled = false;

    }

}

function checkboxlist() {
    DirPer = localPeople;
    for (i = 0; i < Object.keys(localPeople).length; i++) { //Por personas
        namePeople = Object.keys(localPeople)[i];
        AuxDic = {};
        for (j = 0; j < Object.keys(ItemDiccJ).length; j++) { //Por items
            nameProduct = Object.keys(ItemDiccJ)[j];
            // PerPorProd =
            ProdPrice = Object.values(ItemDiccJ)[j]["valor"];
            PeoDic = Object.values(ItemDiccJ)[j]["people"];

            for (k = 0; k < Object.keys(PeoDic).length; k++) { //Por personas de ese item
                NomPorProd = Object.keys(PeoDic)[k];
                PercPorProd = Object.values(PeoDic)[k];
                // if es igual a namePeople
                if (namePeople == NomPorProd) {
                    // agreguelo a localPeople

                    // DirPer["and"] = {"items":{"it1":2}, "total":0};
                    // AuxDic[nameProduct] = (PercPorProd * ProdPrice * 1.1) / 100;
                    AuxDic[nameProduct] = {"valor":(PercPorProd * ProdPrice * 1.1) / 100, "porcentaje": PercPorProd}

                    // dicjson = {NomProd:(PercPorProd*ProdPrice)/100};
                    DirPer[namePeople] = {
                        "items": AuxDic,
                        "total": 0
                    };
                }
            }
        }
    }
    localStorage.setItem('localDirPer', JSON.stringify(DirPer));
    location.replace('item_per_person.html');
    localStorage.setItem('localItemDiccJ', JSON.stringify(ItemDiccJ));
}


$(document).ready(function() {
    $("input").change(function() {
        var idChanged = event.target.id;
        var select = document.getElementById("items");
        var Producto = select.options[select.selectedIndex].value;

        if (idChanged.indexOf("Text") >= 0) {
            var Porcentaje = document.getElementById(idChanged).value;
            numero_persona = idChanged.split("_").slice(-1);
            id_persona = "idCheck_" + numero_persona;
            Persona = document.getElementById(id_persona).name;
            ItemDiccJ[Producto]["people"][Persona] = Porcentaje;
        } else {
            Persona = document.getElementById(idChanged).name;
        }
    });
});

$(".form-control.one").change(function() {
    actualizarChecks();
});
