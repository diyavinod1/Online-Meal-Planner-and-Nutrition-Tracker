// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, 'Please provide a username'],
//       unique: true,
//       trim: true,
//       minlength: [3, 'Username must be at least 3 characters'],
//       maxlength: [30, 'Username cannot exceed 30 characters'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Please provide an email'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         'Please provide a valid email',
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, 'Please provide a password'],
//       minlength: [6, 'Password must be at least 6 characters'],
//       select: false, // Don't include password in queries by default
//     },
//     displayName: {
//       type: String,
//       required: [true, 'Please provide a display name'],
//       trim: true,
//     },
//     // User Goals & Preferences
//     goals: {
//       targetWeight: {
//         type: Number,
//         default: null,
//       },
//       goalType: {
//         type: String,
//         enum: ['weight_loss', 'weight_gain', 'maintenance', 'muscle_gain'],
//         default: 'maintenance',
//       },
//       dailyCalorieGoal: {
//         type: Number,
//         default: 2000,
//       },
//       proteinGoal: {
//         type: Number,
//         default: 150,
//       },
//       carbsGoal: {
//         type: Number,
//         default: 200,
//       },
//       fatsGoal: {
//         type: Number,
//         default: 65,
//       },
//     },
//     preferences: {
//       dietType: {
//         type: String,
//         enum: ['none', 'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo'],
//         default: 'none',
//       },
//       allergies: {
//         type: [String],
//         default: [],
//       },
//       favoritefoods: {
//         type: [String],
//         default: [],
//       },
//     },
//     // Tracking Data
//     currentWeight: {
//       type: Number,
//       default: null,
//     },
//     height: {
//       type: Number,
//       default: null,
//     },
//     age: {
//       type: Number,
//       default: null,
//     },
//     gender: {
//       type: String,
//       enum: ['male', 'female', 'other'],
//       default: 'other',
//     },
//     // Gamification
//     streak: {
//       currentStreak: {
//         type: Number,
//         default: 0,
//       },
//       longestStreak: {
//         type: Number,
//         default: 0,
//       },
//       lastActiveDate: {
//         type: Date,
//         default: null,
//       },
//     },
//     achievements: {
//       type: [String],
//       default: [],
//     },
//     // App Settings
//     settings: {
//       theme: {
//         type: String,
//         enum: ['light', 'dark'],
//         default: 'light',
//       },
//       notifications: {
//         type: Boolean,
//         default: true,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Method to calculate BMI
// userSchema.methods.calculateBMI = function () {
//   if (!this.currentWeight || !this.height) return null;
//   const heightInMeters = this.height / 100;
//   return (this.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
// };

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; // Password not required if Google auth
      },
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password in queries by default
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    displayName: {
      type: String,
      required: [true, 'Please provide a display name'],
      trim: true,
    },
    // User Goals & Preferences
    goals: {
      targetWeight: {
        type: Number,
        default: null,
      },
      goalType: {
        type: String,
        enum: ['weight_loss', 'weight_gain', 'maintenance', 'muscle_gain'],
        default: 'maintenance',
      },
      dailyCalorieGoal: {
        type: Number,
        default: 2000,
      },
      proteinGoal: {
        type: Number,
        default: 150,
      },
      carbsGoal: {
        type: Number,
        default: 200,
      },
      fatsGoal: {
        type: Number,
        default: 65,
      },
    },
    preferences: {
      dietType: {
        type: String,
        enum: ['none', 'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo'],
        default: 'none',
      },
      allergies: {
        type: [String],
        default: [],
      },
      favoritefoods: {
        type: [String],
        default: [],
      },
    },
    // Tracking Data
    currentWeight: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'other',
    },
    // Gamification
    streak: {
      currentStreak: {
        type: Number,
        default: 0,
      },
      longestStreak: {
        type: Number,
        default: 0,
      },
      lastActiveDate: {
        type: Date,
        default: null,
      },
    },
    achievements: {
      type: [String],
      default: [],
    },
    // App Settings
    settings: {
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to calculate BMI
userSchema.methods.calculateBMI = function () {
  if (!this.currentWeight || !this.height) return null;
  const heightInMeters = this.height / 100;
  return (this.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
};

module.exports = mongoose.model('User', userSchema);