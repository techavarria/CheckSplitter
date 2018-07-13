var subtotal = 0;
var itemDicJ = {};


var localPeople = localStorage.getItem('localPeople');
console.log('localPeople: ', JSON.parse(localPeople));

function additem(){                                                                 // check
  i1 = document.getElementById('newitem').value;
  i2 = parseInt(document.getElementById('newamount').value);
  i3 = parseInt(document.getElementById('newprice').value);

  itemDicJ[i1] = [i2, i3];

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

function gotoPeople(){                                                            // check
  localStorage.setItem('localItems', JSON.stringify(itemDicJ));
  location.replace('people2item.html');
}
