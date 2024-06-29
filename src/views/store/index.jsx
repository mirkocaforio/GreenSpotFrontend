import ProductList from "./ProductCard";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import React, {useEffect, useState} from "react";
import SearchField from "../../ui-component/extended/SearchField";
import VerticalDivider from "../../ui-component/extended/VerticalDivider";
import SorterButton from "../../ui-component/extended/SorterButton";
import {useSelector} from "react-redux";


const RewardStore = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByPrice, setSortByPrice] = useState(false);
    const [sortDirection, setSortDirection] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const {rewards} = useSelector(state => state.reward);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortByPrice = () => {
        setSortByPrice(!sortByPrice);
        setSortDirection(sortByPrice ? 'asc' : 'desc');
    };

    useEffect(() => {
        if(rewards) {
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [rewards]);


    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                {/* <Header /> */}
                <Grid container
                        direction="row"
                      alignItems="center"
                >
                    <Grid container={true} item xs={12} justifyContent="flex-end" alignItems="center" spacing={2}>
                        <Grid item>
                            {/* <SearchBar /> */}
                            <SearchField placeHolder={"Search products"} value={searchQuery} onChange={handleSearchChange} />
                        </Grid>
                        <Grid item style={{ alignSelf: "stretch" }}>
                            <VerticalDivider/>
                        </Grid>
                        <Grid item>
                            {/* <Filter /> */}
                            <SorterButton title={"Sort by price"} sortDirection={sortDirection} onClick={handleSortByPrice}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <ProductList isLoading={isLoading} data={rewards?.rewards} searchQuery={searchQuery} sortByPrice={sortByPrice} sortDirection={sortDirection}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RewardStore;