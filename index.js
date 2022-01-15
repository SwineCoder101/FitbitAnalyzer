"use strict";

const localStorage = window.localStorage;

let fitbit_response_code;
let refreshToken = localStorage.getItem("refresh_token");
let accessToken = localStorage.getItem("access_token");

const urlEl = document.getElementById("url");
const accessCodeEl = document.getElementById("accessCode");
const copyStatusEl = document.getElementById("copyStatus");

const copyURLButtonEl = document.querySelector(".btn--copy");
const authorizeButtonEl = document.querySelector(".btn--authorize");
const refreshButtonEl = document.querySelector(".btn--refresh");

const accessCodeURL =
  "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BNHH&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";

const fitbitRedirectURL =
  "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=237Y6Z&redirect_uri=http%3A%2F%2Flocalhost&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=6048001A Get Code";

const oauthDetail = {
  client_id: "237Y6Z",
  redirect_uri: "http://localhost:8080/",
  activities: [],
  client_secret: "5902bc4f5c1b38a588a9611d0eda14a1",
};

urlEl.value = accessCodeURL;

const copyURL = function () {
  navigator.clipboard.writeText(accessCodeURL);
  copyStatusEl.textContent = "copied url...";
};

const getInitialTokens = async function () {
  const authorizationCode = accessCodeEl.value;
  const res = fetch("redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F", {
    body: `clientId=22BNHH&grant_type=authorization_code&\\&code=${authorizationCode}`,
    headers: {
      Authorization:
        "Basic MjJCTkhIOjQ2Y2M2OTNlZjFjZWQxZGVjOGM2NjM1Yzg4YjI0YjE0",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  fitbit_response_code = await res.json();

  console.log(`Making initial request for tokens.... ${fitbit_response_code}`);
  setTokensAndStorage();
};

function setTokensAndStorage() {
  localStorage.setItem("refresh_token", fitbit_response_code.refresh_token);
  localStorage.setItem("access_token", fitbit_response_code.access_token);
  localStorage.setItem("fitbit_response_code", fitbit_response_code);

  refreshToken = localStorage.getItem("refresh_token");
  accessToken = localStorage.getItem("access_token");
}

async function refreshNewToken(token) {
  const res = await fetch("https://api.fitbit.com/oauth2/token", {
    body: `grant_type=refresh_token&refresh_token=${token}`, //58c466ec21741827ef1ed59b986e6d56779ef5ca900671f693776948828571e0
    headers: {
      Authorization:
        "Basic MjJCTkhIOjQ2Y2M2OTNlZjFjZWQxZGVjOGM2NjM1Yzg4YjI0YjE0",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  fitbit_response_code = await res.json();
  setTokensAndStorage();
}

copyURLButtonEl.addEventListener("click", copyURL);
authorizeButtonEl.addEventListener("click", getInitialTokens);

async function getWeight() {}

// console.log(authorizationURL);

// getInitialTokens();
// refreshNewToken(fitbit_response_code.refresh_token);

// https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BNHH
// &redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F
// &scope=activity%20nutrition%20heartrate%20location%20

// fetch("", {
//   method: "GET",
//   headers: { Authorization: "Bearer " + access_token },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.log(err));
