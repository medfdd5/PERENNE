const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Newsletter service is running.' });
});

app.post('/api/newsletter', async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();

  if (!validateEmail(email)) {
    return res.status(400).json({
      ok: false,
      message: 'Please enter a valid email address.'
    });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return res.status(503).json({
      ok: false,
      message: 'Email service is not configured yet. Add SMTP settings in the .env file.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: 'Thank you for visiting PERENNE',
      text: [
        'Hello,',
        '',
        'Thank you for visiting our website and for signing up for the next catalog.',
        'We truly appreciate you taking the time to explore PERENNE.',
        '',
        'We hope you enjoy the collection and look forward to sharing the next drop with you soon.',
        '',
        'Warmly,',
        'PERENNE Studio'
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #1b1b1b;">
          <h2 style="margin-bottom: 12px;">Thank you for visiting PERENNE</h2>
          <p>Thank you for visiting our website and for signing up for the next catalog.</p>
          <p>We truly appreciate you taking the time to explore PERENNE.</p>
          <p>We hope you enjoy the collection and look forward to sharing the next drop with you soon.</p>
          <p style="margin-top: 20px;">Warmly,<br>PERENNE Studio</p>
        </div>
      `
    });

    res.json({
      ok: true,
      message: 'Thanks for subscribing. A confirmation email has been sent.'
    });
  } catch (error) {
    console.error('Newsletter email send failed:', error);
    res.status(500).json({
      ok: false,
      message: 'We could not send the confirmation email right now. Please try again later.'
    });
  }
});

app.use(express.static(__dirname));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'med.html'));
});

app.listen(port, () => {
  console.log(`PERENNE newsletter server running at http://localhost:${port}`);
});
