import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import SubCard from "../SubCard";


const SettingsForm = () => {

    return(
        <SubCard>
                <Grid container direction="row" justifyContent={"center"} alignContent={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container direction="column" justifyContent={"flex-start"}>
                            <Grid item>
                                <Skeleton variant="rectangular" sx={{ my: 2 }} height={30} />
                            </Grid>
                            <Grid item>
                                <Skeleton variant="text" height={20} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </SubCard>
    )
}

export default SettingsForm;