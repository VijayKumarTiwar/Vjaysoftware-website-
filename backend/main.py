from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from services.ai_estimator import estimate_project_complexity


app = FastAPI(
    title="Vjay Software AI Backend",
    description="AI/ML backend for analyzing and sizing web projects.",
    version="1.0.0"
)

# Allow CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.1.36:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectRequest(BaseModel):
    description: str
    target_url: str = None

class ProjectEstimate(BaseModel):
    complexity_score: int
    estimated_timeline: str
    suggested_tech_stack: list[str]
    estimated_budget_range: str
    ai_analysis: str

@app.get("/")
def read_root():
    return {"message": "Vjay Software AI Backend is running."}

@app.post("/api/estimate", response_model=ProjectEstimate)
async def generate_estimate(request: ProjectRequest):
    try:
        # Here we call the AI/ML service
        estimate = await estimate_project_complexity(request.description, request.target_url)
        return estimate
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/login")
def redirect_login():
    return RedirectResponse(url="http://localhost:3000/login")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
