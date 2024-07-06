// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON TOTAL GROWTH BAR CHART ||============================== //

const BarChart = () => (
    <Card>
        <CardContent>
            <Skeleton variant="rectangular" height={530} />
        </CardContent>
    </Card>
);

export default BarChart;
