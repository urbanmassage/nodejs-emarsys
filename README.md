# nodejs-emarsys
incomplete nodejs module for emarsys api with some basic functionality... feel free to add more functions :)

```js
// npm install(!)
var Emarsys = require('@um/nodejs-emarsys');
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

#### Example 3: update a contact
```js
var payload = {
  "keyId": 3,
  "3": "some_email@host.com",
  "1": "Tony",
  "2": "Stark",
  "18": "Stark Industries", // company
  "11": "New York City", // city
  "10": "Stark Tower 1, Manhattan Midtown" // address
  ...
};
api.updateContact(payload, function (err, res, body) {
  console.log(body);
});
```
...
