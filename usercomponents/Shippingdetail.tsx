import React from 'react';
import { Box, Typography, Grid, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

const order = {
    items: [
      { name: 'Wireless Mouse', quantity: 1, price: 799 },
      { name: 'Bluetooth Keyboard', quantity: 1, price: 1299 },
    ],
    total: 2098,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India',
      phone: '9876543210',
    },
  };
  
const ShippingDetails = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shipping Details
      </Typography>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List>
          {order.items.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity} | Price: ₹${item.price}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total: ₹{order.total}
        </Typography>
      </Paper>

      <Paper sx={{ marginTop: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Typography variant="body1">
          {order.shippingAddress.name}
        </Typography>
        <Typography variant="body1">
          {order.shippingAddress.address}
        </Typography>
        <Typography variant="body1">
          {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}
        </Typography>
        <Typography variant="body1">
          {order.shippingAddress.country}
        </Typography>
        <Typography variant="body1">
          Phone: {order.shippingAddress.phone}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ShippingDetails;
