Exceldes Interior AI Tool 🏡✨

An AI-powered interior design platform that transforms real room photos into personalized design makeovers. Built with a full-stack architecture, this tool leverages computer vision, generative AI, and vector-based recommendation systems to provide users with practical and visually appealing interior design suggestions.

🚀 Project Overview

This project was developed to enhance user experience in interior design by providing instant, AI-driven recommendations based on uploaded room images. Key capabilities include:

Room Analysis: Identifies room type, layout, and style preferences from uploaded images.

AI-Generated Makeovers: Uses GPT-4 Vision and AI models to suggest furniture placement, decor styles, and color schemes.

Recommendation Engine: Vector-based retrieval system powered by OpenAI embeddings and Pinecone to suggest design ideas aligned with user intent.

Interactive Chatbot: Offers contextual tips, pricing in INR, and sourcing suggestions specific to the Indian market.

Seamless Experience: Side-by-side comparisons of original vs. AI-generated design for intuitive exploration.

✨ Features

AI-Powered Design: Transform room images into makeover suggestions using GPT-4 Vision.

Vector Search Recommendations: Find design inspirations quickly with Pinecone + OpenAI embeddings.

Full-Stack Architecture: Secure and scalable frontend (React, Tailwind CSS) + backend (Node.js, MongoDB).

User Authentication: Handled via Clerk for safe and easy logins.

Interactive UI: Intuitive uploads, style previews, and personalized suggestions.

🛠 Tech Stack
Layer	Technology
Frontend	React, TypeScript, Tailwind CSS
Backend	Node.js, Express.js
AI/ML	OpenAI GPT-4 Vision, Pinecone Embeddings
Database	MongoDB
Auth	Clerk
Deployment	Vercel / Node.js server
📁 Folder Structure
exceldes-interior-ai/
├── public/                # Static assets
├── src/
│   ├── components/        # React components (Upload, Chatbot, UI elements)
│   ├── services/          # Backend API services
│   └── App.tsx            # Main React entry point
├── scripts/               # Data processing & AI model scripts
├── backend/               # Node.js backend routes & controllers
├── database/              # MongoDB models & schemas
├── package.json           # Node.js dependencies
└── README.md              # Project documentation

⚡ Getting Started
Prerequisites

Node.js & npm

MongoDB instance (local or cloud)

OpenAI API key

Installation

Clone the repository

git clone https://github.com/pratyushcodes-source/ExcelDes-Interior-Design.git
cd ExcelDes-Interior-Design


Install dependencies

npm install


Setup environment variables in .env

OPENAI_API_KEY=your_openai_key
MONGO_URI=your_mongodb_connection


Start the backend

npm run server


Start the frontend

npm run dev

📸 Screenshots

Landing Page:


AI Design Preview:


🏆 Achievements

Developed a full-stack AI-powered platform for real-time interior design.

Implemented vector-based recommendation engine improving user engagement and personalization.

Integrated a responsive chatbot delivering contextual interior tips and sourcing recommendations.

📜 License

This project is for educational and demonstration purposes. Commercial use requires permission.

🙌 Acknowledgements

OpenAI GPT-4 Vision for AI-based design generation

Pinecone for vector search and embeddings

Clerk for authentication integration

Exceldes Interiors team for internship guidance and project support


