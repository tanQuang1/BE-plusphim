import https from "https";

const loadImageFromUrl = (url: string) => {
  const urlParams = new URL(url);
  const hostname = urlParams.hostname;
  const path = urlParams.pathname;

  const options = {
    hostname: hostname,
    port: 443,
    path: path,
    method: "GET",
  };

  const request = https.request(options, (res) => {
    res.on("data", (data) => {
      console.log(`response data: ${data}`);
    });
  });

  request.on("error", (error) => {
    console.error(`Error on Get Request --> ${error}`);
  });
  request.end();
};

export default loadImageFromUrl;
