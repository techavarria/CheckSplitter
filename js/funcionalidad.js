var subtotal = 0;
// var itemDic = [{}];
if (typeof itemDic === 'undefined') {
    // variable is undefined
    var itemDic = [{}];
}

function myFunction(){                                                            // index
  location.replace('check.html');
}
function addpeople(){                                                            // index
  p1 = document.getElementById('newguy').value;

  d1 = document.getElementById('lista');
  html_code = `<li> ${p1} </li>`
  d1.insertAdjacentHTML('beforeend', html_code);
}
function funcfoto(){                                                              // index
  alert('agregar foto');
}

function additem(){                                                                 // check
  i1 = document.getElementById('newitem').value;
  i2 = parseInt(document.getElementById('newamount').value);
  i3 = parseInt(document.getElementById('newprice').value);

  itemDic.push({
    key: i1,
    value: [i2, i3]
  });

  d1 = document.getElementById('items');
  html_code = `<li> ${i1 + ", " + "# " + i2 + ", " + "U/P " + i3} </li>`
  d1.insertAdjacentHTML('beforeend', html_code);

  precio = i3;
  subtotal = precio + subtotal;
  ico = subtotal * 0.08;
  netototal = subtotal - ico;
  propina = netototal * 0.1;
  total = subtotal + propina;

  document.getElementById('netototal').innerHTML = netototal;
  document.getElementById('ico').innerHTML = ico;
  document.getElementById('subtotal').innerHTML = subtotal;
  document.getElementById('propina').innerHTML = propina;
  document.getElementById('total').innerHTML = total;

}
function checkboxlist(){                                                            // people2item
  d1 = document.getElementById('people');

  for (i = 0; i<itemDic.length-1;i++){
    nameItem = itemDic[i+1].key
    html_code = `<li><input type="checkbox"> ${nameItem} <br></li>`
    d1.insertAdjacentHTML('beforeend', html_code);
  }

  // html_code = `<li> ${p1} </li>`

}
function gotoPeople(){                                                            // check
  location.replace('people2item.html');
}
