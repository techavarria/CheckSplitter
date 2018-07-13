var subtotal = 0;
var peopleDicJ = {};


function addpeople(){                                                            // index
  p1 = document.getElementById('newguy').value;
  peopleDicJ[p1] = null;

  d1 = document.getElementById('lista');
  html_code = `<li> ${p1} </li>`
  d1.insertAdjacentHTML('beforeend', html_code);
}

function funcfoto(){                                                              // index
  alert('agregar foto');
}

function gotoCheck(){                                                            // index
  localStorage.setItem('localPeople', JSON.stringify(peopleDicJ));
  location.replace('check.html');
}

$(document).ready(function() {
  $("#newguy").change(function() {
    addpeople();
  });
});
