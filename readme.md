## Temp Ui - Node.js REST server

 Node.js RESTful api service for 'Temporary' project with JWT (json web token) protected routes. 

##### Supported OS
- Linux
- Windows 

##### Required packages
```
Node.js              v12.16.2
Npm / yarn    6.14.4 / 1.22.4 
Mongodb                v4.2.6
```
##### Used node packages
```
Express          4.17.1 
express-jwt       5.3.3
express-validator 6.5.0
jsonwebtoken      8.5.1
Bcryptjs          2.4.3
Mongoose         5.9.10
Cors              2.8.5
concurrently		
Dotenv            8.2.0
morgan           1.10.0
path             0.12.7
```
##### Config:
deafults
```
DB=mongodb://localhost/tempdb

JWT_SECRET=MIIJKQIBAAKCAgEAnH17Tbxm3fzE9FV....Continues with RSA key
```
##### Run setup:
`npm install` || `yarn install`
##### Run mongodb before run the app (on linux):
`sudo mongod` || `sudo service mongod start` || `systemctl start mongod`
##### Run the app (separately from client):
- Production mode `npm run serious`  || `yarn run serious` 
- Development mode `npm run dev` || `yarn run dev`
##### Run server and client on same terminal:
```
*package.json have to be changed for using that module*

Npm:
"start": "concurrently \"npm run server\" \"npm start --prefix /path/to/client/
temp-master/client \"",

Yarn:

"start": "concurrently \"yarn run server\" \"yarn start --prefix /path/to/client/
temp-master/client \"",

then

npm start || yarn start
*server and client would be working on* **development mode**
```
##### Browse:
Api will run at `localhost:3000/`
```
     Routes       Service 				  Requirements

 --> /api/auth	 *Authorization service*
 	-post	     (Login) 
 
 --> /api/user	 *User service*          (Login required & only for *user.role === 'admin'*)
	-post        (Save a user)
	-get         (Get all users)
	-get/:id     (Get a user by id)
	-delete/:id  (Delete a user by id)
	-put/:id     (Update a user by id)

 --> /api/room   *Room service*          (Login required)
	-post	     (Save a room)
	-get	     (Get all rooms)
 	-get/:id     (Get a room by id )	
	-delete/:id  (Delete a room by id )
	-put/:id     (Update a room by id )
```
##### Default user:
- username `admin`  
- password `123456`
- role `role`

##### User model:
```
User -> name, password, role
```
##### Room model:
```
Room -> name, createdBy
```
