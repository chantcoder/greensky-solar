require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://localhost:4201'],
  }),
);

app.use(express.json({ limit: '20kb' }));

// Basic API health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GreenSky Solar API is running',
  });
});

// PostgreSQL connection health check
app.get('/api/health/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT current_database() AS database, NOW() AS server_time');

    res.json({
      success: true,
      message: 'PostgreSQL connected successfully',
      database: result.rows[0].database,
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

// app.get('/api/route-check', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Original server route works'
//   });
// });

// CREATE A NEW CUSTOMER ENQUIRY
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, phone, customerType, city, bill, message } = req.body;

    if (!name || !phone || !customerType || !city) {
      return res.status(400).json({
        success: false,
        message: 'Name, Phone, Customer type and city are required',
      });
    }

    const result = await pool.query(
      'INSERT INTO enquiries(name,phone,customer_type,city,monthly_bill,message) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name.trim(), phone.trim(), customerType, city.trim(), bill || null, message || null],
    );
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry: result.rows[0],
    });
  } catch (error) {
    console.error('Failed to save enquiry:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to save enquiry',
    });
  }
});

// Get all customer enquiries
app.get('/api/enquiries', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM enquiries
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      count: result.rows.length,
      enquiries: result.rows
    });
  } catch (error) {
    console.error('Failed to fetch enquiries:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries'
    });
  }
});

app.listen(PORT, () => {
  console.log(`GreenSky Solar API running at http://localhost:${PORT}`);
});
