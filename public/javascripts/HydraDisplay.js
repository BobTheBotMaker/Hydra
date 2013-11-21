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

  var channel = canvasId.slice(0, -1);
  var measures = canvasId.substr(-1 ,1);

  return {
    display: display,
    channel: channel,
    measures: measures
  };
}

function setupDisplay(fayeClient, displayOpts) {
  fayeClient.subscribe('/' + displayOpts.channel, function(message) {
    displayOpts.display.setValue(message[displayOpts.measures]);
  });
}

function IOSlider() {
  $(document).ready(function () {
    $("#jqxslider").jqxSlider({ theme: 'summer', value: 7 });
  });
}
