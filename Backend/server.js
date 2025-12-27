import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";
import issuesRouter from "./routes/issueRoutes.js";
import PoliticalRepresentativesRouter from "./routes/politicalRepresentativeRoutes.js";
import LeaderRouter from "./routes/leaderRoutes.js";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/admin/index.js";

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173', 
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  
app.use(express.json());


app.use('/api/auth', authRouter);
app.use("/api/issues", issuesRouter);
app.use("/api/leaders", LeaderRouter);
app.use("/api/political", PoliticalRepresentativesRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Village Platform API is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});


app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
});