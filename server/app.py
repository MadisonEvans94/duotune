from flask import Flask, make_response, request, abort, jsonify, session, redirect, url_for
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db, User, UserType, ChatRoom, Message, Swipe, ChatRoomUser
from werkzeug.exceptions import NotFound, Unauthorized
from flask_bcrypt import Bcrypt
from functools import wraps
from flask import redirect, url_for
import logging



app = Flask(__name__)
app.secret_key = b'@~xH\xf2\x10k\x07hp\x85\xa6N\xde\xd4\xcd'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SAMESITE'] = "None"
app.config['SESSION_COOKIE_SECURE'] = True  # Set this to True if you're using HTTPS
app.config['SESSION_COOKIE_PATH'] = '/'
app.config['SESSION_TYPE'] = 'filesystem'

app.json.compact = False
bcrypt = Bcrypt(app)



CORS(app, supports_credentials=True)  

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Configure logging
app.logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)
app.logger.addHandler(handler)

class Home(Resource):
    
    def get(self):
        return {'message': 'Welcome to the Job Board API!'}

class Users(Resource):

    def get(self):

        users = User.query.all()
        users_dict = [user.to_dict() for user in users]

        response = make_response(
            jsonify(users_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")

        new_user = User(first_name=first_name, last_name=last_name, email=email)
        new_user.password = password
        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            jsonify(new_user.to_dict()),
            201,
        )
        return response

    
class UsersbyID(Resource):

    def get(self, id):

        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found!')

        user_dict = user.to_dict()

        response = make_response(
            jsonify(user_dict),
            200,
        )

        return response
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found!')

        data = request.get_json()

        for key, value in data.items():
            if hasattr(user, key):
                setattr(user, key, value)

        db.session.commit()
        response = make_response(
            jsonify(user.to_dict()),
            200,
        )
        return response

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found!')

        db.session.delete(user)
        db.session.commit()

        response = make_response(
            jsonify({'message': 'User deleted'}),
            204,
        )
        return response
    
# TODO: UserType

class UserTypes(Resource):

    def get(self):

        user_types = UserType.query.all()
        user_types_dict = [user_type.to_dict() for user_type in user_types]

        response = make_response(
            jsonify(user_types_dict),
            200,
        )

        return response


class UserTypesbyID(Resource):

    def get(self, id):

        user_type = UserType.query.filter_by(id=id).first()
        if not user_type:
            abort(404, 'User not found!')

        user_type_dict = user_type.to_dict()

        response = make_response(
            jsonify(user_type_dict),
            200,
        )

        return response



# TODO: ChatRoom 
class ChatRooms(Resource):

    def get(self):

        chat_rooms = ChatRoom.query.all()
        chat_rooms_dict = [chat_room.to_dict() for chat_room in chat_rooms]

        response = make_response(
            jsonify(chat_rooms_dict),
            200,
        )

        return response

    
class ChatRoomsbyID(Resource):

    def get(self, id):

        chat_room = ChatRoom.query.filter_by(id=id).first()
        if not chat_room:
            abort(404, 'User not found!')

        chat_room_dict = chat_room.to_dict()

        response = make_response(
            jsonify(chat_room_dict),
            200,
        )

        return response

# TODO: Message

class Messages(Resource):

    def get(self):

        messages = Message.query.all()
        messages_dict = [message.to_dict() for message in messages]

        response = make_response(
            jsonify(messages_dict),
            200,
        )

        return response
    
    def post(self): 
        data = request.get_json()
        content = data.get("content")
        chat_room_id = data.get("chat_room_id")
        sender_id = data.get("sender_id")
        
        new_message = Message(content=content, sender_id=sender_id, chat_room_id=chat_room_id)
        db.session.add(new_message)
        db.session.commit()
        
        response = make_response(
            jsonify(new_message.to_dict()),
            201
        )
        return response
    
class MessagesbyID(Resource):

    def get(self, id):

        message = Message.query.filter_by(id=id).first()
        if not message:
            abort(404, 'User not found!')

        message_dict = message.to_dict()

        response = make_response(
            jsonify(message_dict),
            200,
        )

        return response
    
class Swipes(Resource):
    def post(self):
        data = request.get_json()
        swiper_id = data.get('swiper_id')
        swiped_id = data.get('swiped_id')
        liked = data.get('liked')

        # Check if a swipe already exists between swiper and swiped
        existing_swipe = Swipe.query.filter_by(swiper_id=swiper_id, swiped_id=swiped_id).first()

        # If a swipe between swiper and swiped already exists, return an error message
        if existing_swipe:
            return {'message': 'Swipe already exists'}, 400

        # Create a new Swipe object with the given swiper_id, swiped_id, and liked status
        swipe = Swipe(swiper_id=swiper_id, swiped_id=swiped_id, liked=liked)
        db.session.add(swipe)
        db.session.commit()

        # Check for a mutual match (i.e., both users have swiped right on each other)
        mutual_swipe = Swipe.query.filter_by(swiper_id=swiped_id, swiped_id=swiper_id, liked=True).first()

        # If the current swipe is a "like" and there is a mutual match, create a new chat room for the users
        if liked and mutual_swipe:
            chat_room = ChatRoom()
            db.session.add(chat_room)
            db.session.commit()

            # Add both users to the new chat room
            chat_room_user1 = ChatRoomUser(user_id=swiper_id, chat_room_id=chat_room.id)
            chat_room_user2 = ChatRoomUser(user_id=swiped_id, chat_room_id=chat_room.id)
            db.session.add_all([chat_room_user1, chat_room_user2])
            db.session.commit()

            # Return a success message indicating that a match has been found and a chat room has been created
            return {'message': 'Match found and chat room created'}, 201
        # If there is no mutual match, return a success message indicating that the swipe has been recorded
        return {'message': 'Swipe recorded'}, 201
    
api.add_resource(Home, '/')
api.add_resource(UsersbyID, '/users/<int:id>')
api.add_resource(Users, '/users/')
api.add_resource(UserTypes, '/user_types')
api.add_resource(UserTypesbyID, '/user_types/<int:id>')
api.add_resource(ChatRooms, '/chat_rooms')
api.add_resource(ChatRoomsbyID, '/chat_rooms/<int:id>')
api.add_resource(Messages, '/messages')
api.add_resource(MessagesbyID, '/messages/<int:id>')
api.add_resource(Swipes, '/swipes')

# 14.✅ Create a Signup route
class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        print(form_json)
        new_user = User(name=form_json['name'], email=form_json['email'])
        new_user.password = form_json['password']  # Use the password setter property
        db.session.add(new_user)
        db.session.commit()
        response = make_response(
            new_user.to_dict(),
            201
        )
        return response
    

api.add_resource(Signup, '/signup', endpoint='signup')


# 15. Create a Login route
class Signin(Resource):
    def post(self):  
        user = User.query.filter_by(email=request.get_json()['email']).first()
        if user == None: 
            return make_response(jsonify("This email does not exist"), 404)
        elif user and user.authenticate(request.get_json()['password']):
        
            session['user_id'] = user.id
            
            app.logger.debug(f"Session after signin: {session}")
            response = jsonify({'id': user.id, 'message': 'Authenticated'})
        else: 
            response = make_response(jsonify("Incorrect password"), 401)
            
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response


api.add_resource(Signin, '/signin')

# 16. Create a route that checks to see if the User is currently in sessions
class AuthorizedSession(Resource):
    def get(self):
        print(session)
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            if user == None:
                response = make_response(
                    jsonify("user_id not in session"),
                    401
                )
                return response
            
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            response = make_response(
                    jsonify("not authorized..."),
                    401
                )


api.add_resource(AuthorizedSession, '/authorized')

# 17. Create a Logout route
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('session ended', 204)
        return response

api.add_resource(Logout, '/logout')

# Add this error handler at the end of your app.py file
@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        jsonify("Not Found: Sorry the resource you are looking for does not exist"),
        404
    )

    return response


if __name__ == '__main__' : 
    app.run(port=5555, debug=True)