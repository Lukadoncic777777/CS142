/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 * @returns a Promise that should be filled with the response of the GET request
 * parsed as a JSON object and returned in the property named "data" of an
 * object. If the request has an error, the Promise should be rejected with an
 * object that contains the properties:
 * {number} status          The HTTP response status
 * {string} statusText      The statusText from the xhr request
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    console.log(url);

    // setTimeout(() => reject(new Error(
    //   { status: 501, statusText: "Not Implemented" })),
    //   0
    // );
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve({ data: data });
        } else {
          reject(new Error({ status: xhr.status, statusText: xhr.statusText }));
        }
      }
    };
    xhr.onerror = function() {
      reject(new Error({
        status: 0, // 网络错误没有状态码，用 0 表示
        statusText: "网络出问题了，可能没网或服务器没启动"
      }));
    };
    // xhr.open('GET', url, true);
    xhr.send(null);
    // On Success return:
    // resolve({data: getResponseObject});
  });
}

export default fetchModel;
