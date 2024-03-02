// BasicCard.js
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard({ nodeName, cpuUsage, memoryUsage }) {
  return (
    <Card elevation={8} sx={{ minWidth: 275, maxWidth: 500, margin: 2, backgroundColor: "#f5f5f5", borderRadius: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Node Name:
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h5" component="div">
          {nodeName}
        </Typography>
        <Typography color="text.secondary">
          CPU Usage:
        </Typography>
        <Typography sx={{ mb: 1 }} variant="body2">
          {cpuUsage}
        </Typography>
        <Typography color="text.secondary">
          Memory Usage:
        </Typography>
        <Typography variant="body2">
          {memoryUsage}
        </Typography>
      </CardContent>
    </Card>
  );
}