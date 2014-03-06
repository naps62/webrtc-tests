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
  this.recordRTC = null;
  this.$stop.hide();
  this.$download.hide();

  this.recordHandle = function(stream) {
    that.recordRTC = window.RecordRTC(stream);
    that.recordRTC.startRecording();
  };

  this.$start.on('click', function() {
    navigator.getUserMedia({ audio: true }, that.recordHandle, errorHandle);

    that.$start.hide();
    that.$stop.show();
    that.$dst.hide();
    that.$download.hide();
  });

  this.$stop.on('click', function() {
    that.recordRTC.stopRecording(function(url) {
      that.$dst.attr('src', url);
      that.$download.attr('href', url)
      that.$dst.show();
      that.$start.show();
      that.$stop.hide();
      that.$download.show();
    });
  })
};

//
// Video to video
//

$.fn.videoToVideo = function() {
  var that = this;
  findComponents(that);
  this.recordRTC = null;
  this.$stop.hide();
  this.$src.hide();
  this.$dst.hide();
  this.$download.hide();

  this.recordHandle = function(stream) {
    that.recordRTC = window.RecordRTC(stream, { type: 'video' });
    that.recordRTC.startRecording();

    that.$src.attr('src', URL.createObjectURL(stream));
    that.$src[0].play();
  };

  this.$start.on('click', function() {
    navigator.getUserMedia({ audio: true, video: true }, that.recordHandle, errorHandle);

    that.$start.hide();
    that.$stop.show();
    that.$src.show();
    that.$dst.hide();
    that.$download.hide();
  });

  this.$stop.on('click', function() {
    that.$src.attr('src', '');
    if (that.recordRTC) {
      that.recordRTC.stopRecording(function(url) {
        console.log(url);
        that.$dst.attr('src', url);
        that.$download.attr('href', url);

        that.$start.show();
        that.$stop.hide();
        that.$src.hide();
        that.$dst.show();
        that.$download.show();
      });
    }

  })
}
