from models import Grid
from rest_framework import serializers


class GridSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Grid
        fields = ('title', 'flag', 'pubtime', 'contentInput', 'contentOutput0', 'contentOutput1', 'contentOutput2')


