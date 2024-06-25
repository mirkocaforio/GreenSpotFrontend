import PropTypes from "prop-types";
import MainCard from "../../../ui-component/cards/MainCard";
import SubCard from "../../../ui-component/cards/SubCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {Icon} from "@mui/material";
import {RedeemTwoTone} from "@mui/icons-material";
import React from "react";
import RedeemCodeCard from "../../../ui-component/RedeemCodeCard";
import Divider from "@mui/material/Divider";
import {dateBeauty} from "../../../utils/date-beauty";

const RedeemInfo = ({redeem, isLoading}) => {

    const theme = useTheme();
    const {borderRadius } = useSelector((state) => state.customization);

    return (
        <SubCard>
            <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"} spacing={0}>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Typography variant="h3">
                        Congrats!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Typography variant="subtitle2">
                        Your redeem code is ready!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Divider sx={{border: `0px`, paddingBottom: 8}}/>
                </Grid>
                <Grid item >
                    <RedeemCodeCard propIcon={<RedeemTwoTone/>} text={redeem?.redeemCode}/>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Divider sx={{border: `0px`, paddingBottom: 2}}/>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">
                        {dateBeauty(redeem?.redeemDate)}
                    </Typography>
                </Grid>
            </Grid>
        </SubCard>
    )
}

RedeemInfo.propTypes = {
    redeem: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default RedeemInfo;