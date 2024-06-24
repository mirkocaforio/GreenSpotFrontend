// material-ui
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import MainCard from "../../../../ui-component/cards/MainCard";
import ResourceForm from "./ResourceForm";
import ResourceFormSkeleton from "../../../../ui-component/cards/Skeleton/SkeletonResourceForm";

const AddResource = () => {
        const {cpusList} = useSelector((state) => state.score);
        const {gpusList} = useSelector((state) => state.score);

        const [cpuNameList, setCpuNameList] = useState([]);
        const [gpuNameList, setGpuNameList] = useState([]);
        const [isLoading, setLoading] = useState(true);

        useEffect(() => {
            if (cpusList && gpusList) {
                setCpuNameList(cpusList.list);
                setGpuNameList(gpusList.list);
                setLoading(false);
            } else {
                setLoading(true);
            }
        }, [cpusList, gpusList]);

        return (
            <>
                {isLoading ? (
                    <MainCard>
                        <ResourceFormSkeleton/>
                    </MainCard>
                ) : (
                    <MainCard title="Add a new resource">
                        <ResourceForm cpuNameList={cpuNameList} gpuNameList={gpuNameList}/>
                    </MainCard>
                )}
            </>
        );
    }
;

export default AddResource;
