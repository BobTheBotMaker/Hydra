function HydraDisplay(canvasId, colorOn, colorOff) {
  
  var display = new SegmentDisplay(canvasId);
  display.pattern         = "##.##";
  display.displayAngle    = 5.5;
  display.digitHeight     = 3.5;
  display.digitWidth      = 2;
  display.digitDistance   = 1.3;
  display.segmentWidth    = 0.2;
  display.segmentDistance = 0.3;
  display.segmentCount    = 7;
  display.cornerType      = 3;
  display.colorOn         = colorOn;
  display.colorOff        = colorOff;
  display.draw();
  
  return {
    display: display,
    channel: canvasId
  };
}

function setupDisplay(fayeClient, options) {
  fayeClient.subscribe('/' + options.channel, function(message) {
    updateDisplay(options.display, message.volts.toString());
  });
}

function updateDisplay(display, volts) {
  display.setValue(volts)
}

