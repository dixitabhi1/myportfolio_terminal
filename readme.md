# Abhishek Dixit - Interactive Terminal Portfolio

This is an interactive, terminal-style portfolio for Abhishek Dixit, showcasing his projects, skills, experience, and achievements with a professional techy aesthetic.

## Features:

- **Pure Terminal Interface:** Navigate using commands (e.g., `about`, `projects`, `skills`, `contact`, `resume`).
- **Professional Techy Visuals:** Subtle holographic effects, data streams, scan lines, and a refined glitch effect for the profile image.
- **Clickable Links:** LinkedIn and GitHub links in the `contact` section are clickable.
- **Resume Options:** View and download options for the resume.
- **Responsive Design:** Optimized for various screen sizes.

## Setup and Installation:

To run this project locally, follow these steps:

1.  **Clone the repository (if applicable) or extract the zip file:**
    ```bash
    # If you received a zip file, extract it first
    unzip abhishek-portfolio.zip
    cd abhishek-portfolio
    ```

2.  **Install Dependencies:**
    This project uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it via npm:
    ```bash
    npm install -g pnpm
    ```
    Then, install the project dependencies:
    ```bash
    pnpm install
    ```

3.  **Run the Development Server:**
    ```bash
    pnpm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use ).

## Updating Content:

All content (projects, experience, skills, achievements, contact info) is managed within `src/App.jsx`.

-   **Text Content:** Modify the strings directly within the `getAboutContent()`, `getProjectsContent()`, `getExperienceContent()`, `getSkillsContent()`, `getAchievementsContent()`, and `getContactContent()` functions.
-   **Profile Image:** Replace `src/assets/mypic.jpg` with your new image. Ensure it's named `mypic.jpg` or update the import path in `src/App.jsx`.
-   **Resume PDF:** Replace `public/Abhishek-Dixit-RESUME.pdf` with your updated resume PDF. Ensure it's named `Abhishek-Dixit-RESUME.pdf`.

## Building for Production:

To create a production-ready build of the application:

```bash
pnpm run build



abhishek-portfolio/
├── public/
│   └── Abhishek-Dixit-RESUME.pdf  # Your resume PDF
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── mypic.jpg              # Your profile image
│   ├── components/                # UI components
│   ├── App.css                    # Styling for the portfolio
│   ├── App.jsx                    # Main application logic and content
│   └── main.jsx                   # Entry point
├── index.html
├── package.json                   # Project dependencies and scripts
├── pnpm-lock.yaml
├── README.md                      # This file
└── vite.config.js
