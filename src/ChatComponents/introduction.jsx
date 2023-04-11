import { Typography } from "@mui/material";
import { Box, fontFamily } from "@mui/system";

const Intro = ({ messenger }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'block',
                textAlign: 'center'
            }}
        >
            <Typography
                sx={{
                    color: '#666',
                    fontSize: '1rem',
                    fontStyle: 'italic'
                }}
            >{messenger} joined the room!</Typography>
        </Box>
    );
}

export default Intro; 