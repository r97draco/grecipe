require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  familyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Family',
  },
  name: { type: String, required: true },
  quantity: { type: Number },
  expiresAt: { type: Date },
  fooDBKey: { type: String }, // Optional field for external database keys
});

const ItemModel = mongoose.model('Item', itemsSchema);
