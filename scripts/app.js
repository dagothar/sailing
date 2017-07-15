"use strict";


define(['jquery', 'concrete'], function($, Concrete) {

  const CONFIG = {
    VIEW_ID:        '#view',
    VIEW_WIDTH:     640,
    VIEW_HEIGHT:    480,
    BTN_START_DIV:  '.button-start-div',
    BTN_STOP_DIV:   '.button-stop-div',
    BTN_START:      '.button-start',
    BTN_STOP:       '.button-stop',
    BTN_RESET:      '.button-reset',
    BTN_DOWNLOAD:   '.button-download',
  };


  var getMousePos = function(e, client) {
    var rect = client.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };


  function App() {
    this.layer1 = undefined;
    this.layer2 = undefined;
    this.running = false;
    this.interval = undefined;
    this.dt = 100;
    this.imageIndex = 0;
  };


  App.prototype.initialize = function() {
    var self = this;

    /* configure Concrete layers */
    this.viewContainer = $(CONFIG.VIEW_ID).get(0);
    this.view = new Concrete.Viewport({
      container: this.viewContainer,
      width: CONFIG.VIEW_WIDTH,
      height: CONFIG.VIEW_HEIGHT
    });
    this.layer1          = new Concrete.Layer();
    this.layer2          = new Concrete.Layer();
    this.layer1.setSize(CONFIG.VIEW_WIDTH, CONFIG.VIEW_HEIGHT);
    this.layer2.setSize(CONFIG.VIEW_WIDTH, CONFIG.VIEW_HEIGHT);
    this.view            .add(this.layer1).add(this.layer2);

    /* initialize interface */
    $(CONFIG.BTN_START_DIV).show();
    $(CONFIG.BTN_STOP_DIV).hide();

    /* configure callbacks */
    $(CONFIG.BTN_START).click(function() { self.start(); })
    $(CONFIG.BTN_STOP).click(function() { self.stop(); })
    $(CONFIG.BTN_RESET).click(function() { self.reset(); })
    $(CONFIG.BTN_DOWNLOAD).click(function() { self.download(self.imageIndex++); });

    $(CONFIG.VIEW_ID).on('contextmenu', function() { return false; });

    $(CONFIG.VIEW_ID).mousedown(function(e) {
      e.preventDefault();
      var pos = self.getMousePos(e);
    });

    $(CONFIG.VIEW_ID).mouseup(function(e) {
    });

    $(CONFIG.VIEW_ID).mousemove(function(e) {
      var pos = self.getMousePos(e);
    });

    $(CONFIG.VIEW_ID).mouseout(function() {
    });

    this.reset();
    this.update();
  };


  App.prototype.update = function() {

  };


  App.prototype.getMousePos = function(e) {
    var rawPos = getMousePos(e, this.viewContainer);
    var row = Math.floor(rawPos.y / CONFIG.CELL_SIZE);
    var col = Math.floor(rawPos.x / CONFIG.CELL_SIZE);

    return {
      x: col,
      y: row
    };
  };


  App.prototype.step = function() {
    this.update();
  };


  App.prototype.reset = function() {
  };


  App.prototype.download = function(i) {
    this.view.toScene().download({ fileName: 'image' + i + '.png' });
  };


  App.prototype.start = function() {
    var self = this;

    if (!this.running) {
      this.running = true;
      clearInterval(this.interval);
      this.interval = setInterval(function() { self.step(); }, self.dt);
    }

    $(CONFIG.BTN_START_DIV).hide();
    $(CONFIG.BTN_STOP_DIV).show();
  };


  App.prototype.stop = function() {
    this.running = false;
    clearInterval(this.interval);
    this.interval = undefined;

    $(CONFIG.BTN_START_DIV).show();
    $(CONFIG.BTN_STOP_DIV).hide();
  };


  App.prototype.run = function() {
    this.initialize();
  };


  return {
    App: App
  };

});
