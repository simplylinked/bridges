const url = "https://api.coinbase.com/v2/prices/{PAIR}/spot";
const type = 'application/json;charset=UTF-8'
const API_SECRET = "API_SECRET";
const API_SECRET_IN_HEADER = false;

async function handleRequest(request) {

  const responseInit = {
    headers: {
      'content-type': type
    }
  }

  const requestBody = await request.json()

  var apiSecret = request.headers.get(API_SECRET);

  var responseJSON;

  if((apiSecret == null || apiSecret.length == 0) && API_SECRET_IN_HEADER) {
    responseJSON = {
        jobRunID: requestBody.id,
        status: "errored",
        error: 'missing API_SECRET',
    }

    return new Response(JSON.stringify(responseJSON), responseInit)
  }
  else {

    if(requestBody.data != null && requestBody.data.headers != null) {
      apiSecret = requestBody.data.headers.API_SECRET
    }
  
    if((apiSecret == null || apiSecret.length == 0) && !API_SECRET_IN_HEADER) {
      responseJSON = {
          jobRunID: requestBody.id,
          status: "errored",
          error: 'missing API_SECRET',
      }
      return new Response(JSON.stringify(responseJSON), responseInit)
    }  
    else {

      const adapterRequestInit = {
          headers: {
            'content-type': type,
            'Authorization': 'Bearer ' + apiSecret
          }
        }

        const pair = requestBody.data.pair

        if(pair != null && pair.length > 0) {

          var tempUrl = url.replace("{PAIR}", pair)

          const adapterResponses = await Promise.all([fetch(tempUrl, adapterRequestInit)])
          const adapterResults = await Promise.all([gatherResponse(adapterResponses[0])])  

          if(adapterResults != null && adapterResults.length > 0 && adapterResults[0].hasOwnProperty("data")) {
            responseJSON = {
                jobRunID: requestBody.id,
                data: adapterResults[0].data,
            }
          }
          else {
            responseJSON = {
                jobRunID: requestBody.id,
                status: "errored",
                error: 'unsupported crypto pair',
            }
          }

        }
        else {
          responseJSON = {
                jobRunID: requestBody.id,
                status: "errored",
                error: 'missing crypto pair',
            }
        }

        return new Response(JSON.stringify(responseJSON), responseInit)
    }
  }
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    return await response.json()
  } 
  else if (contentType.includes('application/text')) {
    return await response.text()
  } 
  else if (contentType.includes('text/html')) {
    return await response.text()
  } 
  else {
    return await response.text()
  }
}

async function readRequestBody(request) {
  const { headers } = request
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    const body = await request.json()
    //return JSON.stringify(body)
    return body
  } 
  else if (contentType.includes('application/text')) {
    const body = await request.text()
    return body
  } 
  else if (contentType.includes('text/html')) {
    const body = await request.text()
    return body
  } 
  else if (contentType.includes('form')) {
    const formData = await request.formData()
    let body = {}
    for (let entry of formData.entries()) {
      body[entry[0]] = entry[1]
    }
    return JSON.stringify(body)
  } 
  else {
    let myBlob = await request.blob()
    var objectURL = URL.createObjectURL(myBlob)
    return objectURL
  }
}
