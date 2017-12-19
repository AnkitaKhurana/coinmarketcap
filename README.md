# virtual-sim-playground

Playground for Virtual Simulator 

## Authentication end points

- Facebook - /auth/facebook
- CallBack - /auth/facebook/callback

- Google - /auth/google
- CallBack - /auth/google/callback

## Auth Config file

```
// config/auth.js

module.exports = {
    'facebookAuth': {
        'clientID': '<clientId>',
        'clientSecret': '<secretId>',
        'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '<clientId>',
        'clientSecret'  : '<secretId>',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }
};

```

## Database config file

```
// config/database.js

module.exports = {
    'name': '<DBname>',
    'user': '<username>',
    'password': '<pass>'
}
```