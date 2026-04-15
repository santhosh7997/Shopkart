# Shopkart — Modular E-Commerce Platform

A production-grade e-commerce backend built with Spring Boot microservices, 
JWT authentication, and Razorpay payment integration.

## Architecture

6 independently deployable microservices:

| Service       | Responsibility                          | Port  |
|---------------|-----------------------------------------|-------|
| Auth Service  | JWT login/register, Spring Security     | 8081  |
| User Service  | Profile management, role-based access   | 8082  |
| Product Service | Catalogue, search, inventory          | 8083  |
| Cart Service  | Add/remove items, quantity management   | 8084  |
| Order Service | Order lifecycle, history               | 8085  |
| Payment Service | Razorpay integration, webhook confirm | 8086  |

## Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Security, Spring Data JPA
- **Auth:** JWT (Access + Refresh tokens), Role-based access control
- **Database:** MySQL with indexing on high-query columns
- **Payment:** Razorpay (UPI, cards, net banking + webhook verification)
- **Frontend:** React.js
- **Testing:** JUnit 5 — 95%+ code coverage
- **Tools:** Maven, Git, Postman

## Key Features

- JWT authentication with refresh token rotation
- Razorpay payment gateway with webhook-based order confirmation
- Normalized MySQL schema across 6 services with query optimization
- Full e-commerce flow: browse → cart → checkout → payment → confirmation
- Role-based access: ADMIN / USER

## Running Locally

### Prerequisites
- Java 17+
- MySQL 8+
- Maven 3.8+

### Steps

```bash
# Clone the repo
git clone https://github.com/santhosh7997/Shopkart.git
cd Shopkart

# Set up MySQL — create databases for each service
mysql -u root -p < setup/init.sql

# Configure each service (update application.properties)
# DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

# Start services (in order)
cd auth-service && mvn spring-boot:run &
cd product-service && mvn spring-boot:run &
# ... repeat for all services
```

## API Overview

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/auth/refresh` | Refresh access token |

### Product
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List all products |
| GET | `/products/{id}` | Product detail |
| POST | `/products` | Add product (ADMIN) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/cart/add` | Add item to cart |
| GET | `/cart` | View cart |
| DELETE | `/cart/{itemId}` | Remove item |

### Payment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payment/initiate` | Create Razorpay order |
| POST | `/payment/webhook` | Razorpay webhook handler |

## Design Decisions

**Why microservices?** Each service (auth, product, cart, etc.) has a different 
scaling profile. Product search gets more load than order history — independent 
deployment lets us scale selectively.

**Why JWT over sessions?** Stateless auth fits microservices — no shared session 
store needed between services.

**MySQL indexing strategy:** Added composite indexes on `(user_id, created_at)` 
for order history queries and on `(category, price)` for product search — reduced 
query time significantly on 10k+ row datasets.

## Contact

Santhosh Kanne — [LinkedIn](https://www.linkedin.com/in/santhoshkanne) | santhos799750h@gmail.com
