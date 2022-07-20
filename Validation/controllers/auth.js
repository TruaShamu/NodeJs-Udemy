const User = require('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const mailersend = new MailerSend({
  api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmM3MzdkMDBkNDA0Nzg1MmQ1NDA1MTZmNDM3MmYwYjZmZTIyMDQxOGFhZTJjMWFlZTc5YWE2NzAwYzgyYWVlYjc0ZjIwZDE5OTg5NDYwMWEiLCJpYXQiOjE2NTgxNTI5MDQuMzg2NDUxLCJuYmYiOjE2NTgxNTI5MDQuMzg2NDU0LCJleHAiOjQ4MTM4MjY1MDQuMzgyODQ3LCJzdWIiOiIzMjMzNCIsInNjb3BlcyI6WyJlbWFpbF9mdWxsIiwiZG9tYWluc19mdWxsIiwiYWN0aXZpdHlfZnVsbCIsImFuYWx5dGljc19mdWxsIiwidG9rZW5zX2Z1bGwiLCJ3ZWJob29rc19mdWxsIiwidGVtcGxhdGVzX2Z1bGwiLCJzdXBwcmVzc2lvbnNfZnVsbCIsInNtc19mdWxsIl19.S3FCM1xKeSXUEISXYXbwrU4c8GjKFDzvrOdpNp3duYfoqjCAgAElsDK0ZARG7Te85m9jyomV1R2EU4NZncWObQ-C5RyWinZ45ZBBXU1ZM8phMz5fM46cWMQ2IQYORX7G6c5kV1xJk4aiiIQrzdfDbSOc-UTRcy60vgXCp1Z3EXITXCiipn7y8C6cH8lb3MCPKtHDd3Kru7ZJqfMZVq6CywTCxNLHXU15S30Gf2iu1gJrZXY0HzEl20VMqXRx0dUQNWgb2k28h7vh52iMb4p0Bmig8VkvON4nleQ3CkSXeFoovQlC0WvCMeTzKDSW5vI6gPvNzYK1DMbBeEVpNZXSsnsxvOREjQHy4op46Fe-Ed-5TnmTFh2o6vQ1f8kQ2LqylHfMxyG5xDgD3f-2qQEfh2kXb46p5gThD5VpHfERmeK9KKRrHuDgkq2gmYpxS8k8ovEk6KmDh_JHJnNeSwYrRJEaGzgBrIVFPCzTvUAJwJ7MPErFSgD9gW5FuSS3ixrtBBBYGli-YncyztAC2HN4bVWSArl_CfpPDOmwYfbDggUXgvzYYoRzXgUC1nf_oC0SJmcS_HDeWOJoyTGx-T_tu8Yg-SX1CkRGUY2y8MykIeD-keV_dPX39PkF20EZHJ3XA6tLPXojV6jSL1tvO8jkwzOQSmgYfYnuwNKiYs1KxJg",
});

exports.getLogin = (req, res, next) => {
  let message =  req.flash('error')
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage : message,
    oldInput: {email: '', password: ''},
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false,
      errorMessage : errors.array()[0].msg,
      oldInput: {email: email, password: password},
      validationErrors: errors.array()
    });
  }
  User.findOne({email: email})
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password).then(matches => {
        if (matches) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
          
        }
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
      }).catch(err => {
        console.log(err);
        res.redirect('/login');
      });
})
};

exports.getSignup = (req, res, next) => {
  let message =  req.flash('error')
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage : message,
    oldInput: {email: '', password: '', confirmPassword: ''},
    validationErrors: []
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  console.log(email);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422)
      .render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage : errors.array()[0].msg,
        oldInput: {email: email, password: password, confirmPassword: req.body.confirmPassword},
        validationErrors: errors.array()
      });
  }
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
          res.redirect('/login');
      /* const recipients = [new Recipient(email, "Recipient")];

      const emailParams = new EmailParams()
        .setFrom("trua@jello-whales.net")
        .setFromName("Trua")
        .setRecipients(recipients)
        .setSubject("Signup suceeded!")
        .setHtml("<h1>You successfully signed up!<h1>");
        mailersend.send(emailParams);*/
        }) 
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message =  req.flash('error')
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage : message
  });
}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({email: req.body.email}).then(user => {
      if (!user) {
        req.flash(err, "No account with that email found!");
        res.redirect('/reset');
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      return user.save();
    })
    .then(result => {
      res.redirect('/');
      const recipients = [new Recipient(req.body.email, "Recipient")];
      const emailParams = new EmailParams()
        .setFrom("trua@jello-whales.net")
        .setFromName("Trua")
        .setRecipients(recipients)
        .setSubject("Password Reset!")
        .setHtml(`
          <p>You required a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        `);
        mailersend.send(emailParams);
    })
    .catch(err => {
      console.log(err);
    });
  });
  }

  exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
      let message =  req.flash('error')
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      console.log(user._id.toString());
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage : message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err)
    });
  }


  exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    console.log(passwordToken);
    console.log(userId);

    let resetUser;
  
    User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    })
      .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };