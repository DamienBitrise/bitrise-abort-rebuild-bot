const fetch = require('node-fetch');

module.exports = {
  
  getHeaders: (api_key) => {
    return {
          headers: { 
            'accept': 'application/json',
            'Authorization': api_key
          },
      }
  },
  rebuild: (API_KEY, appSlug, buildData) => {
    let build = buildData.data;

    let build_params = {
      "branch": "",
      "commit_paths": [],
      "diff_url": "",
      "environments": [],
      "pull_request_author": "",
      "pull_request_head_branch": "",
      "pull_request_id": {},
      "pull_request_merge_branch": "",
      "pull_request_repository_url": "",
      "skip_git_status_report": true,
      "tag": "",
      "workflow_id": ""
    };
    console.log("Abort Reason:", build.abort_reason);
    if(build.abort_reason != "User Personal requested to abort this build."){
      console.log("Skipping Rebuild");
      return;
    }
    console.log("Rebuilding Params:",build.original_build_params);
    let keys = Object.keys(build.original_build_params);
    keys.forEach((key) => {
      build_params[key] = build.original_build_params[key];
    })
    console.log("build_params:",build_params);
    const BUILD_URL = 'https://api.bitrise.io/v0.1/apps/' + appSlug + "/builds";
    let payload = {
      method: 'post',
      body: JSON.stringify({
        "build_params": build_params,
        "hook_info": {
          "type": "bitrise"
        }
      }),
      headers: {
        'accept': 'application/json',
        'Authorization': API_KEY
      }
    };
    console.log('Payload:', payload)
    fetch(BUILD_URL, payload)
    .then(res => {
      console.log('Start Build Response: ', res.status);
      if(res.status == 200){
        console.log('Rebuilt Successfully')
      }else{
        console.log('Rebuild Failed')
      }
      return res.json();
    })
    .then(res=>{ console.log('Start Build Res:', res); })
    .catch((err) => {
      console.log('Error: ', err);
    });
  }
}
