import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      contact,
      type,
      usage,
      size,
      height,
      falseCeiling,
      freshAir,
      message,
    } = req.body;

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
      return res.status(500).json({ error: 'Server email configuration is missing.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: user,
      to: 'dba@dba.sg',
      subject: `New Dehumidifier Inquiry from ${name}`,
      text: `
You have received a new dehumidifier inquiry.

Name / Company Name: ${name}
Contact: ${contact}
Type of dehumidifier inquire: ${type}
What is your place used for: ${usage}
Size of the place (sqm): ${size}
Height of the ceiling (m): ${height}
False Ceiling (Y/N): ${falseCeiling}
Fresh Air inflow (Y/N): ${freshAir}
Message: ${message || 'N/A'}
      `,
      html: `
<h2>New Dehumidifier Inquiry</h2>
<table border="1" cellpadding="8" style="border-collapse: collapse;">
  <tr>
    <td><strong>Name / Company Name</strong></td>
    <td>${name}</td>
  </tr>
  <tr>
    <td><strong>Contact</strong></td>
    <td>${contact}</td>
  </tr>
  <tr>
    <td><strong>Type of dehumidifier inquire</strong></td>
    <td>${type}</td>
  </tr>
  <tr>
    <td><strong>What is your place used for</strong></td>
    <td>${usage}</td>
  </tr>
  <tr>
    <td><strong>Size of the place (sqm)</strong></td>
    <td>${size}</td>
  </tr>
  <tr>
    <td><strong>Height of the ceiling (m)</strong></td>
    <td>${height}</td>
  </tr>
  <tr>
    <td><strong>False Ceiling (Y/N)</strong></td>
    <td>${falseCeiling}</td>
  </tr>
  <tr>
    <td><strong>Fresh Air inflow (Y/N)</strong></td>
    <td>${freshAir}</td>
  </tr>
  <tr>
    <td><strong>Message</strong></td>
    <td>${message || 'N/A'}</td>
  </tr>
</table>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Inquiry submitted successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send inquiry. Please try again later.' });
  }
}
