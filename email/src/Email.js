
import React, { useState } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Container, Typography, TextField, Button, } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const Email = () => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [emailText, emailsetText] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');


    const handleFileChange = (e) => {

        const selectedfile = e.target.files[0];
        setFile(selectedfile)

        // Set the selected file name
        if (selectedfile) {
            setFileName(selectedfile.name);
        } else {
            setFileName(''); // Clear the file name if no file is selected
        }

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!toEmail || !subject || !emailText || !file) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('toEmail', toEmail);
        formData.append('subject', subject);
        formData.append('emailText', emailText);

        try {

            console.log('datat')
            const response = await axios.post('http://localhost:8000/api/send', formData, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                },


            })
            if (response.status === 200) {
                alert('Email sent successfully');
            } else {
                alert('Error sending email');
            }
        }

        catch (error) {
            console.error(error)
            alert('Network error');
        }
    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', // Add your desired shadow here
                    borderRadius: '8px', // Optional: Add some border radius for rounded corners
                    padding: '16px', marginTop: '100px' // Optional: Add padding for space around the form
                }}
            >
                <form className='margin' onSubmit={handleSubmit}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Email
                    </Typography>
                    <TextField
                        label="To"
                        size='small'
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={toEmail}
                        onChange={(e) => setToEmail(e.target.value)}
                    />
                    <TextField
                        label="Subject"
                        size='small'
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <TextField
                        label="Message"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={emailText}
                        onChange={(e) => emailsetText(e.target.value)}
                    />

                    <label htmlFor="attachment-input" className="custom-file-label">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            required
                            style={{ display: 'none' }}
                            id="attachment-input"
                        />
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            className="custom-file-button"
                        >
                            {fileName || 'Choose File'} {/* Display the file name */}
                        </Button>
                    </label>
                    {/* {file && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CloudUploadIcon sx={{ marginRight: '8px' }} />
                            <Typography>{file.name}</Typography>
                        </Box>
                    )} */}

                    <Button sx={{ marginTop: '10px' }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        size="small"
                    >
                        Send Email
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default Email

