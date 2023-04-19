/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Circular Progress */

/**
 * Initializes a null circular progress component.
 */

function null_circular_progress(id , args ){

  const nullCircularProgress = document.querySelector(`#${id} .null-circular-progress`);

  const nullCircularProgressValue = document.querySelector(`#${id} .null-circular-progress-value`);

  let defaults = {
      endValue:100,
      speed:50
  };
  
  let params = {...defaults, ...args}; 

  let progressStartValue = 0,
      progressEndValue = params.endValue,
      speed = params.speed;

      if(nullCircularProgress){
      let nullProgress = setInterval(() =>{
          progressStartValue++;

          nullCircularProgressValue.textContent = `${progressStartValue}%`;

          nullCircularProgressValue.setAttribute("data-null-circular-progress-value", progressStartValue + '%');
          nullCircularProgressValue.setAttribute("data-null-circular-progress-degree", (progressStartValue * 3.6) + "deg");

          nullCircularProgress.style.background = `conic-gradient(var(--null-color-main) ${progressStartValue * 3.6}deg,#f6f7f9 0deg)`;

          if(progressStartValue == progressEndValue){
              clearInterval(nullProgress)
          }

      },speed);
    }
}

null_circular_progress("s1", {
  endValue:30, // your dynamic  value
  speed:50
});

/* End Circular Progress */