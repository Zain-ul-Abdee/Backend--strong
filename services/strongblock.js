const Web3 = require('web3');
const abi = require('../services/abi');
const address = require('../services/address')
const unStackedEventModel = require('../models/unstakedEventModel ');
const StakedEventModel = require('../models/stakedEventModel');


const infuraKey = address.infuraKey;
const web3 = new Web3(new Web3.providers.HttpProvider( `https://mainnet.infura.io/v3/${infuraKey}`));

const mycontract = new web3.eth.Contract(abi.Abi,address.contract);



const  getUnstakedEvents = async() => {
    mycontract.getPastEvents('Unstaked', {
        fromBlock: 0,
        toBlock: 'latest'
    },  function(error, events){
        //  console.log(events); 
        }).then(async function(events){
           await unStackedEventModel.deleteMany()
        console.log("Total unstaked Addresses: ",events.length);
        for(let i=0;i<events.length;i++){
            newModel = new unStackedEventModel({
                transactionHash     : events[i].transactionHash,
                user                : events[i].returnValues.user,
                stakeId             : events[i].returnValues.stakeId,
                amount              : events[i].returnValues.amount
              });
            await unStackedEventModel.create(newModel);
        } 

    })
    // res.status(200).json({success:"UnstakedEvents .... db records updated"})
}

const  getStakedEvents = async() =>{
    mycontract.getPastEvents('Staked', {
        fromBlock: 0,
        toBlock: 'latest'
    },  function(error, events){
        //  console.log(events); 
        }).then(async function(events){
            await StakedEventModel.deleteMany()
        console.log("Total staked Addresses: ",events.length);
        for(let i=0;i<events.length;i++){
            newModel = new StakedEventModel({
                transactionHash     : events[i].transactionHash,
                user                : events[i].returnValues.user,
                stakeId             : events[i].returnValues.stakeId,
                amount              : events[i].returnValues.amount
              });
            await StakedEventModel.create(newModel);
        } 

    })
    // res.status(200).json({success:"stakedEvents .... db records updated"})
}

const getUniqueStakeAddresses = async () => {
    var array = [];
    
     var addr = await StakedEventModel.distinct('user')
     for(let i = 0;i<addr.length;i++){
        var sum=0;
        var temp = await StakedEventModel.find({user : addr[i]})
        temp.forEach((item)=>{
            sum=sum+Number(item.amount)
        })     
        array.push({
            address     : addr[i] , 
            count       : temp.length,
            stakAmount  :sum  
        });
        // console.log("Addresses COunt",counter)
     }
     console.log("Addresses COunt",array.length)
     return array;
}

const getUniqueUnStakeAddresses = async()=>{
    var cnt = [];
     var addr = await unStackedEventModel.distinct('user')
     for(let i = 0;i<addr.length;i++){
        var counter = await unStackedEventModel.find({user : addr[i]}).count()
        
        cnt.push({
            address     : addr[i] , 
            count       : counter    
        });
     }
     console.log("Addresses COunt",cnt.length)
     return cnt;
}



module.exports = {
    getUnstakedEvents,
    getStakedEvents,
    getUniqueStakeAddresses,
    getUniqueUnStakeAddresses
};
