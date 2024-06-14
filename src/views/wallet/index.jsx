import Typography from "@mui/material/Typography";
import MainCard from "../../ui-component/cards/MainCard";
import {gridSpacing} from "../../store/constant";
import Grid from "@mui/material/Grid";
import EarningCard from "./EarningCard";
import {useEffect, useState} from "react";
import TimeEarningCard from "./TimeEarningCard";
import SubCard from "../../ui-component/cards/SubCard";
import TransactionsCard from "./TransactionsCard";

const Wallet = () => {

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    return(
        <MainCard title="Wallet">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <EarningCard isLoading={isLoading} title="Credits" value={200}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TimeEarningCard isLoading={isLoading} title="Total Earnings"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Recent Transactions">
                        <TransactionsCard/>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Wallet;