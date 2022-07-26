import { Sphere } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

export interface IJointPlotProps {
    keypoints: number[][] | undefined;
}

export default function JointPlot(props: IJointPlotProps) {
    const [jointSpheres, setJointSpheres] = useState<JSX.Element[]>([]);
    const sphereSize = 2;
    useEffect(() => {
        if (props.keypoints == null) {
            return;
        }

        const spheres: JSX.Element[] = [];
        let keyId = 0;
        for (const keypoint of props.keypoints) {
            const position = new Vector3(keypoint[0], keypoint[1], keypoint[2]);
            const sphere = <Sphere args={[sphereSize]} position={position} key={`joint-${keyId}`}>
                <meshBasicMaterial color="hotpink" />
            </Sphere>
            spheres.push(sphere);
            keyId += 1;
        }

        setJointSpheres(spheres);

    }, [props.keypoints]);

    return <>{jointSpheres}</>;
}