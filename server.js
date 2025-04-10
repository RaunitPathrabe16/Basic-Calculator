const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

mongoose.connect('YOUR_ATLAS_URI_HERE', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const HistorySchema = new mongoose.Schema({
    expression: String,
    result: String,
    date: { type: Date, default: Date.now },
});

const History = mongoose.model('History', HistorySchema);

app.use(cors());
app.use(bodyParser.json());

// Save to DB
app.post('/save', async (req, res) => {
    const { expression, result } = req.body;
    try {
        const newEntry = new History({ expression, result });
        await newEntry.save();
        res.status(201).send('Saved');
    } catch (err) {
        res.status(500).send('DB Save Error');
    }
});

// Get last 20 records
app.get('/history', async (req, res) => {
    try {
        const data = await History.find().sort({ date: -1 }).limit(20);
        res.json(data);
    } catch (err) {
        res.status(500).send('Fetch Error');
    }
});

// Clear all history
app.delete('/history', async (req, res) => {
    try {
        await History.deleteMany({});
        res.send('History Cleared');
    } catch (err) {
        res.status(500).send('Clear Error');
    }
});

app.listen(PORT, () => console.log(`CalciBuddy backend running at http://localhost:${PORT}`));
