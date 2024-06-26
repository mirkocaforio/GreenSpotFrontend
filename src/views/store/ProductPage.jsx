import {useNavigate, useParams} from "react-router-dom";
import MainCard from "../../ui-component/cards/MainCard";
import {Typography, Grid, Button, Box, IconButton, Avatar, Divider, Tab, Tabs} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import {TabContext, TabPanel} from "@mui/lab";
import {HelpTwoTone, MonetizationOnTwoTone, ShoppingCartOutlined} from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import ProductDetailSkeleton from "../../ui-component/cards/Skeleton/ProductPage";
import ValueIncrementer from "../../ui-component/ValueIncrementer";
import {dateBeauty} from "../../utils/date-beauty";
import Stack from "@mui/material/Stack";
import BuyRewardModel from "../../services/Model/BuyRewardModel";
import {buyReward} from "../../actions/reward";

const ProductPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const {rewards} = useSelector(state => state.reward);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const theme = useTheme();
    const {borderRadius} = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const [value, setValue] = useState("1");
    const [favorite, setFavorite] = useState(false);
    const [submit, setSubmit] = useState(false);

    const goBack = () => {
        navigate("/store", { replace: true });
    }

    const handleOnClick = () => {
        const redeem = new BuyRewardModel("", product.id, "", quantity);
        setSubmit(true);
        dispatch(buyReward(redeem.toJson())).then(
            () => {
                setSubmit(false);
            }
        );
    }

    const handleFavoriteClick = () => {
        setFavorite(prevFavorite => !prevFavorite);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    useEffect(() => {
        if(rewards) {
            setProduct(rewards?.rewards.find(reward => reward.id === id));
            setIsLoading(false);
        } else{
            setIsLoading(true);
        }

        if(product){
            setIsLoading(false);
        }else {
            setIsLoading(true);
        }
    }, [id, product, rewards]);


    return (
        <MainCard>
            <Button onClick={goBack}><ChevronLeftIcon/> Back </Button>
            {isLoading
            ? (<ProductDetailSkeleton/>)

            : (
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ position: 'relative' }}>
                                <img src={product?.image} alt={product?.id} style={{ width: '100%', borderRadius: borderRadius }} />
                                <IconButton
                                    sx={{ position: 'absolute', top: 10, right: 10, color: favorite ? 'red' : '#fff' }}
                                    onClick={handleFavoriteClick}
                                >
                                    {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Grid container justifyContent={"center"} alignItems={"center"}>
                                        <Grid item>
                                            <IconButton>
                                                <ChevronLeftIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                                                {[product?.image].map((src, index) => (
                                                    <Avatar key={index} src={src} sx={{ mx: 1, width: 64, height: 64, cursor: 'pointer' }} />
                                                ))}
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <IconButton>
                                                <ChevronRightIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs={12}>
                                        { product?.quantity > 0
                                        ? (
                                            <Chip label="In Stock" color="success" size="small"  sx={{ cursor:"default", borderRadius: "4px"}} clickable />
                                        ) : (
                                            <Chip label="Out of Stock" color="error" size="small" sx={{ cursor:"default", borderRadius: "4px"}} clickable />
                                        ) }
                                </Grid>
                                <Grid item>
                                    <Stack direction="column" spacing={-0.1}>
                                        <Typography variant="h3" gutterBottom>
                                            {product?.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                            {product?.subcategory}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Box display="flex" alignItems="center" mb={1}/>
                                </Grid>
                                <Grid item container alignItems="center" justifyContent="flex-start">
                                    <Grid item>
                                        <Stack direction="row" spacing={1}>
                                            <Box sx={{ paddingTop: 0.2 }}>
                                                <MonetizationOnTwoTone color="primary" fontSize="large"/>
                                            </Box>
                                            <Typography variant="h1" color="primary" >
                                                {product?.cost}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    {product?.oldCost > 0 &&
                                        (<Grid item>
                                            <Typography variant="body2" component="span" color="textSecondary" sx={{ textDecoration: 'line-through', ml: 1 }}>
                                                {product?.oldCost}
                                            </Typography>
                                        </Grid>)}
                                </Grid>
                                <Grid item>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>
                                <Grid item container={true} alignItems="center" justifyContent="flex-start">
                                    <Grid item>
                                        <Box sx={{ display: 'flex-start', alignItems: 'center', padding: 4 }}>
                                            <Grid item container alignItems="center" justifyContent="flex-start" spacing={12}>
                                                <Grid item>
                                                    <Typography variant="body1" fontSize="larger" gutterBottom>
                                                        Quantity
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <ValueIncrementer value={quantity} onIncrement={incrementQuantity} onDecrement={decrementQuantity} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>
                                <Grid item container justifyContent="flex-start" xs={12}>
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button fullWidth
                                                    onClick={handleOnClick}
                                                    disabled={product?.quantity === 0 || submit}
                                                    size="large"
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={ <ShoppingCartOutlined/>}>
                                                Redeem Now
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: 10 }}>
                                        <Tabs value={value} onChange={handleChange}>
                                            <Tab icon={<DescriptionTwoToneIcon fontSize="small"/>}
                                                 iconPosition="start"
                                                 key={"product_description"}
                                                 label={"Description"}
                                                 value={"1"}
                                                 sx={{minHeight: 0}}
                                            />
                                            <Tab icon={<HelpTwoTone fontSize="small"/>}
                                                 iconPosition="start"
                                                 key={"product_info"}
                                                 label={"Info"}
                                                 value={"2"}
                                                 sx={{minHeight: 0}}
                                            />
                                        </Tabs>
                                    </Box>
                                    <TabContext value={value}>
                                        <TabPanel value={"1"}>
                                            <Typography variant="body1">
                                                {product?.description}
                                            </Typography>
                                        </TabPanel>
                                        <TabPanel value={"2"}>
                                            <Stack direction="column" spacing={0}>
                                                <Typography variant="body1">
                                                    Reward added on:
                                                </Typography>
                                                <Typography variant="body1"
                                                            fontWeight="600"
                                                >{dateBeauty(product?.addDate)}
                                                </Typography>
                                            </Stack>
                                        </TabPanel>
                                    </TabContext>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </MainCard>
    )
}

export default ProductPage;