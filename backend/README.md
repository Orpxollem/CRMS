# Backend Setup and Run Instructions

This backend is built with Flask and uses MongoDB for data storage. It provides JWT-based authentication and protected API endpoints.

## Prerequisites

- Python 3.8 or higher
- MongoDB instance (Atlas or local)
- `pip` package manager

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Create a virtual environment (recommended)**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**

   Create a `.env` file in the `backend` directory with the following content:

   ```
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/crms_db?retryWrites=true&w=majority
   SECRET_KEY=your_secret_key_here
   ```

   Replace the `MONGO_URI` and `SECRET_KEY` with your actual MongoDB connection string and a secure secret key.

5. **Create an admin user**

   Run the admin creation script to add an initial admin user:

   ```bash
   python create_admin.py
   ```

   Follow the prompts to enter username, email, and password.

## Running the Backend

Start the Flask development server:

```bash
python app.py
```

The backend will be available at `http://localhost:5000`.

## API Endpoints

- `POST /token` - Login endpoint. Accepts form data `username` (email) and `password`. Returns JWT access token.
- `GET /contacts` - Protected endpoint to get contacts. Requires Bearer token in `Authorization` header.
- `POST /contacts` - Protected endpoint to create a new contact. Requires Bearer token.

## Notes

- Ensure your frontend uses the backend API base URL (e.g., `http://localhost:5000`) in its environment variables.
- For production deployment, configure proper CORS settings and secure environment variables.
- Use HTTPS in production to secure token transmission.

## Troubleshooting

- If you encounter connection issues, verify your MongoDB URI and network access.
- Check that the `.env` file is correctly loaded.
- Review console logs for errors during startup or API calls.
