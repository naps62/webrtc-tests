audioConstraints = {
  audio: true,
  video: false
};

findComponents = function(ctx) {
  ctx.$start = ctx.find('.start')
  ctx.$stop  = ctx.find('.stop')
  ctx.$src   = ctx.find('.src')
  ctx.$dst   = ctx.find('.dst')
  ctx.$download = ctx.find('.download')
};

errorHandle = function() { console.log('recording error'); }

//
// Audio to Audio
//

$.fn.audioToAudio = function() {
  var that = this;
  findComponents(that);
  this.audioStream = null;
  this.recorder = null;
  this.$stop.hide();

  this.recordHandle = function(stream) {
    if (window.IsChrome) stream = new window.MediaStream(stream.getAudioTracks());
    that.audioStream = stream;

    that.$src.attr('src', URL.createObjectURL(that.audioStream));
    that.$src[0].play();

    that.recorder = window.RecordRTC(stream, { type: 'audio' });
    that.recorder.startRecording();
  };

  this.$start.on('click', function() {
    if (!that.audioStream) {
      navigator.getUserMedia(audioConstraints, that.recordHandle, errorHandle);
    } else {
      $src.attr = URL.createObjectURL(that.audioStream);
      $src[0].play();
      if (that.recorder) that.recorder.startRecording();
    }
    window.isAudio = true;

    that.$start.hide();
    that.$stop.show();
  });

  this.$stop.on('click', function() {
    that.$src.attr('src', '');
    if (that.recorder) {
      that.recorder.stopRecording(function(url) {
        console.log(url);
        that.$dst.attr('src', url);
        that.$download.attr('href', url)
      });
    }

    that.$start.show();
    that.$stop.hide();
  })
}
