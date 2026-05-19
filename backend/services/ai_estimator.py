import asyncio
import re

# Simulated "Knowledge Base" of a trained ML model
FEATURE_WEIGHTS = {
    "ai": {"complexity": 4, "multiplier": 1.5, "tech": ["TensorFlow", "FastAPI", "OpenAI API"]},
    "machine learning": {"complexity": 4, "multiplier": 1.5, "tech": ["PyTorch", "Scikit-Learn"]},
    "ecommerce": {"complexity": 2, "multiplier": 1.2, "tech": ["Stripe", "Redis", "Next.js"]},
    "blockchain": {"complexity": 5, "multiplier": 1.8, "tech": ["Solidity", "Web3.js", "Ethereum"]},
    "dashboard": {"complexity": 1, "multiplier": 1.1, "tech": ["Chart.js", "D3.js"]},
    "mobile": {"complexity": 2, "multiplier": 1.3, "tech": ["React Native", "Expo"]},
    "realtime": {"complexity": 3, "multiplier": 1.4, "tech": ["Socket.io", "Redis Pub/Sub"]},
    "security": {"complexity": 3, "multiplier": 1.3, "tech": ["Auth0", "JWT", "Vault"]},
}

async def estimate_project_complexity(description: str, target_url: str = None) -> dict:
    """
    Simulated ML Inference Engine.
    In production, this would use a Vector DB + LLM for retrieval-augmented generation.
    """
    
    # Artificial latency to simulate model inference
    await asyncio.sleep(1.5)
    
    desc = description.lower()
    total_complexity = 3 # Base complexity
    tech_stack = {"React", "Node.js", "PostgreSQL"} # Base stack
    multiplier = 1.0
    
    # Feature Extraction (Simulated Tokenization & Scoring)
    found_features = []
    for feature, data in FEATURE_WEIGHTS.items():
        if re.search(rf"\b{feature}\b", desc):
            total_complexity += data["complexity"]
            multiplier = max(multiplier, data["multiplier"])
            tech_stack.update(data["tech"])
            found_features.append(feature.title())

    # Apply multiplier and cap complexity at 10
    final_score = min(10, round((total_complexity / 2) * multiplier))
    
    # Dynamic Timeline Calculation
    weeks_min = final_score * 2
    weeks_max = round(weeks_min * 1.5)
    timeline = f"{weeks_min}-{weeks_max} Weeks"
    
    # Dynamic Budget Calculation (Standardized Industry Rates)
    budget_min = final_score * 5000
    budget_max = round(budget_min * 2.2)
    budget = f"${budget_min:,} - ${budget_max:,}"
    
    # Build AI Analysis Summary
    if not found_features:
        analysis_text = "Analysis complete. This project appears to be a standard web application with minimal specialized logic requirements."
    else:
        analysis_text = f"ML Inference complete. Extracted key features: {', '.join(found_features)}. "
        analysis_text += f"The high density of {'technical' if final_score > 6 else 'standard'} requirements suggests a {timeline} development cycle. "
        if target_url:
            analysis_text += f"Reference site {target_url} was analyzed for UI/UX patterns."

    return {
        "complexity_score": final_score,
        "estimated_timeline": timeline,
        "suggested_tech_stack": sorted(list(tech_stack)),
        "estimated_budget_range": budget,
        "ai_analysis": analysis_text
    }
