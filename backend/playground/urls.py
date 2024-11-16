from django.urls import path
from .views import checkin, get_history

urlpatterns = [
    path('checkin/', checkin),
    path('history/', get_history),
]
