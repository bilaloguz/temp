## Temp Ui - Node.js REST server

	Node.js RESTful api service for 'Temporary' project with JWT (json web token) protected routes. 

##### Supported OS
- Linux
- Windows 

##### Required packages
- Node.js        v12.16.2
- Npm              6.14.4
- Mongodb          v4.2.6

##### Used node packages
- Express          4.17.1 
- express-jwt       5.3.3
- express-validator 6.5.0
- jsonwebtoken      8.5.1
- Bcryptjs          2.4.3
- Mongoose         5.9.10
- Cors              2.8.5
- Dotenv            8.2.0
- morgan           1.10.0
- path             0.12.7

##### Run setup:
`npm install` || `yarn install`
##### Run mongodb before run the app (on linux):
`sudo mongod` || `sudo service mongod start` || `systemctl start mongod`
##### Run the app:
- Production mode `npm start`  
- Development mode `npm run dev`
##### Browse:
Api will run at `localhost:3000/`
```
 --> /api/auth	    *Authorization service*
 	-post	     (Login) 
 
 --> /api/user	    *User service*
	-post        (Save a user)
	-get         (Get all users)
	-get/:id     (Get a user by id)
	-delete/:id  (Delete a user by id)
	-put/:id     (Update a user by id)

 --> /api/room	    *Room service*
	-post	     (Save a room)
	-get	     (Get all rooms)
 	-get/:id     (Get a room by id )	
	-delete/:id  (Delete a room by id )
	-put/:id     (Update a room by id )
```
##### Default user:
- username `admin`  
- password `123456`

##### User model:
```
User -> name, password, role
```
##### Room model:
```
Room -> name, createdBy
```
