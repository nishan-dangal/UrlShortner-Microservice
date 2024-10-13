const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const validUrl = require('valid-url');
const URL = require('./models/urlModel');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Helper function to validate URL format
function isValidUrl(url) {
  return validUrl.isUri(url) && (url.startsWith('http://') || url.startsWith('https://'));
}

// Route to shorten URL
app.post('/api/shorturl', async (req, res) => {
  const { url } = req.body;

  // Validate URL
  if (!isValidUrl(url)) {
    return res.json({ error: 'invalid url' });
  }

  try {
    // Check if the URL already exists
    let existingUrl = await URL.findOne({ original_url: url });
    if (existingUrl) {
      return res.json({
        original_url: existingUrl.original_url,
        short_url: existingUrl.short_url,
      });
    }

    // Get the latest short_url and increment for a new entry
    const count = await URL.countDocuments();
    const shortUrl = count + 1;

    // Save the new URL
    const newUrl = new URL({ original_url: url, short_url: shortUrl });
    await newUrl.save();

    return res.json({
      original_url: newUrl.original_url,
      short_url: newUrl.short_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// Redirect to the original URL
app.get('/api/shorturl/:short_url', async (req, res) => {
  const shortUrl = req.params.short_url;

  try {
    // Find the original URL corresponding to the short URL
    const url = await URL.findOne({ short_url: shortUrl });
    if (url) {
      return res.redirect(url.original_url);
    } else {
      return res.json({ error: 'No short URL found for the given input' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
