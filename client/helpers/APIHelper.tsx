import IManoHand from "./IManoHand";

export async function requestMeanPose(url: string, numPCA: number): Promise<IManoHand>{
    const query = url + "/api/meanPose" + '?' + new URLSearchParams({n_pose: numPCA.toString()});
    const result = await fetch(query);
    const data = await result.json();
    return data as IManoHand;
}

export async function solveIK(url: string, keypoints: number[][], numPCA: number): Promise<IManoHand> {
    const query = url + "/api/solveIK";
    const payload = {keypoints, "n_pose": numPCA};
    const result = await fetch(query, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const data = await result.json();
    return data as IManoHand;
}