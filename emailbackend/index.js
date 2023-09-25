const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 8000;



const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.json());
app.use(cors());  

const connection = mysql.createConnection({
    
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'emailuser'
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.post('/api/user',(req,res)=>{

    const{ UserName,Password} = req.body;

  try{
     
      const sql = `SELECT * FROM userlist WHERE username = ? AND password = ?`;

      connection.query( sql, [UserName,Password],(err,results)=>{
         
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
          return;
        }

        if (results.length === 1) {
          res.json({ success: true, message: 'Login successful' });
        } else {
          res.json({ success: false, message: 'Login failed' });
        }
           
      })
  }

  catch (error) {
    console.error(error);
    res.status(500).send('Error sending user');
  }

})







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
