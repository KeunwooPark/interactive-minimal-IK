import IManoHand from "../helpers/IManoHand";

export interface IHandMeshPloProps {
    manoHand: IManoHand | undefined;
}
export default function HandMeshPlot(props: IHandMeshPloProps) {

    if (props.manoHand == null) {
        return <></>;
    }

    const vertices = new Float32Array(props.manoHand.vertices.flat());

    const faces = new Uint16Array(props.manoHand.faces.flat());
    
    return <mesh>
        <bufferGeometry attach="geometry">
            <bufferAttribute
                attach="attributes-position"
                array={vertices}
                itemSize={3}
                count={vertices.length / 3}
            />
            <bufferAttribute
                attach="attributes-index"
                array={faces}
                itemSize={3}
                count={faces.length / 3}
            />
        </bufferGeometry>
    </mesh>
}