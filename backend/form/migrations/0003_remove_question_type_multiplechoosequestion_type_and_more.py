# Generated by Django 4.1.5 on 2023-01-18 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0002_question_text'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='type',
        ),
        migrations.AddField(
            model_name='multiplechoosequestion',
            name='type',
            field=models.CharField(default='MC', max_length=3),
        ),
        migrations.AddField(
            model_name='textquestion',
            name='type',
            field=models.CharField(default='TX', max_length=3),
        ),
    ]
