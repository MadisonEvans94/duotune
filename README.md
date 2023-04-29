# DuoTune

DuoTune is a full-stack web app designed to connect producers and musicians seeking collaboration. The app is currently in its MVP phase and employs a Tinder-like interface for users to swipe right or left on profile cards. Built using React, Flask, and SQLAlchemy, DuoTune supports profile updates, user authentication and authorization, and filters users based on preferences. The frontend utilizes Framer Motion, Three.js, and custom illustrations for interactive animations and graphic design.

## Features

- User authentication and authorization
- Profile cards featuring pictures, descriptions, user types, and audio snippets
- Tinder-like swiping interface for easy profile browsing
- Mutual swipes lead to chatroom pairing for further communication
- Messaging managed on the Flask backend
- Profile updates and user preferences
- Interactive animations and graphic design using Framer Motion, Three.js, and custom illustrations

## How it Works

1. Users sign up for an account or log in to an existing account.
2. Users create or update their profiles, including pictures, descriptions, user types, and audio snippets.
3. Users browse profile cards of other users and swipe right or left based on their interest in collaboration.
4. When two users mutually swipe right, they are paired in a chatroom for further communication.
5. Users can send and receive messages within the chatroom, managed on the Flask backend.
6. Users can update their profiles and preferences, filtering the displayed profile cards accordingly.

## Contributing

We welcome contributions from developers interested in improving DuoTune! The project is open for enhancements, bug fixes, and new features.

### Getting Started

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.

'git clone https://github.com/yourusername/DuoTune.git'

3. Install the required dependencies.

`cd DuoTune/frontend`
`npm install`
`cd ../backend`
`pip install -r requirements.txt`

4. Start the development servers.

#### Contributing Guidelines
1. Create a new branch for your feature or bugfix.

`git checkout -b feature/your-feature-name`
2. Make your changes and test them thoroughly.
3. Commit and push your changes to your forked repository.

`git add .`
`git commit -m "Add your commit message here"`
`git push origin feature/your-feature-name`
4. Open a pull request on the original repository with a clear description of the changes you have made and any additional information that may be relevant.

Once your pull request has been reviewed, we will either merge your changes or provide feedback for further improvements.



