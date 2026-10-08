# Travelets

Plan a trip on a map, one day at a time. Create a trip with a destination, dates and a daily budget, then drag nearby attractions from Google Maps into a day-by-day itinerary and save it to your account.

<!-- Add a screenshot or GIF of the trip planner here, e.g. docs/planner.gif -->

**Live demo:** _coming soon_ · Demo login: `demo@travelets.app` / `travelets-demo`

## Features

- Sign up and sign in with JWT authentication (bcrypt-hashed passwords, expiring tokens)
- Create trips with a destination, date range and daily budget
- Map of the destination with nearby tourist attractions from the Google Places API
- Drag and drop attractions into each day of the trip, reorder them, or drag them back out
- Search for any place and add it to the plan
- Profile page listing your trips; open any trip to keep editing its plan

## Tech stack

| Layer    | Tools |
| -------- | ----- |
| Frontend | React 18, Vite, Chakra UI, React Router, react-beautiful-dnd, @react-google-maps/api |
| Backend  | Node.js, Express, Mongoose, JSON Web Tokens, bcrypt |
| Data     | MongoDB |
| APIs     | Google Places (text search, nearby search, place details), Google Maps JavaScript API |

## Architecture

```
React (Vite) ──► Express REST API (/api/v1) ──► MongoDB
     │                    │
     └─ Google Maps JS    └─ Google Places API (proxied so the server key stays private)
```

All trip and places endpoints require a signed-in user, and users can only read or change their own trips.

### API

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| POST | `/api/v1/user` | | Register |
| POST | `/api/v1/user/login` | | Sign in, returns a JWT |
| GET | `/api/v1/user/profile` | ✓ | Current user |
| GET | `/api/v1/trip` | ✓ | Your trips |
| POST | `/api/v1/trip` | ✓ | Create a trip |
| GET | `/api/v1/trip/:trip_id` | ✓ | One of your trips |
| PUT | `/api/v1/trip/:trip_id` | ✓ | Update a trip or its day plan |
| GET | `/api/v1/trip/google-map-places` | ✓ | Places text search |
| GET | `/api/v1/trip/nearby-places` | ✓ | Attractions near a point |
| GET | `/api/v1/trip/place-detail` | ✓ | Place details |
| GET | `/api/v1/healthcheck` | | Health check |

## Running locally

You need Node.js 18+, a MongoDB database (local or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster) and a Google Maps Platform key with the **Places API** and **Maps JavaScript API** enabled.

```bash
# API on http://localhost:3005
cd backend
cp .env.example .env      # fill in DATABASE_URL, TOKEN_SECRET, GOOGLE_API_KEY
npm install
npm run seed              # optional: creates the demo account
npm run dev

# Web app on http://localhost:3000
cd frontend
cp .env.example .env      # fill in VITE_GOOGLE_API_KEY
yarn install
yarn dev
```

## Deploying

- **Database:** create a free MongoDB Atlas cluster and copy its connection string.
- **API (Render):** create a Blueprint from this repo; `render.yaml` sets up the `backend` service. Set `DATABASE_URL`, `GOOGLE_API_KEY` and `CLIENT_ORIGIN` (your frontend URL). Run `npm run seed` once from the Render shell to create the demo account.
- **Web app (Vercel):** import the repo with `frontend` as the root directory and set `VITE_API_URL` (your Render URL + `/api/v1`) and `VITE_GOOGLE_API_KEY`. `vercel.json` routes every path to the single-page app.

Restrict the browser Google key to your frontend's domain in the Google Cloud console.

## Project structure

```
backend/
  bin/www.js            server entry
  app.js                Express app, CORS, routes
  routes/               user and trip routes
  controllers/          request handlers
  middleware/isAuth.js  JWT check
  models/               User and Trip schemas
  scripts/seed.js       demo account
frontend/src/
  pages/                Home, SignIn, SignUp, UserProfile, UserTrips, TripCreate, TripPlan, TripInfo
  components/           header, footer, trip and user components
  utils/api.js          API client
```
