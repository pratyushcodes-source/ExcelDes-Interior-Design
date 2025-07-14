
# Exceldes Interior AI ✨

Transform your living space in seconds. An AI-powered interior design assistant that brings your dream room to life using the power of Google's Gemini and Imagen models.

**[➡️ View Live Demo](https://your-live-demo-link-here.com)**

---


*(Image: A GIF demonstrating the user flow from uploading a room photo to receiving a redesigned image and chatting with the AI assistant.)*

## 🌟 Core Features

-   **🤖 AI-Powered Room Redesign**: Upload a photo of your room, and our AI will generate a photorealistic, redesigned version based on your chosen style.
-   **🎨 Category & Style Driven**: Start by selecting your room type (Bedroom, Living Room, etc.) and a desired aesthetic (e.g., Modern Minimalist, Bohemian) to get tailored results.
-   **🖼️ Interactive Before & After**: Instantly compare your original room with the AI-generated design in a clean, side-by-side view.
-   **💬 "Decora" AI Chatbot**: Have a question? Our friendly chatbot, Decora, is available to answer your interior design questions, from color theory to furniture placement.
-   **🇮🇳 India-Centric Sourcing**: Decora provides estimated pricing in Indian Rupees (₹) and suggests popular online and physical stores in **Delhi, Mumbai, and Bangalore** to find similar items.
-   **📱 Responsive Dark-Themed UI**: A sleek, sophisticated, and modern dark-themed interface built with React and Tailwind CSS, fully responsive for all devices.

## 🛠️ Tech Stack & Architecture

This project uses a modern web stack to deliver a seamless and powerful user experience.

-   **Frontend**:
    -   **React 19** & **TypeScript**: For building a robust and type-safe user interface.
    -   **Tailwind CSS**: For a utility-first, modern, and responsive design system.
-   **AI & Backend Logic**:
    -   **Google Gemini API (`@google/genai`)**: The core engine for all AI functionalities.
        -   `gemini-2.5-flash`: Used for high-speed text generation, chat conversations, and analyzing user images to create descriptive prompts.
        -   `imagen-3.0-generate-002`: Used for generating high-quality, photorealistic interior design images.
-   **Runtime**:
    -   The application is served as a static site and uses **ESM via an import map** for module resolution directly in the browser.

### How the AI Design Generation Works

The magic happens in a two-step AI pipeline:

1.  **Analysis & Prompt Generation**: When a user uploads an image, selects a room type, and chooses a style, the data is sent to `gemini-2.5-flash`. The model analyzes the room's layout, structure, and lighting to generate a highly detailed and creative prompt for an image generation AI.
2.  **Image Generation**: The descriptive prompt from Step 1 is then fed into `imagen-3.0-generate-002`. This model uses the prompt to generate a completely new, photorealistic image of the redesigned room, maintaining the original room's core structure.

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   A modern web browser with support for ES Modules.
-   A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/exceldes-interior-ai.git
    cd exceldes-interior-ai
    ```

2.  **Set up your API Key:**
    The application is configured to use an API key from environment variables. For local development, you need a way to serve this key. A simple local server can be configured to handle this.

    **Important Security Note**: The `process.env.API_KEY` approach is intended for a server-side or build-time environment. **Never expose your API key directly in client-side JavaScript in a production application.** For a real-world app, you would use a backend proxy to make API calls securely.

3.  **Launch the application:**
    Since this project is built with plain HTML/JS/CSS and uses ESM, you can run it with any simple local web server. The easiest way is using a tool like `serve`:

    ```bash
    # Install serve globally if you don't have it
    npm install -g serve

    # Run the server from the project's root directory
    serve
    ```
    Now, open your browser and navigate to the URL provided by the server (e.g., `http://localhost:3000`).

## 🔮 Future Improvements

-   [ ] **User Accounts**: Allow users to sign up and save their generated designs.
-   [ ] **Fine-Grained Control**: Enable users to give more specific feedback, such as "change the sofa color to blue."
-   [ ] **Real-time Product APIs**: Integrate with e-commerce APIs to show live pricing and stock from retailers.
-   [ ] **Expanded City Support**: Add sourcing suggestions for more Indian cities like Chennai, Hyderabad, and Pune.

## 🧑‍💻 Credits

This application was conceptualized and developed by **Pratyush Kumar**.

---

&copy; 2024 Exceldes. All rights reserved.
