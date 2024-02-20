require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  userName: { type: String },
  photoURL: { type: String },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'Family',
  },
  isFamilyHead: { type: Boolean, default: false },
});

const UserModel = mongoose.model('User', userSchema);
