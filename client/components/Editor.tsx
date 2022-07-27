import { Box, OrbitControls, RoundedBox } from "@react-three/drei";
import { Camera, Canvas, useThree } from "@react-three/fiber";
import React, { MutableRefObject, useEffect, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import IManoHand from "../helpers/IManoHand";
import HandMeshPlot from "./HandMeshPlot";
import KeypointsPlot from "./KeypointsPlot";

export interface IEditorProps {
    manoHand: IManoHand | undefined;
    newKeypointsRef: MutableRefObject<number[][] | undefined>;
    wireframe: boolean;
}

export default function Editor(props: IEditorProps) {

    useEffect(() => {
        props.newKeypointsRef.current = props.manoHand?.keypoints;
    }, []);
    
    function onKeypointUpdate(newKeypoints: number[][]) {
        props.newKeypointsRef.current = newKeypoints;
    }

    return (<Canvas linear>
        <primitive object={new THREE.AxesHelper(10)} />
        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <KeypointsPlot keypoints={props.manoHand == null? undefined : props.manoHand.keypoints} onKeypointUpdate={onKeypointUpdate} />
        <HandMeshPlot manoHand={props.manoHand} wireframe={props.wireframe} />
        <ambientLight />
    </Canvas>);
}