import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });

// userSchema.statics.isUserExists = async function (email: string) {
//   return await User.findOne({ email: email }).select('+password');
// };

// set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });
// userSchema.statics.isPasswordMatch = async function (
//   plainTextPassword,
//   hashPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashPassword);
// };

const User = model<IUser>('User', userSchema);
export default User;
