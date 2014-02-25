genericErrorHandler = function(err) {
  if (err) {
    throw err;
  }
}

$(function() {
  var url = 'https://goinstant.net/dd8e6d3f8389/webRTC_tests'
  var $container = $('#container');

  goinstant.connect(url, function(err, platform, room) {
    if (err) {
      throw err;
    }

    var webrtc = new goinstant.widgets.WebRTC({
      room: room
      // expandContainer: $container.find('#webinar-expand')[0],
      // listContainer: $container.find('#webinar-webrtc')[0]
    });

    var userList = new goinstant.widgets.UserList({
      room: room,
      collapsed: true
      // container: $container.find('#webinar-userlist')[0]
    });

    var chat = new goinstant.widgets.Chat({
      room: room,
      position: 'left'
    });

    var notifications = new goinstant.widgets.Notifications({
      // container: $container.find('#webinar-notifications')[0]
    });

    webrtc.initialize(genericErrorHandler);
    userList.initialize(genericErrorHandler);
    chat.initialize(genericErrorHandler);

    notifications.subscribe(room, genericErrorHandler);

    var baderousMsg = {
      room: room,
      type: 'success',
      message: 'Baderous!',
      displayToSelf: true
    };

    var johnnyMsg = {
      room: room,
      type: 'error',
      message: 'O joão é larilas',
      displayToSelf: true
    };

    $('.baderous').on('click', function() {
      console.log('baderous');
      notifications.publish(baderousMsg, genericErrorHandler);
    });

    $('.johnny').on('click', function() {
      console.log('johnny');
      notifications.publish(johnnyMsg, genericErrorHandler);
    });
  });
});
