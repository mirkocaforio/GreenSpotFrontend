import ProductDetailSkeleton from "../../../ui-component/cards/Skeleton/ProductPage";
import React, {useState} from "react";
import {Avatar, Box, Divider, Grid, IconButton, Tab, Tabs, Typography} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Chip from "@mui/material/Chip";
import {HelpTwoTone} from "@mui/icons-material";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import {TabContext, TabPanel} from "@mui/lab";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {dateBeauty} from "../../../utils/date-beauty";
import Stack from "@mui/material/Stack";


const RewardViewForm = ({ isLoading, reward }) => {

    const {borderRadius} = useSelector((state) => state.customization);
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return(
        isLoading
            ? (<ProductDetailSkeleton/>)
            : (
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4} lg={4} sm={4}>
                            <Box sx={{ position: 'relative' }}>
                                <img src={reward?.image} alt={reward?.id} style={{ width: '100%', borderRadius: borderRadius }} />
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Grid container justifyContent={"center"} alignItems={"center"}>
                                        <Grid item>
                                            <IconButton>
                                                <ChevronLeftIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                                                {[reward?.image].map((src, index) => (
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
                        <Grid item xs={12} md={8} lg={8} sm={8}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Box display="flex" alignItems="center" mb={2}/>
                                </Grid>
                                <Grid item container alignItems="center" justifyContent="flex-start">
                                    <Grid item>
                                        <Typography variant="h2" color="primary" gutterBottom>
                                            ${reward?.cost}
                                        </Typography>
                                    </Grid>
                                    {reward?.oldCost > 0 &&
                                        (<Grid item>
                                            <Typography variant="body2" component="span" color="textSecondary" sx={{ textDecoration: 'line-through', ml: 1 }}>
                                                ${reward?.oldCost}
                                            </Typography>
                                        </Grid>)}
                                </Grid>
                                <Grid item>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction={"row"} spacing={1}>
                                        <Typography variant="body2" gutterBottom>
                                            { reward?.quantity > 0
                                                ? (
                                                    <Chip label="In Stock" color="success" size="small"  sx={{ cursor:"default", borderRadius: "4px"}} clickable />
                                                ) : (
                                                    <Chip label="Out of Stock" color="error" size="small" sx={{ cursor:"default", borderRadius: "4px"}} clickable />
                                                ) }
                                        </Typography>
                                        <Chip label={"Sold: " + reward?.sold} color="secondary" size="small"
                                              sx={{ cursor:"default",
                                                  borderRadius: "4px"}}
                                              clickable />
                                    </Stack>

                                </Grid>
                                <Grid item>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
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
                                                {reward?.description}
                                            </Typography>
                                        </TabPanel>
                                        <TabPanel value={"2"}>
                                            <Typography variant="body1">
                                                Reward added on:
                                                <Typography variant="body1"
                                                            fontWeight="600"
                                                >{dateBeauty(reward?.addDate)}
                                                </Typography>
                                            </Typography>
                                        </TabPanel>
                                    </TabContext>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            )
    )
}

RewardViewForm.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    reward: PropTypes.object
}

export default RewardViewForm;