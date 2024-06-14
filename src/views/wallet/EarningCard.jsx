import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {MonetizationOnOutlined, PriceCheck, ShoppingBasket} from "@mui/icons-material";

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, title, value }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <>
        {isLoading ? (
            <SkeletonEarningCard />
        ) : (
            <MainCard
                border={false}
                content={false}
                sx={{
                  bgcolor: 'secondary.dark',
                  color: '#fff',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: 210,
                    height: 210,
                    background: theme.palette.secondary[800],
                    borderRadius: '50%',
                    top: { xs: -105, sm: -85 },
                    right: { xs: -140, sm: -95 }
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: 210,
                    height: 210,
                    background: theme.palette.secondary[800],
                    borderRadius: '50%',
                    top: { xs: -155, sm: -125 },
                    right: { xs: -70, sm: -15 },
                    opacity: 0.5
                  }
                }}
            >
              <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Avatar
                            variant="rounded"
                            sx={{
                              ...theme.typography.commonAvatar,
                              ...theme.typography.largeAvatar,
                              bgcolor: 'secondary.800',
                              mt: 1
                            }}
                        >
                          <img src={EarningIcon} alt="Notification" />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Avatar
                            variant="rounded"
                            sx={{
                              ...theme.typography.commonAvatar,
                              ...theme.typography.mediumAvatar,
                              bgcolor: 'secondary.dark',
                              color: 'secondary.200',
                              zIndex: 1
                            }}
                            aria-controls="menu-earning-card"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                          <MoreHorizIcon fontSize="inherit" />
                        </Avatar>
                        <Menu
                            id="menu-earning-card"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right'
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                            }}
                        >
                          <MenuItem onClick={handleClose}>
                            <ShoppingBasket sx={{ mr: 1.75 }} /> Redeem
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <PriceCheck sx={{ mr: 1.75 }} /> Earn
                          </MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                          <MonetizationOnOutlined fontSize="medium"/> {value}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                            sx={{
                              cursor: 'pointer',
                              ...theme.typography.smallAvatar,
                              bgcolor: 'secondary.200',
                              color: 'secondary.dark'
                            }}
                        >
                          <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 1.25 }}>
                    <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: 'secondary.200'
                        }}
                    >
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </MainCard>
        )}
      </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.number
};

export default EarningCard;
