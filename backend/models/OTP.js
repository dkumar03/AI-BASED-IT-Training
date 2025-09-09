const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // auto-delete after 5 minutes
  },
});

// Function to send email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      'Verification Email from AI Based IT Training System',
      `<h1>Your OTP is: ${otp}</h1>`
    );
    console.log('✅ Email sent successfully to:', email);
    return mailResponse;
  } catch (error) {
    console.log('❌ Error while sending an email to', email);
    throw error;
  }
}

// Use regular function so `this` works
OTPSchema.pre('save', async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model('OTP', OTPSchema);
