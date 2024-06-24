import Button from "@mui/material/Button";
import React, {useState} from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import LinkIcon from "@mui/icons-material/Link";
import {Box, Typography} from "@mui/material";
import {
    CategoryOutlined,
    LockOpenTwoTone, LockTwoTone,
    MonetizationOnOutlined, ProductionQuantityLimitsOutlined
} from "@mui/icons-material";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import {Formik} from "formik";
import {styled, useTheme} from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import FormSkeleton from "../../../../ui-component/cards/Skeleton/FormSkeleton";
import {useDispatch} from "react-redux";
import {createReward, updateReward} from "../../../../actions/reward";
import RewardModel from "../../../../services/Model/RewardModel";
import {useNavigate} from "react-router-dom";

const StyledImageField = styled(Box)(({ theme }) => ({
    border: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[5],
    }
}));

const RewardForm = ({ reward, isLoading = false }) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        if(reward) {
            // update reward
            const rewardObj = RewardModel.fromJson(values);
            rewardObj.setId(reward?.id);
            dispatch(updateReward(rewardObj.toJson())).then(
                () => {
                    navigate("/store/management", { replace: true });
                }
            );
        }else{
            // create reward
            const rewardObj = RewardModel.fromJson(values);
            dispatch(createReward(rewardObj.toJson())).then(
                () => {
                    navigate("/store/management", { replace: true });
                }
            );
        }
    }

    return (
        isLoading ? (<FormSkeleton/>) : (
        <Formik
            initialValues={{
                image: reward?.image ? reward.image : '',
                name: reward?.name ? reward.name : '',
                cost: reward?.cost ? reward.cost : 0.0,
                oldCost: reward?.oldCost ? reward.oldCost : 0.0,
                description: reward?.description ? reward.description : '',
                category: reward?.category ? reward.category : '',
                subcategory: reward?.subcategory ? reward.subcategory : '',
                quantity: reward?.quantity ? reward.quantity : 0,
                active: reward?.active !== null && reward?.active !== undefined ? reward.active : true,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                image: Yup.string().required('Image is required'),
                name: Yup.string().required('Name is required'),
                cost: Yup.number().min(0, "Must be positive number").required('Cost is required'),
                oldCost: Yup.number().min(0, "Must be a positive number").required('Old Cost is required'),
                description: Yup.string().required('Description is required'),
                category: Yup.string().required('Category is required'),
                subcategory: Yup.string().required('Subcategory is required'),
                quantity: Yup.number().min(0,"Must be a positive number").required('Quantity is required'),
            })}
            onSubmit={(values,{setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values);
                setSubmitting(false);
            }}>
            {({ errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            {/*Image field + Image show*/}
                            <SubCard title="Image">
                                <Grid container
                                      alignItems="center" justifyContent={"center"}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.image && errors.image)} sx={{ ...theme.typography.customInput }} >
                                            <InputLabel htmlFor="outlined-adornment-reward-image">Image</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="image"
                                                type="text"
                                                value={values.image}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.image && errors.image)}
                                                endAdornment={<LinkIcon/>}
                                            />
                                            {touched.image && errors.image && (
                                                <FormHelperText error>
                                                    {errors.image}
                                                </FormHelperText>)}

                                        </FormControl>
                                    </Grid>
                                    <Grid item >
                                        {values.image && (
                                            <StyledImageField sx={{ border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                mt: 2 }}>
                                                <img src={values.image} alt="product" style={{
                                                    width: '100%' ,
                                                    height: 'auto',
                                                    borderRadius: '12px',
                                                }} />
                                            </StyledImageField>
                                        )}
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <SubCard title="Details">
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                    <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }} >
                                        <InputLabel htmlFor="outlined-adornment-reward-name">Name</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.name && errors.name)}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error>
                                                {errors.name}
                                            </FormHelperText>)}
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.cost && errors.cost)} sx={{ ...theme.typography.customInput }} >
                                            <InputLabel htmlFor="outlined-adornment-reward-cost">Cost</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="cost"
                                                type="number"
                                                value={values.cost}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                endAdornment={<MonetizationOnOutlined/>}
                                                error={Boolean(touched.cost && errors.cost)}
                                            />
                                            {touched.cost && errors.cost && (
                                                <FormHelperText error>
                                                    {errors.cost}
                                                </FormHelperText>)}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.oldCost && errors.oldCost)} sx={{ ...theme.typography.customInput }} >
                                            <InputLabel htmlFor="outlined-adornment-reward-oldCost">Old Cost</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="oldCost"
                                                type="number"
                                                step={0.1}
                                                value={values.oldCost}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                endAdornment={<MonetizationOnOutlined/>}
                                                error={Boolean(touched.oldCost && errors.oldCost)}
                                            />
                                            {touched.oldCost && errors.oldCost && (
                                                <FormHelperText error>
                                                    {errors.oldCost}
                                                </FormHelperText>)}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.category && errors.category)} sx={{ ...theme.typography.customInput }} >
                                            <InputLabel htmlFor="outlined-adornment-reward-category">Category</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="category"
                                                type="text"
                                                value={values.category}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                endAdornment={<CategoryOutlined/>}
                                                error={Boolean(touched.category && errors.category)}
                                            />
                                            {touched.category && errors.category && (
                                                <FormHelperText error>
                                                    {errors.category}
                                                </FormHelperText>)}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.subcategory && errors.subcategory)} sx={{ ...theme.typography.customInput }} >
                                            <InputLabel htmlFor="outlined-adornment-reward-subcategory">Subcategory</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="subcategory"
                                                type="text"
                                                value={values.subcategory}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                endAdornment={<CategoryOutlined/>}
                                                error={Boolean(touched.subcategory && errors.subcategory)}
                                            />
                                            {touched.subcategory && errors.subcategory && (
                                                <FormHelperText error>
                                                    {errors.subcategory}
                                                </FormHelperText>)}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.quantity && errors.quantity)} sx={{ ...theme.typography.customInput }} >
                                            <InputLabel htmlFor="outlined-adornment-reward-quantity">Quantity</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="quantity"
                                                type="number"
                                                value={values.quantity}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                endAdornment={<ProductionQuantityLimitsOutlined/>}
                                                error={Boolean(touched.quantity && errors.quantity)}
                                            />
                                            {touched.quantity && errors.quantity && (
                                                <FormHelperText error>
                                                    {errors.quantity}
                                                </FormHelperText>)}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard title="Additional Information">
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={Boolean(touched.description && errors.description)} >
                                        <InputLabel htmlFor="outlined-adornment-reward-description">Description</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            multiline
                                            rows={10}
                                            label="Description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.description && errors.description)}
                                        />
                                        {touched.description && errors.description && (
                                            <FormHelperText error>
                                                {errors.description}
                                            </FormHelperText>)}
                                    </FormControl>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <SubCard>
                                <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
                                    <Grid item>
                                        <Typography variant="h4">
                                            Status
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={ values.active ? "Enabled" : "Disabled"   } placement="top">
                                            <IconButton
                                                onClick={
                                                    () => {
                                                        handleChange({
                                                            target: {
                                                                name: 'active',
                                                                value: !values.active
                                                            }
                                                        })
                                                    }
                                                }
                                                color={values.active ? "success" : "error" }
                                            >
                                                { values.active ? <LockOpenTwoTone color="success"/> :  <LockTwoTone color="error"/>  }
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <SubCard>
                                <Grid container spacing={gridSpacing} justifyContent={"flex-end"}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <AnimateButton>
                                            <Button fullWidth size="large" type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                                Save
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
        ))
}

RewardForm.propTypes = {
    reward: PropTypes.object,
    isLoading: PropTypes.bool,
}

export default RewardForm;