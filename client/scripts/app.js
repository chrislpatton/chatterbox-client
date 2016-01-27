// YOUR CODE HERE:
var app;
$(function(){
  
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    username: 'test',
    roomname: 'lobby',
    friends: {},
    lastMessageId: 0,
    
    
    init: function(){
      app.username = window.location.search.substr(10);
      
      app.$main = $('#main');
      app.$message = $('#message');
      app.$chats = $('#chats');
      app.$roomSelect = $('#roomSelect');
      app.$send = $('#send');
      
      app.$main.on('click', '.username', app.addFriend); 
      app.$send.on('submit', app.handleSubmit);
      app.$roomSelect.on('change', app.saveRoom);
      
      app.startSpinner();
      app.fetch(false);
      
      setInterval(app.fetch, 3000);
    },
    
      
    send: function(data){
      app.startSpinner();
      
      app.$message.val('');
      
      $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (result) {
        app.fetch();
        //console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (reason) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message. Error: ', reason);
        },
      //complete: function(){
        //app.stopSpinner();
      //}
      });
    },
  
  
          
    fetch: function(animate){
      $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: {order: '-createdAt'},
      success: function (data) {
      
        if (!data.results || !data.results.length){
          return;
        }
        
        var mostRecentMessage = data.results[data.results.length-1];
        var displayedRoom = $('.chat span').first().data('roomname');
        app.stopSpinner();
        
        if (mostRecentMessage.objectId !== app.lastMessageId || app.roomname !== displayedRoom){
          
          app.populateRooms(data.results);
          app.populateMessages(data.results, animate);
          
          app.lastMessageId = mostRecentMessage.objectId;
        }
          // process room data
          // process the chat data and display
      },
        
      error: function (reason) {
          console.error('chatterbox: Failed to send message. Error: ', reason);
      }
    });
  },
  
  clearMessages: function(){
    app.$chats.html("");
  },
  
  populateMessages: function(results, animate) {
    app.clearMessages();
    app.stopSpinner();
    
    if (Array.isArray(results)){
      //_.each(results, function())
      results.forEach(app.addMessage);
    }
    
    var scrollTop = app.$chats.prop('scrollHeight');
    if(animate){
      app.$chats.animate({
        scrollTop: scrollTop
      });
    }
    else {
      app.$chats.scrollTop(scrollTop);
    }
  },
  
  
  
  populateRooms: function(results) {
    app.$roomSelect.html('<option value="__newRoom">New Room...</option><option value="lobby" selected>Lobby</option>');
      
      if (results) {
      var processedRooms = {};
      _.each(results, function(data){
        var roomname = data.roomname;
        if (roomname && !processedRooms[roomname]){
          app.addRoom(roomname);
          processedRooms[roomname] = true;
        } 
      });
    } 
    app.$roomSelect.val(app.roomname);
  },
  
  addRoom: function(roomname){
   
   var $option = $('<option></option>').val(roomname).text(roomname);
   
   app.$roomSelect.append($option);
  },
  
  
  addMessage: function(data){
    if (!data.roomname){
      data.roomname = 'lobby';
       }
    if(data.roomname === app.roomname){
      var $chat = $('<div class="chat"></div>');
      
      var $username = $('<span class="username"></span>');
      $username.text(data.username + ': ')
        .attr('data-username', data.username)
        .attr('data-roomname', data.roomname)
        .appendTo($chat);
        
      if(app.friends[data.username] === true){
         $username.addClass('friend');
      }
      
      var $message = $('<br/> <span></span>');
      $message.text(data.text)
        .appendTo($chat);
        
      app.$chats.append($chat);
    }
  },
  
  
  addFriend: function(evt){
    var usernamen = $(evt.currentTarget).attr('data-username');
    if (username !== undefined){
      console.log('chatterbox: Adding %s as a friend ', username);
      // store as friend
      app.friends[username] = true;
      
      var selector = '[data-username="'+ username.replace(/"/g, '\\\"')+'"]';
      var $usernames = $(selector).addClass('friend');
    }
  },
  
  saveRoom: function(evt){
    var selectIndex = app.$roomSelect.prop('selectedIndex');
      if(selectIndex === 0 ){
        // create a new room
        var roomname = prompt('Enter Room Name');
        if (roomname){
          app.roomname = roomname;
          app.addRoom(roomname);
          app.$roomSelect.val(roomname);
          app.fetch();
        }
      } else {
          app.startSpinner();
          app.roomname = app.$roomSelect.val();
          app.fetch();
      }
  },
  
  handleSubmit: function(evt){
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby',
    };
    
    app.send(message);
    
    evt.preventDefault();
  },
 
  
  startSpinner: function(){
    $('.spinner img').show();
    $('form input[type=submit]').attr('disabled','true');
  },
  
  stopSpinner: function(){
    $('.spinner img').fadeOut('fast');
     $('form input[type=submit]').attr('disabled',null);
  },
};  

});




