Shopkart – Modular E-Commerce Platform
Shopkart is a robust, microservices-based e-commerce application built using Spring Boot. It leverages a polyglot persistence strategy (MySQL and MongoDB) and integrates modern security and payment standards to provide a scalable and resilient shopping experience.

🚀 Key Features
Microservices Architecture: 6 independently deployable services (Auth, Product, Cart, Order, Payment, and User).

Security: Implemented JWT (JSON Web Token) for stateless authentication and Role-Based Access Control (RBAC).

Polyglot Persistence: * MySQL: Ensures ACID compliance for transactional data like Orders and Payments.

MongoDB: Provides flexibility for the evolving schema of the Product Catalog.

Payment Integration: Seamless transaction handling via Razorpay API with webhook-based order confirmation.

Performance: Optimized data retrieval with Spring Data JPA, achieving significant improvements in query performance.

🛠️ Tech Stack
Backend
Language: Java (JDK 17+)

Framework: Spring Boot, Spring Security, Spring Data JPA

Architecture: Microservices, RESTful APIs, MVC Pattern

Security: JWT, OAuth2

Frontend
Framework: React.js

Styling: HTML5, CSS3, JavaScript (ES6+)

Database & Tools
Relational: MySQL

NoSQL: MongoDB

Tools: Maven, Postman (API Testing), Git/GitHub

🏗️ Project Structure
The project is organized into several modular services:

Auth Service: Handles user registration, login, and JWT generation.

Product Service: Manages the catalog using MongoDB for dynamic attributes.

Cart Service: Manages user shopping carts and persistent storage.

Order Service: Processes orders and maintains transaction history in MySQL.

Payment Service: Interfaces with Razorpay for secure payment processing.

User Service: Manages user profiles and account details.

🚦 Getting Started
Prerequisites
Java 17 or higher

Maven 3.6+

MySQL and MongoDB instances (local or cloud)

Razorpay API Keys

Installation
Clone the repository:

Bash
git clone https://github.com/santhosh7997/Shopkart.git
cd Shopkart
Configure Databases:
Update the application.properties or application.yml files in each service with your database credentials and API keys.

Build the project:

Bash
mvn clean install
Run the application:
Since this is a microservices project, start each service individually or use a Docker Compose file (if available).

Bash
mvn spring-boot:run
🧪 API Testing
Detailed API documentation can be explored using Postman. The project includes endpoints for:

POST /api/auth/login - Authenticate users.

GET /api/products - Fetch product catalog.

POST /api/orders - Place a new order.

🤝 Contributors
Santhosh Kanne - Java Full Stack Developer

Ramesh2135

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
