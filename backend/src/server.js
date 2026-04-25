import express from 'express';
import path from 'path';
import cors from 'cors';
import {serve} from 'inngest/express';

import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { inngest, functions } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL, credentials: true}));  //CROSS ORIGIN RESOURCE SHARING - to allow frontend to access backend resources , // CREDENTIALS TRUE - to allow cookies to be sent in cross origin requests

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

app.get('/books', (req, res) => {
    res.status(200).json({ message: 'this is the books endpoint!' });
});

if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`);
        });

    } catch (error) {
            console.log('Error connecting to DB', error)
    }
}

startServer();