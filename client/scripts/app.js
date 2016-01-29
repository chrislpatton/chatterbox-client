// YOUR CODE HERE:
var app;

$(document).on('ready', function(){
  

  app = {
    
    username: 'anonymous',
    
    roomname: 'lobby',
    
    server: 'https://api.parse.com/1/classes/chatterbox',
      
    init : function(){
      
      app.fetch();      
    },
    
    fetch: function(){
      
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'GET',
        data: {order: '-createdAt'},
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
    
    send: function(){
      
    },
    
    addMessage: function(){
      
    },
    
    addFriend: function(){
      
    },
    
  };
});
