// To initialize an array to store orders
let orders = [];
// To initialize a variable to store the last order number
let lastOrderNumber = 0;

// Function to take orders
// The use of 'async' is to indicate that this contains asynchronous code such as fetching data from an API.
// This allows the use of 'await' within the function to pause execution until a promise is resolved.
async function takeOrder() {
  // To prompt the user for the main ingredient
  const mainIngredient = prompt("Enter the main ingredient for your meal:");

  // To convert mainIngredient to lowercase and replace spaces with underscores
  const formattedIngredient = mainIngredient.toLowerCase().replace(/\s+/g, "_");

  // To build the API URL for filtering by main ingredient
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${formattedIngredient}`;

  // To fetch data from the filter by main ingredient api
  // using try-catch to handle potential errors that may occur when fetching and processing data from API
  try {
    // To fetch data from the filter by main ingredient api
    const response = await fetch(apiUrl);
    const data = await response.json();

    // To check if the API response is okay and meals are found
    if (data.meals && data.meals.length > 0) {
      // To randomly select a meal
      const randomIndex = Math.floor(Math.random() * data.meals.length);
      const selectedMeal = data.meals[randomIndex];

      // To increment the order number
      lastOrderNumber++;

      // To create an order object
      const order = {
        orderNumber: lastOrderNumber,
        description: selectedMeal.strMeal, // To retrieve the description
        completionStatus: "incomplete",
      };

      // To store the order in the orders array
      orders.push(order);

      // To display a success message
      alert(
        `Order #${lastOrderNumber}: ${selectedMeal.strMeal} added to your orders.`
      );
    } else {
      // Display an error message and prompt the user for another ingredient
      alert(`No meals found with the ingredient: ${mainIngredient}`);
    }
  } catch (error) {
    // To catch any fetching error
    console.error("Error fetching data:", error);
  }
}

// Function to display and complete orders
function displayAndCompleteOrders() {
  // To filter incomplete orders
  const incompleteOrders = orders.filter(
    (order) => order.completionStatus === "incomplete"
  );

  console.log("Incomplete Orders:", incompleteOrders);

  // To check if there are any incomplete orders
  if (incompleteOrders.length > 0) {
    // To display incomplete orders and prompt for completion
    let message = "Incomplete Orders:\n";

    // To display incomplete orders
    incompleteOrders.forEach((order) => {
      message += `Order #${order.orderNumber}: ${order.description}\n`;
    });

    message +=
      "Enter the order number to mark as complete (or 0 to leave incomplete):";

    const orderNumberToComplete = parseInt(prompt(message)); // To parse the order number only and leave out any text

    // To find the order by order number
    const orderToComplete = orders.find(
      (order) => order.orderNumber === orderNumberToComplete
    );

    // When an order is found matching the specified order number, it can proceed to mark it as complete.
    if (orderToComplete) {
      // To update the completion status of the found order to "complete"
      orderToComplete.completionStatus = "complete";

      // To save the updated 'orders' array to sessionStorage as a JSON string
      sessionStorage.setItem("orders", JSON.stringify(orders));

      // To display a success message indicating that the order has been marked as complete
      alert(`Order #${orderNumberToComplete} marked as complete.`);
    }
    // If 'orderToComplete' is null or undefined, it means no matching order was found
    // for the specified order number, and we display an error message.
    else {
      alert(`Order #${orderNumberToComplete} not found.`);
    }
  } else {
    // When there is no order placed
    alert("No incomplete orders to display.");
  }
}

// Check if there is a last order number in sessionStorage
const storedLastOrderNumber = sessionStorage.getItem("lastOrderNumber");
if (storedLastOrderNumber) {
  lastOrderNumber = parseInt(storedLastOrderNumber);
}

// Main menu
// To create an immediately invoked async function expression to encapsulate the menu logic
(async () => {
  // Use a while loop to repeatedly display the menu until the user chooses to exit
  while (true) {
    // To prompt the user to choose an option and store their input in the 'choice' variable
    const choice = prompt(
      "Choose an option:\n1. Take Order\n2. Display and Complete Orders\n3. Exit\n(Type only the number of your choice.)"
    );

    // To use a switch statement to execute code based on the user's choice
    switch (choice) {
      case "1":
        await takeOrder(); // Use await to ensure takeOrder completes before continuing
        break;
      case "2":
        // If the user chooses option 2, call the 'displayAndCompleteOrders' function
        displayAndCompleteOrders();
        break;
      case "3":
        // If the user chooses option 3, save the orders to sessionStorage and exit the program
        sessionStorage.setItem("orders", JSON.stringify(orders));
        alert("Thank you for using the Order Management System. Goodbye!");
        return; // Exit the program
      default:
        // If the user enters an invalid choice, display an error message
        alert("Invalid choice. Please select a valid option.");
    }
  }
})();

// References:
// Web Dev Simplified - https://youtu.be/cuEtnrL9-H0?si=D1XfGuKTIS66_zrG
// CodeWithChris - https://youtu.be/Yzx7ihtCGBs?si=v66ns5BxbMaqNzfq
