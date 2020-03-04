import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active'
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    }
  },
  { timestamps: true }
)

// a compund index to ensure all tasks in a list have unique names
itemSchema.index(
  {
    list: 1, // the 1 here mean the sorting order - here order matters - it will go to list and so
    name: 1
  },
  {
    unique: true
  }
)

export const Item = mongoose.model('item', itemSchema)
