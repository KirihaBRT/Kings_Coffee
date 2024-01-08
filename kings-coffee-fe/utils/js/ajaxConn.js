/**
 * Performs an HTTP request to the specified URL with the given method and parameters.
 * @param url - The endpoint URL.
 * @param method - The HTTP method (GET or POST).
 * @param action - The specific action or endpoint to be appended to the URL.
 * @param data - The data payload for the request (used in POST requests).
 * @param queryString - The query string for GET requests.
 * @param callBack - The callback function to handle the response.
 */
function requestCall(url, method, action, data, queryString, callBack) {
  if (method == "GET") {
    fetch(`${backUrl}/${url}/${action}?${queryString}`, {
      method: method
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(callBack);
  } else {
    fetch(`${backUrl}/${url}/${action}`, {
      method: method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(callBack);
  }
}