// YOUR CODE HERE:
var app;

$(document).on('ready', function(){
  
  app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  username: 'test',
  roomname: 'lobby'
  friends: [],
  messages: [],
  
  
  app.init =  function(){
    app.username = window.location.search.substr(10);
    
    app.fetch();
    
  },
  
  app.fetch = function(){
    $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    data: {order: '-createdAt'},
    
    success: function (data) {
      // process room data
      app.populateRooms(data.results);
      // process the chat data and display
      app.populateMessages(data.results);
    error: function (reason) {
      console.error('chatterbox: Failed to send message. Error: ', reason);
      }
    });
  },
  
  
  addRoom: function(roomName){
    $('#roomSelect').append('<option>' + roomName + '</option>');  
  },
  
  clearMessages: function(){
    $('#chats').children().remove();
  },
  
  addMessage: function(username, text, roomName){
    $('#chats').append('<p>' + messages.username[1] + messages.text[1] + messages.roomname[1] + '</p>');  
  },
  
  addFriend: function(friend){
    // var isFriend = false;
  this.friends.push(friend)
    //   app.friends[friend] = true
      // isFriend = !()
        // isFriend = true;
      // $.('this').('friend')
   // });  
  },
  //var friends = {};
  
  // addFriend: function(friendName){
  //   app.friends[friendName] = true;
  // },

  
  
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
  
  
  var message = {
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby',
      
  };
  
  app.init(); 
});