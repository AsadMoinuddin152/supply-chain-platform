# Supply Chain Monitoring and Analytics Platform

## Description

The **Supply Chain Monitoring and Analytics Platform** is a cloud-native solution designed for small and medium-sized enterprises (SMEs) to manage their supply chains, including suppliers, inventory, orders, and shipments. This platform provides real-time analytics and insights, helping businesses optimize their operations.

This project consists of multiple components:

1. **Backend**: Handles the logic for user authentication, inventory management, order processing, supplier management, and shipment tracking.
2. **Frontend**: Provides an intuitive interface for users to interact with the platform.
3. **Infrastructure**: Uses **Docker**, **Kubernetes**, **AWS**, and **Jenkins** for automated testing, continuous integration, and deployment.

## Features

### Backend Features

- **User Authentication & Authorization**: Role-based access control with JWT authentication.
- **Inventory Management**: CRUD operations for managing inventory items and monitoring stock levels.
- **Order Management**: Creation, updating, and deletion of orders with stock validation.
- **Supplier Management**: Manage suppliers and their contact details.
- **Shipment Management**: Track and manage shipments related to orders.
- **API Endpoints**: Secure, RESTful APIs for frontend consumption.
- **Testing**: Automated testing for endpoints and functionality.

### Frontend Features

- **User Interface**: Built using **React** and **Redux** for managing application state.
- **Dashboard**: Real-time analytics and overview of orders, inventory, and shipments.
- **Role-based Access**: Different UI for Admin, Manager, and Employee roles.

### Infrastructure Features

- **CI/CD Pipeline**: Automated testing, building, and deployment using **Jenkins**.
- **Docker**: Containerization for ease of deployment.
- **Kubernetes**: Orchestration for deployment, scaling, and management of containerized applications.
- **AWS**: Cloud deployment using various AWS services (S3, Lambda, RDS).

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Redux, JavaScript
- **Authentication**: JWT (JSON Web Token)
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: Jenkins
- **Cloud**: AWS (EC2, S3, Lambda, RDS)

## Folder Structure

### Backend Folder Structure

```
/backend
│
├── /config              # Configuration files (environment variables, database settings)
├── /controllers         # Business logic for each route
├── /models              # Database models (User, Inventory, Order, etc.)
├── /routes              # Express routes for handling requests
├── /middlewares         # Middleware for authentication and authorization
├── /utils               # Utility functions
├── /tests               # Unit tests for backend
├── /logs                # Logs directory
├── /public              # Public assets (if any)
├── /docs                # Documentation files
├── /docker              # Docker configuration files (Dockerfile, docker-compose.yml)
└── server.js            # Main entry point for the server
```

### Frontend Folder Structure

```
/frontend
│
├── /src
│   ├── /components      # React components
│   ├── /redux          # Redux actions and reducers
│   ├── /utils          # Utility functions
│   ├── /assets         # Static files (images, styles, etc.)
│   └── App.js          # Main application component
└── package.json        # Frontend dependencies and scripts
```

### Infrastructure Folder Structure

```
/infrastructure
│
├── /k8s                 # Kubernetes configuration files (deployment.yaml, service.yaml)
├── /jenkins             # Jenkins pipeline configuration files (Jenkinsfile)
└── /docker              # Docker configuration files (Dockerfile, .dockerignore)
```

## Getting Started

### Prerequisites

- **Node.js** (>=14.x)
- **MongoDB** (or MongoDB Atlas for cloud storage)
- **Docker** (for containerization)
- **Kubernetes** (for deployment)
- **Jenkins** (for CI/CD pipeline)
- **AWS** (for cloud deployment)
- **React** (for frontend development)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/supply-chain-platform.git
cd supply-chain-platform
```

### 2. Setup Backend

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the backend directory and set the following variables:

```env
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
MONGO_URI=mongodb://localhost:27017/supply-chain-db
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
```

#### Run the Backend

To run the backend locally:

```bash
npm start
```

### 3. Setup Frontend

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Run the Frontend

To start the frontend locally:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

### 4. Docker Setup

To run the platform using Docker, follow these steps:

#### Build the Docker image:

```bash
docker build -t supply-chain-platform .
```

#### Run the Docker container:

```bash
docker run -p 5000:5000 supply-chain-backend
docker run -p 3000:3000 supply-chain-frontend
```

### 5. Running Tests

To run tests for both the backend and frontend, use the following commands:

#### Backend Tests

```bash
cd backend
npm test
```

#### Frontend Tests

```bash
cd frontend
npm test
```

### 6. Deployment

The platform is designed to be deployed on **AWS** using **Docker** and **Kubernetes**.

#### Deploy Backend

1. Build and push the Docker image:

   ```bash
   docker build -t your_dockerhub_username/supply-chain-backend:latest .
   docker push your_dockerhub_username/supply-chain-backend:latest
   ```

2. Update Kubernetes deployment configuration and apply it:

   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

#### Deploy Frontend

1. Build and push the Docker image for the frontend:

   ```bash
   docker build -t your_dockerhub_username/supply-chain-frontend:latest .
   docker push your_dockerhub_username/supply-chain-frontend:latest
   ```

2. Update Kubernetes configuration for frontend and apply it.

#### Jenkins CI/CD

Automated testing, Docker image building, and deployment are handled by **Jenkins** using the `Jenkinsfile` in the `infrastructure/jenkins` directory.

## Contributing

Feel free to fork this repository and submit a pull request with your proposed changes. Please ensure that you run tests and follow the project's coding guidelines before submitting a PR.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, feel free to reach out:

- Email: moinuddinasad@gmail.com
- GitHub: https://github.com/AsadMoinuddin152
