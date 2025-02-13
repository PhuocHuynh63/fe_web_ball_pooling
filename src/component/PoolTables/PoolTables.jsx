import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import "./PoolTables.css"; // Import the CSS file for styling

const PoolTables = () => {
  const [poolTables, setPoolTables] = useState([
    {
      id: 1,
      name: "Classic Pool Table",
      description: "A classic pool table with a sleek design.",
      price: 500,
    },
    {
      id: 2,
      name: "Modern Pool Table",
      description: "A modern pool table with advanced features.",
      price: 800,
    },
    {
      id: 3,
      name: "Luxury Pool Table",
      description: "A luxury pool table with premium materials.",
      price: 1200,
    },
  ]);

  return (
    <Box className="pool-tables-container" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Available Pool Tables
      </Typography>
      <Box className="pool-tables-grid">
        {poolTables.length > 0 ? (
          poolTables.map((table) => (
            <Card key={table.id} className="pool-table-card">
              <CardContent>
                <Typography variant="h5">{table.name}</Typography>
                <Typography color="textSecondary">{table.description}</Typography>
                <Typography variant="body2">Price: ${table.price}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No pool tables available at the moment.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PoolTables;