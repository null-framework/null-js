/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Drop Down */

/**
 * Initializes a null dropdown component
 */

(function() {

  const dropDownButton = document.querySelectorAll(".null-dropdown-button");
  
  for (let i = 0; i < dropDownButton.length; i++) {
  
      dropDownButton[i].addEventListener("click",function(){  
  
          let container = dropDownButton[i].nextElementSibling // get null-dropdown
  
          if (container.clientHeight) {
  
              if(container.classList.contains("show")){
                  container.classList.remove("show"); //remove class show
              }
  
              container.style.height = 0; // assign 0 to height
  
              container.removeAttribute('style'); // remove style from dom
  
                  if(dropDownButton[i].classList.contains("active")){
                      dropDownButton[i].classList.remove("active");
                  }
  
          }else{
  
              wrapper = container.querySelector(".null-dropdown-menu");
              
              container.style.height = wrapper.clientHeight + "px";
              container.style.opacity = 1;
              // add class show
              container.classList.add("show");
  
          }
          if(dropDownButton[i].querySelector("svg").classList.contains("active")){
              dropDownButton[i].querySelector("svg").classList.remove("active");
          }else{
              dropDownButton[i].querySelector("svg").classList.add("active");
          }
      
      })
  
  }
  
  // Close the drop down while the next one is opening or user click out side the drop down
  
  document.addEventListener('click', function(e) {
  
    let dropdown = document.querySelectorAll(".null-dropdown.show ");
  
    dropdown.forEach(function(el){
  
     el.parentElement.querySelector(".null-dropdown-button").classList.add("active"); // for border radius
  
      if(el != e.target.nextElementSibling && !e.target.matches('.null-drop-down-menu')){
                  
                  el.style.height = 0;
                  el.removeAttribute('style'); // remove style from dom
  
                  if(el.classList.contains("show")){
                      el.classList.remove("show"); //remove class show
                  }
                  
                  if(el.parentElement.querySelector(".null-dropdown-button").classList.contains("active")){
                      el.parentElement.querySelector(".null-dropdown-button").classList.remove("active");
                  }
                  
                  if(el.parentElement.querySelector("button svg")){
                    el.parentElement.querySelector("button svg").classList.remove("active");
                  }else{
                    el.parentElement.querySelector("a svg").classList.remove("active");
                  }
  
  
      }
              
          });        
  })
  
  // Close the drop down while the next one is opening or user click out side the drop down
  
  // Trigger key down && up && enter
  
  function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("active");
    }
  
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
      }
    }
  
  currentFocus = -1;
  
  document.addEventListener("keydown", function(e) {
  
      const buttonActive = document.querySelectorAll(".null-dropdown-button.active");
  
      for (let i = 0; i < buttonActive.length; i++) {
          
          e.preventDefault();
  
          if(e.keyCode ==40){
          currentFocus++;
          addActive(buttonActive[i].parentElement.querySelector(".null-dropdown-menu").children);
  
          }else if (e.keyCode == 38) { //up
  
          currentFocus--;
  
          addActive(buttonActive[i].parentElement.querySelector(".null-dropdown-menu").children);
  
        } else if (e.keyCode == 13) {
          e.preventDefault();
  
          if (currentFocus > -1) {
              buttonActive[i].parentElement.querySelector(".null-dropdown-menu li.active a").click();
          }
  
          }
  
      }
  
  });
  
  })();

/* End Drop Down */