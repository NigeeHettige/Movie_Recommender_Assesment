# Movie Explorer 🎬


A responsive web app for discovering movies using the TMDB API, featuring authentication, search, filtering, and dark mode.

🔗 **Live Demo**: [movieexplorerassesment.netlify.app](https://movieexplorerassesment.netlify.app)

![Movie Explorer Screenshot](./screenshot/screenshot.png)

## Features ✨

- 🔒 TMDB account authentication
- 🎥 Browse popular/trending movies with pagination
- 🔍 Search movies by title
- 🏷️ Filter by genres
- 📺 Watch embedded trailers
- 🌙 Dark/light theme toggle
- 📱 Fully responsive design

## Tech Stack 🛠️

**Frontend**  
React | Vite | Material-UI (MUI) | Axios | React Router

**State Management**  
React Context API (Auth, Movies, Filters, Genres, Theme)

**Deployment**  
Netlify

## Project Structure 📂
    
    frontend/
    ├── public/                  # Static assets
    │   ├── _redirects           # Netlify SPA rules
    │   └── index.html           # HTML entry point
    │
    ├── src/
    │   ├── Components/          # Reusable UI components
    │   │   ├── Filter.jsx       # Genre filter component
    │   │   ├── Login.jsx        # Authentication form
    │   │   ├── MovieCard.jsx    # Individual movie display
    │   │   ├── SearchBar.jsx    # Search functionality
    │   │   └── AllMovies.jsx    # Movie list container
    │   │
    │   ├── context/             # State management
    │   │   ├── AuthContext.jsx  # Authentication state
    │   │   ├── MovieContext.jsx # Movies data
    │   │   ├── FilterContext.jsx# Filter settings
    │   │   ├── ThemeContext.jsx # UI theme
    │   │   └── GenresContext.jsx# Genre list
    │   │
    │   ├── pages/               # Page components
    │   │   └── HomePage.jsx     # Main application view
    │   │
    │   ├── apiHelper.js         # TMDB API service
    │   ├── theme.js             # MUI theme config
    │   ├── App.jsx              # Root component
    │   ├── main.jsx             # React entry point
    │   └── index.css            # Global styles
    │
    ├── vite.config.js           # Vite build configuration
    └── .env                     # Environment variables

## Setup Guide 🚀

### Prerequisites
- Node.js ≥18
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))
- Netlify account (for deployment)

### Local Development
1. Clone the repo:
   ```bash
   git clone https://github.com/NigeeHettige/Movie_Recommender_Assesment.git
   cd Movie_Recommender_Assesment/frontend

2. Install dependencies:
    ```bash  
    npm install
    

3. Create .env file:
   ```bash
    VITE_TMDB_API_KEY=your_api_key_here
   
4. Start dev server:
   ```bash
    npm run dev

## Netlify Deployment Configuration

### 1. Set these build settings in Netlify UI:
    BASE_DIRECTORY="frontend"
    BUILD_COMMAND="npm run build"
    PUBLISH_DIRECTORY="frontend/dist"

### 2. Add environment variable:
     Go to: Site settings > Environment variables
     VITE_TMDB_API_KEY="your_api_key_here"  # Replace with your actual TMDB API key

## Usage Guide 📖

1. **Login**  
   - Use your TMDB account credentials
   - Navigate to the login page if not automatically redirected

2. **Browse Movies**  
   - View popular and trending movies on the home page
   - Use pagination controls to see more results

3. **Search & Filter**  
   - Type in the search bar to find movies by title
   - Select genres from the filter dropdown
   - Combine search and filters for precise results

4. **View Details**  
   - Click any movie card to see more information
   - Watch the embedded trailer (if available)
   - Click outside the modal or press ESC to close

5. **Theme Toggle**  
   - Switch between dark/light mode using the icon in the top-right corner
   - Preference is saved between sessions

## Troubleshooting 🛠

| Issue                  | Solution                                                                 |
|------------------------|--------------------------------------------------------------------------|
| Blank page             | 1. Verify publish directory is `frontend/dist`<br>2. Check for `_redirects` file |
| API errors (401)       | 1. Confirm TMDB API key is set<br>2. Check network tab for failed requests |
| CORS issues            | Ensure all API calls use `https://api.themoviedb.org/3`                  |
| Missing styles         | 1. Clear Netlify cache<br>2. Run `npm install` locally to verify         |
| Login not working      | 1. Verify TMDB credentials<br>2. Check authentication context            |
| Build failures         | 1. Check Node.js version (≥18)<br>2. Examine build logs for errors       |

**Pro Tip:** Always check:
- Browser console (F12) for errors
- Network tab for failed API calls
- Netlify deployment logs for build issues

Built with ❤️ by Nigee Hettige


   
