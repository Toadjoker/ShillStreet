# Generated by Django 3.2.13 on 2023-04-07 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shillstreet_user', '0002_auto_20230404_1202'),
    ]

    operations = [
        migrations.CreateModel(
            name='WaitList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=255, unique=True)),
            ],
        ),
    ]