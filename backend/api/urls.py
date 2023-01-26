from django.urls import path
from . import views
from api import views

urlpatterns = [
    path ('', views.getRoutes, name = "routes"),
    path ('searchQuery/', views.searchResultsPost, name = "searchQuery"),
]
