import {CircularProgress} from "@mui/material";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/material/styles";


const CircularProgressBar = ({ progress, values, unit, sx }) => {
    const theme = useTheme();
    const convertToPercentage = (value, values) => {
        let max = Math.max(...values);
        return value / Math.max(1, max) * 100;
    }

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <IconButton sx={{ cursor:"default"}}>
                <CircularProgress variant="determinate" value={convertToPercentage(progress,values)}
                              sx={{...sx}}
                              size={70}
                              thickness={5}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {progress}{unit}
                    </Typography>
                </Box>
            </IconButton>
        </Box>
  );
}

CircularProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    values: PropTypes.array.isRequired,
    sx: PropTypes.object,
    unit: PropTypes.string
};

export default CircularProgressBar;