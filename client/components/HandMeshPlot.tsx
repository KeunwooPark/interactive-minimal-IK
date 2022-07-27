import { forwardRef, Ref, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState} from "react";
import { BufferAttribute, BufferGeometry, Mesh, Vector3 } from "three";
import IManoHand from "../helpers/IManoHand";

export interface IHandMeshPlotProps {
    manoHand: IManoHand | undefined;
    wireframe: boolean;
    onHandMeshChange: (mesh: Mesh) => void
}

function arrangeVertices(manoHand: IManoHand): Float32Array {
    const arrangedVertices: number[] = [];

    const vertices = manoHand.vertices;
    const faces = manoHand.faces;

    for(const face of faces) {
        const v0 = vertices[face[0]];
        const v1 = vertices[face[1]];
        const v2 = vertices[face[2]];

        arrangedVertices.push(...v0);
        arrangedVertices.push(...v1);
        arrangedVertices.push(...v2);
    }

    return Float32Array.from(arrangedVertices);
}

export default function HandMeshPlot(props: IHandMeshPlotProps) {

    const meshRef = useRef<Mesh>(null);

    useEffect(() => {
        if (props.manoHand == null) {
            return;
        }

        if (meshRef.current == null) {
            return;
        }

        const mesh = meshRef.current as Mesh;

        const vertices = arrangeVertices(props.manoHand);

        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new BufferAttribute(vertices, 3));
        mesh.geometry = geometry;
        props.onHandMeshChange(mesh);
    }, [props.manoHand]);

    return <mesh ref={meshRef}>
        <meshBasicMaterial color={"grey"} opacity={0.2} transparent wireframe={props.wireframe} />
    </mesh>;
}