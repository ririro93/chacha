# Generated by Django 3.1.7 on 2021-04-22 12:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_answer_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answer',
            name='question',
        ),
    ]