import React from 'react';
import { Container, Grid, Typography, Link, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import logo from '../assets/public/images/logo.png';

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: '#f1f1f1',
        padding: '20px 0',
        boxShadow: '0 -3px 5px rgba(0,0,0,0.1)',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            {/* Logo and company name section */}
            <Box display="flex" alignItems="center">
              <img src={logo} alt="Company Logo" style={{ marginRight: 10, width: 50, height: 'auto' }} />
              <Typography variant="body1" color="textPrimary">
                Your Company Name
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* Navigation links section */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="right">
              <IconButton href="https://facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' Your Company. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
