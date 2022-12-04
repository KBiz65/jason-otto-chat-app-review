# Definitely Not Discord

<br>

_A fullstack chat application build with React, Node, and Socket.IO library._

<br>

Try it [here](https://chat-app-service.onrender.com)

<br>

## Summary

This is a fullstack application I built for SDMM for users to chat with others using the Sockets.IO library to pass messages between the client and server. There are several different channels and server generated notifications for different events such as greetings and users joining/leaving channels. 

There were many different aspects of the project that each had their own challenges to overcome. I got some hands on experience with authorization using JSON Web Tokens, creating/deleting cookies, and writing middleware to validate incoming data and protect certain routes in my server. 

In the client I used the useContext hook as my app has state that many components nested deeper in the project depend on and also need to pass changes back up the chain. I also got more practice with the more commonly used hooks like useEffect.

I plan to continue to build on this project and I enjoyed the challenge of working on it.

## Installation
1. Create your own Postgres database by running the SQL statements in sql_stmts.txt
2. Create a .env file in the root of the project
3. In the .env file should be the DB connection string, CONN_STRING, and the JSON Web Token secret, JWT_SECRET. 
 
  * Feel free to change the keys to whatever you like, but remember to update the keys wherever they are referenced in the app.
    
  * If deploying to a service like Heroku or Render, don't forget to set environment variables with the same values.

4. Run `npm run build` to download all dependencies for both client and server, the postinstall will also output the client build for production.
5. For development, the client and server will need to run on different ports. Run `npm run start` for the client and `npm run dev` for the server in separate terminal windows.

## Author

- **Jason Otter** - _Full-Stack Software Developer_ - [Website](https://jason-otter.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/jason-otter/)


