
# Grecipe CS 476 Project

## Overview

A full-stack web Application.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (v6 or higher recommended)

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/r97draco/grecipe.git
cd grecipe
```

#### Client Setup

Navigate to the client directory and install the dependencies:

```bash
cd client
npm install
```

To start the client development server:

```bash
npm start
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

#### Server Setup

Navigate to the server directory and install the dependencies:

```bash
cd server
npm install
```

To start the server for development:

```bash
npm dev
```

The server will be running on [http://localhost:9191](http://localhost:9191).

### Environment Variables

Client .env :
```
REACT_APP_VERSION = v1.0
```

Server .env :
```
NODE_ENV = "development"
```

Replace the values with your actual configuration details.

## Features

- **Advanced Authentication**: Secure authentication system using `jsonwebtoken` and `firebase-admin`.

## Scripts

In the `client` directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

In the `server` directory, you can run:

- `npm start`: Starts the Node.js server with `nodemon` for auto-reloading.
- `npm run dev`: Runs the server in development mode.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgements

- [Axios](https://axios-http.com/)
- [Firebase](https://firebase.google.com/)
- ...and all other fantastic open-source projects.
