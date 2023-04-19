/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Navbar */

/**
 * Initializes a null modal component.
 */

(function() {

  const mobileIcon = document.querySelector(".null-navbar-menu-icon-contianer");
  const Menu = document.querySelector(".null-navbar-links");
  const backDrop = document.querySelector(".null-navbar-back-drop");
  const body = document.body;
  
  /*Search*/
  const search = document.querySelector(".null-navbar-search svg");
  const searchForm = document.querySelector(".null-navbar-form");
  const searchContainer = document.querySelector(".null-navbar-form-container");
  /*Search*/
  
  
  function null_nav_bar_back_drop(){ // create drop back
      const newDiv = document.createElement("div");
      newDiv.classList.add("null-navbar-back-drop");
      document.body.appendChild(newDiv);
      
  }
  
  function null_nav_bar_back_drop_search(){ //dropback
      
      let checkBackDrop = document.querySelector(".null-navbar-back-drop");
      checkBackDrop.onclick = ()=>{
          checkBackDrop.remove();
              if(body.classList.contains("null-navbar-body-overflow-hidden")){
                      body.classList.remove("null-navbar-body-overflow-hidden");
                  }
          Menu.classList.remove("active");

      }
  }
  
  if(mobileIcon){
    mobileIcon.onclick = ()=>{ //mobile menu
      Menu.classList.add("active");
      body.classList.add("null-navbar-body-overflow-hidden");
      
      
      null_nav_bar_back_drop();
      null_nav_bar_back_drop_search();
    }
  }
  
  /* Prevent User from seeing the backdrop if they resize the computer screen */
  
  function hideBackDrop(x) {
      let elementExist = document.querySelector(".null-navbar-back-drop");
      let activeNav = document.querySelector(".null-navbar-links");
      let body = document.body;
      if (x.matches) { // If media query matches
        if(elementExist){  
  
              elementExist.removeAttribute('style');
              body.style.overflow ="";
              
              if(activeNav){
                if(activeNav.classList.contains("active")){
                  activeNav.removeAttribute('style');
                }
              }

  
          }        
          
      } else {
          if(elementExist){  
              elementExist.style.display = "none";
              body.style.overflow ="auto";
          }
  
          if(activeNav){
            if(activeNav.classList.contains("active")){
                activeNav.style.transition = "none";
            }
          }
  
          
      }
    }
    
  let mediaQuery = window.matchMedia("(max-width: 992px)");
  hideBackDrop(mediaQuery); // Call listener function at run time
  mediaQuery.addListener(hideBackDrop); // Attach listener function on state changes
  
    
  window.addEventListener("orientationchange", () => {
      if (backDrop) {
        backDrop.remove();
      }
      body.classList.remove("null-navbar-body-overflow-hidden");
      Menu.classList.remove("active");
  });
    
  /* Prevent User from seeing the backdrop if they resize the computer screen */
  
  /*Search*/
  if(search){
    search.onclick = ()=>{ 
        if(searchForm.classList.contains("active")){
            searchForm.classList.remove("active");
            searchContainer.classList.remove("active");
        }else{
            searchForm.classList.add("active");
            searchContainer.classList.add("active");
            searchForm.querySelector(".null-navbar-form-input").focus();
          
        }
    }
  }

  window.addEventListener('click', hideSearch);
  function hideSearch(e) {
      if ( e.target != search && e.target.parentNode != searchContainer && e.target.parentNode != searchForm) {

        if(searchForm){
          searchForm.classList.remove("active");  
        }

        if(searchContainer){
          searchContainer.classList.remove("active");
        }

      }
  }
  
  /* Search */
  
  const dropDownButton = document.querySelectorAll(".null-navbar .null-dropdown-button");
  
  for (let i = 0; i < dropDownButton.length; i++) {

    dropDownButton[i].addEventListener("click", function () {

      let container = dropDownButton[i].nextElementSibling; // get null-dropdown
      let wrapper = container.querySelector(".null-navbar .null-dropdown-menu");

      if (container.classList.contains("show")) {
        container.style.height = 0;
        container.style.opacity = 0;
        container.style.transform = "translateY(-10px)";
        container.classList.remove("show");
      } else {
        container.style.height = wrapper.clientHeight + "px";
        container.style.opacity = 1;
        container.style.transform = "translateY(-0px)";
        container.classList.add("show");
      }

      dropDownButton[i].querySelector("svg").classList.toggle("active");
      
    });
  
  }
  
  // Close the drop down while the next one is opening or user click out side  the drop down
  
  document.addEventListener('click', function(e) {
  
    let dropdown = document.querySelectorAll(".null-navbar .null-dropdown.show ");
  
    dropdown.forEach(function(el){

     el.parentElement.querySelector(".null-navbar .null-dropdown-button").classList.add("active"); // for border radius
  
      if(el != e.target.nextElementSibling && !e.target.matches('.null-navbar .null-drop-down-menu')){
                  
                  el.style.height = 0;

                  el.removeAttribute('style'); // remove style from dom
  
                  if(el.classList.contains("show")){
                      el.classList.remove("show") //remove class show
                  }
                  
                  if(el.parentElement.querySelector(".null-navbar .null-dropdown-button").classList.contains("active")){
                      el.parentElement.querySelector(".null-navbar .null-dropdown-button").classList.remove("active")
                  }
  
                  el.parentElement.querySelector("a svg").classList.remove("active");

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
  
      const buttonActive = document.querySelectorAll(".null-navbar .null-dropdown-button.active");
  
      for (let i = 0; i < buttonActive.length; i++) {
          
          e.preventDefault();
  
          if(e.keyCode ==40){
          currentFocus++;
          addActive(buttonActive[i].parentElement.querySelector(".null-navbar .null-dropdown-menu").children);
  
          }else if (e.keyCode == 38) { //up
  
          currentFocus--;
  
          addActive(buttonActive[i].parentElement.querySelector(".null-navbar .null-dropdown-menu").children);
  
        } else if (e.keyCode == 13) {
          e.preventDefault();
  
          if (currentFocus > -1) {
              buttonActive[i].parentElement.querySelector(" .null-navbar .null-dropdown-menu li.active a").click();
          }
  
          }
  
      }
  
  });
  
})();

/* End Navbar */