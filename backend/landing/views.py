import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from services.ai_estimator import estimate_project_complexity

def home_view(request):
    """
    Renders the Bariton IT Machine Learning template.
    """
    return render(request, 'landing/index.html')

def home_demo_2_view(request):
    """
    Renders the Home Demo 2 layout.
    """
    return render(request, 'landing/index_two.html')

@csrf_exempt
async def api_estimate_view(request):
    """
    Asynchronous view mapping to /api/estimate to replicate the FastAPI endpoint.
    """
    if request.method != 'POST':
        return JsonResponse({"detail": "Method not allowed"}, status=405)
    
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, TypeError):
        return JsonResponse({"detail": "Invalid JSON body"}, status=400)
    
    description = data.get('description')
    if not description:
        return JsonResponse({"detail": "description is required"}, status=400)
    
    target_url = data.get('target_url', None)
    
    try:
        # Call the ML estimation service
        result = await estimate_project_complexity(description, target_url)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({"detail": str(e)}, status=500)
