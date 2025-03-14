# Supply Chain Monitoring and Analytics Platform - Backend

## Description

The backend of the **Supply Chain Monitoring and Analytics Platform** is designed for small and medium-sized enterprises (SMEs) to manage their inventory, suppliers, orders, and shipments. The platform is built using **Node.js**, **MongoDB**, **JWT Authentication**, and **Docker**. It utilizes **Kubernetes** for deployment and continuous integration with **Jenkins** for automated testing and deployment.

## Features

- **User Authentication**: JWT-based authentication with role-based access control (Admin, Manager, Employee).
- **Inventory Management**: CRUD operations for inventory items.
- **Order Management**: Create, update, and delete orders. Orders are linked to inventory items, and stock is automatically updated.
- **Supplier Management**: Manage supplier details.
- **Role-Based Access Control**: Different roles with varying levels of access.
- **CI/CD Integration**: Jenkins for automated testing and deployment to Kubernetes.
- **Cloud Deployment**: Deployment to AWS using Docker and Kubernetes.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **MongoDB**: NoSQL database for data storage.
- **JWT Authentication**: For secure user authentication.
- **Docker**: Containerization of the backend application.
- **Kubernetes**: For container orchestration and deployment.
- **Jenkins**: For CI/CD pipeline (automated testing, Docker image build, push to Docker Hub, and Kubernetes deployment).
- **Express**: Web framework for Node.js.

## API Endpoints

### Authentication Routes

- `POST /api/users/login`: Login user and obtain JWT token.
- `POST /api/users/register`: Register a new user.

### Supplier Routes

- `POST /api/suppliers`: Create a new supplier.
- `GET /api/suppliers`: Get all suppliers.
- `GET /api/suppliers/:id`: Get a single supplier by ID.
- `PUT /api/suppliers/:id`: Update a supplier by ID.
- `DELETE /api/suppliers/:id`: Delete a supplier by ID.

### Inventory Routes

- `POST /api/inventory`: Add a new inventory item.
- `GET /api/inventory`: Get all inventory items.
- `GET /api/inventory/:id`: Get a single inventory item by ID.
- `PUT /api/inventory/:id`: Update an inventory item by ID.
- `DELETE /api/inventory/:id`: Delete an inventory item by ID.

### Order Routes

- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get all orders.
- `GET /api/orders/:id`: Get a single order by ID.
- `PUT /api/orders/:id`: Update an order by ID.
- `DELETE /api/orders/:id`: Delete an order by ID.

### Shipment Routes

- `POST /api/shipments`: Create a new shipment.
- `GET /api/shipments`: Get all shipments.
- `GET /api/shipments/:id`: Get a single shipment by ID.
- `PUT /api/shipments/:id`: Update a shipment by ID.
- `DELETE /api/shipments/:id`: Delete a shipment by ID.

## Setup and Installation

### Prerequisites

- **Node.js** (>=14.x)
- **MongoDB** (or MongoDB Atlas for cloud storage)
- **Docker** (for containerization)
- **Kubernetes** (for deployment)
- **Jenkins** (for CI/CD pipeline)
- **AWS** (for cloud deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/supply-chain-backend.git
cd supply-chain-backend
```

### 2. Install Dependencies

Install the required dependencies using **npm**:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and set the following environment variables:

```env
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
MONGO_URI=mongodb://localhost:27017/supply-chain-db
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
```

### 4. Running Locally

To run the backend locally, use the following command:

```bash
npm start
```

This will start the server on **http://localhost:5000** (or your specified port).

### 5. Running with Docker

To run the backend in a Docker container, use the following commands:

#### Build the Docker image:

```bash
docker build -t supply-chain-backend .
```

#### Run the Docker container:

```bash
docker run -p 5000:5000 supply-chain-backend
```

### 6. Running Tests

To run the tests locally, use the following command:

```bash
npm test
```

The tests are located in the `tests` directory and are run using **Jest**.

### 7. Deployment

The backend can be deployed to **AWS** or other cloud platforms using **Docker** and **Kubernetes**. The deployment process is automated using **Jenkins**.

#### To deploy manually:

1. **Build and push the Docker image**:

   ```bash
   docker build -t your_dockerhub_username/supply-chain-backend:latest .
   docker push your_dockerhub_username/supply-chain-backend:latest
   ```

2. **Deploy to Kubernetes**:

   Update the Kubernetes deployment configuration (e.g., `deployment.yaml`) to point to the newly pushed Docker image.

   ```bash
   kubectl apply -f k8s/deployment.yaml
   ```

## CI/CD Pipeline (Jenkins)

The **Jenkinsfile** automates the process of testing, building, and deploying the application. It includes the following steps:

1. **Run Tests**: Run unit tests to ensure the backend functionality is correct.
2. **Build Docker Image**: Build the Docker image for the backend.
3. **Push to Docker Hub**: Push the Docker image to Docker Hub (or another container registry).
4. **Deploy to Kubernetes**: Deploy the updated backend image to the Kubernetes cluster.

## Kubernetes Configuration

The Kubernetes configuration files are located in the `k8s/` directory. They include:

- **deployment.yaml**: The Kubernetes deployment configuration for the backend service.
- **service.yaml**: The Kubernetes service configuration to expose the backend service.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your proposed changes. Ensure that you run tests before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, feel free to reach out:

- Email: moinudinasad@gmail.com
- GitHub: https://github.com/AsadMoinuddin152
