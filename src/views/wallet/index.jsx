import MainCard from "../../ui-component/cards/MainCard";
import {gridSpacing} from "../../store/constant";
import Grid from "@mui/material/Grid";
import EarningCard from "./EarningCard";
import {useEffect, useState} from "react";
import TimeEarningCard from "./TimeEarningCard";
import SubCard from "../../ui-component/cards/SubCard";
import TransactionsCard from "./TransactionsCard";
import {useSelector} from "react-redux";

const Wallet = () => {
    const {wallet} = useSelector(state => state.wallet);
    const {transactionUserAnalytics} = useSelector(state => state.analytics);
    const {transactionMemberAnalytics} = useSelector(state => state.analytics);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (wallet && (transactionUserAnalytics || transactionMemberAnalytics)) {
            console.log('transactionUserAnalytics', transactionUserAnalytics);
            console.log('transactionMemberAnalytics', transactionMemberAnalytics);
            setLoading(false);
        } else {
            setLoading(true);
        }

    }, [transactionMemberAnalytics, transactionUserAnalytics, wallet]);

    const getTimeEarningCard = () => {
        if (transactionUserAnalytics) {
            return (
                <TimeEarningCard
                    isLoading={isLoading}
                    title="Total Earnings"
                    transactionAnalytics={transactionUserAnalytics}
                    role="user"
                />
            );
        } else if (transactionMemberAnalytics) {
            return (
                <TimeEarningCard
                    isLoading={isLoading}
                    title="Total Earnings"
                    transactionAnalytics={transactionMemberAnalytics}
                    role="member"
                />
            );
        }
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <EarningCard isLoading={isLoading} title="Credits" value={wallet ? wallet.balance : 0}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {getTimeEarningCard()}
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