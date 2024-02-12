# MealDB Ordering App

## Overview

The MealDB Ordering App is a JavaScript application that allows users to interact with The Meal DB API to place and manage orders for chef's favorite meals. It utilizes the `prompt()` and `alert()` functions for user interactions, `fetch` API for consuming the Meal DB API, and `sessionStorage` to store order details.

## Features

### 1. Taking Orders

- Users can input their main ingredient through the `prompt()` function.
- The app calls the Meal DB API to retrieve a list of chef's favorite meals based on the provided main ingredient.
- It randomly selects a meal from the retrieved list and sets it as the order.
- Each order consists of a description, order number, and completion status (completed or incomplete).
- The main ingredient is converted to lowercase and spaces are replaced with underscores for API call.

### 2. Storing Orders

- Order details are stored in `sessionStorage`.
- Each order is assigned a unique order number.
- The app stores the last generated order number to avoid looping over all orders when storing them.

### 3. Displaying and Completing Orders

- Incomplete orders stored in `sessionStorage` are displayed through the `prompt()` function.
- Users can enter the order number to mark an order as complete or enter zero to leave it incomplete.
- Once an order's completion status is updated, it is committed to `sessionStorage`.
- Appropriate response messages are displayed if the entered order number does not exist.

## Storage Format

- The collection of orders is stored as a single value in a JSON array.
- The last order number is stored as a separate value.

## Usage

1. Clone the repository:

```bash
git clone https://github.com/mrbusogithub/mealDB-ordering-app.git
