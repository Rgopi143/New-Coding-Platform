import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: false, unique: false, index: true },
    passwordHash: { type: String, required: false },
    name: { type: String, required: false },
    // OAuth identities
    googleId: { type: String, index: true, unique: false },
    githubId: { type: String, index: true, unique: false },
    facebookId: { type: String, index: true, unique: false }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: 'string' } } });

const User = mongoose.model('User', userSchema);
export default User;
