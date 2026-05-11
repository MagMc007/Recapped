# 🎬 RECAPPED
**RECAPPED** is a web platform that helps users discover *high-quality movie recaps* without clickbait, misleading thumbnails, or endless trial-and-error.

## 🚀 Elevator Pitch

A curated movie-recap platform that lets users explore, filter, and watch YouTube movie recaps with full context—before committing their time.

## 🎥 Demo

<p align="center">
  <a href="https://youtu.be/NPWakxQMpGM">
    <img 
      src="https://img.youtube.com/vi/NPWakxQMpGM/maxresdefault.jpg"
      width="900"
      alt="Watch the demo"
    />
  </a>
</p>

## 📖 About The Project

### The Problem

Movie recap lovers face a surprisingly frustrating experience:

- YouTube offers **no reliable way** to judge recap quality beyond view counts  
- Thumbnails and titles are often **clickbait or AI-generated**
- Viewers lack essential context like:
  - Country of origin  
  - Genre  
  - Release year  
- Finding a *satisfying recap* often means jumping from video to video

I found myself constantly abandoning recaps halfway through—not because the movies were bad, but because the **discovery process was broken**.



### The Solution

**RECAPPED** fixes this by turning movie recaps into **structured, searchable content**.

Instead of chasing random videos, users can:
- Browse a clean movie list with posters and ratings
- Filter movies by **year, country, and genre**
- Choose between **multiple recap sources** for the same movie
- Watch recaps directly inside the platform
- Rate movies to help future users

RECAPPED puts context firstso users know exactly what they’re about to watch.


## 🛠 Built With
**Frontend**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="18" alt="react logo"  />   React
- <img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Axios_logo_%282020%29.svg" height="18" alt="Axios logo"  />  
- 🎥 React YouTube Player
- 🎨 Modern UI 


**Backend**

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" height="18" alt="django logo" /> Django
- 🔧 Django REST Framework (DRF)
- 🔐 JWT Authentication

**APIs & Services**
- 📺 YouTube Data API (recap discovery)
- 🧠 Google Gemini (movie title extraction)
- 🎞 OMDb API (movie metadata & posters)

**Infrastructure**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="20" alt="docker logo"  />
  <img width="12" />Docker
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="15" alt="postgresql logo"  /> PostgreSQL(image)


## ✨ Key Features

- ✅ User authentication with **JWT**
- ✅ Paginated movie listing with posters & ratings
- ✅ Advanced filters:
  - Year  
  - Country  
  - Genre
- ✅ Embedded YouTube recaps using React
- ✅ Multiple recap sources per movie
- ✅ User ratings (1–5 stars)
- ✅ Clean REST API built with DRF
- ✅ Fully containerized with Docker



## 🧠 How It Works (High Level)

1. Fetches movie recap videos from selected YouTube channels  
2. Uses **Gemini AI** to extract accurate movie titles from video metadata  
   - Only trusted channels are used to avoid hallucinations  
3. Sends the movie title to **OMDb API** for:
   - Poster  
   - Genre  
   - Country  
   - Release year  
4. Stores structured data in a relational database  
5. Exposes everything via a REST API consumed by React

<p align="center">
  <img src="./imgs/DataFlow.png" alt="Data Flow" width="1200"/>
</p>

## 🔮 What's Next

The project is still evolving, and several improvements are planned for the next stages:

- **Containerized deployment** – The application has been Dockerized to ensure consistent environments across development and production.
- **Cloud deployment** – The next step is deploying the platform to a cloud provider (May be AWS) to make it publicly accessible.
- **Public access** – Once deployed, the platform will be available for movie recap lover and for all who enjoy story telling to explore and discover high-quality recap content.
- **Feature expansion** – Add more filtering options, improved recommendations, and better recap discovery tools.

The goal is to make **RECAPPED** a reliable place where people can easily discover quality movie recaps without the usual noise of clickbait content on youtube.

## ▶️ Running the Project Locally

You can run the entire project locally using Docker.

### 1. Clone the repository

```bash
git clone <https://github.com/MagMc007/Recapped>
```
2. Enter the Recapped folder
```
cd Recapped
```
Then Run
```
docker-compose up
```
This will run database, backend and frontend services

## 📥 Populating Movies

If you want to automatically populate the database with movie recap data, follow the steps below.

### 1. Set up the environment file

Create an environment file and add the required API keys:

```
YOUTUBE_API_KEY=...
OMBD_API_KEY=...
GEMINI_API_KEY_1=....
GEMINI_API_KEY_2=....
```
It is recommended to prepare **at least 4 Gemini API keys**, since you may run out of request quota during the process.
### 2. Select the YouTube channel source

Then proceed to the folder: 
```
./backend/movies/management/commands/
```
Open the file:
```
populate_movies.py
```
Inside this file you will find a **dictionary containing selected YouTube channels**.  
These channels are chosen because they provide **accurate descriptions of the movies they recap**, which increases the likelihood that the AI can correctly identify the movie.

Choose **one channel** from the dictionary and **comment out the others**.

### 3. Enter the backend container

Navigate to the backend directory:


Then go back to the folder: 
```
../backend
```
Then open a shell inside the Django container:

```
docker exec -it my_django_backend bash
```

then run the population command:
```
python manage.py populate_movies
```
This will trigger the automatic process described in the data flow diagram.
