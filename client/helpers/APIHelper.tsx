export async function requestMeanPose(url: string, numPCA: number): Promise<void>{
    const query = url + "/api/meanPose" + '?' + new URLSearchParams({n_pose: numPCA.toString()});
    const result = await fetch(query);
    const data = await result.json();
}

