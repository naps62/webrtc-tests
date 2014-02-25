$remote = $('<div class="other"><h2>Other</h2></div>');

$(function() {
  var url = 'https://goinstant.net/dd8e6d3f8389/webRTC_tests'

  goinstant.connect(url, function(err, platform, room) {
    if (err) {
      throw err;
    }

    if (!goinstant.integrations.GoRTC.support) {
      window.alert('Your browser does not support webRTC');
    }

    var goRTC = new goinstant.integrations.GoRTC({
      room: room,
      autoStart: true
    });

    goRTC.on('localStream', function() {
      console.log('localStream');
      $('.local .rtc-container').append(goRTC.localVideo);
    });

    goRTC.on('localStreamStopped', function() {
      console.log('localStreamStopped');
      $(gortc.localVideo).remove();
    });

    goRTC.on('peerStreamAdded', function(peer) {
      console.log('peerStreamAdded');
      $new_remote = $remote.clone();
      $new_remote.append(peer.video);
      $('.others').append($new_remote);
    });

    goRTC.on('peerStreamRemoved', function(peer) {
      console.log('peerStreamRemoved');
      $(peer.video).closest('.other').remove();
    });
  });
});
