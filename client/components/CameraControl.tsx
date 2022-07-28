import { ArcballControls, OrbitControls, TrackballControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { MathUtils, Vector2, Vector3 } from "three";

export interface ICameraControlProps {
    enabled: boolean;
}
export default function CameraControl(props: ICameraControlProps) {
    const {camera, gl: {domElement}} = useThree();

    useEffect(() => {
        // camera.rotation.set(MathUtils.degToRad())
        // camera.rotateX(MathUtils.degToRad(90));
        // camera.rotateZ(MathUtils.degToRad(-90));
        // camera.rotation.set(, MathUtils.degToRad(90), MathUtils.degToRad(0));
        camera.position.set(0, -150, 0);
        camera.up.set(1, 0, 0);
        
    }, []);

    return <ArcballControls camera={camera} enabled={props.enabled}/>
}