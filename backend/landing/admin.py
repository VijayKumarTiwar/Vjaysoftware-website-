from django.contrib import admin
from .models import ContactInquiry, JobApplication

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'service_interested_in', 'created_at')
    list_filter = ('service_interested_in', 'created_at')
    search_fields = ('name', 'company', 'email', 'project_description')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'created_at')
    list_filter = ('position', 'created_at')
    search_fields = ('name', 'email', 'position')
