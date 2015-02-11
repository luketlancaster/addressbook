/* jshint jquery: true */

'use strict';
var FIREBASE_URL = 'https://c8addressbook.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL),
    usersFbUrl;

//Used for testing
function hello() {
  return 'world';
}

//Get the saved data from firebase and add rows with

if (fb.getAuth()) {
  $('.login').remove();
  $('.app').toggleClass('hidden');

  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';

  $.get(usersFbUrl + '/contacts.json', function(res) {
    Object.keys(res).forEach(function(uuid) {
      addRowsOnLoad(uuid, res[uuid]);
    });
  });
}

//Next two for adding rows, either on load or for new data
function addRowsOnLoad(uuid, contact) {
  var $row = $('<tr></tr>');

  $row.append('<td>' + contact.firstName + '</td>');
  $row.append('<td>' + contact.lastName + '</td>');
  $row.append('<td>' + contact.phoneNumber + '</td>');
  $row.append('<td>' + contact.email + '</td>');
  $row.append('<td>' + contact.twitter + '</td>');
  $row.append('<td><img src=' + contact.photoUrl + '></td>');
  $row.append('<button class="remove">' + 'Remove?' + '</button>');

  $row.attr('data-uuid', uuid);
  $('tbody').append($row);

  return $row;
}


function addRowsToTable(contact) {
  var $row = $('<tr></tr>');

  $row.append('<td>' + contact.firstName + '</td>');
  $row.append('<td>' + contact.lastName + '</td>');
  $row.append('<td>' + contact.phoneNumber + '</td>');
  $row.append('<td>' + contact.email + '</td>');
  $row.append('<td>' + contact.twitter + '</td>');
  $row.append('<td><img src=' + contact.photoUrl + '></td>');
  $row.append('<button class="remove">' + 'Remove?' + '</button>');

  $('tbody').append($row);

  return $row;
}


//click events
$('#addContact').click(sendData);

$('#newContact').click(showForm);

$('#table').on('click', '.remove', function(evt) {
  var $tr = $(this).closest('tr'),
      uuid = $tr.data('uuid');
  $tr.remove();
  var url = 'https://c8addressbook.firebaseio.com/contacts/' + uuid + '.json';
  $.ajax(url, {type:'DELETE'});
});

function showForm() {
  $('.contact-info-box').toggleClass('hidden');
}

function hideForm() {
  $('.contact-info-box').toggleClass('hidden');
}


//Creating object from form and sending to firebase
function sendData(evt) {
  evt.preventDefault();

  var firstName = $('#firstName').val(),
      lastName = $('#lastName').val(),
      phoneNumber = $('#phoneNumber').val(),
      email = $('#email').val(),
      twitter = $('#twitter').val(),
      photoUrl = $('#photoUrl').val();

  var contact = { firstName: firstName,
                  lastName: lastName,
                  phoneNumber: phoneNumber,
                  email: email,
                  twitter: twitter,
                  photoUrl: photoUrl };

  var jsonifiedData = JSON.stringify(contact),
      $tr = $('tr');

  $('#firstName').val('');
  $('#lastName').val('');
  $('#phoneNumber').val('');
  $('#email').val('');
  $('#twitter').val('');
  $('#photoUrl').val('');

  hideForm();

  $.post(firebaseUrl, jsonifiedData, function(res) {
    addRowsToTable(contact);
    addUUID(res);
  });
}

function addUUID(res) {
  $('tr').last('tr').attr('data-uuid', res.name);
}


