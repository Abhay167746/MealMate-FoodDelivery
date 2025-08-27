🍽️ MealMate

A full-stack food ordering platform built with React.js, Node.js, Express.js, and MongoDB, featuring secure payments with Stripe and an admin panel for order management.

🚀 Features
👨‍🍳 User Side

🔐 Authentication – Sign up, login, and manage profiles securely.

🛒 Cart Management – Add, remove, and update items in real-time.

💳 Stripe Payments – Secure checkout with Stripe payment gateway.

📦 Order Tracking – View order history and live delivery status updates.

🛠️ Admin Panel

📋 Menu Management – Add, update, or delete food items.

🛍️ Order Processing – View and process customer orders in real time.

🚚 Delivery Updates – Update delivery status for better customer communication.

🖥️ Tech Stack

Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Payments: Stripe API
Testing/Debugging: Postman 



2️⃣ Install Dependencies

For frontend

cd client
npm install


For backend

cd ../server
npm install

3️⃣ Set Environment Variables

Create a .env file in the server directory with the following:

MONGO_URI=your_mongodb_connection_string  
STRIPE_SECRET_KEY=your_stripe_secret_key  
JWT_SECRET=your_jwt_secret  

4️⃣ Run the Application

Run backend

cd server
npm run dev


Run frontend

cd client
npm run dev

🎯 Future Enhancements

📱 Mobile responsive PWA version

⭐ Ratings & Reviews for dishes

📍 Location-based delivery tracking


👨‍💻 Author

Abhay Tiwari
