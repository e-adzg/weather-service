// HPACard.js
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function HPACard({ name, currentReplicas, desiredReplicas }) {
  return (
    <Card elevation={8} sx={{ minWidth: 275, maxWidth: 500, margin: 2, backgroundColor: "#f5f5f5", borderRadius: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          HPA Name:
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h5" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">
          Current Replicas:
        </Typography>
        <Typography sx={{ mb: 1 }} variant="body2">
          {currentReplicas}
        </Typography>
        <Typography color="text.secondary">
          Desired Replicas:
        </Typography>
        <Typography variant="body2">
          {desiredReplicas}
        </Typography>
      </CardContent>
    </Card>
  );
}