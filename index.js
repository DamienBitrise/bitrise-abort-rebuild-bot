const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const fetch = require('node-fetch');
const utils = require('./utils')
const apiUtils = require('./apiUtils');
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('/ health check');
  res.status(200).json({alive:true});
});

app.post('/webhook', (req, res) => {
  console.log('/webhook');

  const API_KEY = req.header('BITRISE-API-KEY');
  let body = req.body;
  console.log('WEBHOOK:', body);
  let buildStatus = body.build_status;

  if(buildStatus == 0){
    console.log('Build Started');
    res.status(200).json({alive:true});
    return;
  } else if(buildStatus == 1){
    console.log('Build Successful');
    res.status(200).json({alive:true});
    return;
  } else if(buildStatus == 2){
    console.log('Build Failed');
    res.status(200).json({alive:true});
    return;
  } else if(buildStatus == 3){
    console.log('Build Aborted with Failure');
  } else if(buildStatus == 4){
    console.log('Build Aborted with Success');
    res.status(200).json({alive:true});
    return;
  }
  let workflow = body.build_triggered_workflow;

  // console.log('Using Cache');
  apiUtils.getBuild(API_KEY, body.app_slug, body.build_slug, (build) => {
      console.log('Rebuilding...');
      utils.rebuild(body.app_slug, body)
    });
  res.status(200).json({success:true});
});

app.get('/stats', (req, res) => {
  console.log('/stats');
  res.json(cached_stats);
});

app.listen(3000, () => console.log('server started'));
