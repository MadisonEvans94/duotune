# RESTful routes

### Home

`'/'`

<p style="color:blue">GET</p>

---

### Users

`'/users/<int:id>'`

<p style="color:blue">GET, POST</p>

```javascript
{
  "artist_name": "Blue Cloud",
  "bio": "Im a producer from Arizona",
  "chat_rooms": [

  ],
  "created_at": "2023-04-11 21:17:49",
  "email": "m.corbinevans@gmail.com",
  "experience_level": "Advanced",
  "first_name": "Madison",
  "id": 1,
  "last_name": "Evans",
  "location": "482 Juan Pike\nNew Jeremiah, RI 24051",
  "profile_picture_url": "https://res.cloudinary.com/degnyqukw/image/upload/v1680801655/IMG_4344_n4ytjt.jpg",
  "song_sample": null,
  "swiped_swipes": [

  ],
  "swiper_swipes": [

  ],
  "updated_at": null,
  "user_type": {
    "id": 1,
    "name": "Musician"
  },
  "user_type_id": 1
}
```

---

### UserTypes

`'/user_types/<int:id>'`

<p style="color:blue">GET</p>

```javascript
{
  "id": 1,
  "name": "Musician"
}
```

---

### ChatRooms

`'/chat_rooms/<int:id>'`

<p style="color:blue">GET</p>

```javascript
{
  "chat_room_users": [
    {
      "chat_room_id": 1,
      "id": 1,
      "user_id": 2
    },
    {
      "chat_room_id": 1,
      "id": 2,
      "user_id": 1
    }
  ],
  "created_at": "2023-04-11 21:29:40",
  "id": 1,
  "messages": [
    {
      "chat_room_id": 1,
      "content": "hello",
      "created_at": "2023-04-11 21:30:01",
      "id": 1,
      "sender_id": 2
    }
  ]
}
```

---

### Messages

`'/messages/<int:id>'`

<p style="color:blue">GET, POST</p>

```javascript
{
  "chat_room_id": 1,
  "content": "hello",
  "created_at": "2023-04-11 21:30:01",
  "id": 1,
  "sender_id": 2
}
```

---

### Swipes

`(Swipes, '/swipes')`

<p style="color:blue">POST</p>

```javascript
const swipeData = {
	swiper_id: user.id, // logged in user
	swiped_id: userPool[collaboratorCount].id, // user from selection pool who swiped on you
	liked: true,
};
```

```javascript
{
    "swiper_id": "1",
    "swiped_id": "2",
    "liked": "true",
}

```

---

# session related endpoints

### Signup

`(Signup, '/signup', endpoint='signup')`

<p style="color:blue">POST</p>

```javascript
{
    "email": "user@example.com", // required
    "password": "asdf", // required
    "first_name": "John", // required
    "last_name": "Doe", // required
    "location": "Atlanta, GA", // required
    "profile_picture_url": "http://example.com", // optional
    "song_sample": "http://example.com", // optional
    "user_type_id": 2, // required
}
```

---

### Signin

`'/signin'`

<p style="color:blue">POST</p>

```javascript
{
    "email" : "m.corbinevans@gmail.com",
    "password" : "123"
}
```

---

### AuthorizedSession

`(AuthorizedSession, '/authorized')`

<p style="color:blue">GET</p>

---

### Logout

`(Logout, '/logout')`

<p style="color:blue">DELETE</p>
