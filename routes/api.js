var express = require('express');
var router = express.Router();
// var getUnstakedEvents = require('../services/strongblock')
// var getStakedEvents = require('../services/strongblock')
var sb = require('../services/strongblock')

/* GET home page. */
router.get('/updateEvents', async function(req, res, next) {
  // res.status(200).json({ connected: 'api/update' });
  await sb.getStakedEvents()
  await sb.getUnstakedEvents()
  res.status(200).json({ Result: 'Events Updated' });

});

router.get('/uniqueAddresses', function(req, res, next) {
  sb.getUniqueAddresses().then((a)=>{
    res.status(200).json({result: a});
  }).catch((error)=>{
    res.status(400).json({error:error, details : "Failed to get unique addresses"})
  })
});

router.get('/uniquestakeAddrCount', function(req, res, next) {
  sb.getUniqueStakeAddresses().then((a)=>{
    res.status(200).json({result: a});
  }).catch((error)=>{
    res.status(400).json({error:error, details : "Failed to get unique  stake addresses and COunts"})
  })
});
router.get('/uniqueunstakeAddrCount', function(req, res, next) {
  sb.getUniqueUnStakeAddresses().then((a)=>{
    res.status(200).json({result: a});
  }).catch((error)=>{
    res.status(400).json({error:error, details : "Failed to get unique  unstake addresses and COunts"})
  })
});


router.get('/', function(req, res, next) {
  res.status(200).json({ connected: 'api/' });
});


module.exports = router;
