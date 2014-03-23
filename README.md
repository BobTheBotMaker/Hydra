Hydra
=====

This is a web interface to the [CH Robotics Hydra Power Supply](http://www.chrobotics.com/shop/hydra).

It's a work in progress and only supports viewing the volts and amps on each channel. It should be mostly correct. :)


To Use
------

1. Install node & npm
2. Clone the repo
3. npm install
4. Set your serial port at the top of lib/hydra.js
5. node app.js
6. http://localhost:3000 

To Do
----
1. Implement checksum
2. Use some kind of config file or option for the serial port location
3. Implement setting the V and A for each channel
4. Monitor Vin
5. Make it pretty
6. ....


Pull requests accepted
