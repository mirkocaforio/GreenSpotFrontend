import Typography from "@mui/material/Typography";
import MainCard from "../../ui-component/cards/MainCard";
import {gridSpacing} from "../../store/constant";
import Grid from "@mui/material/Grid";
import EarningCard from "./EarningCard";
import {useEffect, useState} from "react";
import TimeEarningCard from "./TimeEarningCard";
import SubCard from "../../ui-component/cards/SubCard";
import TransactionsCard from "./TransactionsCard";
import {useDispatch, useSelector} from "react-redux";
import {getWallet} from "../../actions/wallet";

const Wallet = () => {

    const [isLoading, setLoading] = useState(true);
    const {wallet} = useSelector(state => state.wallet);

    useEffect(() => {

        if(wallet === null){
            setLoading(true);
        }else{
            setLoading(false);
        }

    }, [ wallet]);

    return(
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <EarningCard isLoading={isLoading} title="Credits" value={wallet ? wallet.balance : 0}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TimeEarningCard isLoading={isLoading} title="Total Earnings"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Recent Transactions">
                        <TransactionsCard isLoading={isLoading} maxRows={10}/>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Wallet;