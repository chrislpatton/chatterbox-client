// YOUR CODE HERE:
var app;
$(function(){
  
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    username: 'test',
    roomname: 'lobby',
    friends: [],
    messages: [],
    
    
    init: function(){
      app.username = window.location.search.substr(10);
      app.fetch();
      
      app.$main = $('#main');
      app.$message = $('#message');
      app.$chats = $('#chats');
      app.$roomSelect = $('#roomSelect');
      
    },
    
    fetch: function(){
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
      },
      
      error: function (reason) {
        console.error('chatterbox: Failed to send message. Error: ', reason);
      }
    });
  },
  
  populateRooms: function(results) {
    app.$roomSelect.html('<option value="_newRoom">New Room...</option><option value="lobby" selected>Lobby</option>');
      if (results) {
      var processedRooms = {};
      _.each(results, function(data){
        var roomname = data.roomname;
        if (roomname && !processedRooms[roomname]){
          app.addRoom(roomname);
        } 
        processedRooms[roomname] = true;
      })
    } 
    app.$roomSelect.val(app.roomname);
  },
  
  populateMessages: function(results) {
    app.clearMessages()
    if (Array.isArray(results)){
      _.each(results, function())
      //results.forEach(app.addMessage);
    }
  },
  
  clearMessages: function(){
    app.$chats.html("");
  },
  
  addMessage: function(data){
    if (!data.roomname){
      data.roomname = 'lobby';
       }
    if(data.roomname === app.roomname){
      var $chats = $('<div class="chats"></div>')
    }
  },
  
  addRoom: function(roomName){
    $('#roomSelect').append('<option>' + roomName + '</option>');  
  },
  
  addFriend: function(friend){
  
  },
  
  
  send: function(){
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
  },
};
    
});




