import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

// To prepare for Mongoose 7
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Account already exists"],
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [6, "Your password must be at least 6 characters long"],
    select: false, //dont send back password after request
  },
  role: {
    type: String,
    default: 'user',
    enum: {
        values: [
            'user',
            'admin'
        ],
    }
  },
  fullName: {
    type: String,
    required: false,
    default: 'No Name'
  },
  profileImage: {
    type: String,
    required: false,
  },
  artworks: [{
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
  }],
  createdAt: {
      type: Date,
      default: Date.now
  },
  // avatar: {
  //   type: String,
  //   required: false,
  //   unique: false,
  // },
  // subscriber: {
  //   type: Boolean,
  //   default: false,
  // },
});

// ENCRYPTION 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model('User', userSchema)