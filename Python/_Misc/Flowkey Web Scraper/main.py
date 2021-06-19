# test URL: https://flowkeycdn.com/sheets/EE5AfQLK285yWpRrh/300/

import requests
from PIL import Image
import io
import shutil
import os
import subprocess

# get the url from the user
url = input('URL from index.js file: ')
name = input('Name for music piece: ')

# get the images from the provided url
images = []

i = 0
while True:
    req_url = url + f'{i}.png'

    r = requests.get(req_url, stream=True)

    if r.status_code == 200:
        # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
        r.raw.decode_content = True

        im = Image.open(io.BytesIO(r.content)).convert('RGBA')
        images.append(im)
        i += 1
    else:
        # there are no more images, break
        break

# get the width of the images
width, height = images[0].size

# stitch the images into a single large image & save it
long = Image.new('RGB', (width * (len(images)), height), 'white')

x_offset = 0
for im in images:
    long.paste(im, (x_offset, 0), im)
    x_offset += width

print('Fetched image')

# save the image as a png
if not os.path.exists('./tmp'):
    os.mkdir('./tmp')

long.save('./tmp/image.png')

print('Saved image')

# run audiveris OMR to convert the image into a .mxl file that can be read by musescore
subprocess.run(['C:/Program Files/Audiveris/bin/audiveris.bat', '-batch', '-save', 
'-option', 'org.audiveris.omr.text.tesseract.TesseractOCR.useOCR=False',
'-export', './tmp/image.png', '-output', './tmp'])

print('Converted image')

# use musescore to convert the .mxl into a pdf that wraps the page (we need to create a mscz file first so the style sticks on the pdf - no idea why)
subprocess.run(['C:/Program Files/MuseScore 3/bin/MuseScore3.exe', '-S', 'C:/Users/trebo/Documents/MuseScore3/Styles/defaultStyle.mss', '-o', './tmp/image/final.mscz', './tmp/image/image.mxl'])
subprocess.run(['C:/Program Files/MuseScore 3/bin/MuseScore3.exe', '-o', f'./final.pdf', './tmp/image/final.mscz'])

print('Exported PDF')

# copy the PDF to my sheet music folder
shutil.copyfile(f'./final.pdf', f'D:/Music/{name}.pdf')

print('Brought file to sheet music directory')

# remove the tmp folder
# shutil.rmtree('./tmp')
print('Cleaned up')