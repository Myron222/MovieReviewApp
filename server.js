const express = require('express');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse form data

// Sample data (no database) // TODO: populate more movies 
const movies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "The Matrix", year: 1999 },
  { id: 3, title: "3 idiots", year: 2009},
  { id: 4, title: "Officer Black Belt", year: 2025}
];

let reviews = []; // Stores all reviews

// Routes
app.get('/', (req, res) => {
  res.render('index', { movies });
});

// Form to submit a review
app.get('/review/:movieId', (req, res) => {
  const movieId = req.params.movieId; // Get movieId from route parameters
  const movie = movies.find(m => m.id == movieId); // Find movie by ID

  if (!movie) {
    return res.status(404).send('Movie not found.'); // Handle case where movie does not exist
  }

  res.render('review', { movie }); // Pass the movie object to the template
});


// Handle form submission
app.post('/submit-review', (req, res) => {
  const { movieId, rating, review } = req.body;
  const newReview = {
    movieId,
    rating,
    review
  };
  reviews.push(newReview);
  console.log(reviews); // Check if reviews are being stored
  res.redirect('/reviews');
});


// Display all reviews
app.get('/reviews', (req, res) => {
  res.render('reviews', { reviews, movies });
});

const CUSTOM_PORT = process.env.PORT || 3000;
app.listen(CUSTOM_PORT, '0.0.0.0', () => {
  console.log(`Server is running on ${CUSTOM_PORT}`);
});
