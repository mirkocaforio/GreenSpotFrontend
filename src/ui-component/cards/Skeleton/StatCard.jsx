import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const StatCard = () =>{
    return (
        <Grid container={true} alignItems={"center"} justifyContent="center" sx={{ p: 3 }}>
            <Grid item xs={6}>
                <Grid container={true} justifyContent="flex-start" >
                    <Grid item>
                        <Skeleton variant="rectangular" width={44} height={44} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container={true} justifyContent="center" alignItems="center">
                    <Grid item>
                        <Grid container={true} direction="column" justifyContent="center" alignItems={"center"} spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={10} width={50} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={8} width={100} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default StatCard;