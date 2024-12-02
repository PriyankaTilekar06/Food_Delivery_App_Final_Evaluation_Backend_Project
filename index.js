const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not connected', err));

const allowedOrigins = [
  'https://food-delivery-app-final-evaluation-frontend-project-2oxo.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array or if origin is not defined (for local testing)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Enable cookies to be sent/received
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-csrf-token", "X-Requested-With"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// Apply CORS middleware globally
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));  // Pre-flight requests

// Other middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));

app.get("/", (req, res) => {
  try {
    res.status(200).send({ message: "Hello World!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
