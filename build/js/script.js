var menu=document.querySelector(".main-nav"),menuToggler=document.querySelector(".main-nav__toggler");window.onload=function(){menu.classList.remove("no-js"),menu.classList.remove("main-nav--opened"),menu.classList.add("main-nav--closed")},menuToggler.addEventListener("click",function(n){menu.classList.contains("main-nav--opened")?(menu.classList.add("main-nav--closed"),menu.classList.remove("main-nav--opened")):(menu.classList.add("main-nav--opened"),menu.classList.remove("main-nav--closed"))});