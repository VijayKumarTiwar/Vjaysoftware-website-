from django.db import models

class ContactInquiry(models.Model):
    name = models.CharField(max_length=150)
    company = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    service_interested_in = models.CharField(max_length=100)
    project_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Contact Inquiries"

    def __str__(self):
        return f"{self.name} - {self.company}"


class JobApplication(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    position = models.CharField(max_length=100)
    resume = models.FileField(upload_to='resumes/')
    github_link = models.URLField(blank=True)
    linkedin_link = models.URLField(blank=True)
    cover_letter = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.position}"
