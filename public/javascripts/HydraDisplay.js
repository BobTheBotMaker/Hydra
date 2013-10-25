function HydraDisplay(canvasID, colorOn, colorOff) {
  
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
  display.colorOn         = colorOn;
  display.colorOff        = colorOff;
  display.draw();
  
  return(display);

}

function updateDisplay(display) {
  $.get("val.txt", function(data,status) {
    display.setValue(data);
    window.setTimeout(updateDisplay, 100, display);
  });
}