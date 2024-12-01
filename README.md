# UrlShortner-Microservice
This is URL shortener microservice using Node.js, Express.js for the backend, and MongoDB to store the URLs.
This project is a URL Shortener Microservice built as part of freeCodeCamp's Backend Development and APIs curriculum. It provides functionality to shorten URLs and redirect users to the original URLs using the shortened links.

<div>Features</div>

<ol>
  <li>Shorten URLs: Submit a valid URL to receive a shortened version.</li>
<li>Redirection: Accessing the shortened URL redirects to the original URL.</li>
<li>Input Validation: Ensures only properly formatted URLs are processed.</li>
</ol>

<div>How It Works </div>
<ul>
<li>Send a POST request with a valid URL.</li>
<li>Receive a shortened URL in the response.</li>
<li>Access the shortened URL to be redirected to the original link.</li>
</ul>

Tech Stack
<ol>
  <li>Node.js and Express.js for the server and routing.</li>
  <li>Optional: MongoDB for persistent storage of URL mappings.</li>
</ol>
