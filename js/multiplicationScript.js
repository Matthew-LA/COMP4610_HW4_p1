/**
 * File: multiplicationScript.js.html
 * GUI Assignment: HW4 part 1
 * Description: Validating an Interactive Dynamic Table with jquery  plugin
 * Matthew Lorette Anaya, UMass Lowell Computer Science, Matthew_loretteanaya@student.uml.edu
 * Copyright (c) 2023 by Matt. All rights reserved. May be freely copied or
 * excerpted for educational purposes with credit to the author.
 * updated by Matthew Lorette Anaya on June 22, 2023
*/

/*
 * Creates a multiplication table based on the provided boundaries for 
 * multiplier and multiplicand.
 *
 * @param {number} minMultiplier - Lower bound for the multiplier.
 * @param {number} maxMultiplier - Upper bound for the multiplier.
 * @param {number} minMultiplicand - Lower bound for the multiplicand.
 * @param {number} maxMultiplicand - Upper bound for the multiplicand.
 * @return {HTMLElement} - Constructed multiplication table.
 */
// Function to create the multiplication table
const createMultiplicationTable = (minMultiplier, maxMultiplier, minMultiplicand, maxMultiplicand) => {
    // Create table element
    const multiplicationTable = document.createElement('table');
    multiplicationTable.id = 'multiplicationTable';
    
    // Loop to create rows
    for(let rowIndex = minMultiplicand - 1; rowIndex <= maxMultiplicand; rowIndex++) {
        // Create row element
        const row = document.createElement('tr');
        
        // Loop to create cells in each row
        for(let columnIndex = minMultiplier - 1; columnIndex <= maxMultiplier; columnIndex++) {
            // Create cell element (either th for headers or td for data)
            const cell = document.createElement((rowIndex === minMultiplicand - 1 || columnIndex === minMultiplier - 1) ? 'th' : 'td');

            // Set the content of each cell based on its position
            if(rowIndex === minMultiplicand - 1 && columnIndex === minMultiplier - 1) {
                cell.textContent = '';
            } else if(rowIndex === minMultiplicand - 1) {
                cell.textContent = columnIndex;
            } else if(columnIndex === minMultiplier - 1) {
                cell.textContent = rowIndex;
            } else {
                cell.textContent = rowIndex * columnIndex;
            }

            // Append the cell to the row
            row.appendChild(cell);
        }

        // Append the row to the table
        multiplicationTable.appendChild(row);
    }
    return multiplicationTable;
}

// Function to either replace an existing node with a new one, or append the new node if the old one doesn't exist
const replaceOrAppendNode = (newNode, parentNode) => {
    // Look for an existing node with the same ID
    const existingNode = document.getElementById(newNode.id);
    // If the existing node is found and is a child of the same parent, replace it, otherwise append the new node
    existingNode && existingNode.parentNode === parentNode ? parentNode.replaceChild(newNode, existingNode) : parentNode.appendChild(newNode);
}

// Ensure FormProcessor is not already defined
if (typeof FormProcessor === "undefined") {
    // FormProcessor module handles form validation and submission.
    const FormProcessor = (() => {
        let form;

        // Initializes event listeners for the form.
        const initialize = () => {
            form = $('#multiplicationForm');
            
            // Use jQuery validate plugin to handle form validation
            form.validate({
                // Set up validation rules for each input
                rules: {
                    multiplierMinValue: {
                        required: true,
                        number: true,
                        range: [-50, 50]
                    },
                    multiplierMaxValue: {
                        required: true,
                        number: true,
                        range: [-50, 50]
                    },
                    multiplicandMinValue: {
                        required: true,
                        number: true,
                        range: [-50, 50]
                    },
                    multiplicandMaxValue: {
                        required: true,
                        number: true,
                        range: [-50, 50]
                    },
                },
                // Custom error messages for each input
                messages: {
                    multiplierMinValue: {
                        required: "Please enter a minimum multiplier",
                        number: "Please enter a valid number",
                        range: "Please enter a number between -50 and 50"
                    },
                    multiplierMaxValue: {
                        required: "Please enter a maximum multiplier",
                        number: "Please enter a valid number",
                        range: "Please enter a number between -50 and 50"
                    },
                    multiplicandMinValue: {
                        required: "Please enter a minimum multiplicand",
                        number: "Please enter a valid number",
                        range: "Please enter a number between -50 and 50"
                    },
                    multiplicandMaxValue: {
                        required: "Please enter a maximum multiplicand",
                        number: "Please enter a valid number",
                        range: "Please enter a number between -50 and 50"
                    },
                },
                // Function to run when the form is submitted
                submitHandler: function(form, event) {
                    event.preventDefault();
                    const multiplicationTable = createMultiplicationTable(
                        form.elements['multiplierMinValue'].value,
                        form.elements['multiplierMaxValue'].value,
                        form.elements['multiplicandMinValue'].value,
                        form.elements['multiplicandMaxValue'].value
                    );
                    replaceOrAppendNode(multiplicationTable, form);
                }
            });
        }

        // Expose the initialize function publicly
        return {
            initialize
        };
    })();

    // Initialize the FormProcessor when the document is ready
    $(document).ready(FormProcessor.initialize);
}


