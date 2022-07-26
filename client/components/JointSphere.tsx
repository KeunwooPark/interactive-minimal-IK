import { Sphere } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";

export interface IJointSphereProps {
    position: Vector3;
}
export default function JointSphere(props: IJointSphereProps) {
    const sphereSize = 2;
    const [pointerIn, setPointerIn] = useState(false);

    function handleOnPointerEnter() {
        setPointerIn(true);
    }

    function handleOnPointerLeave() {
        setPointerIn(false);
    }

    return (<Sphere args={[sphereSize]} position={props.position} onPointerEnter={handleOnPointerEnter} onPointerLeave={handleOnPointerLeave}>
        <meshBasicMaterial color={pointerIn? "LightSeaGreen" :"hotpink"} />
    </Sphere>);
}