import urllib.request
from bs4 import BeautifulSoup

URL = 'https://app.flowkey.com/player/FQWBY2CtEvGEYkkWy?title=Undertale%20Medley&artist=Toby%20Fox'

with urllib.request.urlopen(URL) as response:
    html = response.read()

soup = BeautifulSoup(html, features="html.parser")

name = soup.find(id='flat-song-info')
composer = soup.find(id='flat-song-artist')
first_image = soup.find(id='sheet')

print(soup)