from dataclasses import field
from .models import Post
from rest_framework import serializers
from apps.reviews.models import Review


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(allow_null=True)
    total_like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'
    
    def get_total_like_count(self, obj):
        reviews = Review.objects.filter(Post_id=obj.id)
        total_like_count = 0
        for review in reviews:
            total_like_count += review.like_count
        return total_like_count

# try
class PostUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'
# try


