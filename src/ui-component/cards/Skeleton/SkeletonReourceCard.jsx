import React from 'react';
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubCard from "../SubCard";

const SkeletonResourceCard = () => {
    return (
        <SubCard>
            <Box display="flex" alignItems="center" flexDirection="column"
                 sx={{overflow: 'auto'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant="text" width="60%"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant="text" width="60%"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                            >
                                <Skeleton variant="text" width="60%"/>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SubCard>
                                    <List>
                                        {[...Array(10)].map((_, index) => (
                                            <ListItem key={index}>
                                                <ListItemIcon>
                                                    <Skeleton variant="circle" width={40} height={40}/>
                                                </ListItemIcon>
                                                <Skeleton variant="text" width="60%"/>
                                                <ListItemSecondaryAction>
                                                    <Skeleton variant="text" width="40%"/>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </SubCard>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant="text" width="60%"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant="text" width="60%"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                            >
                                <Skeleton variant="text" width="60%"/>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SubCard>
                                    <Grid container spacing={2}>
                                        {[...Array(10)].map((_, index) => (
                                            <React.Fragment key={index}>
                                                <Grid item xs={12} md={12}>
                                                    <Skeleton variant="text" width="60%"/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider/>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </SubCard>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
        </SubCard>
    );
}

export default SkeletonResourceCard;