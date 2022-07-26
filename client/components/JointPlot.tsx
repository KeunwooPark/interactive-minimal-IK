import { OrbitControls, Select, Sphere, TransformControls, useSelect } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import CameraControl from "./CameraControl";
import JointSphere from "./JointSphere";

export interface IJointPlotProps {
    keypoints: number[][] | undefined;
}

export default function JointPlot(props: IJointPlotProps) {
    const [jointSpheres, setJointSpheres] = useState<JSX.Element[]>([]);
    const [selected, setSelected] = useState<Object3D>();
    const [transforming, setTransforming] = useState(false);

    useEffect(() => {
        if (props.keypoints == null) {
            return;
        }

        const spheres: JSX.Element[] = [];
        let keyId = 0;
        for (const keypoint of props.keypoints) {
            const position = new Vector3(keypoint[0], keypoint[1], keypoint[2]);
            const key = `joint-${keyId}`;
            
            const sphere = <JointSphere position={position} key={key} />
            spheres.push(sphere);
            keyId += 1;
        }

        setJointSpheres(spheres);

    }, [props.keypoints]);

    function selectOnChange(objects: Object3D[]) {
        if (objects.length > 0) {
            setSelected(objects[0]);
        }
    }

    function transformControlsEngage() {
        setTransforming(true);
    }

    function transformControlsDisengage() {
        setTransforming(false);
    }

    return <>
        {/* <OrbitControls enabled={!transforming} /> */}
        <CameraControl enabled={!transforming} />
        {selected && <TransformControls object={selected} onMouseDown={transformControlsEngage} onMouseUp={transformControlsDisengage}/>}
        <Select onChange={selectOnChange}>
            {jointSpheres}
        </Select>
    </>;
}