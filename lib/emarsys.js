'use strict';

var request = require('request');
var crypto = require('crypto');
var Qs = require('qs');


function sha1(input) {
  return crypto.createHash('sha1').update(input).digest('hex');
}

/**
 * @param {object} params
 * @constructor
 */
function Emarsys(params) {

  var timestamp = new Date().toISOString();
  var nonce = sha1(timestamp + params.password);
  var passwordDigest = new Buffer(sha1(nonce + timestamp + params.password)).toString('base64');

  this.options = function () {
    return {
      url: params.endpoint,
      headers: {
        'X-WSSE': 'UsernameToken, ' +
        'Username="' + params.username + '", ' +
        'PasswordDigest="' + passwordDigest + '", ' +
        'Nonce="' + nonce + '", ' +
        'Created="' + timestamp + '"',
        'Content-type': 'application/json;charset="utf-8"'
      }
    };
  };
};


/**
 * Request wrapper
 * @param {string} url
 * @param {object} payload [callback]
 * @param {string} method [GET]
 * @param {function} callback
 */
Emarsys.prototype.request = function (url, payload, method, callback) {
  var options = this.options();
  options.url += url;

  if (typeof method === 'string') {
    method = method.toUpperCase();
  }

  if (typeof payload === 'function') {
    callback = payload;
    method = 'get';
  }

  if (method == 'POST' || method == 'PUT') {
    options.json = true;
    options.body = payload;
  }

  options.method = method;
  request(options, callback);
};


/**
 * Query contacts by a field
 * @param {number} fieldId
 * @param {object} params [callback]
 * @param {function} callback
 */
Emarsys.prototype.listContacts = function (fieldId, params, callback) {
  var url = '/api/v2/contact/query/return=' + fieldId;

  if (typeof params === 'function') {
    callback = params;
  }
  else {
    url += '&' + Qs.stringify(params);
  }

  this.request(url, callback);
};


/**
 * Retrieves user id by email
 * @param {string} email
 * @param {function} callback
 */
Emarsys.prototype.getContact = function (email, callback) {
  this.request('/api/v2/contact/3=' + email, callback);
};


/**
 * Get contact data
 * @param {object} payload
 * @param {function} callback
 */
Emarsys.prototype.getContactData = function (payload, callback) {
  this.request('/api/v2/contact/getdata', payload, 'POST', callback);
};


/**
 * Updates a contact
 * @param {object} payload
 * @param {function} callback
 */
Emarsys.prototype.updateContact = function (payload, callback) {
  this.request('/api/v2/contact', payload, 'PUT', callback);
};


/**
 * Retrieves a list of all fields
 * @param {function} callback
 */
Emarsys.prototype.getFields = function (callback) {
  this.request('/api/v2/field', callback);
};


/**
 * Lists all email templates
 * @param {function} callback
 */
Emarsys.prototype.getEmailTemplates = function (callback) {
  this.request('/api/v2/email', null, 'GET', callback);
};


/**
 * Creates a new email template
 * @param {function} callback
 */
Emarsys.prototype.postEmailTemplate = function (emailData, callback) {
  this.request('/api/v2/email', emailData, 'POST', callback);
};


/**
 * Updates an existing email template
 * @param {function} callback
 */
Emarsys.prototype.updateEmailTemplate = function (emailId, emailData, callback) {
  this.request('/api/v2/email/email/' + emailId + '/patch', emailData, 'POST', callback);
};


module.exports = Emarsys;
