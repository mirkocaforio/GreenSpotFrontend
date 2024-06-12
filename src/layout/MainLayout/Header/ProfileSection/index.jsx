import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
//import UpgradePlanCard from './UpgradePlanCard';
//import User1 from 'assets/images/users/user-round.svg';
import {logout} from "../../../../actions/auth";
import {LOGIN_PATH} from "../../../../config";
import logoutItem from "./profile-menu-items/logout";

// assets
import {IconSearch, IconSettings} from '@tabler/icons-react';
import accountSettingsItem from "./profile-menu-items/accountSettings";
import socialProfileItem from "./profile-menu-items/socialProfile";
import AvatarPic from "../../../../ui-component/AvatarPic";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const [isLoading, setLoading] = useState(true);
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const [filteredItems, setFilteredItems] = useState([]);

    /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    dispatch(logout());
    navigate(LOGIN_PATH);
  };

  const getEmail = () => {
    return profile.email;
  }

  const getName = () => {
    return profile.name;
  }

  const getSurname = () => {
    return profile.surname;
  }

  const getRole = () => {
    return profile.role;
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  useEffect(() => {

    if (profile) {
      setLoading(false);
    } else {
      setLoading(true);
    }

  },[profile]);

  useEffect(() => {
        const allItems = [
            accountSettingsItem({}),
            socialProfileItem({onClick: null, chipValue: '69'}),
            logoutItem({onClick: handleLogout})
        ];

        if (value === '') {
            setFilteredItems(allItems);
        } else {
            const filtered = allItems.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
            setFilteredItems(filtered);
        }
    }, [ value]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
            <AvatarPic open={open} anchorRef={anchorRef}  />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Stack>
                        { !isLoading
                            ? (<>
                      <Stack direction="row" spacing={0.5} alignItems="center">

                        <Typography component="span" variant="h4">
                            {getName()} {getSurname()}
                        </Typography>
                      </Stack>
                        <Typography variant="subtitle">{getEmail()}</Typography>
                       <Typography variant="subtitle2">{getRole()}</Typography>
                        </>)
                            : (<Typography component="span" variant="h4">
                           User
                        </Typography>
                            )}
                    </Stack>
                    <OutlinedInput
                      sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search profile options"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                    />
                    <Divider />
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Divider />
                      <Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          my: 2
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Gay?</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={sdm}
                                    onChange={(e) => setSdm(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Allow Notifications</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) => setNotification(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                          {filteredItems.map((item) => (
                              <ListItemButton
                                  key={item.index}
                                  sx={{ borderRadius: `${customization.borderRadius}px` }}
                                  selected={selectedIndex === item.index}
                                  onClick={(event) =>
                                      item.onClick ? item.onClick() : handleListItemClick(event, item.index, item.route)
                                  }
                              >
                                  <ListItemIcon>{item.icon}</ListItemIcon>
                                  <ListItemText
                                      primary={
                                          <Grid container spacing={1} justifyContent="space-between">
                                              <Grid item>
                                                  <Typography variant="body2">{item.label}</Typography>
                                              </Grid>
                                              {item.chip && (
                                                  <Grid item>
                                                      <Chip
                                                          label={item.chip}
                                                          size="small"
                                                          sx={{
                                                              bgcolor: theme.palette.warning.dark,
                                                              color: theme.palette.background.default
                                                          }}
                                                      />
                                                  </Grid>
                                              )}
                                          </Grid>
                                      }
                                  />
                              </ListItemButton>
                          ))}
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
