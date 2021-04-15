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
  rebuild: (appSlug, build) => {
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
