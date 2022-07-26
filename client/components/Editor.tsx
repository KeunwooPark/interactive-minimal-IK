import { Box, OrbitControls, RoundedBox } from "@react-three/drei";
import { Camera, Canvas, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import IManoHand from "../helpers/IManoHand";
import JointPlot from "./JointPlot";

export interface IEditorProps {
    manoHand: IManoHand | undefined;
}

export default function Editor(props: IEditorProps) {

    useEffect(() => {
        
    }, [props.manoHand]); 

    return (<Canvas linear camera={{position: [0, -50, 150]}}>
        <primitive object={new THREE.AxesHelper(10)} />
        <OrbitControls enabled={false} />
        <JointPlot keypoints={props.manoHand == null? undefined : props.manoHand.keypoints} />
        <ambientLight />
    </Canvas>);
}