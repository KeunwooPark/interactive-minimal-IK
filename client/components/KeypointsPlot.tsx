import { OrbitControls, Select, Sphere, TransformControls, useSelect } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import CameraControl from "./CameraControl";
import KeypointSphere from "./KeypointSphere";

export interface IKeypointsPlotProps {
    keypoints: number[][] | undefined;
    onKeypointUpdate: (newKeypoints: number[][]) => void;
}

export default function KeypointsPlot(props: IKeypointsPlotProps) {
    const [keypointSpheres, setKeypointSpheres] = useState<JSX.Element[]>([]);
    const [selected, setSelected] = useState<Object3D>();
    const [transforming, setTransforming] = useState(false);
    const [jointNames, setJointNames] = useState<string[]>([]);
    const [positionMap, setPositionMap] = useState<Map<string, Vector3>>(new Map());

    useEffect(() => {
        if (props.keypoints == null) {
            return;
        }

        const _spheres: JSX.Element[] = [];
        const _positionMap: Map<string, Vector3> = new Map();
        const _jointNames: string[] = [];
        let keyId = 0;
        for (const keypoint of props.keypoints) {
            const position = new Vector3(keypoint[0], keypoint[1], keypoint[2]);
            const key = `joint-${keyId}`;
            
            const sphere = <KeypointSphere position={position} key={key} name={key} />
            _spheres.push(sphere);
            _jointNames.push(key);
            _positionMap.set(key, position.clone());
            keyId += 1;
        }

        setKeypointSpheres(_spheres);
        setJointNames(_jointNames);
        setPositionMap(_positionMap);

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

    function transformed() {
        if (selected == null) {
            return;
        }

        const newPosition = new Vector3();
        selected.getWorldPosition(newPosition);
        positionMap.set(selected.name, newPosition);

        const newKeypoints = jointNames.map(n => positionMap.get(n)!.toArray())
        props.onKeypointUpdate(newKeypoints);
    }

    return <>
        <CameraControl enabled={!transforming} />
        {selected && <TransformControls object={selected} onMouseDown={transformControlsEngage} onMouseUp={transformControlsDisengage} onChange={transformed}/>}
        <Select onChange={selectOnChange}>
            {keypointSpheres}
        </Select>
    </>;
}