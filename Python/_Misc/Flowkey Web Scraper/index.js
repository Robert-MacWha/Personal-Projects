// Find the sheet music images on the page
const elements = document.getElementsByClassName('split-image');

// Check that there are actually images on the page
if (elements.length === 0) {
  console.error('No images found');
} else {
  // If images were found, extract the base url from the 1st one
  const imageUrl = elements[0].src;
  const imageIdMatch = /\/sheets\/([\w\d]+)\//;
  const baseUrl = 'https://flowkeycdn.com/sheets/';

  // Construct the final url to use
  const matched = imageUrl.match(imageIdMatch)[1];
  const url = `${baseUrl}${matched}/300/`;

  // Log the url to the console
  console.log(url);

  // This last line may fail on some browsers, but you can always manually copy from the log statement above.
  copy(url);
}