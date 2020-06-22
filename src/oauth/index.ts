// functions/hello/index.js
const axios = require('axios').default;

const githubCofig = require('./githubConfig.json');

async function handleGithubOauth(code) {
  console.log('- code', code);
  const {
    data: {
      access_token: accessToken,
      token_type: tokenType,
    }
  } = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${githubCofig.client_id}&` +
      `client_secret=${githubCofig.client_secret}&` +
      `code=${code}`,
    headers: {
      accept: 'application/json'
    }
  });
  console.log('- result', accessToken, tokenType);

  const {
    data: {
      id,
      login: loginName,
      name,
      email,
      avatar_url: avatarUal,
    } = {},
  } = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });

  console.log('result', id, name);
}

exports.main = async function(event) {
  const {
    type,
    code,
  } = event;

  switch (type) {
    case 'github':
      await handleGithubOauth(code);
      break;
    default:
      break;
  }
}