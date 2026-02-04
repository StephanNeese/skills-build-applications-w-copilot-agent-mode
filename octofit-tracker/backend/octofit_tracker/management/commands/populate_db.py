from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index('email', unique=True)

        # Teams
        teams = [
            {'name': 'Team Marvel'},
            {'name': 'Team DC'}
        ]
        team_ids = db.teams.insert_many(teams).inserted_ids

        # Users
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'Team Marvel'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Team Marvel'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'Team DC'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'Team DC'}
        ]
        db.users.insert_many(users)

        # Activities
        activities = [
            {'user': 'spiderman@marvel.com', 'activity': 'Running', 'duration': 30},
            {'user': 'ironman@marvel.com', 'activity': 'Cycling', 'duration': 45},
            {'user': 'batman@dc.com', 'activity': 'Swimming', 'duration': 60},
            {'user': 'wonderwoman@dc.com', 'activity': 'Yoga', 'duration': 50}
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'user': 'spiderman@marvel.com', 'points': 100},
            {'user': 'ironman@marvel.com', 'points': 90},
            {'user': 'batman@dc.com', 'points': 95},
            {'user': 'wonderwoman@dc.com', 'points': 98}
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'name': 'Full Body Blast', 'suggested_for': 'Team Marvel'},
            {'name': 'Strength Builder', 'suggested_for': 'Team DC'}
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
