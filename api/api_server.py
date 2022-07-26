from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
async def whoAmI():
    return {"message": "This is a minmal IK API server."}

if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')