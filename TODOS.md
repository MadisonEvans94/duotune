- General tasks:
  - create a color theme and configure tailwind
  - create a display theme and configure
  - modify all styles to utilize the tailwind theme
- Sign in / Sign up Page:
  - fix the routing for signing up and signing in
  - update the background image and UI
  - Implement oauth signin
  - Implement the "remember me" and "forgot your password" functionality
- Matches Page:
  - connect the Matches page to the backend instead of using dummy data
  - build the messaging feature and design the database to incorporate it
  - fix the messaging feature so that clicking on a match in the sidebar opens up the chatroom associated with that match
- About Page:
  - Use real examples for the FAQ instead of dummy examples
- Profile Page:
  - implement notifications (both the frontend feature and the backend functionality)
  - connect the profile page to the backend instead of using dummy data
  - implement editing feature that will allow user to edit profile (this will create a patch request to the backend)
- Explore Page
  - Implement the swipping functionality on the frontend and the backend
  - Implement the matching functionality on the frontend and the backend
  - build out the frontend animation for when there is a match

| Task                                            | Start Date | End Date |
| ----------------------------------------------- | :--------: | :------: |
| **Week 1**                                      |            |          |
| Define project scope and requirements           |  04/02/23  | 04/03/23 |
| Create color and display themes                 |  04/03/23  | 04/04/23 |
| Update UI with new themes and styles            |  04/04/23  | 04/05/23 |
| **Sign in / Sign up Page**                      |            |          |
| Fix routing for signing up and signing in       |  04/05/23  | 04/06/23 |
| Implement "remember me" and "forgot password"   |  04/06/23  | 04/07/23 |
| Implement OAuth sign in                         |  04/07/23  | 04/08/23 |
| **Matches Page**                                |            |          |
| Connect Matches page to backend                 |  04/09/23  | 04/10/23 |
| Build messaging feature and design database     |  04/10/23  | 04/11/23 |
| Fix messaging feature to open chatroom on click |  04/11/23  | 04/12/23 |
| **About Page**                                  |            |          |
| Use real examples for FAQ                       |  04/13/23  | 04/14/23 |
| **Profile Page**                                |            |          |
| Implement notifications                         |  04/15/23  | 04/16/23 |
| Connect Profile page to backend                 |  04/16/23  | 04/17/23 |
| Implement editing feature                       |  04/17/23  | 04/18/23 |
| **Explore Page**                                |            |          |
| Implement swiping functionality                 |  04/19/23  | 04/20/23 |
| Implement matching functionality                |  04/20/23  | 04/21/23 |
| Build frontend animation for matches            |  04/21/23  | 04/22/23 |
| **Week 2**                                      |            |          |
| Testing and debugging                           |  04/23/23  | 04/24/23 |
| Deployment to production                        |  04/24/23  | 04/25/23 |
| Final testing and bug fixing                    |  04/25/23  | 04/26/23 |
| **Project review and documentation**            |            |          |
| Project review and documentation                |  04/27/23  | 04/28/23 |

## User:

id (Integer, Primary Key)
first_name (String)
last_name (String)
profile_picture_url (String)
email (String)
password_hash (String)
artist_name (String)
bio (String)
location (String)
experience_level (String)
user_type_id (Integer, Foreign Key -> UserType.id)
created_at (DateTime)
updated_at (DateTime)

#### Relationships:

user_type (ManyToOne -> UserType)
song_sample (OneToOne -> SongSample)
chat_rooms (OneToMany -> ChatRoomUser)

## SongSample:

id (Integer, Primary Key)
url (String)
user_id (Integer, Foreign Key -> User.id)

#### Relationships:

user (ManyToOne -> User)

## UserType:

id (Integer, Primary Key)
name (String)

#### Relationships:

users (OneToMany -> User)

## ChatRoomUser:

id (Integer, Primary Key)
chat_room_id (Integer, Foreign Key -> ChatRoom.id)
user_id (Integer, Foreign Key -> User.id)

#### Relationships:

user (ManyToOne -> User)
chat_room (ManyToOne -> ChatRoom)

## Match:

id (Integer, Primary Key)
chat_room_id (Integer, Foreign Key -> ChatRoom.id)

#### Relationships:

chatroom (OneToOne -> ChatRoom)

## ChatRoom:

id (Integer, Primary Key)
created_at (DateTime)

#### Relationships:

messages (OneToMany -> Message)
match (OneToOne -> Match)
chat_room_users (OneToMany -> ChatRoomUser)

## Message:

id (Integer, Primary Key)
content (String)
chat_room_id (Integer, Foreign Key -> ChatRoom.id)
sender_id (Integer, Foreign Key -> User.id)
created_at (DateTime)

#### Relationships:

user (ManyToOne -> User)
