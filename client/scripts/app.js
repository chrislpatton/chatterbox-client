// YOUR CODE HERE:

$(document).on('ready', function(){
  
  window.app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: {},
  
  clearMessages: function(){
    $('#chats').children().remove();
  },
  
  addMessage: function(username, text, roomName){
    $('#chats').append('<p>' + username + text + roomName + '</p>');  
  },
  
  addRoom: function(roomName){
    $('#roomSelect').append('<p>' + roomName + '</p>');  
  },
  
  addFriend: function(friend){
    // var isFriend = false;
    $('.username').on('click', function(){
      app.friends[friend] = true
      // isFriend = !()
        // isFriend = true;
      // $.('this').('friend')
    });  
  },
  //var friends = {};
  
  // addFriend: function(friendName){
  //   app.friends[friendName] = true;
  // },

  
  
  };
  
  app.init =  function(){
    this.fetch();
  };
  
  //var JSONobj = JSON.stringify(obj);
  
  
  app.send = function(){
    $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    // dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  };
  
  app.fetch = function(){
    $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  };
  
  var message = {
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby',
      
  };
  
  app.init(); 
});