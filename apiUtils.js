const utils = require('./utils')
const fetch = require('node-fetch');

module.exports = {
  getBuild: (api_key, appSlug, buildSlug, callback) => {
    let url = utils.BASE_URL+'/'+appSlug+'/builds/'+buildSlug;
    return fetch(url, utils.getHeaders(api_key))
      .then(res => res.json())
      .then((builds) => {
        callback(builds);
      });
  }
}