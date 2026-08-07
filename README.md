# LexiSummarize

**AI-Powered Summarization & Vocabulary Analysis Platform**

LexiSummarize is a full-stack AI application designed to help users understand complex English content more efficiently.

The platform combines AI-powered text summarization with CEFR-based vocabulary analysis, allowing users to turn long-form text into concise summaries while identifying vocabulary across proficiency levels from **A1 to C2**.

The project demonstrates end-to-end full-stack development, including a React frontend, RESTful backend APIs, AI model integration, authentication, persistent data storage, and automated backend testing.

---

## Key Features

### AI-Powered Text Summarization

Users can submit long-form text and generate concise summaries through an AI-powered backend workflow.

### CEFR Vocabulary Analysis

The application analyzes vocabulary and organizes words according to the **Common European Framework of Reference (CEFR)**:

* A1 – Beginner
* A2 – Elementary
* B1 – Intermediate
* B2 – Upper Intermediate
* C1 – Advanced
* C2 – Proficient

This helps users identify potentially difficult vocabulary and better understand the language level of a text.

### Full-Stack User Experience

LexiSummarize connects a responsive React frontend with a FastAPI backend through RESTful APIs.

### Authentication

Users can register and log in securely using a JWT-based authentication workflow.

### Persistent Data Storage

MongoDB is used to store application and user-related data.

### Automated Testing

Backend functionality is tested using `pytest` to improve reliability and reduce regressions.

---

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* HTML
* CSS

### Backend

* Python
* FastAPI
* RESTful APIs
* JWT Authentication

### Artificial Intelligence

* Hugging Face API
* Natural Language Processing
* AI-powered text summarization
* Vocabulary analysis

### Database

* MongoDB

### Testing & Development

* pytest
* Git
* GitHub

---

## System Architecture

```text
┌─────────────────────────┐
│      React Frontend     │
│                         │
│  Text Input             │
│  Summary Results        │
│  Vocabulary Analysis    │
│  Authentication UI      │
└────────────┬────────────┘
             │
             │ REST API
             ▼
┌─────────────────────────┐
│      FastAPI Backend    │
│                         │
│  Authentication         │
│  Summarization Logic    │
│  Vocabulary Processing  │
│  API Endpoints          │
└───────┬─────────┬───────┘
        │         │
        │         │
        ▼         ▼
┌──────────────┐  ┌───────────────────┐
│   MongoDB    │  │ Hugging Face API  │
│              │  │                   │
│ User Data    │  │ AI Summarization  │
│ App Data     │  │ NLP Processing    │
└──────────────┘  └───────────────────┘
```

---

## How It Works

### 1. User submits text

The user enters English text through the React interface.

### 2. Frontend sends a request

The React application sends the content to the FastAPI backend through a REST API.

### 3. Backend processes the request

The backend validates the request and coordinates the AI and vocabulary-analysis workflows.

### 4. AI generates a summary

The application integrates with Hugging Face models to transform longer content into a shorter and more readable summary.

### 5. Vocabulary is analyzed

Words from the source content are evaluated and organized by CEFR proficiency level.

### 6. Results are returned

The backend returns structured data to the frontend, where the summary and vocabulary analysis are displayed to the user.

---

## Why I Built This Project

Understanding long or vocabulary-heavy English content can be challenging, especially for language learners.

I built LexiSummarize to explore how AI could support reading comprehension rather than simply generate text.

The project combines two useful workflows:

1. **Summarization** reduces the amount of information a learner needs to process.
2. **Vocabulary analysis** identifies words that may be above the learner's current proficiency level.

From a software engineering perspective, the project also gave me experience building an AI application across the complete stack rather than working only with an isolated machine-learning model.

---

## Engineering Highlights

### End-to-End AI Integration

The AI functionality is exposed through backend services rather than being directly embedded in the frontend.

This separation keeps the frontend focused on presentation while the backend manages AI requests, application logic, and data processing.

### RESTful Architecture

Frontend and backend responsibilities are separated through REST API endpoints, making individual application components easier to maintain and extend.

### Authentication Workflow

JWT-based authentication provides a structured approach for managing user sessions and protected application functionality.

### Modular Architecture

The project separates:

* frontend presentation
* backend business logic
* AI integration
* database operations
* authentication
* testing

This structure makes it easier to replace or extend individual components as the application evolves.

### Reliability Through Testing

Automated backend tests are implemented with `pytest` to validate application behavior and support safer future changes.

---

## Screenshots

> Add application screenshots here before sharing the repository with recruiters.

### Main Application

![LexiSummarize Main Interface](docs/main-interface.png)

### AI Summary

![AI Summarization](docs/summary-result.png)

### Vocabulary Analysis

![Vocabulary Analysis](docs/vocabulary-analysis.png)

---

## Project Structure

```text
lexisummarize_full/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── tests/
│   └── main.py
│
└── README.md
```

> The exact folder names may differ depending on the current repository structure.

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

* Node.js
* npm
* Python 3
* MongoDB
* Git

You will also need access to the AI service used by the backend.

---

## Clone the Repository

```bash
git clone https://github.com/anbat21/lexisummarize_full.git
cd lexisummarize_full
```

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the required environment variables.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
HUGGINGFACE_API_KEY=your_api_key
```

Do not commit real API keys or secrets to GitHub.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will typically run at:

```text
http://localhost:8000
```

FastAPI documentation can typically be accessed at:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

---

## Running Tests

From the backend directory:

```bash
pytest
```

The test suite validates backend functionality and helps detect regressions when new functionality is introduced.

---

## Future Improvements

Planned improvements include:

* More advanced AI summarization controls
* Improved vocabulary classification
* Personalized vocabulary recommendations
* User learning history and progress tracking
* Improved error handling and AI fallback strategies
* Expanded automated test coverage
* CI/CD integration
* Deployment to a cloud environment
* Additional accessibility improvements

---

## What I Learned

Building LexiSummarize strengthened my experience with:

* Designing full-stack AI applications
* Connecting React applications to REST APIs
* Building backend services with FastAPI
* Integrating external AI APIs
* Structuring authentication workflows
* Working with MongoDB
* Designing maintainable frontend/backend boundaries
* Testing backend functionality
* Using Git and GitHub for application development

More importantly, the project helped me understand that adding AI to an application involves more than calling a model. The surrounding software architecture, validation, user experience, reliability, and data flow are equally important.

LinkedIn:
https://www.linkedin.com/in/batandinh
