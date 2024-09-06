# Volunteer Management System

This project is a volunteer management platform designed to help communities organize and manage volunteer activities. It provides an intuitive interface for users to view the communities they belong to, manage tasks as community leaders, and join tasks as volunteers.

## Features

- **User Dashboard:** Each user can view all communities they belong to.
- **Volunteer Tasks:** Volunteers can view tasks within their communities and join specific tasks they are interested in by marking them with a check.
- **Community Leader Tools:** Leaders of a community can create new tasks, approve volunteers for tasks, and close tasks when they no longer need volunteers.
- **Community and Task Management:** Easily switch between managing tasks in communities where you are a leader and joining tasks in communities where you are a volunteer.

## Requirements

- **MySQL**: Used for storing community and task data.
- **Google Maps API**: Needed to display the locations of volunteer opportunities on a map.
- **Node.js**: Required for running the back-end and front-end servers.

## Technologies Used

- **Front-end:** React, Axios
- **Back-end:** Node.js, Express
- **Database:** MySQL

## Installation and Setup

### Back-end

1. Navigate to the `backend/server` folder.
2. Run the following command to start the back-end server:
    ```bash
    node index
    ```

### Front-end

1. Navigate to the `client` folder.
2. Run the following command to start the front-end server:
    ```bash
    npm start
    ```

### Prerequisites

- Ensure that MySQL is installed and running on your machine.
- Set up your Google Maps API key and include it in the necessary configuration files.

## First-Time Setup

1. Upon first visit, you will be presented with a login page.
2. If you don't have an account yet, click on the "Don't have an account yet? Sign up" link.
3. After registration with a username and password, you will be redirected to the login page.
4. Log in with your newly created credentials to start managing or joining community tasks.

## Contribution

Feel free to contribute to this project by forking the repository, making changes, and submitting pull requests. We welcome any contributions to improve the functionality, design, or performance of the platform.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
