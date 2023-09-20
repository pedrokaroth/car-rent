# Car Rental System

This is a personal project for a car rental system that allows users to choose cars from different categories and calculate the final rental price based on the selected category and the customer's age.

## Use Cases

### Use Case 01 - Choosing a Car Randomly

As a system user, I want to get an available car in a specific category. To do this:

- Given a car category containing 3 different cars.
- When I check if there's a car available.
- Then it should choose randomly a car from the category chosen.

### Use Case 02 - Calculating the Final Rental Price

As a system user, I want to calculate the final rental price. Given:

- A customer who wants to rent a car for 5 days and is 50 years old.
- The chosen car category costs $37.6 per day.
- I must add the tax of 30% to the car category price.
- The final formula will be `((price per day * Tax) * number of days)`.
- The final result will be `((37.6 * 1.3) * 5) = 244.4`.
- The final price will be printed in Brazilian Portuguese format as "R$ 244,40".

### Use Case 03 - Registering a Renting Transaction

As a system user, I want to register a renting transaction. Given:

- A registered customer who is 50 years old.
- A car model that costs $37.6 per day.
- A delivery date that is for 5 days behind.
- An actual date of 05/11/2020.
- When I rent a car, I should see the customer data, the car selected, the final price (which will be R$ 244,40), and the DueDate printed in Brazilian Portuguese format as "10 de Novembro de 2020".
