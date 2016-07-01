# Solid color script
# Author: Michael Limb (somerthing15525@gmail.com)
#
# Used to set a strand of Neopixels a certain color.
import time
import sys

from neopixel import *

# LED strip configuration:
LED_COUNT      = 60      # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 5       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)

if __name__ == '__main__':
	colorToSet = None
	if len(sys.argv) == 4:
		# Colors will be passed in as RGB, but LED strip uses GRB, so set as such.
		colorToSet = Color(
			int(sys.argv[2]),
			int(sys.argv[1]),
			int(sys.argv[3])
		)
	else:
		print("Invalid params passed, setting default color")

	# Create NeoPixel object with appropriate configuration.
	strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS)
	# Intialize the library (must be called once before other functions).
	strip.begin()
	
	colors = []

	# Set each led in the range of pixels
	for i in range(strip.numPixels()):
		# Set current led color
		if colorToSet != None:
			strip.setPixelColor(i, colorToSet)
		else:
			strip.setPixelColor(i, Color(25, 25, 112))
	
	# Show result	
	strip.show()
