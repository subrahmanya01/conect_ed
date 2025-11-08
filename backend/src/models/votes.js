import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const voteSchema = new Schema({
  voteBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
  },
  answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer'
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  voteType: {
    type: String,
    enum: ['upvote', 'downvote'],
    required: true,
  }
},
{
    timestamps: true
});

const Votes = model('Votes', voteSchema)
export default Votes

