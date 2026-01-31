import express from 'express';
import cors from 'cors';
import { CONFIG } from './config';
import apiRoutes from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('VaaniAI Backend is running!');
});

// Start Server
app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on http://localhost:${CONFIG.PORT}`);
    console.log(`Environment: Node ${process.version}`);
});

// Debug: Keep process alive
setInterval(() => {
    // console.log('Heartbeat');
}, 10000);
