import React, {useEffect, useState} from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import { CardMedia, Button, Typography, Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import CardContent from "@mui/material/CardContent";
import {styled} from "@mui/material/styles";
import NoProductImage from "./NoProductImage";
import ProductListSkeleton from "../../ui-component/cards/Skeleton/ProductCard";


const products = [
    {
        id: "1234",
        name: 'Netflix Gift Card',
        cost: 100.0,
        oldCost: 120.0,
        description: "This is a reward description",
        image: 'https://gamerhash.com/storage/mobile-products/5OjmMurfr4cf7xlF5lEs06Ki6nJvls38KDDcvLtN.jpeg',
        category: "Gift",
        subcategory: "Gift Card",
        addDate: "2022-12-01T12:00:00",
        active: true,
        quantity: 10,
        sold: 5
    },
    {
        id: "123",
        name: 'Amazon Gift Card',
        cost: 100.0,
        oldCost: 120.0,
        description: "This is a reward description",
        image: 'https://www.kroger.com/product/images/large/front/0007675016057',
        category: "Gift",
        subcategory: "Gift Card",
        addDate: "2022-12-01T12:00:00",
        active: true,
        quantity: 10,
        sold: 5
    }
];

const StyledSubCard = styled(SubCard)(({ theme }) => ({
    border: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[0.2],
    },
    '.MuiCardHeader-root': {
        padding: 0,
    }
}));

const ProductCard = ({ product }) => (
    <StyledSubCard
        title={
            <CardMedia
                component="img"
                height="200"
                image={product?.image}
                alt={product?.name}
            />
        }
        content={false}
        sx={{ maxHeight: 420 }}
    >
        <CardContent>
            <Grid container justifyContent={"space-between"} spacing={2} direction="column">
                <Grid item>
                    <Box>
                        <Typography variant="h5">{product?.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product?.description}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Grid container justifyContent="space-between" alignItems={"center"}>
                        <Grid item>
                            <Grid container={true} spacing={1}>
                                <Grid item>
                                    <Typography variant="h6" fontSize={"medium"} color="primary">${product?.cost}</Typography>
                                </Grid>
                                {product?.oldCost > 0 && (
                                    <Grid item>
                                        <Typography variant="body2"  fontSize={"small"} color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                            ${product?.oldCost}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Redeem
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </StyledSubCard>
);

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

const ProductList = ({ data, isLoading, searchQuery, sortByPrice, sortDirection }) => {
    const [filteredProducts, setFilteredProducts] = useState(data ? data : []);

    useEffect(() => {
        if(!isLoading){
            let updatedProducts = [...data];

            if (searchQuery) {
                updatedProducts = updatedProducts.filter(product =>
                    product?.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            if (sortByPrice) {
                updatedProducts.sort((a, b) => sortDirection === 'asc' ? a?.cost - b?.cost : b?.cost - a?.cost);
            }

            setFilteredProducts(updatedProducts);
        }

    }, [isLoading, searchQuery, sortByPrice, sortDirection]);

    return (
        isLoading
            ? (
                <ProductListSkeleton />
            )
            :
         filteredProducts?.length === 0
             ? (<Grid container justifyContent="center">
                 <NoProductImage/>
             </Grid>)
                : (
        <Grid container justifyContent="left" spacing={3}>
            {filteredProducts?.map((product) => (
                <Grid item key={product?.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
                )
    );
};

ProductList.propTypes = {
    searchQuery: PropTypes.string,
    sortByPrice: PropTypes.bool,
    sortDirection: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    isLoading: PropTypes.bool,
};


export default ProductList;
