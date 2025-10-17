from django.db import models
from django.contrib.auth import get_user_model
from movies.models import Movies  

User = get_user_model()


class Rating(models.Model):
    """model for movie reviews from users"""
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rater")
    score = models.PositiveSmallIntegerField()  
    created_at = models.DateTimeField(auto_now_add=True)

    # constriant
    class Meta:
        unique_together = ('movie', 'user')

    def __str__(self):
        return f"{self.user.username} rated {self.movie.name}: {self.score}"
