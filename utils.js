const fetch = require('node-fetch');
// const API_KEY = 'Z7wWBYhURFEweow4XwnUhyu18mdVPKxkC6Bo8ainwC-Ozzun7_JMIVLQw1nrfHboJZsRHD_zBcNfibOatZGmEQ';

module.exports = {
  
  getHeaders: (api_key) => {
    return {
          headers: { 
            'accept': 'application/json',
            'Authorization': api_key
          },
      }
  },

  /*
  WEBHOOK
{
  build_slug: '815697039aa6c07c',
  build_number: 41,
  app_slug: '305da28f92b6b419',
  build_status: 3,
  build_triggered_workflow: 'primary',
  git: {
    provider: 'github',
    src_branch: 'master',
    dst_branch: 'master',
    pull_request_id: 0,
    tag: null
  }
}

BUILD
{
    "abort_reason": {
      "string": "string",
      "valid": true
    },
    "branch": {
      "string": "string",
      "valid": true
    },
    "build_number": 0,
    "commit_hash": {
      "string": "string",
      "valid": true
    },
    "commit_message": {
      "string": "string",
      "valid": true
    },
    "commit_view_url": {
      "string": "string",
      "valid": true
    },
    "environment_prepare_finished_at": "string",
    "finished_at": "string",
    "is_on_hold": true,
    "machine_type_id": {
      "string": "string",
      "valid": true
    },
    "original_build_params": [
      0
    ],
    "pull_request_id": 0,
    "pull_request_target_branch": {
      "string": "string",
      "valid": true
    },
    "pull_request_view_url": {
      "string": "string",
      "valid": true
    },
    "slug": "string",
    "stack_identifier": {
      "string": "string",
      "valid": true
    },
    "started_on_worker_at": "string",
    "status": 0,
    "status_text": "string",
    "tag": {
      "string": "string",
      "valid": true
    },
    "triggered_at": "string",
    "triggered_by": {
      "string": "string",
      "valid": true
    },
    "triggered_workflow": "string"
  }

  Got Build: {
  data: {
    triggered_at: '2021-04-15T00:49:16Z',
    started_on_worker_at: '2021-04-15T00:49:17Z',
    environment_prepare_finished_at: '2021-04-15T00:49:17Z',
    finished_at: '2021-04-15T00:49:22Z',
    slug: 'a851343a3121eadf',
    status: 3,
    status_text: 'aborted',
    abort_reason: 'User Personal requested to abort this build.',
    is_on_hold: false,
    branch: 'master',
    build_number: 45,
    commit_hash: null,
    commit_message: null,
    tag: null,
    triggered_workflow: 'primary',
    triggered_by: 'manual-Personal',
    machine_type_id: 'elite',
    stack_identifier: 'osx-xcode-12.0.x',
    original_build_params: { branch: 'master', workflow_id: 'primary' },
    pull_request_id: 0,
    pull_request_target_branch: null,
    pull_request_view_url: null,
    commit_view_url: null
  }
}
  */
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
    const BUILD_URL = 'https://api.bitrise.io/v0.1/apps/' + appSlug + "/builds/";
    let payload = {
      method: 'post',
      body:    {
        "build_params": build_params,
        "hook_info": {
          "type": "bitrise"
        }
      },
      headers: {
        'accept': 'application/json',
        'Authorization': API_KEY
      }
    };
    console.log('Payload:', payload)
    fetch(BUILD_URL, JSON.stringify(payload))
    .then(res => {
      console.log('Start Build Response: ', res.status);
      if(res.status == 200){
        console.log('Rebuilt Successfully')
      }else{
        console.log('Rebuild Failed')
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
  }
}
