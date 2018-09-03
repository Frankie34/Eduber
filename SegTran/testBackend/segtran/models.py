from django.db import models

from django.contrib.auth.models import User
# Create your models here.
class Grid(models.Model):
	user = models.CharField(max_length=200)
	title = models.CharField(max_length=200)
	flag = models.CharField(max_length=2)
	pubtime = models.DateTimeField(auto_now_add=True)

	contentInput = models.TextField()
	contentOutput0 = models.TextField()
	contentOutput1 = models.TextField()
	contentOutput2 = models.TextField()
	
