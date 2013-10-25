function HydraVoltDisplay(canvasID) {
  
  var display = new SegmentDisplay(canvasID);
  display.pattern         = "##.##";
  display.displayAngle    = 5.5;
  display.digitHeight     = 3.5;
  display.digitWidth      = 2;
  display.digitDistance   = 1.3;
  display.segmentWidth    = 0.2;
  display.segmentDistance = 0.3;
  display.segmentCount    = 7;
  display.cornerType      = 3;
  display.colorOn         = "#ff2c0f";
  display.colorOff        = "#331605";
  display.draw();
  
  return(display);

}

function HydraAmpDisplay(canvasID) {
  
  var display = new SegmentDisplay(canvasID);
  display.pattern         = "##.##";
  display.displayAngle    = 5.5;
  display.digitHeight     = 3.5;
  display.digitWidth      = 2;
  display.digitDistance   = 1.3;
  display.segmentWidth    = 0.2;
  display.segmentDistance = 0.3;
  display.segmentCount    = 7;
  display.cornerType      = 3;
  display.colorOn         = "#24dd22";
  display.colorOff        = "#1b2405";
  display.draw();
  
  return(display);

}

function updatdeDisplay(display) {
  $.get("val.txt", function(data,status) {
    display.setValue(data);
  });
}