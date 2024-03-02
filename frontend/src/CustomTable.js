// CustomTable.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CustomTable({ podsMetrics, requestCountMetrics }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Pod Name</TableCell>
            <TableCell align="right">Request Count</TableCell>
            <TableCell align="right">Namespace</TableCell>
            <TableCell align="right">App</TableCell>
            <TableCell align="right">Pod Template Hash</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Creation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {podsMetrics.map((pod) => (
            <TableRow key={pod.podName}>
              <TableCell component="th" scope="row">{pod.podName}</TableCell>
              <TableCell align="right">{requestCountMetrics[`pod:${pod.podName}`] || 'N/A'}</TableCell>
              <TableCell align="right">{pod.namespace}</TableCell>
              <TableCell align="right">{pod.labels.app}</TableCell>
              <TableCell align="right">{pod.labels['pod-template-hash']}</TableCell>
              <TableCell align="right">{pod.status}</TableCell>
              <TableCell align="right">{new Date(pod.creationTimestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;