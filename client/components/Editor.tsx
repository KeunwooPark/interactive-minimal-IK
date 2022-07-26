import { Box, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

export default function Editor(props: any) {

    return (<Canvas flat linear>
        <ambientLight />
    </Canvas>);
}