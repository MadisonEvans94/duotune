#### Example User

{
"artist_name": "Tyler the Creator",
"bio": "Account news hundred painting economy. Meeting happy form word.\nCongress class author between purpose fund. Clear fall plan claim perform weight. Reveal movie team respond per.",
"created_at": "2023-04-03 17:15:41",
"email": "tyler_thecreator@gmail.com",
"experience_level": "Advanced",
"first_name": "Tyler",
"id": 1,
"last_name": "The Creator",
"location": "482 Juan Pike\nNew Jeremiah, RI 24051",
"profile_picture_url": "https://www.rollingstone.com/wp-content/uploads/2019/05/TylerTheCreator_SamRock.jpg",
"song_sample": null,
"updated_at": null,
"user_type": {
"id": 1,
"name": "Musician",
"users": [
{
"artist_name": "Tyler the Creator",
"bio": "Account news hundred painting economy. Meeting happy form word.\nCongress class author between purpose fund. Clear fall plan claim perform weight. Reveal movie team respond per.",
"created_at": "2023-04-03 17:15:41",
"email": "tyler_thecreator@gmail.com",
"experience_level": "Advanced",
"first_name": "Tyler",
"id": 1,
"last_name": "The Creator",
"location": "482 Juan Pike\nNew Jeremiah, RI 24051",
"profile_picture_url": "https://www.rollingstone.com/wp-content/uploads/2019/05/TylerTheCreator_SamRock.jpg",
"song_sample": null,
"updated_at": null,
"user_type_id": 1
}
]
},
"user_type_id": 1
}

### Todo:

#### Explore:

- Make it so that user never sees their own card
- Make it so that the list of swipable users doesn't refresh on refresh
- Create a "No New Users" render for when prospective collaborators runs out (add option: "would you like to refresh the list" )

#### Signin:

- Make a cool varaible font effect
- change the font to something better

#### Matches:

- Make the Match Card Banner be all the users who have swiped right on me
- add an option right on the Match Card to be able to swipe right on those users
- add ability to hear a user's song on the Match Card component
- fix the chatRoom component so that when you click on it after sending a message, the message will not be erased from screen

#### Profile:

- Turn the profile page into a form instead. That way a user can patch directly from their profile. This also means that other users profiles won't be visible
- add wavesurfer component to profile
- add crud functionality to wavesurfer
- allow for a null state in the wavesurfer component

#### Other Features:

- Add the user sign up feature
  - determine what will be nullable and what won't
  - connect the audio posting functionality to posting to a local drive
  - Make it so that an internal url is created on file uploads

# For Monday:

1. Work On Signup feature

   1. internal url
   2. handling audio

2. Fix the Message client refresh issue

# For Tuesday:

1. Patch functionality for Profile
2. Connect the Match Cards
3. Add ability to hear user's song and swipe on Match Card
