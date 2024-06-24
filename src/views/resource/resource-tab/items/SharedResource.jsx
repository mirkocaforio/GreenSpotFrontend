// material-ui
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../../../store/constant";
import MainCard from "../../../../ui-component/cards/MainCard";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import SkeletonResourceCard from "../../../../ui-component/cards/Skeleton/SkeletonReourceCard";
import ResourceCard from "./ResourceCard";

const SharedResource = () => {
    const {resourcesList: resources} = useSelector((state) => state.resource);
    const [resourcesList, setResourcesList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    //const theme = useTheme();
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (resources) {
            setResourcesList(resources.resourcesList);
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [resources]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredResources = resourcesList.filter(resource =>
        resource.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <>
            {isLoading ? (
                    <SkeletonResourceCard/>
                )
                : (
                    <MainCard title="Shared resources">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="search"
                                    label="Search a resource by name"
                                    name="search"
                                    autoComplete="search"
                                    autoFocus
                                    value={search}
                                    onChange={handleSearchChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {filteredResources.map((resource, index) => (
                                <Grid item xs={12} sm={12} md={12} key={index}>
                                    <ResourceCard resource={resource}/>
                                </Grid>
                            ))}
                        </Grid>
                    </MainCard>
                )}
        </>
    );
}

export default SharedResource;