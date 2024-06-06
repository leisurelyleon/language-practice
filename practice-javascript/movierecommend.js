class MovieRecommendationApp {
    constructor() {
        this.apiKey = 'your-api-key'; // Replace with a valid API key
        this.apiUrl = 'https://api.themoviedb.org/3/discover/movie';
        this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    }

    async fetchRecommendedMovies() {
        const url = `${this.apiUrl}?api_key=${this.apiKey}&sort_by=popularity.desc`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }

            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching recommended movies:', error.message);
            return [];
        }
    }

    displayMovieDetails(movie) {
        console.log(`Title: ${movie.title}`);
        console.log(`Overview: ${movie.overview}`);
        console.log(`Release Data: ${movie.release_date}`);
        console.log(`Popularity: ${movie.popularity}`);
        console.log(`Poster: ${this.imageBaseUrl}${movie.poster_path}`);
        console.log('---');
    }

    async getMovieRecommendations() {
        const movies = await this.fetchRecommendedMovies();

        if (movies.length > 0) {
            console.log('Recommended Movies:');
            movies.slice(0, 5).forEach((movie) => this.displayMovieDetails(movies));
        } else {
            console.log('No movie recommendations available.');
        }
    }
}

// Example Usage
const movieApp = new MovieRecommendationsApp();
movieApp.getMovieRecommendations();