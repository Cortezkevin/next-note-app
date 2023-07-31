import { ITag } from '@/interfaces';
import mongoose, {Model, Schema, model} from 'mongoose';

const tagSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  color: {
    type: String
  }
},
{
  timestamps: false,
  versionKey: false
})

const Tag: Model<ITag> = mongoose.models.Tag || model('Tag', tagSchema);

export default Tag;