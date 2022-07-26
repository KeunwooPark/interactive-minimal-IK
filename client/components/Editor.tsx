import { Box, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import IManoHand from "../helpers/IManoHand";

export interface IEditorProps {
    manoHand: IManoHand | undefined;
}

export default function Editor(props: IEditorProps) {
    return (<Canvas>
        <primitive object={new THREE.AxesHelper(10)} />
        <OrbitControls />
        <ambientLight />
    </Canvas>);
}