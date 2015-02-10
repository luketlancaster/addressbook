/* jshint jquery: true */

//$(document).ready(initialize);

var firebaseUrl = 'https://c8addressbook.firebaseio.com/.json';

function hello() {
  return 'world';
}

function addRowsToTable(contact) {
  var $row = $('<tr></tr>');

  $row.append('<td>' + contact.firstName + '</td>');
  $row.append('<td>' + contact.lastName + '</td>');
  $row.append('<td>' + contact.phoneNumber + '</td>');
  $row.append('<td>' + contact.email + '</td>');
  $row.append('<td>' + contact.twitter + '</td>');
  $row.append('<td><img src=' + contact.photoUrl + '></td>');

  $('tbody').append($row);

  return $row;
}


$('#addContact').click(sendData);
$('#newContact').click(showForm);


function showForm() {
  $('.contact-info-box').css('display', 'block');
}

function hideForm() {
  $('.contact-info-box').css('display', 'none');
}

function sendData(evt) {
  evt.preventDefault();

  var $firstName = $('#firstName').val(),
      $lastName = $('#lastName').val(),
      $phoneNumber = $('#phoneNumber').val(),
      $email = $('#email').val(),
      $twitter = $('#twitter').val(),
      $photoUrl = $('#photoUrl').val();

  var contact = { firstName: $firstName,
                  lastName: $lastName,
                  phoneNumber: $phoneNumber,
                  email: $email,
                  twitter: $twitter,
                  photoUrl: $photoUrl };

  var data = JSON.stringify(contact);

  addRowsToTable(contact);
  hideForm();
}


