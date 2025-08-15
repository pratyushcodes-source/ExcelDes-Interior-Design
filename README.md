Exceldes Interior AI Tool 🏡✨

An AI-powered interior design platform that transforms real room photos into personalized design makeovers. This full-stack web application leverages computer vision, generative AI, and vector-based recommendation systems to provide users with practical and visually appealing interior design suggestions.

Live Demo: ExcelDes Interior AI Tool
GitHub Repository: GitHub

🚀 Project Overview

The Exceldes Interior AI Tool was developed to enhance user experience in interior design by providing instant, AI-driven recommendations based on uploaded room images.

Core capabilities:

Room Analysis: Identifies room type, layout, and style preferences.

AI-Generated Makeovers: Uses GPT-4 Vision to suggest furniture placement, decor styles, and color schemes.

Vector-Based Recommendation Engine: Leverages OpenAI embeddings + Pinecone to find relevant design ideas.

Interactive Chatbot: Offers contextual interior tips, pricing in INR, and India-specific sourcing suggestions.

Side-by-Side Previews: Compare original and AI-generated designs seamlessly.

✨ Features

AI-Powered Design: Transform room images into design suggestions with GPT-4 Vision.

Vector Search Recommendations: Retrieve design inspirations quickly using Pinecone embeddings.

Full-Stack Architecture: Frontend (React, Tailwind CSS) + Backend (Node.js, MongoDB).

Authentication: Secure login flow via Clerk.

Interactive UI: Smooth uploads, style previews, and personalized suggestions.

Modular Codebase: Easy to extend or update components.

🛠 Tech Stack
Layer	Technology
Frontend	React, TypeScript, Tailwind CSS
Backend	Node.js, Express.js
AI/ML	OpenAI GPT-4 Vision, Pinecone Embeddings
Database	MongoDB
Authentication	Clerk
Deployment	Vercel
📁 Folder Structure
exceldes-interior-ai/
├── public/                  # Static assets
├── src/
│   ├── components/          # React UI components (Upload, Chatbot, etc.)
│   ├── services/            # Backend API services
│   └── App.tsx              # Main React entry point
├── scripts/                 # Data processing & AI model scripts
├── backend/                 # Node.js backend routes & controllers
├── database/                # MongoDB models & schemas
├── package.json             # Node.js dependencies
└── README.md                # Project documentation

⚡ Getting Started
Prerequisites

Node.js & npm

MongoDB (local or cloud instance)

OpenAI API Key

Installation

Clone the repository:

git clone https://github.com/pratyushcodes-source/ExcelDes-Interior-Design.git
cd ExcelDes-Interior-Design


Install dependencies:

npm install


Set up environment variables in .env:

OPENAI_API_KEY=your_openai_key
MONGO_URI=your_mongodb_connection


Start the backend server:

npm run server


Start the frontend:

npm run dev

📸 Screenshots

Landing Page:


AI Design Preview:


🏆 Achievements

Developed a full-stack AI platform for real-time interior design suggestions.

Implemented a vector-based recommendation engine improving personalization and engagement.

Integrated a responsive chatbot delivering contextual tips, pricing, and sourcing suggestions.

📜 License

This project is intended for educational and demonstration purposes only. Commercial use requires explicit permission.

🙌 Acknowledgements

OpenAI GPT-4 Vision – AI-powered design generation

Pinecone – Vector search and embeddings

Clerk – Authentication integration

Exceldes Interiors team – Internship guidance and support

Clerk for authentication integration

Exceldes Interiors team for internship guidance and project support


