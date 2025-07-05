// Global array to hold todo items, each with an item description and due date
let todoList = [
    {
        item : 'Buy groceries', // Task description
        duedate : '2023-10-01' // Due date for the task
    },
    {
        item : 'Buy groceries',
        duedate : '2023-10-01'
    },
    {
        item : 'Buy groceries',
        duedate : '2023-10-01'
    },
    {
        item : 'Buy groceries',
        duedate : '2023-10-01'
    }
];

// Initial call to display the todo items on page load
displayToDO();

/**
 * Function: addTodo
 * Purpose: To add a new todo item to the todoList array and update the display
 * Steps:
 * 1. Select the text input element where user types the task description
 * 2. Select the date input element where user selects the due date
 * 3. Retrieve the current values from these inputs
 * 4. Create a new todo object with item and duedate properties
 * 5. Push this new object into the todoList array
 * 6. Clear the input fields to prepare for next entry
 * 7. Call displayToDO to refresh the displayed list with the new item included
 */
function addTodo() {
    let inputItem = document.querySelector('#todoInput'); // Get the task description input element
    let inputDate = document.querySelector('#todoDate'); // Get the due date input element
    let inputDateValue = inputDate.value; // Extract the selected date value as a string
    let todoItems = inputItem.value; // Extract the task description string

    // Add the new todo item object to the todoList array
    todoList.push({item: todoItems, duedate: inputDateValue});

    // Clear the input fields after adding the task
    inputItem.value = ""; // Reset task description input to empty string
    inputDate.value = ""; // Reset date input to empty string

    // Update the displayed todo list with the new item
    displayToDO();
}

/**
 * Function: displayToDO
 * Purpose: To render the current todoList array items inside the .todo-Container div
 * Steps:
 * 1. Select the container div where todo items will be displayed
 * 2. Initialize an empty string to accumulate HTML content
 * 3. Loop through each todo item in the todoList array
 * 4. For each item, destructure the item description and due date
 * 5. Append a div element string containing:
 *    - A span for the task description
 *    - A span for the due date
 *    - A delete button with an onclick handler to remove the item and refresh the list
 * 6. Set the innerHTML of the container div to the accumulated HTML string
 */
function displayToDO() {
    let ContainerElement = document.querySelector('.todo-Container'); // Select the container div
    let newHtml = ''; // Initialize an empty string to build HTML content

    // Loop through each todo item in the todoList array
    for(let i = 0; i < todoList.length; i++) {
        // Destructure the item description and due date from the current todo object
        let {item, duedate} = todoList[i];

        // Append a div for each todo item with spans for item and date, and a delete button
        newHtml += 
            `<div>
                <span>${item}</span> <!-- Display task description -->
                <span>${duedate}</span> <!-- Display due date -->
                <button onclick="todoList.splice(${i}, 1); displayToDO();">Delete</button> <!-- Delete button removes item and refreshes list -->
            </div>`;
    }

    // Set the innerHTML of the container div to the constructed HTML string
    ContainerElement.innerHTML = newHtml;
}
