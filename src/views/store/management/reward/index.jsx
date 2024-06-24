import MainCard from "../../../../ui-component/cards/MainCard";
import RewardForm from "./RewardForm";
import {useNavigate, useParams} from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useSelector} from "react-redux";
import {NEW_REWARD} from "../../../../config";


const RewardAdd = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {rewards} = useSelector(state => state.reward);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if(id !== NEW_REWARD) {
            if (rewards) {
                setProduct(rewards?.rewards.find(reward => reward.id === id));
                setIsLoading(false);
            } else {
                setIsLoading(true);
            }

            if (product) {
                setIsLoading(false);
            } else {
                setIsLoading(true);
            }

            setUpdate(true);
        } else{
            setIsLoading(false);
            setUpdate(false);
        }
    }, [id, product, rewards]);

    return (
        <MainCard title={ !update ? "Add Reward" : null}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button color="primary" onClick={
                        () => {
                            navigate("/store/management", {replace: true});
                        }
                    }>
                        <ChevronLeftIcon/>
                        Back
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {update && product
                    ? (
                        <RewardForm isLoading={isLoading} reward={product} />
                    )
                    :
                    (<RewardForm isLoading={isLoading} />)}
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default RewardAdd;