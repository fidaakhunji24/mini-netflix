const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json());

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videosDir); // Save to videos folder
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp + original extension
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit
});

// Serve static video files
app.use('/videos', express.static(videosDir));

// ENDPOINT 1: Upload video file
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    success: true,
    message: 'Video uploaded successfully',
    filename: req.file.filename,
    size: req.file.size
  });
});

// ENDPOINT 2: Get list of all videos
app.get('/videos-list', (req, res) => {
  fs.readdir(videosDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read videos' });
    }
    
    // Filter only video files (mp4, webm, avi, etc.)
    const videoFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.mp4', '.webm', '.avi', '.mov', '.mkv'].includes(ext);
    });
    
    res.json({
      success: true,
      count: videoFiles.length,
      videos: videoFiles
    });
  });
});

// ENDPOINT 3: Serve individual video (handled by express.static above)
// Accessed via: GET /videos/:filename

// Start server
app.listen(PORT, () => {
  console.log(`🎬 Mini Netflix server running at http://localhost:${PORT}`);
  console.log(`📁 Videos stored in: ${videosDir}`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  POST   /upload         - Upload a video`);
  console.log(`  GET    /videos-list    - Get list of videos`);
  console.log(`  GET    /videos/:filename - Stream video`);
});
