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

def home_demo_3_view(request):
    """
    Renders the Home Demo 3 layout.
    """
    return render(request, 'landing/index_three.html')

def home_demo_4_view(request):
    """
    Renders the Home Demo 4 layout.
    """
    return render(request, 'landing/index_four.html')

def home_demo_5_view(request):
    """
    Renders the Home Demo 5 layout.
    """
    return render(request, 'landing/index_five.html')

def home_demo_6_view(request):
    """
    Renders the Home Demo 6 layout.
    """
    return render(request, 'landing/index_six.html')

def home_demo_7_view(request):
    """
    Renders the Home Demo 7 layout.
    """
    return render(request, 'landing/index_seven.html')

def home_demo_8_view(request):
    """
    Renders the Home Demo 8 layout.
    """
    return render(request, 'landing/index_eight.html')

def coming_soon_view(request):
    """
    Renders the Coming Soon layout.
    """
    return render(request, 'landing/coming_soon.html')

def terms_view(request):
    """
    Renders the Terms & Conditions layout.
    """
    return render(request, 'landing/terms.html')

def privacy_view(request):
    """
    Renders the Privacy Policy layout.
    """
    return render(request, 'landing/privacy.html')

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
