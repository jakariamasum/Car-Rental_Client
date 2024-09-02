# RideX: A Car Rental Reservation System

A user-friendly and responsive car rental reservation platform for customers and administrators. This system offers a smooth experience for browsing, booking, and managing cars, while providing administrators with tools to manage inventory and reservations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

### Public Pages

- **Home Page**: Showcases featured cars, testimonials, and more.
- **Car Listing Page**: Displays all available cars with filters.
- **Car Details Page**: Detailed view of selected car with booking options.
- **About Us Page**: Information about the company, team, and fleet.
- **Error Page**: Custom 404 and error handling.
- **User Authentication Pages**: Sign Up and Sign In forms with validation and error handling.

### User Pages (Private/Protected Routes)

- **User Dashboard**: View and manage personal information, booking history, and payments.

### Admin Pages (Private/Protected Routes)

- **Admin Dashboard**: Manage cars, bookings, returns, and user accounts.
- **User Management**: Admin can block/activate accounts and change user roles.
- **Reports**: Generate detailed reports on car usage, revenue, and more.

### Booking Page (User/Admin)

- **Search Form**: Find cars based on type, location, and other criteria.
- **Booking Form**: Collect user details, payment information, and additional options.
- **Booking Confirmation**: Review and finalize reservations.

## Tech Stack

- **Frontend**: React, TypeScript, Redux, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jakariamasum/Car-Rental_Client
   cd Car-Rental_Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the application:

```bash
cd Car-Rental_Client
npm run dev
```

3. Open your browser and go to `http://localhost:5173`.

## Future Enhancements

- [ ] Add multi-language support.
- [ ] Implement notifications for booking updates.
- [ ] Add payment gateway integration.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
