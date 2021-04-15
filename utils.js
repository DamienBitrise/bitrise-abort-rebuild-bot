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
  */
  rebuild: (appSlug, build) => {
    if(build.abort_reason != ""){
      console.log("Abort Reason:", build.abort_reason);
    }
    const BUILD_URL = 'https://api.bitrise.io/v0.1/apps/' + appSlug + "/builds/";
    fetch(BUILD_URL, {
      method: 'post',
      body:    JSON.stringify({
        "build_params": {
          "branch": "string",
          "branch_dest": "string",
          "branch_dest_repo_owner": "string",
          "branch_repo_owner": "string",
          "build_request_slug": "string",
          "commit_hash": "string",
          "commit_message": "string",
          "commit_paths": [
            {
              "added": [
                "string"
              ],
              "modified": [
                "string"
              ],
              "removed": [
                "string"
              ]
            }
          ],
          "diff_url": "string",
          "environments": [
            {
              "is_expand": true,
              "mapped_to": "string",
              "value": "string"
            }
          ],
          "pull_request_author": "string",
          "pull_request_head_branch": "string",
          "pull_request_id": {},
          "pull_request_merge_branch": "string",
          "pull_request_repository_url": "string",
          "skip_git_status_report": true,
          "tag": "string",
          "workflow_id": "string"
        },
        "hook_info": {
          "type": "abort_rebuild_bot"
        }
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      console.log('Slack Response: ', res.status);
      if(res.status == 200){
        console.log('Slack Message Sent Successfully')
      }else{
        console.log('Slack Message Failed to Send')
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
  }
}
