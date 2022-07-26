import IManoHand from "../helpers/IManoHand";

interface IParamDisplayProps {
    manoHand: IManoHand | undefined;
}
export default function ParamDisplay(props: IParamDisplayProps) {
    function getParamsText() {
        if (props.manoHand == null) {
            return "";
        }
        const poseVec = props.manoHand.poseVec;

        return poseVec.map(v => v.toString()).join(",")
    }
    return (<>
        <textarea className="textarea" placeholder="mano params will show up here." value={getParamsText()} readOnly>
        </textarea>
    </>);
}