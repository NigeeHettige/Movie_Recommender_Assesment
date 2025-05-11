Movie Explorer
Overview
Movie Explorer is a web application that allows users to browse, search, and filter movies using the TMDB (The Movie Database) API. Users can log in with their TMDB credentials to access personalized features, view popular and trending movies, watch movie trailers, and filter movies by genre. The app is built with React and Vite, styled with Material-UI, and deployed on Netlify.
Features

User Authentication: Log in using TMDB credentials to access personalized features.
Movie Browsing: View popular and trending movies with pagination.
Search and Filter: Search movies by title and filter by genres.
Movie Details: Watch movie trailers via embedded video links.
Dark Theme: Responsive design with a Material-UI dark theme.

Tech Stack

Frontend: React, Vite, Material-UI
API Requests: Axios (for TMDB API integration)
Routing: React Router (react-router-dom)
State Management: React Context API (for authentication, movies, filters, genres, and theme)
Deployment: Netlify

Project Structure
movieexplorer/
└── frontend/
    ├── public/
    │   ├── index.html        # HTML entry point
    │   └── _redirects        # Netlify SPA redirect rule
    ├── src/
    │   ├── apiHelper.js      # TMDB API helper functions using Axios
    │   ├── Components/
    │   │   ├── Filter.jsx    # Filter movies by genre
    │   │   ├── Login.jsx     # Login form for TMDB authentication
    │   │   ├── MovieCard.jsx # Display individual movie details
    │   │   ├── SearchBar.jsx # Real-time movie search
    │   │   └── AllMovies.jsx # Display and filter movie list
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Manages user authentication
    │   │   ├── FilterContext.js  # Manages movie filtering logic
    │   │   ├── MovieContext.jsx  # Manages movie data
    │   │   ├── ThemeContext.jsx  # Manages theme settings
    │   │   └── GenresContext.jsx # Manages genre data
    │   ├── pages/
    │   │   └── HomePage.jsx      # Main page rendering AllMovies
    │   ├── App.jsx               # Main app component with routing
    │   ├── main.jsx              # Entry point for React app
    │   ├── theme.js              # Material-UI theme configuration
    │   └── index.css             # Global styles
    ├── .env                      # Environment variables (e.g., TMDB API key)
    ├── package.json              # Project dependencies and scripts
    ├── vite.config.js            # Vite configuration
    └── README.md                 # Project documentation

Prerequisites

Node.js: Version 18 or higher (tested with v22.15.0)
npm: Version 9 or higher (tested with v10.9.2)
TMDB Account: Required for logging in and accessing the API.
Netlify Account: For deployment.

Setup Instructions
1. Clone the Repository
Clone the project from GitHub:
git clone https://github.com/NigeeHettige/Movie_Recommender_Assesment.git
cd Movie_Recommender_Assesment

2. Navigate to Frontend Directory
The React app is located in the frontend/ directory:
cd frontend

3. Install Dependencies
Install the required npm packages:
npm install

4. Set Up Environment Variables
Create a .env file in the frontend/ directory and add your TMDB API key:
touch .env

Add the following line to .env:
VITE_TMDB_API_KEY=your_tmdb_api_key_here


Replace your_tmdb_api_key_here with your actual TMDB API key.
To get a TMDB API key:
Sign up or log in to TMDB.
Go to your account settings > "API" section.
Generate an API key (v3 auth).



5. Run the Development Server
Start the development server with Vite:
npm run dev


Open http://localhost:5173 in your browser to view the app.

Usage Instructions
Logging In with TMDB Credentials

Open the App:
Navigate to https://movieexplorerassesment.netlify.app 


Login Page:
You’ll be directed to the login page.
Enter your TMDB username and password.
Example Credentials:
Username: example_user
Password: example_password


Note: Replace these with your real TMDB credentials. For this project, I used my real TMDB account credentials to test login functionality, but I’m not sharing them here for security reasons. You must use your own TMDB account to log in.


Successful Login:
Upon successful login, you’ll be redirected to the home page (/home), where you can browse movies.



Browsing Movies

Home Page: Displays popular and trending movies.
Search: Use the search bar to find movies by title.
Filter by Genre: Select genres to filter the movie list.
View Trailers: Click on a movie card to view its trailer (fetched via /movie/{movieId}/videos).

Logging Out

Click the "Logout" button on the home page to log out and return to the login page.

Deployment on Netlify
1. Push to GitHub
Ensure your project is pushed to GitHub:
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main

2. Connect Netlify to GitHub

Log in to Netlify.
Click "Add new site" > "Import an existing project".
Connect to GitHub and select the  repository.

3. Configure Build Settings

Base Directory: Set to frontend.
Build Command: Set to npm run build.
Publish Directory: Set to frontend/dist.
Save the settings.

4. Set Environment Variables

Go to "Site configuration" > "Environment variables".
Add:Key: VITE_TMDB_API_KEY
Value: your_tmdb_api_key_here


Save and redeploy.



6. Deploy the Site

Netlify will automatically deploy after you save the settings.
Once deployed, visit your site (e.g.https://movieexplorerassesment.netlify.app).
Log in with your TMDB credentials to test the app.

Troubleshooting
Blank Page on Netlify

Check Environment Variables: Ensure VITE_TMDB_API_KEY is set in Netlify.
Check Console Errors: Open Developer Tools (F12) > Console Tab for errors (e.g., failed API requests, missing theme.js).
Verify Publish Directory: Ensure it’s set to frontend/dist.


API Request Failures

401 Unauthorized: Double-check your TMDB API key or login credentials.
Network Errors: Ensure requests are made to https://api.themoviedb.org/3 (check Network Tab in Developer Tools).

Local Development Issues

CORS Errors: If you see CORS errors locally, ensure your API requests use https://api.themoviedb.org/3 directly 
Missing Dependencies: Run npm install if you encounter module errors.





TMDB API: For providing movie data and authentication endpoints.
Netlify: For hosting the deployed application.
Material-UI: For styling components with a dark theme.

Author

Author: Nigee Hettige
GitHub Repository: NigeeHettige/Movie_Recommender_Assesment
Deployed URL: https://movieexplorerassesment.netlify.app

