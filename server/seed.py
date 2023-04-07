#!/usr/bin/env python3

from faker import Faker
from models import db, User, UserType, ChatRoom, Message, ChatRoomUser
from app import app
from random import choice

fake = Faker()

USER_QTY = 50
# Conversation 1
conversation1 = [
  "Hey, have you worked on any music recently?",
  "Yeah, I've been working on a new beat.",
  "Nice, what kind of genre?",
  "It's a chill lo-fi hip hop beat.",
  "Sweet, how do you usually start your beats?",
  "Usually, I start with the drums first. How about you?",
  "I like to start with a melody or chord progression and build around that.",
  "That's interesting. Do you prefer using software or hardware for production?",
  "I prefer software, it's more convenient for me. How about you?",
  "I like to use a mix of both, hardware for the sounds and software for arranging."
]

# Conversation 2
conversation2 = [
  "What's up man, how's the music coming along?",
  "It's been going pretty well, I just finished mixing a new track.",
  "That's awesome, what genre did you make it in?",
  "It's a progressive house track with some trance elements.",
  "Sounds cool, how do you usually approach mixing?",
  "I like to start with EQ and compression on individual tracks and then move on to balancing the levels.",
  "Interesting, what do you use for reverb and delay?",
  "I usually use a mix of software and hardware effects, depending on the sound I'm going for.",
  "Ah, that makes sense. Do you use any mastering plugins?",
  "Yeah, I like to use Ozone for mastering. It's got a lot of great tools for getting a clean and loud mix."
]

# Conversation 3
conversation3 = [
  "Hey man, I heard you're working on a new EP?",
  "Yeah, I'm putting the finishing touches on it now.",
  "Nice, what kind of style did you go for this time?",
  "It's a mix of ambient and experimental music.",
  "Interesting, how do you usually come up with the ideas for your tracks?",
  "I like to experiment with different sounds and textures until something clicks, then build from there.",
  "That's a cool approach. How do you usually structure your tracks?",
  "I don't really have a set structure, I just let the music flow naturally.",
  "That's a unique way of doing things. Do you have any tips for getting creative in the studio?",
  "My advice would be to try new things and don't be afraid to make mistakes. Sometimes the best ideas come from accidents."
]

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
            'first_name': 'Tyler',
            'last_name': 'The Creator',
            'profile_picture_url': 'https://www.rollingstone.com/wp-content/uploads/2019/05/TylerTheCreator_SamRock.jpg',
            'email': 'tyler_thecreator@gmail.com',
            'artist_name': 'Tyler the Creator',
            'bio': 'Account news hundred painting economy. Meeting happy form word.\nCongress class author between purpose fund. Clear fall plan claim perform weight. Reveal movie team respond per.',
            'location': '482 Juan Pike\nNew Jeremiah, RI 24051',
            'experience_level': 'Advanced',
            'user_type_id': 1
        }
    ]

    for _ in range(USER_QTY - 1):
        user_data = {
            'first_name': fake.first_name(),
            'last_name': fake.last_name(),
            'profile_picture_url': fake.image_url(),
            'email': fake.email(),
            'artist_name': fake.user_name(),
            'bio': fake.text(),
            'location': fake.address(),
            'experience_level': choice(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
            'user_type_id': choice([1, 2, 3])
        }
        users.append(user_data)

    i=0
    admin = {
            'first_name': 'Madison',
            'last_name': 'Evans',
            'profile_picture_url': 'https://res.cloudinary.com/degnyqukw/image/upload/v1680801655/IMG_4344_n4ytjt.jpg',
            'email': 'm.corbinevans@gmail.com',
            'artist_name': 'Blue Cloud',
            'bio': 'Im a music producer named Blue Cloud',
            'location': '482 Juan Pike\nNew Jeremiah, RI 24051',
            'experience_level': 'Advanced',
            'user_type_id': 1
        }
    for user_data in users:
        user = User(**user_data)
        user.set_password(f"{i}")
        db.session.add(user)
        i+=1

    Madison = User(**admin)
    Madison.set_password("123")
    db.session.add(Madison)

    db.session.commit()


def create_chat_rooms_and_matches():
    chat_room_ids = []

    for i in range(1, 4):
        chat_room = ChatRoom()
        db.session.add(chat_room)
        db.session.commit()

        user1 = db.session.get(User, 1)
        user2 = db.session.get(User, i + 2)

        # Create ChatRoomUser instances for both users
        chat_room_user1 = ChatRoomUser(chat_room_id=chat_room.id, user_id=user1.id)
        chat_room_user2 = ChatRoomUser(chat_room_id=chat_room.id, user_id=user2.id)

        db.session.add_all([chat_room_user1, chat_room_user2])
        db.session.commit()

        chat_room_ids.append(chat_room.id)

    return chat_room_ids


def add_messages(chat_room_ids):
    conversations = [conversation1, conversation2, conversation3]

    for chat_room_id, conversation in zip(chat_room_ids, conversations):
        for i, message_text in enumerate(conversation):
            message = Message(
                content=message_text,
                chat_room_id=chat_room_id,
                sender_id=1 if i % 2 == 0 else 2
            )
            db.session.add(message)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        create_user_types()
        make_users()
        chat_room_ids = create_chat_rooms_and_matches()
        add_messages(chat_room_ids)
