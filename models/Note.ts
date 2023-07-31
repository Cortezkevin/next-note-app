import { INote } from '@/interfaces';
import mongoose, {Model, Schema, model} from 'mongoose';

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: false
  }]
},
{
  timestamps: true
})

const Note: Model<INote> = mongoose.models.Note || model('Note', noteSchema);

export default Note;