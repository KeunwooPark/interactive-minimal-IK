import { Ref, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState} from "react";
import { Mesh, Vector3 } from "three";
import IManoHand from "../helpers/IManoHand";
import * as THREE from "three";

export interface IHandMeshPloProps {
    manoHand: IManoHand | undefined;
}

function calNormals(manoHand: IManoHand): Vector3[] {
    const vertices = manoHand.vertices.map(v => new Vector3(v[0], v[1], v[2]));
    const faces = manoHand.faces;

    const normals: Vector3[] = [];
    for (const face of faces) {
        const v0 = vertices[face[0]];
        const v1 = vertices[face[1]];
        const v2 = vertices[face[2]];

        const d1 = v1.clone().sub(v0);
        const d2 = v2.clone().sub(v0);
        const norm = d2.clone().cross(d1).normalize();
        normals.push(norm);
    }

    return normals;
}

function getGeometry(positions: Float32Array, normals: Float32Array) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geometry.setAttribute(
        "normal",
        new THREE.BufferAttribute(new Float32Array(normals), 3)
    );
    return geometry;
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

export default function HandMeshPlot(props: IHandMeshPloProps) {

    const meshRef = useRef<Mesh>(null);
    const [vertices, setVertices] = useState<Float32Array>(Float32Array.from([0, 0, 0]));
    const [geometryElem, setGeometryElem] = useState<JSX.Element>();

    useEffect(() => {
        if (props.manoHand == null) {
            return;
        }

        if (meshRef.current == null) {
            return;
        }

        const mesh = meshRef.current as Mesh;

        const _vertices = arrangeVertices(props.manoHand);
        setVertices(_vertices);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(_vertices, 3));
        mesh.geometry = geometry;

        // const geometryElem = (
        //     <bufferGeometry attach="geometry">
        //         <bufferAttribute
        //             attach="attributes-position"
        //             array={_vertices}
        //             itemSize={3}
        //             count={_vertices.length / 3}
        //         />
        //     </bufferGeometry>
        // );

        // setGeometryElem(geometryElem);
        console.log("update");

    }, [props.manoHand]);

    // const vertices = useMemo(() => {
    //     if (props.manoHand == null) {
    //         return Float32Array.from([0, 0, 0]);
    //     }
    //     console.log("update");
    //     return arrangeVertices(props.manoHand);
    // }, [props.manoHand]);


    return <mesh ref={meshRef}>
        {/* {geometryElem} */}
        <meshStandardMaterial wireframe/>
    </mesh>;
}