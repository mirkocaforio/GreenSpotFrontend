// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';


const CustomCard = () => {
    return(
        <Card>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Skeleton variant="rectangular" sx={{ my: 2 }} height={30} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" height={30} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CustomCard;