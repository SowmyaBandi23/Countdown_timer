const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/countdownDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Countdown model definition
const countdownSchema = new mongoose.Schema({
  targetTime: {
    type: Date,
    required: true,
  },
});

const Countdown = mongoose.model('Countdown', countdownSchema);

// Middleware
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to store countdown data
app.post('/store_countdown', async (req, res) => {
  try {
    const { targetTime } = req.body;

    // Insert countdown data into MongoDB
    await Countdown.create({ targetTime });

    res.json({ message: 'Countdown data stored successfully' });
  } catch (error) {
    console.error('Error storing countdown data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
