# Application for meaning extraction from .txt file and chart generation

This is a React application that allows you to upload a text file and generate different charts based on the data in the file. The application is built using React and uses npm as the package manager.

## Getting Started

In the project directory, you can run:

Clone or download the repository to your local machine

Open a terminal window and navigate to the project directory

Run **npm install** to install all the required dependencies

Obtain TextRazor API key

Create .env file inside of the app root folder

Paste it there as **REACT_APP_TEXT_RAZOR_API_KEY="obtained_key"**

Run **npm start** to start the development server

*Text razor API has No 'Access-Control-Allow-Origin' header  on the requested resource, since CORS needs to be handled from backend and Chrome is not able to load a response, we need to run the browser with web security disabled.*

**For Mac:
run in terminal:
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials**

**For Chrome:
Change Target in your Chrome shortcut
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\tmpChromeSession"**

## Using the Application

Click on the "Choose file" button to select a text file from your local machine

Explore the charts based on the .txt file content you uploaded

### Dependencies

**axios**

**bootstrap**

**typescript**

**recharts**

