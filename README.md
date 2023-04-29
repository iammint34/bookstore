# Bookstore API

## How to Use

- Install dependencies
`npm install`

- Updating the environment variables
SERVICE_URL = 'http://localhost:3000/api' # for API Swagger Docs
SERVICE_SECRET = '2db73505a5846dca5abba265f80ca99682cdc64d5fc278afa8e41164f2f3b9b6' # for JWT secret key
PORT_LISTENER = 3000
HOST_LISTENER = '0.0.0.0'
DB_HOST = 'localhost'
DB_USER = 'root'
DB_NAME = 'bookstore_db'
DB_PASSWORD = 'P@$$w0rd'

- Setup Database
You can setup the database and tables by running this code in the terminal:
`npm run setup_db`
This will create the Database *bookstore_db* and its Tables.

- Running the API
You can run the API by simply running `node handler.js` or;
You can install Process Managers like PM2 `npm i -g pm2`
and run `pm2 start handler.js --name bookstore_API; pm2 logs 0;`

- Using/Accessing API
You can view the API Docs by accessing `{{SERVICE_URL}}/docs`. 
Ex. http://localhost:3000/api/docs

**Notes**
- Some of the APIs requires Authorization Bearer.
- For blocking some Users, there is a table *user_blocklist* and add the userId you want to prevent from Adding/Publishing Books.
