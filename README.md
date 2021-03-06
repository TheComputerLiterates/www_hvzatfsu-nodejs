www_hvzatfsu
============

The remake of hvzatfsu.com for the Human vs. Zombies club at FSU.

#### Setup Documentation
1. git clone this repo via command line git (branch + checkout if needed)
2. install nodejs and npm via whatever package manager/installer
3. install nodemon with `npm install nodemon -g`
4. install bower with `npm install bower -g`
5. In the root folder, run `npm install` to install the backend dependencies
6. In the `public/` folder, run `bower install` to install the frontend dependencies
7. In the root directory, run `nodemon` to start the server. If an error occurs, try to fix it and then run `rs` inside of the nodemon session to restart without force closing.
8. Access your test server by going to `http://localhost:PORT/` or `http://LOCAL_IP:PORT/` when you are sharing the network.

**Note:** You will need the `.env` file from Jared containing important API and database keys in order to fully setup the site. You may also get errors without it. Just ask for it.



#### All Routes
##### Public
* `/` `/home` `/index` -- site homepage 
* `/login` -- user login 
* `/signup` -- user signup
* `/info` -- general information (rules, mod info, etc.)

##### User
* `/user/profile` -- user profile  
* `/user/forum` -- forums
* `/user/stats` -- kill leaderboard + general stats


##### Player (access to the game)
* `/game` -- game main
* `/game/missions` --  game mission
* `/game/map` -- dynamic game map
* `/game/kill` -- report a kill

##### Mod
* `/mod/` -- moderator tools home
* `/mod/users` -- user management
* `/mod/game` -- current game management
* `/mod/dev` -- game/mission creation/deletion/management
* `/mod/info` -- website general info management + documentation

#### Android API
The Android API sends and receives JSON objects.
The API Routes section will display the route and what to send (shown as a JSON objects but will be form-data). Any more variables than the required that are sent will be ignored.

There are two basic formats for all returns:
```javascript
Success:
{
	success: true,
    body: [
        data1: "Obey?",
        data2: "OBEY!",
        data3: [
            minion1: "OK...",
            minion2: "REBEL!!!",
            minion3: "meh...",
        ]
    ]
}

Failure (expected and received are input errors):
{
	success: false,
    body: [
    	error: "<error-message>",
		code: "<error-code>",
        expected: "expected, variables"
        received: [
            received1: "hi",
            received2: "hello"
        ]
    ]
}

```

##### API Routes
###### Public
`/api/API_KEY/login` -- User Login
```javascript
{
    email: "some@email.com (string)",
    password: "P@$$word! (string)"
}
```

###### User
`/api/API_KEY/user/profile` -- User Profile
```javascript
{    userId: "userId (int)"    }
```

###### Clarification Requests
`/api/API_KEY/user/cRequestCreate` -- Get the availavle options for creating the Clarification Request
```javascript
{    roleId: "roleId (int)"    }
```

`/api/API_KEY/user/cRequestCreate_submit` -- Submit the clarification request
```javascript
{
    userId: "userId (int)",
    subject: "subject (string)",
    description: "description (string)",
    personal: "true / false"
}
```

`/api/API_KEY/user/cRequestView` -- View the clarification requests
```javascript
{
    userId: "userId (int)",
    roleId: "roleId (int)"
}
```

`/api/API_KEY/user/cRequestView_commentCreate` -- Create a comment in the Clarification Request
```javascript
{
    userId: "userId (int)",
    crId: "ClarificationRequestId (int)",
    comment: "comment (string)"
}
```

`/api/API_KEY/user/cRequestView_commentGet` -- Get comments of Clarification Request
```javascript
{    crId: "ClarificationRequestId (int)"    }
```

###### Game
`/api/API_KEY/game` -- Current game info
```javascript
{    roleId: "roleId (int)"    }
```

`/api/API_KEY/game/kill` -- Submit a kill
```javascript
{
    userId: "Zombie (int)",
    HVZID: "Converted Human (int)"
}
```


#### Things to remember
* If you are adding a dependency with bower or npm, include the `--save` flag in order to automatically add it to the dependency list.
* Place local ~~JS~~ Coffee and CSS in the folders mimicing the view folder and with filenames like `folder-page.css` and use the blocks to add them to the page.
* `.coffee` files inside of the `public/coffee` folder ~~must be manually built (`SHIT+ALT+C` with BetterCoffeeScript in Sublime Text 3)~~ will be built automatically on the server (so only upload the .coffee). The resulting `public/js` folder will have the same structure as the public/coffee folder so you can assume, for example, `public/coffee/some/stuff.coffee` will be built to `public/js/some/stuff.js`
* ~~*Obey*~~ Nahhh....