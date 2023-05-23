/*
* Null JS v1.0.0 (https://null-js.com)
* Copyright (c) 2023 Null JS
* Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/*JS functions */

/**
 * @name null_translator
 * @description This function will change word or list of words to other languages, it works like a local translate. Also, it can be used as writer from JS directly
 * @param {string} el  Selector for the element.
 * @param {object} arg key => language code && value=> word in certain language
 */

function null_translator(el,arg){

element = document.querySelectorAll(el);

    for (let i = 0; i < element.length; i++) {

        for (const prop in arg) {

            if (document.documentElement.lang.toLowerCase() === prop){
                element[i].innerText  = arg[prop];
            }

        } 

    }

}

// Make sure to add lang="" to your html tag
/**
* Some of language codes:
* = {
* English:en,
* Arabic:en,
* Persian:fa,
* French:fr,
* Bulgaria:bg,
* Chinese(Simplified):zh-CN,
* Chinese (Traditional):zh-TW,
* Italy:it,
* Russia:ru,
* Spain:es,
* Czech:cs,
* German:de,
* Greek:el,
* India:hi,
* Japan:ja
* Turkey:tr
* }
*/

/* Function Call 

null_translator("selector",{
Language Code:"word",
Language Code:"word"
})

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_add_style
 * @description This function allows you to add one or more CSS styles to one or more elements. .
 * @param {string|array} selectors The selector(s) for the element(s) to which the styles will be applied.
 * @param {object|string} styles An object containing CSS properties and values or a string of CSS rules. If using an object, the keys should be property names and values should be property values. If using a string, it should contain valid CSS rules for the element. 
 * @throws {Error} Throws an error if the selector or styles parameters are invalid.
 *
 * @example
 * // To add a CSS style to all elements with class 'box':
 * null_add_style('.box', {'background-color': 'red', 'color': 'white', 'border': '1px solid black'});
 *
 * // To add multiple CSS styles to a single element:
 * null_add_style('#header', 'font-size: 24px; color: blue; text-align: center;');
 *
 * // To add styles to multiple elements:
 * null_add_style(['#header', '.box'], {'background-color': 'red', 'color': 'white'});
 */

const null_add_style = ((nullStyle) => {
const sheet = document.head.appendChild(nullStyle).sheet;
return (selectors, styles) => {
      if (!selectors || !styles) {
          throw new Error('Invalid parameters for null_add_style');
      }
      if (typeof selectors === 'string') {
          selectors = [selectors];
      }
      selectors.forEach((selector) => {
          const propText = typeof styles === "string" ? styles : Object.keys(styles).map((prop) => {
              return `${prop}:${(prop === "content") ? "'" + styles[prop] + "'" : styles[prop]}`;
          }).join(";");
          sheet.insertRule(`${selector} {${propText}}`, sheet.cssRules.length);
      });
  };
})(document.createElement("style"));

/* Function Call 

null_add_style("Selector",
{"properity":"value"});

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_truncate
 * @description Truncates any text to the specified number of characters or the end of the last word.
 * @param {string} el Selector for the element.
 * @param {number} num Number of characters to display or last word to display as entire word.
 */

function null_truncate(el, num) {
  const elements = document.querySelectorAll(el); // Get the elements to truncate

  if (typeof el !== "string" || el.charAt(0) !== ".") {
    throw new Error("Please enter a valid class name starting with '.'");
  }

  if (!(typeof num === "number" && Number.isInteger(num) && num > 0)) {
    throw new Error(`Please enter a valid number. You entered: ${num}`);
  }

  for (let i = 0; i < elements.length; i++) {
    let text = elements[i].textContent.trim(); // Get the text content of the element and remove leading/trailing whitespace
    if (text.length <= num) continue; // Do nothing if the text is already short enough

    let lastSpace = text.lastIndexOf(" ", num); // Get the last space character within the truncation limit
    let truncated = text.substring(0, lastSpace >= 0 ? lastSpace : num).trim(); // Truncate the text up to the last space or the limit
    if (lastSpace < 0 || lastSpace + 1 + text.length - truncated.length <= num) {
      // If there was no space or the last word fits entirely, do not add "..."
      elements[i].textContent = truncated;
    } else {
      elements[i].textContent = truncated + " ...";
    }
  }
}
/* Function Call 

null_truncate('selector',num of characters)

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_create_element
 * @description Creates an HTML element with customizable options
 * @param {String} tag  The HTML tag to create.
 * @param {arg} object  Options for the element, such as text, class, and attributes
 * @returns {HTMLElement} The created HTML element
 */
function null_create_element(tag,args){
    
let defaults = {
    text: null,
    id: null,
    title:null,
    html:null,
    classes:null,
    attributes:{},
    append:{},
    src:null,
    href:null,
    callBack:null
};

let params = {...defaults, ...args};
    
// create HTML 5 element
const element = document.createElement(tag);

if(params.text){

  element.innerText = params.text;

} // Add text to element

if(params.id){

  element.setAttribute("id",params.id);

} // add ID

if(params.title){

  element.setAttribute("title",params.title);

} // add title

if(params.html){

  element.innerHTML = params.html;

} // Add HTML text and tags to element
    

if(params.classes){ // Add Classes

  element.classList.add(...params.classes);

}


if(params.attributes){

    for (const property in params.attributes) { 

      element.setAttribute(property,params.attributes[property]); // add custom Attribute

    }

}

if(params.callBack){

  params.callBack(element); // execute the callBack function with the created element as argument

}

if (params.append) {

  const { position, target } = params.append;

  switch (position) {

    case "inside":
      target.appendChild(element);
      break;

    case "before":
      target.parentNode.insertBefore(element, target);
      break;

    case "after":
      target.parentNode.insertBefore(element, target.nextSibling);
      break;

    default:
      throw new Error(`Invalid append position: ${position}`);

  }

}

return element;
                
  
}

/*
Function call 
// You need to assgin the function to variable

let div = null_create_element("div",{
    id:"myID1",
    classes:["myfirst","mysecond"], // array of classess
    title:"hello world",
    attributes:{  //object can add more than custom attribute
        "data-one":"hello",
        "data-two":"a",
    },
    html:"Hello From <b>null </b> ", // can add text and html tags 
    text:"Hello From null" // just text,
    append:{ // You have three options ["inside", "before" , "append"]
        position: "inside",
        target: document.getElementById("parent")
    }

});
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_add_classes
 * @description Adds one or more classes to an element..
 * @param {string} str selector The selector for the element.
 * @returns {Array} classes An array of classes to add to the element..
 */

function null_add_classes(selector, classes) {

const elements = document.querySelectorAll(selector);

    for (let i = 0; i < elements.length; i++) {

    const elementClasses = elements[i].getAttribute("class");

    const existingClasses = elementClasses ? elementClasses.split(" ") : [];

    const combinedClasses = [...existingClasses, ...classes];

    const uniqueClasses = [...new Set(combinedClasses)];

    const finalClasses = uniqueClasses.join(" ");

    elements[i].setAttribute("class", finalClasses);

    }

}

/* Function Call 

null_add_classes(".class-or-id", ["class1", "class2", "class3"]);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_string_to_array
 * @description Converts a space-separated string of values to an array.
 * @param {String} str The string to convert.
 * @returns {Array} An array of values.
 * @throws {TypeError} If the input is not a string.
 */

function null_string_to_array(str) {

  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }

  const trimmedStr = str.trim();

  if (trimmedStr === "") {
    return [];
  }

  const arr = trimmedStr.split(/\s+/);

  return arr;

}

/* Function Call 

const myString = "Hello World From Null";
const myArr = null_string_to_array(myString);
console.log(myArr);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_count_duplicates_in_array_to_object
 * @description Counts the number of occurrences of each item in an array and returns them as an object.
 * @param {Array} arr The array to count duplicates in.
 * @returns {Object} An object containing each unique item in the array as a key, and its count as a value.
 * @throws {TypeError} If the input is not an array.
 */

function null_count_duplicates_in_array_to_object(arr) {

  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  const countObject = {};
  arr.forEach((item) => {
    countObject[item] = (countObject[item] || 0) + 1;
  });

  return countObject;

}

/* Function Call

const myArray = ["male", "female", "male", "male"];
const myObject = null_count_duplicates_in_array_to_object(myArray);
console.log(myObject);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_remove_duplicates_from_array
 * @description Removes duplicate items from an array and returns a new array with only unique items.
 * @param {Array} arr The array to remove duplicates from.
 * @returns {Array} A new array with only unique items.
 * @throws {TypeError} If the input is not an array.
 */

function null_remove_duplicates_from_array(arr) {

  if (!Array.isArray(arr)) {
      throw new TypeError("Input must be an array");
  }
  
  const uniqueItems = [...new Set(arr)];

  return uniqueItems;
}
  
/* Function Call 

const myArray = ["male", "female", "male", "male"];
const myUniqueArray = null_remove_duplicates_from_array(myArray);
console.log(myUniqueArray); 

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_remove_value_from_array
 * @description Removes a specific value from an array and returns a new array without that value.
 * @param {Array} arr The array to remove a value from.
 * @param {*} value The value to remove.
 * @returns {Array} A new array without the specified value.
 * @throws {TypeError} If the input is not an array.
 * @throws {Error} If no value is provided.
 */

function null_remove_value_from_array(arr, value) {

  if (!Array.isArray(arr)) {
      throw new TypeError("Input must be an array");
  }
  
  if (value === undefined) {
      throw new Error("A value must be provided");
  }
  
  const newArray = arr.filter((item) => item !== value);

  return newArray;

}

/* Function Call 

const myArray = ["Usa", "Canada", "Usa", "UK"];
const newArray = null_remove_value_from_array(myArray, "Canada");
console.log(newArray); 

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_remove_values_from_array
 * @description This function will remove specific values from an array.
 * @param {array}  array The current array that you want to remove values from it.
 * @param {array}  theArgs The values you want to delete.
 * @returns {array} The updated array with the specified values removed.
 */

function null_remove_values_from_array(array, ...theArgs){

  if(!Array.isArray(array)) {
      throw new Error("The first argument must be an array.");
  }

  if(!Array.isArray(theArgs)) {
      throw new Error("The second argument must be an array.");
  }

  return array.filter(val => !theArgs.includes(val));

}

/* Function Call 

const nullArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const nullNewArray = null_remove_values_from_array(nullArray, "2","4","6");

console.log(nullNewArray); 

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_remove_values_in_array
 * @description Counts the most frequently occurring element in an array and returns an object with its value and frequency.
 * @param {Array} arr - The input array to count.
 * @returns {Object} An object with two properties: `value` (the most frequent element) and `freq` (its frequency).
 * @throws {TypeError} If `arr` is not an array.
 */

function null_count_most_frequent(arr) {

  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }

  if (arr.length === 0) {
    return null;
  }

  const mostFrequent = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    if (acc[val] > acc.mostFreq.freq) {
      acc.mostFreq.value = val;
      acc.mostFreq.freq = acc[val];
    }
    return acc;
  }, { mostFreq: { value: null, freq: 0 } }).mostFreq;

  return mostFrequent;

}

/* Function Call
const nullArray = ["2","2","2","1","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];

const nullNewArray = null_count_most_frequent(nullArray);

console.log(nullNewArray);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name delete_keys_from_object
 * @description This function will remove keys with their values in object and return a new object.
 * @param {array}   keysArray The keys you want to delete.
 * @param {object}  obj The object you want to delete keys from.
 * @returns {object} A new object with the specified keys removed.
 */

function null_delete_keys_from_object(keysArray, obj) {

  if (!Array.isArray(keysArray)) {
    throw new Error("keysArray parameter must be an array");
  }

  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    throw new Error("obj parameter must be an object");
  }

  const newObject = {};
  const keys = Object.keys(obj);

  for (const key of keys) {
    if (!keysArray.includes(key)) {
      newObject[key] = obj[key];
    }
  }

  return newObject;

}

/* Function Call 

const obj = {
  id: 1,
  firstname: "Jack",
  age: 20,
  country: "USA"
};
const keysToDelete = ["id", "age"];
const newObj = null_delete_keys_from_object(keysToDelete, obj);
console.log(newObj);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_exclude_keys_from_object
 * @description This Function will exclude keys and their values from an object.
 * @param {object}   nullObject The object that you want to start excluding keys.
 * @param {array}    exclude Array of values to be excluded.
 */

function null_exclude_keys_from_object(nullObject, exclude=[]) {
  
  // check if nullObject is an object
  if (typeof nullObject !== "object" || nullObject === null || Array.isArray(nullObject)) {
    throw new Error("The first argument must be an object");
  }

  return Object.keys(nullObject).reduce((target, k) => {
  
    if (exclude.length) {
      if (exclude.indexOf(k) < 0) target[k] = nullObject[k];
    }
    return target;
  }, {});
}


/* Function Call

const nullObject = {
  _id: 1234,
  firstName: 'John',
  lastName: 'Smith',
  age:30,
  country:"Usa"
};


var nullKeys = ["_id","country"];


var nullNewObject = null_exclude_keys_from_object(nullObject, nullKeys);
console.log(nullNewObject);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_include_keys_to_object
 * @description This function includes keys with their values to an object.
 * @param {object}   nullObject The object that you want to start including keys.
 * @param {object}   include An object with keys and values to be included.
*/

function null_include_keys_to_object(nullObject, include={}) {
  
  // check if nullObject is an object
  if (typeof nullObject !== "object" || nullObject === null || Array.isArray(nullObject)) {
    throw new Error("The first argument must be an object");
  }

  return Object.keys(include).reduce((target, k) => {
    target[k] = include[k];
    return target;
  }, { ...nullObject });
}

/* Function Call

const nullObject = {
  _id: 1234,
  firstName: 'John',
  lastName: 'Smith',
  age:30,
  country:"Usa"
};

const nullKeys = {
  middleName : "Wick",
  salary:1200
};


const nullNewObject = null_include_keys_to_object(nullObject, nullKeys);
console.log(nullNewObject);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_extract_values_from_array_to_new_array
 * @description This function will extract specific values from an array then apply them to new array.
 * @param {array}  array The current array that you want to extract values from.
 * @param {array}  extractValues The values you want to extract.
 * @returns {array} An array of extracted values.
 */

function null_extract_values_from_array_to_new_array(array, extractValues) {

  return array.filter(val => extractValues.includes(val));
  
}

/* Function Call

const nullArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nullNewArray = null_extract_values_from_array_to_new_array(nullArray, [2, 4, 6]);
console.log(nullNewArray); // [2, 4, 6]

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @name null_process
 * @description Process element(s) by executing a callback function on each matched element.
 * @param {string} el - The selector to match elements (ID or class).
 * @param {Function} callBack - The callback function to be executed on each matched element.
 * @returns {Array} An array containing the matched elements.
 * @throws {Error} If the element with the specified ID is not found or if an invalid selector is provided.
 */

function null_process(el, callBack) {

    // Check if the selector starts with '#'

    if (el.startsWith("#")) {

        // If it does, find the element by ID
        const element = document.querySelector(el);

        if (element) {

            // If the element is found, execute the callback function
            callBack(element);

            // Return an array containing the element
            return [element];

        } else {

            // Throw an error if the element with the provided ID is not found
            throw new Error(`Element with ID "${el}" not found.`);
        }
    }
    // Check if the selector starts with '.'
    else if (el.startsWith(".")) {

        // If it does, remove the leading dot to get the class name
        const className = el.substring(1);

        // Find all elements with the specified class name
        const elements = Array.from(document.getElementsByClassName(className));

        elements.forEach(element => {
            // Execute the callback function for each element
            callBack(element);
        });

        // Return an array containing the matching elements
        return elements;
    }

    // Throw an error for invalid selectors
    else {

        throw new Error(`Invalid selector "${el}"`);

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*JS functions */
