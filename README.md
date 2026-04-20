# 🛒 Shopkart – Spring Boot E-Commerce Application

Shopkart is a modular, microservices-based e-commerce application built with **Spring Boot 3.4.1**. It uses **MySQL** for transactional data, **JWT** for authentication, and **Razorpay** for payment processing.

---

## 🚀 Features

- User Registration & Login with JWT Authentication
- Role-Based Access Control (RBAC)
- Product Catalog Management
- Shopping Cart
- Order Management
- Secure Payment Integration via **Razorpay**
- RESTful APIs (testable via Postman)

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Language   | Java 17                                 |
| Framework  | Spring Boot 3.4.1, Spring Security      |
| Database   | MySQL                                   |
| Auth       | JWT (jjwt 0.11.5)                       |
| Payment    | Razorpay Java SDK 1.4.8                 |
| ORM        | Spring Data JPA (Hibernate)             |
| Build Tool | Maven                                   |
| Frontend   | HTML5, CSS3, JavaScript                 |

---

## ✅ Prerequisites

Make sure you have the following installed before running the project:

- [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven 3.6+](https://maven.apache.org/download.cgi)
- [MySQL](https://dev.mysql.com/downloads/) (running locally or on a cloud DB)
- [Git](https://git-scm.com/)
- A [Razorpay account](https://razorpay.com/) (for API keys)

---

## ⚙️ Installation & Setup

### Step 1 – Clone the Repository

```bash
git clone https://github.com/santhosh7997/Shopkart.git
cd Shopkart
```

---

### Step 2 – Create the MySQL Database

Open your MySQL client and run:

```sql
CREATE DATABASE shopkart;
```

---

### Step 3 – Configure Application Properties

Open `src/main/resources/application.properties` and update the following:

```properties
# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/shopkart
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Secret Key
jwt.secret=YOUR_JWT_SECRET_KEY

# Razorpay
razorpay.key.id=YOUR_RAZORPAY_KEY_ID
razorpay.key.secret=YOUR_RAZORPAY_KEY_SECRET
```

> 💡 Replace all `YOUR_*` placeholders with your actual credentials.

---

### Step 4 – Build the Project

```bash
mvn clean install
```

---

### Step 5 – Run the Application

```bash
mvn spring-boot:run
```

The application will start at: **http://localhost:8080**

---

## 🧪 API Endpoints (Quick Reference)

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/auth/register`   | Register a new user      |
| POST   | `/api/auth/login`      | Login and get JWT token  |
| GET    | `/api/products`        | Get all products         |
| POST   | `/api/cart/add`        | Add item to cart         |
| POST   | `/api/orders`          | Place an order           |
| POST   | `/api/payment`         | Initiate Razorpay payment|

> Use **Postman** or any REST client to test the APIs. Add the JWT token as a `Bearer` token in the `Authorization` header for protected routes.

---

## 📁 Project Structure

```
Shopkart/
├── src/
│   ├── main/
│   │   ├── java/com/example/shopkart/
│   │   │   ├── controller/       # REST Controllers
│   │   │   ├── service/          # Business Logic
│   │   │   ├── repository/       # JPA Repositories
│   │   │   ├── model/            # Entity Classes
│   │   │   ├── config/           # Security & JWT Config
│   │   │   └── ShopkartApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

---

## 👨‍💻 Contributors

- **Santhosh Kanne** – Java Full Stack Developer
- **Ramesh2135**

---

## 📜 License

This project is licensed under the **MIT License**.
