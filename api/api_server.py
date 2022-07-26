from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from solver import Solver
from prepare_model import prepare_mano_model
from armatures import MANOArmature
import config as config
from models import KinematicModel, KinematicPCAWrapper
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/meanPose")
async def getMeanPose(n_pose: int):
    mesh = KinematicModel(config.MANO_MODEL_PATH, MANOArmature, scale=1000)
    n_shape = 10
    pose_pca = np.zeros((n_shape))
    pose_glb = np.zeros([1, 3]) # global rotation
    shape = np.random.normal(size=n_shape)
    vertices, keypoints = mesh.set_params(pose_pca=pose_pca, pose_glb=pose_glb, shape=shape)
    faces = mesh.faces
    return {"keypoints": keypoints.tolist(), "vertices": vertices.tolist(), "faces": faces.tolist(), "poseVec": pose_pca.tolist()}

@app.get("/api")
async def whoAmI():
    return {"message": "This is a minmal IK API server."}

@app.on_event("startup")
async def startup_event():
    prepare_mano_model()