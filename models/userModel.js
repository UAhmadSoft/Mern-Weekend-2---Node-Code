const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      required: [true, 'Email is required'],
      unique: true,
    },

    phone: {
      type: String,
      // required: true,
      required: [true, 'Phone is required'],
      unique: true,
    },

    password: {
      type: String,
      maxlength: [20, 'must be less than or equal to 20'],
      minlength: [8, 'must be greater than 8'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      maxlength: [20, 'must be less than or equal to 20'],
      minlength: [8, 'must be greater than 8'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
      select: false,
    },
    image: String,
    age: Number,
    isActivated: {
      type: Boolean,
      // default  : false
      default: true, // for testing
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },

    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
    discriminatorKey: 'type',
  }
);

// * Virtuals
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// * Pre Save
// userSchema.pre('save', async function (next) {
//   // * This  = document
//   const hash = await bcrypt.hash(this.password, 11);
//   console.log('hash', hash);

//   this.password = hash;
//   this.passwordConfirm = undefined;

//   next();
// });
userSchema.pre('save', async function (next) {
  console.log('in middlware');
  if (!this.isModified('password')) {
    //  only run if password is modified
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12); // hashing password
  this.passwordConfirm = undefined; // delete passwordConfirm field

  console.log('this.password', this.password);
  next();
});
// userSchema.pre('save', async function (next) {
//   console.log('in middlware');
//   if (this.isModified('password')) {
//     //  only run if password is modified
//     this.password = await bcrypt.hash(this.password, 12); // hashing password
//     this.passwordConfirm = undefined; // delete passwordConfirm field

//     console.log('this.password', this.password);
//     next();
//   }
// });

userSchema.methods.comparePassword = async (userPassword, hashedPassword) => {
  console.log('hashedPassword', hashedPassword);
  const isMatched = await bcrypt.compare(userPassword, hashedPassword);

  return isMatched;
};

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;
