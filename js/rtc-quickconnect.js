var quickconnect = require('rtc-quickconnect');
var media = require('rtc-media');
var captureConfig = require('rtc-captureconfig');

$local = $('.local .rtc-container');
$remotes_container = $('.others');
$remote = $('<div class="other"><h2>Other</h2></div>');
peerMedia = {};

// capture local media
localMedia = media({
  constraints: captureConfig('camera').toConstraints()
});

// render our local media to the target element
localMedia.render($local[0]);

startFunc = function(stream) {
  quickconnect('http://rtc.io/switchboard', {
    room: 'test'
  })
  .broadcast(stream)
  .on('peer:connect', handleConnect)
  .on('peer:disconnect', handleLeave);
}
localMedia.once('capture', startFunc);


// initialize a connection
function handleConnect(pc, id, data, monitor) {
  pc.getRemoteStreams().forEach(renderRemote(id));
  console.log('got a new friend: ' + id, pc);
};

// render a remote video
function renderRemote(id) {
  // create the peer videos list
  peerMedia[id] = peerMedia[id] || [];

  return function(stream) {
    var activeStreams = Object.keys(peerMedia).filter(function(id) {
      return peerMedia[id];
    }).length;

    console.log('current active stream count = ' + activeStreams);
    new_remote = $remote.clone();
    $remotes_container.append(new_remote);
    peerMedia[id] = peerMedia[id].concat(media(stream).render(new_remote[0]));
  };
}

function handleLeave(id) {
  var elements = peerMedia[id] || [];

  // remove old streams
  console.log('peer ' + id + 'left, removing ' + elements.length + ' elements');
  elements.forEach(function(el) {
    $(el).closest('.other').remove();
  });
  peerMedia[id] = undefined;
}
