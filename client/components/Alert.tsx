export interface IAlertState {
    show: boolean;
    message: string;
}
export default function Alert(props: IAlertState) {

    function showConditionally() {

        if (!props.show) {
            return <></>;
        }
        return (
            <div className="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-base">{props.message}</span>
                </div>
            </div>
        )
    }

    return (<>{showConditionally()}</>);

    
}