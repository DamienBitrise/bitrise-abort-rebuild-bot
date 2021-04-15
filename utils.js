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
    if(build.abort_reason != "Lost connection to build agent"){
      console.log("Skipping Rebuild");
      return;
    }
    let keys = Object.keys(build.original_build_params);
    keys.forEach((key) => {
      build_params[key] = build.original_build_params[key];
    })
    // console.log("build_params:",build_params);
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
    fetch(BUILD_URL, payload)
    .then(res => {
      if(res.status == 201){
        console.log('Rebuilt Successfully');
      }else{
        console.log('Rebuild Failed');
        console.log('Start Build Response: ', res.status);
      }
      return res.json();
    })
    .then(res=>{ console.log('Start Build Res:', res); })
    .catch((err) => {
      console.log('Error: ', err);
    });
  }
}
