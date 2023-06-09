from config import db
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy_serializer import SerializerMixin

bcrypt = Bcrypt()

class Swipe(db.Model, SerializerMixin):
    __tablename__ = 'swipes'

    id = db.Column(db.Integer, primary_key=True)
    swiper_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    swiped_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    liked = db.Column(db.Boolean, default=False)

    swiper = db.relationship('User', foreign_keys=[swiper_id], backref='swiper_swipes')
    swiped = db.relationship('User', foreign_keys=[swiped_id], backref='swiped_swipes')

    serialize_rules = (
        '-swiper.swiper_swipes',
        '-swiper.swiped_swipes',
        '-swiper.song_sample',
        '-swiper.chat_rooms',
        '-swiped.swiper_swipes',
        '-swiped.swiped_swipes',
        '-swiped.song_sample',
        '-swiped.chat_rooms',
    )

    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # attributes 
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    profile_picture_url = db.Column(db.String)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String)
    artist_name = db.Column(db.String(100))
    bio = db.Column(db.String)
    location = db.Column(db.String(100))
    experience_level = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # foreign keys 
    user_type_id = db.Column(db.Integer, db.ForeignKey('user_types.id'))
    
    # backpopulated objects of the foreign keys 
    user_type = db.relationship('UserType', backref='users', uselist=False)
    song_sample = db.relationship('SongSample', backref='user', uselist=False)
    chat_rooms = db.relationship('ChatRoomUser', back_populates='user')
    swiped_by = db.relationship('Swipe', foreign_keys=[Swipe.swiper_id], back_populates='swiper', overlaps="swiper_swipes")
    swiped_on = db.relationship('Swipe', foreign_keys=[Swipe.swiped_id], back_populates='swiped', overlaps="swiped_swipes")

    # serialize rules 
    serialize_rules = ('-password_hash', '-user_type.users', '-song_sample.user', '-swiped_by', '-swiped_on')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.set_password(password)


class SongSample(db.Model, SerializerMixin):
    __tablename__ = 'song_samples'
    
    # attributes 
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    
    # foreign keys 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # serialize rules 
    serialize_rules = ('-user.song_sample.user',)


class UserType(db.Model, SerializerMixin):
    __tablename__ = 'user_types'
    
    # attributes 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    
    # serialize rules 
    serialize_only = ('id', 'name')
    def __init__(self, name):
        self.name = name
class ChatRoomUser(db.Model, SerializerMixin):
    __tablename__ = 'chat_room_users'
    
    # attributes 
    id = db.Column(db.Integer, primary_key=True)
    
    # foreign keys 
    chat_room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    # backpopulated objects of the foreign keys 
    user = db.relationship('User', back_populates='chat_rooms')
    chat_room = db.relationship('ChatRoom', back_populates='chat_room_users')
    
    
    # serialize rules 
    serialize_only = ('id', 'chat_room_id', 'user_id')

class ChatRoom(db.Model, SerializerMixin):
    __tablename__ = 'chat_rooms'
    
    # attributes 
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    # backpopulated objects of the foreign keys 
    messages = db.relationship('Message', backref='chat_room', lazy=True)
    chat_room_users = db.relationship('ChatRoomUser', back_populates='chat_room', overlaps="associated_users,associated_chat_rooms")
    
    
    # serialize rules 
    serialize_only = ('id', 'created_at', 'messages', 'chat_room_users' )

    
class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    
    # attributes 
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    # foreign keys 
    chat_room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'))
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    # backpopulated objects of the foreign keys 
    user = db.relationship('User', foreign_keys=[sender_id])
    
    # serialize rules 
    serialize_only = ('id', 'content', 'chat_room_id', 'sender_id', 'created_at')



