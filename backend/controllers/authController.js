// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// // @desc    Register new user
// // @route   POST /api/auth/signup
// // @access  Public
// const signup = async (req, res) => {
//   try {
//     console.log('=== SIGNUP REQUEST ===');
//     console.log('Request body:', req.body);
    
//     const { username, email, password, displayName } = req.body;

//     // Validation
//     if (!username || !email || !password || !displayName) {
//       console.log('Validation failed: Missing fields');
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields',
//       });
//     }

//     console.log('Checking if user exists...');
//     // Check if user exists
//     const userExists = await User.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (userExists) {
//       console.log('User already exists:', userExists.email === email ? 'Email' : 'Username');
//       return res.status(400).json({
//         success: false,
//         message: userExists.email === email
//           ? 'Email already registered'
//           : 'Username already taken',
//       });
//     }

//     console.log('Creating new user...');
//     // Create user
//     const user = await User.create({
//       username,
//       email,
//       password,
//       displayName,
//     });

//     console.log('User created successfully:', user._id);

//     // Generate token
//     const token = generateToken(user._id);

//     console.log('Token generated, sending response...');
//     res.status(201).json({
//       success: true,
//       message: 'Account created successfully',
//       data: {
//         token,
//         user: {
//           id: user._id,
//           username: user.username,
//           email: user.email,
//           displayName: user.displayName,
//           goals: user.goals,
//           preferences: user.preferences,
//           settings: user.settings,
//         },
//       },
//     });
//   } catch (error) {
//     console.error('=== SIGNUP ERROR ===');
//     console.error('Error details:', error);
//     console.error('Error message:', error.message);
//     console.error('Error stack:', error.stack);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating account',
//       error: error.message,
//     });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const login = async (req, res) => {
//   try {
//     console.log('=== LOGIN REQUEST ===');
//     console.log('Request body:', req.body);
    
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       console.log('Validation failed: Missing email or password');
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email and password',
//       });
//     }

//     console.log('Finding user with email:', email);
//     // Check for user (include password field)
//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//       console.log('User not found');
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     console.log('User found, comparing password...');
//     // Check password
//     const isPasswordMatch = await user.comparePassword(password);

//     if (!isPasswordMatch) {
//       console.log('Password does not match');
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     console.log('Password matched! Updating streak...');
//     // Update streak
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (user.streak.lastActiveDate) {
//       const lastActive = new Date(user.streak.lastActiveDate);
//       lastActive.setHours(0, 0, 0, 0);
      
//       const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
      
//       if (daysDiff === 1) {
//         // Consecutive day
//         user.streak.currentStreak += 1;
//         if (user.streak.currentStreak > user.streak.longestStreak) {
//           user.streak.longestStreak = user.streak.currentStreak;
//         }
//       } else if (daysDiff > 1) {
//         // Streak broken
//         user.streak.currentStreak = 1;
//       }
//       // If daysDiff === 0, same day, don't increment
//     } else {
//       // First login
//       user.streak.currentStreak = 1;
//       user.streak.longestStreak = 1;
//     }
    
//     user.streak.lastActiveDate = today;
//     await user.save();

//     console.log('Generating token...');
//     // Generate token
//     const token = generateToken(user._id);

//     console.log('Login successful! Sending response...');
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         token,
//         user: {
//           id: user._id,
//           username: user.username,
//           email: user.email,
//           displayName: user.displayName,
//           goals: user.goals,
//           preferences: user.preferences,
//           currentWeight: user.currentWeight,
//           height: user.height,
//           age: user.age,
//           gender: user.gender,
//           streak: user.streak,
//           achievements: user.achievements,
//           settings: user.settings,
//         },
//       },
//     });
//   } catch (error) {
//     console.error('=== LOGIN ERROR ===');
//     console.error('Error details:', error);
//     console.error('Error message:', error.message);
//     console.error('Error stack:', error.stack);
//     res.status(500).json({
//       success: false,
//       message: 'Error logging in',
//       error: error.message,
//     });
//   }
// };

// // @desc    Get current user profile
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//       success: true,
//       data: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         displayName: user.displayName,
//         goals: user.goals,
//         preferences: user.preferences,
//         currentWeight: user.currentWeight,
//         height: user.height,
//         age: user.age,
//         gender: user.gender,
//         streak: user.streak,
//         achievements: user.achievements,
//         settings: user.settings,
//         bmi: user.calculateBMI(),
//       },
//     });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching user data',
//     });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateProfile = async (req, res) => {
//   try {
//     const allowedUpdates = [
//       'displayName',
//       'currentWeight',
//       'height',
//       'age',
//       'gender',
//       'goals',
//       'preferences',
//       'settings',
//     ];

//     const updates = {};
//     Object.keys(req.body).forEach((key) => {
//       if (allowedUpdates.includes(key)) {
//         updates[key] = req.body[key];
//       }
//     });

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Profile updated successfully',
//       data: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         displayName: user.displayName,
//         goals: user.goals,
//         preferences: user.preferences,
//         currentWeight: user.currentWeight,
//         height: user.height,
//         age: user.age,
//         gender: user.gender,
//         settings: user.settings,
//         bmi: user.calculateBMI(),
//       },
//     });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating profile',
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   signup,
//   login,
//   getMe,
//   updateProfile,
// };


const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    console.log('=== SIGNUP REQUEST ===');
    console.log('Request body:', req.body);
    
    const { username, email, password, displayName } = req.body;

    // Validation
    if (!username || !email || !password || !displayName) {
      console.log('Validation failed: Missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    console.log('Checking if user exists...');
    // Check if user exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      console.log('User already exists:', userExists.email === email ? 'Email' : 'Username');
      return res.status(400).json({
        success: false,
        message: userExists.email === email
          ? 'Email already registered'
          : 'Username already taken',
      });
    }

    console.log('Creating new user...');
    // Create user
    const user = await User.create({
      username,
      email,
      password,
      displayName,
    });

    console.log('User created successfully:', user._id);

    // Generate token
    const token = generateToken(user._id);

    console.log('Token generated, sending response...');
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          goals: user.goals,
          preferences: user.preferences,
          settings: user.settings,
        },
      },
    });
  } catch (error) {
    console.error('=== SIGNUP ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error creating account',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('Request body:', req.body);
    
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('Validation failed: Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    console.log('Finding user with email:', email);
    // Check for user (include password field)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    console.log('User found, comparing password...');
    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    console.log('Password matched! Updating streak...');
    // Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (user.streak.lastActiveDate) {
      const lastActive = new Date(user.streak.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day
        user.streak.currentStreak += 1;
        if (user.streak.currentStreak > user.streak.longestStreak) {
          user.streak.longestStreak = user.streak.currentStreak;
        }
      } else if (daysDiff > 1) {
        // Streak broken
        user.streak.currentStreak = 1;
      }
      // If daysDiff === 0, same day, don't increment
    } else {
      // First login
      user.streak.currentStreak = 1;
      user.streak.longestStreak = 1;
    }
    
    user.streak.lastActiveDate = today;
    await user.save();

    console.log('Generating token...');
    // Generate token
    const token = generateToken(user._id);

    console.log('Login successful! Sending response...');
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          goals: user.goals,
          preferences: user.preferences,
          currentWeight: user.currentWeight,
          height: user.height,
          age: user.age,
          gender: user.gender,
          streak: user.streak,
          achievements: user.achievements,
          settings: user.settings,
        },
      },
    });
  } catch (error) {
    console.error('=== LOGIN ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        goals: user.goals,
        preferences: user.preferences,
        currentWeight: user.currentWeight,
        height: user.height,
        age: user.age,
        gender: user.gender,
        streak: user.streak,
        achievements: user.achievements,
        settings: user.settings,
        bmi: user.calculateBMI(),
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const allowedUpdates = [
      'displayName',
      'currentWeight',
      'height',
      'age',
      'gender',
      'goals',
      'preferences',
      'settings',
    ];

    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        goals: user.goals,
        preferences: user.preferences,
        currentWeight: user.currentWeight,
        height: user.height,
        age: user.age,
        gender: user.gender,
        settings: user.settings,
        bmi: user.calculateBMI(),
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

// @desc    Google OAuth login
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  try {
    console.log('=== GOOGLE AUTH REQUEST ===');
    const { credential, displayName } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required',
      });
    }

    // Decode Google JWT token (you can verify it with Google's API in production)
    const base64Url = credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString()
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const googleUser = JSON.parse(jsonPayload);
    console.log('Google user:', googleUser);

    const { email, name, sub: googleId } = googleUser;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      console.log('Existing user found, logging in...');
      
      // Update streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (user.streak.lastActiveDate) {
        const lastActive = new Date(user.streak.lastActiveDate);
        lastActive.setHours(0, 0, 0, 0);
        
        const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          user.streak.currentStreak += 1;
          if (user.streak.currentStreak > user.streak.longestStreak) {
            user.streak.longestStreak = user.streak.currentStreak;
          }
        } else if (daysDiff > 1) {
          user.streak.currentStreak = 1;
        }
      } else {
        user.streak.currentStreak = 1;
        user.streak.longestStreak = 1;
      }
      
      user.streak.lastActiveDate = today;
      await user.save();
    } else {
      console.log('New user, creating account...');
      
      // Create username from email
      const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
      
      // Create new user with Google data
      user = await User.create({
        email,
        username,
        displayName: displayName || name || email.split('@')[0],
        password: Math.random().toString(36).slice(-8) + 'Aa1!', // Random secure password (not used)
        googleId,
        authProvider: 'google',
      });
      
      console.log('New user created:', user._id);
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: user ? 'Login successful' : 'Account created successfully',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          goals: user.goals,
          preferences: user.preferences,
          currentWeight: user.currentWeight,
          height: user.height,
          age: user.age,
          gender: user.gender,
          streak: user.streak,
          achievements: user.achievements,
          settings: user.settings,
        },
      },
    });
  } catch (error) {
    console.error('=== GOOGLE AUTH ERROR ===');
    console.error('Error details:', error);
    res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getMe,
  updateProfile,
  googleAuth,
};