#!/usr/bin/env python3

from faker import Faker
from models import db, User, UserType, ChatRoom, Message, ChatRoomUser, Swipe
from app import app
from random import choice

fake = Faker()

USER_QTY = 3

# Add user types
def create_user_types():
    user_types = ['Musician', 'Producer', 'Engineer']
    for user_type in user_types:
        db.session.add(UserType(name=user_type))
    db.session.commit()

# Make users
def make_users():
    # Add example users
    users = [
        {
            'first_name': 'Madison',
            'last_name': 'Evans',
            'profile_picture_url': 'https://res.cloudinary.com/degnyqukw/image/upload/v1680801655/IMG_4344_n4ytjt.jpg',
            'email': 'm.corbinevans@gmail.com',
            'artist_name': 'Blue Cloud',
            'bio': 'Im a producer from Arizona',
            'location': '482 Juan Pike\nNew Jeremiah, RI 24051',
            'experience_level': 'Advanced',
            'user_type_id': 1
        },
        {
            'first_name': 'Tyler',
            'last_name': 'The Creator',
            'profile_picture_url': 'https://www.rollingstone.com/wp-content/uploads/2019/05/TylerTheCreator_SamRock.jpg',
            'email': 'tyler_thecreator@gmail.com',
            'artist_name': 'Tyler the Creator',
            'bio': 'Wolf Haley',
            'location': '482 Juan Pike\nNew Jeremiah, RI 24051',
            'experience_level': 'Advanced',
            'user_type_id': 1
        },
        {
            'first_name': 'Tame',
            'last_name': 'Impala',
            'profile_picture_url': 'https://i1.sndcdn.com/avatars-yHA8nds2mqg4uYtr-kyxTzw-t500x500.jpg',
            'email': 'tameimpala@gmail.com',
            'artist_name': 'Tame Impala',
            'bio': 'I was doin fine without ya...',
            'location': '482 Juan Pike\nNew Jeremiah, RI 24051',
            'experience_level': 'Advanced',
            'user_type_id': 1
        },
        {
            'first_name': 'Ariana',
            'last_name': 'Grande',
            'profile_picture_url': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Ariana_Grande_Grammys_Red_Carpet_2020.png',
            'email': 'ariana@gmail.com',
            'artist_name': 'Ariana Grande',
            'bio': 'Yuh..',
            'location': '482 Juan Pike\nNew Jeremiah, RI 24051',
            'experience_level': 'Advanced',
            'user_type_id': 1
        }
    ]

    # for _ in range(USER_QTY - 1):
    #     user_data = {
    #         'first_name': fake.first_name(),
    #         'last_name': fake.last_name(),
    #         'profile_picture_url': fake.image_url(),
    #         'email': fake.email(),
    #         'artist_name': fake.user_name(),
    #         'bio': fake.text(),
    #         'location': fake.address(),
    #         'experience_level': choice(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
    #         'user_type_id': choice([1, 2, 3])
    #     }
    #     users.append(user_data)

    i=0 
    for user_data in users:
        user = User(**user_data)
        user.set_password(f"{i}")
        db.session.add(user)
        i+=1

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        create_user_types()
        make_users()
