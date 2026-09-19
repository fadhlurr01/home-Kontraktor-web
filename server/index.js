import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import inquiriesRouter from './routes/inquiries.js';
import calculatorRouter from './routes/calculator.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server (typically 5173 / 4173) and production
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/calculator', calculatorRouter);
app.use('/api/admin', adminRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Nusantara Contractor Fullstack API',
    version: '1.0.0'
  });
});

// If dist exists (production mode / cPanel passenger), serve static files
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// For SPA routing in production
app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
  }
  const indexHtml = path.join(distPath, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.status(200).send('API Server is running. Frontend static build will be served here once generated.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Contractor Fullstack Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/`);
});
