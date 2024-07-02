import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import {gridSpacing} from "../../store/constant";
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import PaymentSettingsForm from "./PaymentSettingsForm";
import CreditForm from "./CreditForm";


const SettingsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {settings} = useSelector((state) => state.settings);

    useEffect(() => {
        console.log(settings);
        if (settings) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [settings]);

    return (
        <MainCard>
            {isLoading ? (<Grid container justifyContent={"center"}>
                <Grid item xs={12}>
                    <SubCard title="Loading...">
                        <p>Settings are loading...</p>
                    </SubCard>
                </Grid>
            </Grid>) : (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CreditForm data={settings?.assignment}/>
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