import MainCard from "../../ui-component/cards/MainCard";
import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import CreditForm from "./CreditForm";
import Divider from "@mui/material/Divider";
import PaymentSettingsForm from "./PaymentSettingsForm";
import SkeletonSettingsForm from "../../ui-component/cards/Skeleton/SettingsForm";
import {gridSpacing} from "../../store/constant";

const SettingsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {settings} = useSelector((state) => state.settings);

    useEffect(() => {
        if(settings){
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [settings]);

    return (

        <MainCard>
            {isLoading ? (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SkeletonSettingsForm/>
                    </Grid>
                    <Grid item xs={12}>
                        <SkeletonSettingsForm/>
                    </Grid>
                </Grid>):(
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CreditForm settings={settings?.assignment}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <PaymentSettingsForm paymentSettings={settings?.payment}/>
                    </Grid>
                </Grid>
            )}
        </MainCard>

    )
}

export default SettingsPage