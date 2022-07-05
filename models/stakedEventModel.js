const mongoose = require('mongoose');
const stakedEventSchema = new mongoose.Schema({
    transactionHash: {
    type: String,
    required: [true, 'transactionHash is required'],
  },
  user: {
    type: String,
    required: [true, 'user is required'],
  },
  amount: {
    type: String,
    required: [true, 'amount is required'],
  },
  stakeId: {
    type: String,
    required: [true, 'stakeId is required'],
  },
});
const StakedEventModel = mongoose.model('StakedEvent', stakedEventSchema);
module.exports = StakedEventModel;