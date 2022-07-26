import { Box, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

export default function Editor(props: any) {
    return (<Canvas>
        <primitive object={new THREE.AxesHelper(10)} />
        <OrbitControls />
        <ambientLight />
    </Canvas>);
}