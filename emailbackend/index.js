const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 4000;

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

app.use(express.json());
app.use(cors());  

// Store attachment data in memory
const attachments = [];

app.post('/api/send', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const toEmail = req.body.toEmail;
    const subject = req.body.subject;
    const emailText = req.body.emailText;

    if (!toEmail || !subject || !emailText) {
      return res.status(400).send('Recipient email, subject, and email text are required.');
    }

    // Store the attachment data in memory
    attachments.push({
      filename: file.originalname,
      content: file.buffer,
    });

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'saisivas200@gmail.com',
        pass: 'jlvy mvjs kbxv qpmj',
      },
    });

    const mailOptions = {
      from: 'saisivas200@gmail.com',
      to: toEmail,
      subject: subject,
      text: emailText,
      attachments: attachments, // Use the stored attachments
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
