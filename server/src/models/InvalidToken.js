import { Schema, model } from 'mongoose'

const invalidToken = new Schema({
  token: {
    type: String,
    required: true
  }
},
{ timestamps: true }
)

export default model('invalid-token', invalidToken)