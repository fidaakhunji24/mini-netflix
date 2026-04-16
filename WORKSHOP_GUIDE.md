# Workshop Instructor Guide

## Student Prerequisites
- Basic understanding of programming concepts
- Familiarity with Git and GitHub
- Knowledge of the programming language used in the mini-netflix application

## Timeline
- **Preparation:** 1 week before the workshop
- **Duration:** 3 hours

## Step-by-Step Setup Instructions
1. **Clone the repository:**
   ```
   git clone https://github.com/fidaakhunji24/mini-netflix.git
   ```
2. **Navigate to the project folder:**
   ```
   cd mini-netflix
   ```
3. **Install dependencies:**
   ```
   npm install
   ```
4. **Start the application:**
   ```
   npm start
   ```

## Customization Guide
- **Changing Colors:**
  - Locate the CSS files within the `src` directory.
  - Update color variables as needed to customize the look of the application.

- **Changing Fonts:**
  - You can use Google Fonts by adding a link in the index.html file.
  - Update the `font-family` properties in your CSS to reflect the new font.

- **Editing Text:**
  - Modify the text content directly in the React components within the `src/components` folder.

## Troubleshooting
- **Issue:** App does not start
  - **Solution:** Ensure that all dependencies are correctly installed.
  - Check the console for error messages.

- **Issue:** The layout looks broken
  - **Solution:** Check your CSS for any conflicting styles.
  - Ensure that you are using the latest version of the application templates.