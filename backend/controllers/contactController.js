// Intended path: /backend/controllers/contactController.js
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Build the transporter lazily/once - avoids reconnecting on every request
let cachedTransporter = null;
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return cachedTransporter;
}

// @desc    Save a contact form submission and send a notification email
// @route   POST /api/contact
exports.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ message: 'First name, email, and message are required.' });
    }

    const contactEntry = new Contact({ firstName, lastName, email, phone, message });
    await contactEntry.save();

    // Attempt to send a notification email - if SMTP isn't configured, we still keep the DB record
    const transporter = getTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Wildflowers & Waves Website" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
          replyTo: email,
          subject: `New enquiry from ${firstName} ${lastName || ''}`.trim(),
          text: `From: ${firstName} ${lastName || ''} <${email}>\nPhone: ${phone || 'N/A'}\n\n${message}`,
        });
      } catch (emailError) {
        console.error('Email send failed (submission was still saved):', emailError.message);
      }
    }

    res.status(201).json({ message: 'Thank you for reaching out! We will be in touch soon.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error submitting contact form', error: error.message });
  }
};
