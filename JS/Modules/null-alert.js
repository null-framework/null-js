/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Alert */

/**
 * Initializes the null_alert function.
 * @description This function sets up event listeners for close icons on alert component
 */

function null_alert(){

  // Get all elements with class .null-alert-exit-icon.
  let nullAlertExit = document.querySelectorAll(".null-alert-exit-icon");
  
  if(nullAlertExit){
      for(let i = 0; i < nullAlertExit.length; i++){
  
          // Add a click event listener to the element.
          nullAlertExit[i].addEventListener("click",function(){
      
              // Get the parent element of the close icon.
              let nullAlertParent = nullAlertExit[i].parentNode.parentNode;
      
              // Set the opacity of the parent element to 0.
              nullAlertExit[i].parentNode.parentNode.style.opacity = '0';
              
                // Remove the parent element from the DOM after a 500 millisecond delay.
              setTimeout(function(){nullAlertParent.remove();}, 500);
          })
      
      }
  }
  
}

null_alert(); // Invoke the function

/* End Alert */