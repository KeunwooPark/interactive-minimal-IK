import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react'
import Alert, { IAlertState } from '../components/Alert'
import Editor from '../components/Editor'
import ParamDisplay from '../components/ParamDisplay'
import { requestMeanPose, solveIK } from '../helpers/APIHelper'
import IManoHand from '../helpers/IManoHand'

const Home: NextPage = () => {

  const [numPCA, setNumPCA] = useState(10);
  const [apiAddress, setAPIAddress] = useState("");
  const [alertState, setAlertState] = useState<IAlertState>({show: false, message: "no message"});
  const [waiting, setWaiting] = useState(false);
  const [manoHand, setManoHand] = useState<IManoHand | undefined>(undefined);

  const newKeypointsRef = useRef<number[][]>();

  useEffect(() => {
    const hostname = window.location.hostname;
    const defaultAPIAddress = `http://${hostname}:8000`;
    setAPIAddress(defaultAPIAddress);
  }, []);

  function updateNumPCA(e: ChangeEvent<HTMLInputElement>) {
    const newNumPCA = e.target.value as unknown as number;
    setNumPCA(newNumPCA);
  }

  function updateAPIAddress(e: ChangeEvent<HTMLInputElement>) {
    const address = e.target.value as unknown as string;
    setAPIAddress(address);
  }

  function clickLoadDefaultPose() {
    if (numPCA == null || numPCA < 1) {
      setAlertState({show: true, message: "# of PCA should be > 0"});
      return;
    }

    setWaiting(true);
    setAlertState({show: false, message: ""});

    requestMeanPose(apiAddress, numPCA).then((manoHand) => {
      setWaiting(false);
      setManoHand(manoHand);
    }).catch((e) => {
      setAlertState({show: true, message: "error getting the mean pose. check the console."});
      console.error(e);
      setWaiting(false)});
  }

  function clickSolveIK() {
    if (newKeypointsRef.current == null) {
      return;
    }
    setWaiting(true);
    solveIK(apiAddress, newKeypointsRef.current, numPCA).then((manoHand) => {
      setWaiting(false);
      setManoHand(manoHand);
    }).catch((e) => {
      setAlertState({show: true, message: "error while solving IK. check the console."});
      console.error(e);
      setWaiting(false)});
  }

  return (
    <div>
      <Head>
        <title>interactive minimal IK</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='flex h-screen'>
        <div className='mt-3 mx-auto h-1/2 w-1/2 text-5xl'>
          <h1 className="text-center mb-5">interactive minimal IK</h1>
          <Alert {...alertState} />
          <div className='w-full form-control my-3'>
            <label className='label'>
              <span className="label-text">API Server address</span>
            </label>
            <input type="text" className="input input-primary" defaultValue={apiAddress} onChange={updateAPIAddress}></input>
            <label className='label'>
              <span className="label-text"># of pose PCA</span>
            </label>
            <input type="text" className="input input-primary" defaultValue={numPCA} onChange={updateNumPCA} placeholder={"only integer larger than 3"}></input>
            <button className='btn btn-primary mt-1' onClick={clickLoadDefaultPose} disabled={waiting}>load default</button>
          </div>
          <div className='border-2 h-full' id='editor-wrapper'>
            <Editor newKeypointsRef={newKeypointsRef} manoHand={manoHand} />
          </div>

          <div className='flex flex-col my-2'>
            <button className='btn btn-primary mt-1' disabled={waiting} onClick={clickSolveIK}>find mano params</button>
            <ParamDisplay manoHand={manoHand} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
