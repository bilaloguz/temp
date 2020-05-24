## Temp Ui - React.js client

   A single page web app which consumes data from 'Temporary' rest server with JWT (json web token) authorization.

##### Supported OS
- Linux
- Windows 

##### Required packages
- Node.js                v12.16.2
- Npm                      6.14.4

##### Used node packages
- axios                    0.19.0
- react                    16.9.0
- react-adminlte-dash       0.4.0
- react-dom                16.9.0
- react-moment              0.9.7
- react-places-autocomplete 7.2.1
- react-redux               7.1.1
- react-router-dom          5.2.0
- react-scripts             3.4.1
- redux                     4.0.4
- redux-devtools-extension 2.13.8
- redux-thunk               2.3.0
- semantic-ui-react		   0.88.2
- semantic-ui-css  			2.4.1

##### Run setup (for development purposes):
`npm install`
##### Run setup (for production):
`npm build` || `yarn build`
##### Run the app:
`npm start` || `yarn start`
##### Browse:
App wil run at `http://localhost:5000`
##### Default api:
http://localhost:3000
```
    Routes       Service 			     Requirements

 --> /api/auth	 *Authorization service*
 	-post	     (Login) 
 
 --> /api/user	 *User service*         (Login required & only for user.role === 'admin')
	-post        (Save a user)
	-get         (Get all users)
	-get/:id     (Get a user by id)
	-delete/:id  (Delete a user by id)
	-put/:id     (Update a user by id)

 --> /api/room   *Room service*         (Login required)
	-post	     (Save a room)
	-get	     (Get all rooms)
 	-get/:id     (Get a room by id)	
	-delete/:id  (Delete a room by id)
	-put/:id     (Update a room by id)
```
