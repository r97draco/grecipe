require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const FamilyModel = mongoose.model('Family', familySchema);
