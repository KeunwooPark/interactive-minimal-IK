import { Sphere } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";

export interface IKeypointSphereProps {
    position: Vector3;
    name: string;
    color: string;
}
export default function KeypointSphere(props: IKeypointSphereProps) {
    const sphereSize = 2;
    const [pointerIn, setPointerIn] = useState(false);

    function handleOnPointerEnter() {
        setPointerIn(true);
    }

    function handleOnPointerLeave() {
        setPointerIn(false);
    }

    return (<Sphere args={[sphereSize]} position={props.position} onPointerEnter={handleOnPointerEnter} onPointerLeave={handleOnPointerLeave} name={props.name}>
        <meshBasicMaterial color={pointerIn? "hotpink" : props.color} />
    </Sphere>);
}