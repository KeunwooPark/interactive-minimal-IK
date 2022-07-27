import { Box, OrbitControls, RoundedBox } from "@react-three/drei";
import { Camera, Canvas, useThree } from "@react-three/fiber";
import React, { MutableRefObject, useEffect, useState } from "react";
import * as THREE from "three";
import { BufferGeometry, Mesh, Vector3 } from "three";
import IManoHand from "../helpers/IManoHand";
import HandMeshPlot from "./HandMeshPlot";
import KeypointsPlot from "./KeypointsPlot";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";

export interface IEditorProps {
    manoHand: IManoHand | undefined;
    newKeypointsRef: MutableRefObject<number[][] | undefined>;
}

export default function Editor(props: IEditorProps) {

    const [wireframe, setWireframe] = useState(false);
    const [handMesh, setHandMesh] = useState<Mesh>();

    useEffect(() => {
        props.newKeypointsRef.current = props.manoHand?.keypoints;
    }, []);
    
    function onKeypointUpdate(newKeypoints: number[][]) {
        props.newKeypointsRef.current = newKeypoints;
    }

    function clickWireframe(e: any) {
        setWireframe(!wireframe);
    }

    function onHandMeshChange(mesh: Mesh) {
        setHandMesh(mesh);
    }

    function clickDownloadMesh() {
        if (handMesh == null) {
            return;
        }

        const exporter = new OBJExporter();
        const data = exporter.parse(handMesh);

        const file = new Blob([data], {type: "text/plain"})

        const dummyElement = document.createElement("a");
        dummyElement.href = URL.createObjectURL(file);
        dummyElement.download = "handMesh.obj";
        dummyElement.click();
    }

    return (
        <div className="h-full">
            <div className="h-5/6">
                <Canvas className="border-2" linear>
                    <primitive object={new THREE.AxesHelper(10)} />
                    <pointLight position={[0, 20, 10]} intensity={1.5} />
                    <KeypointsPlot keypoints={props.manoHand == null? undefined : props.manoHand.keypoints} onKeypointUpdate={onKeypointUpdate} />
                    <HandMeshPlot manoHand={props.manoHand} wireframe={wireframe} onHandMeshChange={onHandMeshChange} />
                    <ambientLight />
                </Canvas>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">wireframe</span>
                    <input type="checkbox" className="toggle toggle-primary" checked={wireframe} onChange={clickWireframe} />
                </label>
                <button className="btn btn-primary" onClick={clickDownloadMesh}>download mesh</button>
            </div>
        </div>
    );
}