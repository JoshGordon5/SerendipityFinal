import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import UserModal from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";
import ErrorResponse from "../utils/errorResponse.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await UserModal.findOne({ email });

  if (user) {
    return res.status(400).json({ err: "Email is taken" });
  }

  try {
    const token = jwt.sign(
      { firstName, lastName, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10minutes" }
    );

    const title = "Please verify your email";

    const text = `
      <h1>Please use the following link to activate your account</h1>
      <strong>${process.env.CLIENT_URL}/auth/activate/${token}</strong>
      <hr />
      <p>This Email may have sensitive information</p>
    `;

  

    res.status(202).json({
      message: `Email has been sent to ${email} successfully. Follow the instruction to activate your account`,
      token: token,
    });

    // res.json({ token });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};


export const forgotpassword = async (req, res, next) => {
  const {email} = req.body;

  try {
      const user = await UserModal.findOne({email});
      if(!user){
          return next(new ErrorResponse("Email could not be sent", 404))
      }

      const resetToken = user.getResetPasswordToken();

      await user.save();

      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

      const message = `
          <h1>You have requested a password reset from serendipity.</h1>
          <p>Plase go to this link to reset your password</p>
          <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

      try {
          await sendEmail({
              to: user.email,
              subject: "Password Reset Required",
              text: message
          });

          res.status(200).json({success: true, data: "email sent"})
      } catch (err) {
          res.status(500).json({ success: false, err: err.message });

          await user.save();

          
      }
  } catch (err) {
      next(err);
  }
};

export const resetpassword = async (req, res, next) => {
  const resetPasswordToken = await bcrypt
  .hash(password, 12);
  

  try {
      const user = await UserModal.findOne({
          resetPasswordToken, 
          resetPasswordExpire: {$gt: Date.now() },
      });

      if(!user) {
          return next(new ErrorResponse("Invalid token", 400))
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(201).json({
          success: true,
          data: "Password Reset Success"
      })
  } catch (err) {
      next(error)
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token })
}

