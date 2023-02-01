from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from api.searchQuery.queryDataset import searchQuery
import json
from django.http import HttpResponse, JsonResponse




@api_view(['GET'])
def getRoutes (request):
    return Response('Our API' )

@csrf_exempt
def searchResultsPost (request):
    if request.method == "POST":
        content = json.loads (request.body.decode('utf-8'))
        searchResults = searchQuery(content["searchTerm"])
        return JsonResponse(searchResults, safe=False)
    else:
        return HttpResponse ("This Doesn't work")
