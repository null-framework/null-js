/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Tabs */

/**
 * Initializes a null tabs component.
 */

function null_tabs() {
  const nullTabs = document.querySelectorAll('[data-tab-target]');
  const nullTabContents = document.querySelectorAll('[data-tab-content]');

  let nullPrevTab = document.querySelector('[data-tab-target].active');

  // Get the tab to show based on the hash in the URL
  const nullHash = window.location.hash;
  const nullActiveTab = nullHash ? document.querySelector(`[data-tab-target="${nullHash}"]`) : null;
  
  // If there's no active tab based on the hash, default to the first tab
  const nullDefaultTab = nullTabs[0];


  // Return if there are no tabs on the page
  if (!nullTabs.length) {
    return;
  }

  // Set the initial active tab
  const nullInitialTab = nullActiveTab || nullDefaultTab;
  if (!nullInitialTab) {
    console.error(`No valid tab found for hash "${nullHash}"`);
    return;
  }
  nullInitialTab.classList.add('active');
  
  // Show the content for the initial active tab
  const nullInitialContent = document.querySelector(nullInitialTab.dataset.tabTarget);
  if (!nullInitialContent) {
    console.error(`No content found for tab "${nullInitialTab.dataset.tabTarget}"`);
    return;
  }

  nullInitialContent.classList.add('active');

  nullTabs.forEach(nullTab => {
    nullTab.addEventListener('click', (event) => {
      // To prevent href scroll
      event.preventDefault();
      if (nullPrevTab) {
        nullPrevTab.classList.remove('active');
      }
      
      const nullTarget = document.querySelector(nullTab.dataset.tabTarget);

      nullTabContents.forEach(nullTabContent => {
        nullTabContent.classList.remove('active');
      })

      nullTabs.forEach(nullTab => {
        nullTab.classList.remove('active');
      })
      nullTab.classList.add('active');

      nullTarget.classList.add('active');

      // Update the URL with the hash for the selected tab
      history.replaceState(null, null, `#${nullTarget.id}`);

      nullPrevTab = nullTab;
    })
  })

  // Listen for hash changes and update the active tab
  window.addEventListener('hashchange', () => {
    const nullHash = window.location.hash;
    const nullNewActiveTab = nullHash ? document.querySelector(`[data-tab-target="${nullHash}"]`) : null;
    const nullNewDefaultTab = nullTabs[0];
    const nullTabToActivate = nullNewActiveTab || nullNewDefaultTab;
    if (!nullTabToActivate) {
      console.error(`No valid tab found for hash "${nullHash}"`);
      return;
    }
    if (nullPrevTab) {
      nullPrevTab.classList.remove('active');
    }
    nullTabToActivate.click();
    nullPrevTab = nullTabToActivate;
  });
}

null_tabs();

/* End Tabs */