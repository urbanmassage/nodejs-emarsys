# nodejs-emarsys
incomplete nodejs module for emarsys api with some basic functionality... feel free to add more functions :)

```js
// npm install(!)
var Emarsys = require('./lib/emarsys');
var api = new Emarsys({
  endpoint: 'YOUR_API_ENDPOINT',
  username: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD'
});

```

#### Example 1: fetch available fields
```js
api.getFields(function (err, res, body) {
  console.log(body);
});
```

#### Example 2: get field values for a contact / email 
(1=Firstname, 2=Lastname, 31=OptIn)
```js
var payload = {
  "keyId": "3",
  "keyValues": ["some_email@host.com"],
  "fields": [1, 2, 31]
};
api.getContactData(payload, function (err, res, body) {
  console.log(body.data.result);
});
```

...
