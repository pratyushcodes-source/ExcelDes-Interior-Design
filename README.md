# 🛋️ Exceldes – AI-Powered Interior Design Assistant

> Turn any room into a personalized masterpiece using artificial intelligence.

Exceldes is a full-stack AI web application that empowers users to reimagine their room interiors with minimal effort. By simply uploading a room image and selecting a desired design style, users receive intelligent, visually rich design suggestions powered by GPT-4 Vision and DALL·E. The tool enhances creativity, saves time, and simplifies the interior design decision process for users, designers, and real estate enthusiasts alike.

---

## 🎯 Project Objectives

- 🧠 Leverage cutting-edge AI (GPT-4 Vision + DALL·E) to generate interior design ideas from room images.
- 🎨 Provide personalized design suggestions based on user-selected styles.
- 🔍 Enable semantic similarity search through embeddings and vector search (OpenAI + Pinecone).
- 🧾 Store user design history and metadata for future access and recommendations.
- 🔐 Secure user access through scalable, production-grade authentication (Clerk).
- 🌐 Deliver a sleek, responsive experience with a modern frontend and API-first architecture.

---

## 🚀 Live Demo

[🔗 Live Demo Coming Soon](https://your-deployment-url.com)

---

## 🧠 Key Features

| Feature                     | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| 📸 Image Upload             | Upload real room images from mobile or desktop                              |
| 🎨 Style Selection          | Choose from styles like Minimalist, Modern, Scandinavian, etc.              |
| 🧠 AI Vision & Generation   | GPT-4 Vision + DALL·E generates detailed and realistic interior design ideas |
| ✍️ Design Description       | Natural language summary of design choices (lighting, color, furniture)     |
| 🔐 Auth with Clerk          | User authentication via email, Google, GitHub with secure session handling  |
| 🧾 Design History            | Stores and displays previously generated designs per user                   |
| 🔍 Vector Search (Pinecone) | Search for similar designs based on style and semantics                     |
| ☁️ Full-Stack Architecture  | Seamless integration between frontend, backend, AI services, and DB         |

---

## 🧱 Tech Stack

### 🖥️ Frontend
- **React** – Component-driven architecture for dynamic UI
- **Tailwind CSS** – Utility-first styling for modern, responsive layout
- **Clerk** – Plug-and-play auth for login, session, user identity
- **Fetch API** – Lightweight, modern request handling

### 🧠 AI Integration
- **OpenAI GPT-4 Vision** – Understands and analyzes uploaded room images
- **DALL·E (Optional)** – Generates photorealistic design variations (if used)
- **OpenAI Embeddings** – Converts design text into semantic vectors for search

### 🧪 Backend
- **Node.js + Express** – RESTful API to manage image processing, AI generation, DB interaction
- **Multer** – Handles multipart image uploads from frontend
- **Dotenv** – Secure .env variable handling for all API keys and secrets

### 🧰 Databases
- **MongoDB (via Mongoose)** – Stores user data, design history, room metadata
- **Pinecone** – High-performance vector database for storing and retrieving embedded design data

---

## 🖼️ Example Workflow

1. **User uploads** an image of their room and selects a desired design style.
2. The **image is sent to the backend** where it's processed and analyzed by **GPT-4 Vision**.
3. The AI generates a **textual description** of the new design based on the selected style.
4. The description is:
   - **Returned to the frontend**
   - **Embedded** using OpenAI Embeddings
   - **Stored** in Pinecone for similarity search
   - **Logged** in MongoDB with metadata and user association
5. The frontend displays the design output (text + image) and stores it under the user’s history.

---

## 🗂️ Folder Structure
exceldes/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── hooks/
├── server/ # Node.js backend
│ ├── routes/
│ ├── controllers/
│ ├── utils/
│ └── models/
├── .env
├── README.md


---

## 🔐 Environment Variables

**Frontend (`client/.env`)**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_frontend_key
VITE_BACKEND_URL=http://localhost:5000
Backend (server/.env)


OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_connection
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=your_pinecone_env
PINECONE_INDEX_NAME=your_index_name
CLERK_SECRET_KEY=your_clerk_backend_key

💻 Local Setup
1. Clone the Repository

git clone https://github.com/your-username/exceldes.git
cd exceldes
2. Install Dependencies
Frontend:


cd client
npm install
Backend:


cd server
npm install
3. Run the Application
Start backend:


cd server
npm run dev
Start frontend:


cd client
npm run dev

📈 Future Enhancements
🖼️ Drag-and-drop room layout planner

🧾 Export AI design suggestions as PDF

🎯 Add multi-room support (living, kitchen, etc.)

🛒 Integration with furniture e-commerce APIs

📊 Admin dashboard for design trend analytics

📄 License
This project is licensed under the MIT License.
Feel free to build on top of Exceldes or adapt it for your own creative tools.

🙌 Acknowledgements
OpenAI

Clerk

Pinecone

MongoDB Atlas

Tailwind CSS



