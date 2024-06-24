import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import RewardViewForm from "./RewardViewForm";


const TaskInfo = ({ id, open, onClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const {rewards} = useSelector(state => state.reward);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        <Dialog open={open} onClose={onClose} aria-labelledby="task-dialog-title" maxWidth="lg" fullWidth fullScreen={fullScreen} scroll="paper">
            <DialogTitle id="task-dialog-title" fontSize="medium">{product?.name}</DialogTitle>
            <DialogContent dividers>
                <RewardViewForm isLoading={isLoading} reward={product} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

TaskInfo.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TaskInfo;