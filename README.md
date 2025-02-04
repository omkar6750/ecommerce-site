# E-Commerce Site

Welcome to the **E-Commerce Site** project! This application is built with a **Flask** backend and a **React** (Vite) frontend. It uses modern technologies such as **Tailwind CSS**, **shadcn/ui components**, **Axios**, **React Router**, and **Zustand** for state management.

> **Note:** The database is currently empty, so mock data is used for product display. Features like profile checkout, full user profiles, and complete admin functionalities are still under development.

---

## Technologies Used

### Frontend
- **React & Vite:** Fast development environment for building React applications.
- **Tailwind CSS:** Utility-first CSS framework for responsive, modern designs.
- **shadcn/ui Components:** Pre-designed, customizable UI components.
- **Axios:** Promise-based HTTP client for API requests.
- **React Router:** Declarative routing for navigation.
- **Zustand:** Lightweight state management.

### Backend
- **Flask:** Lightweight Python web framework.
- **Flask-CORS:** Enables Cross-Origin Resource Sharing.
- **SQLAlchemy:** ORM for database interactions.
- **JWT:** JSON Web Tokens for authentication.
- **SQLite:** Used by default (mock data is used for now).

---

## Setup & Installation

### Backend Setup

1. **Create a `.env` file** in your backend root directory with the following variables:

    ```env
    JWT_SECRET_KEY=your_jwt_secret_key_here
    CORS_URI=https://localhost:5173/
    ```

2. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the Flask server:**

    ```bash
    flask run
    ```

   The backend server will start at: `http://127.0.0.1:5000`

### Frontend Setup

1. **Create a `.env` file** in your frontend root directory with the following variable:

    ```env
    VITE_SERVER_URL=http://127.0.0.1:5000
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the Vite development server:**

    ```bash
    npm run dev
    ```

   The frontend will be accessible at: `http://localhost:5173`

---

## Running the Application Locally

1. **Start the Backend:**  
   Run the Flask app with `flask run`. The backend will be available at `http://127.0.0.1:5000`.

2. **Start the Frontend:**  
   Run the Vite development server with `npm run dev`. Open your browser at `http://localhost:5173`.

3. **Navigate the Site:**  
   Use the navigation bar to explore shop categories, product details, the cart, and other routes.

---

## Features

- **Product Display:**  
  - Products are displayed in a grid using Tailwind CSS.
  - Currently uses mock data (due to the empty database).

- **Shopping Cart:**  
  - Basic cart functionalities implemented with Zustand.
  - Users can add, remove, and clear items.

- **User Authentication:**  
  - JWT-based authentication is set up on the backend.
  - Authentication routes are provided for login, signup, etc.

- **Routing:**  
  - Uses React Router to navigate between pages (Shop, Product Detail, Cart, Admin, etc.).

---

## Known Limitations & Future Enhancements

- **Profile Checkout & User Profiles:**  
  These features are not fully implemented yet.

- **Admin Functionalities:**  
  Basic admin routes exist, but product editing and other admin actions need further development.

- **Real Data Integration:**  
  The app currently displays mock data; integration with real database data is pending.

---

## Additional Notes

- **CORS Configuration:**  
  The backend uses Flask-CORS to allow requests from `https://localhost:5173`.

- **Axios Usage:**  
  Axios is used in the frontend to make HTTP requests to the backend API.

- **UI Components:**  
  The design is powered by Tailwind CSS and shadcn/ui components for a modern, responsive UI.

---

Happy coding! 🚀  
If you encounter any issues or have suggestions, feel free to open an issue or contribute to the project.
