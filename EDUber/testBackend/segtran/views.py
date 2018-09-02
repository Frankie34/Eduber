'''
from django.shortcuts import render
'''
# Create your views here.
from models import Grid
from rest_framework import viewsets
from segtran.serializers import GridSerializer


class GridViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Grid.objects.all().order_by('pubtime')
    serializer_class = GridSerializer

