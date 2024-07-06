// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';


const CustomCard = () => {
    return(
        <Card>
            <CardContent>
                <Grid container direction="row" justifyContent={"center"} alignContent={"center"} spacing={2}>
                    <Grid item xs={6}>
                        <Grid container direction="column" justifyContent={"flex-start"}>
                            <Grid item>
                                <Skeleton variant="rectangular" sx={{ my: 2 }} height={30} width={100} />
                            </Grid>
                            <Grid item>
                                <Skeleton variant="text" height={20} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justifyContent={"flex-end"}>
                            <Grid item>
                                <Skeleton variant="circular" height={100} width={100} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CustomCard;