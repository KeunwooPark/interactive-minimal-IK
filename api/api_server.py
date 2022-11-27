from typing import Any
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from solver import Solver
from prepare_model import prepare_mano_model
from armatures import MANOArmature
import config as config
from models import KinematicModel, KinematicPCAWrapper
import numpy as np
from solver import *
from armatures import *
import numpy.typing as npt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def run_mano(pose_pca: npt.ArrayLike):
    mesh = KinematicModel(config.MANO_MODEL_PATH, MANOArmature, scale=1000)
    pose_glb = np.zeros([1, 3]) # global rotation
    shape = np.zeros(10)
    vertices, keypoints = mesh.set_params(pose_pca=pose_pca, pose_glb=pose_glb, shape=shape)
    faces = mesh.faces
    return {"keypoints": keypoints.tolist(), "vertices": vertices.tolist(), "faces": faces.tolist()}

@app.get("/api/meanPose")
async def getMeanPose(n_pose: int):
    pose_pca = np.zeros((n_pose))
    mano_result = run_mano(pose_pca)
    mano_result["poseVec"] = pose_pca.tolist()
    return mano_result

class IKData(BaseModel):
    keypoints: list
    n_pose: int

@app.post("/api/solveIK")
async def solveIK(ikData: IKData):
    
    keypoints = np.array(ikData.keypoints)
    n_pose = ikData.n_pose
    mesh = KinematicModel(config.MANO_MODEL_PATH, MANOArmature, scale=1000)
    wrapper = KinematicPCAWrapper(mesh, n_pose=n_pose)
    solver = Solver(verbose=True)

    params_est = solver.solve(wrapper, keypoints)
    shape_est, pose_pca_est, pose_glb_est = wrapper.decode(params_est)

    new_mesh = KinematicModel(config.MANO_MODEL_PATH, MANOArmature, scale=1000)
    vertices, keypoints = new_mesh.set_params(pose_pca=pose_pca_est, pose_glb=pose_glb_est, shape=shape_est)
    faces = mesh.faces

    return {"keypoints": keypoints.tolist(), "vertices": vertices.tolist(), "faces": faces.tolist(), "poseVec": pose_pca_est.tolist()}

@app.get("/api")
async def whoAmI():
    return {"message": "This is a minmal IK API server."}

@app.on_event("startup")
async def startup_event():
    prepare_mano_model()