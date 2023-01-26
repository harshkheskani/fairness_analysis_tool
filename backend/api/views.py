from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from api.searchQuery.queryDataset import searchQuery
import json
from django.http import HttpResponse, JsonResponse
# Create your views here.

@api_view(['GET'])
def getRoutes (request):
    return Response('Our API' )

@csrf_exempt
def searchResultsPost (request):
    if request.method == "POST":
        content = json.loads (request.body)
        searchResults = searchQuery(content['search'])
        return JsonResponse({'searchResults':searchResults})
    else:
        return HttpResponse ("This Doesn't work")
