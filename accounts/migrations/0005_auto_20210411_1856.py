# Generated by Django 3.1.7 on 2021-04-11 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20210408_0000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(blank=True, default='noname', max_length=200, null=True),
        ),
    ]