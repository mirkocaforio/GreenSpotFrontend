import {styled} from "@mui/material/styles";

export const ImageWrapper = styled('div')(() => ({
    backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
}));

export default function ErrorImage({children}) {

    return(<><ImageWrapper>
        {children}
    </ImageWrapper></>)
}