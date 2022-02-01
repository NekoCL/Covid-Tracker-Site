var express = require('express');
var router = express.Router();
var passport = require('passport');

//google signin
const CLIENT_ID = '341339043890-4rr3gtr98gbja66hapco57gc0qhao9hc.apps.googleusercontent.com'

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




/* User Update Username */
router.post('/updateUserUsername', function(req, res, next) {
    console.log('user update');
    usernameUpdator = req.body.usernameUp;
    console.log('usernameUpdator '+usernameUpdator);

    usernameOld = req.session.idname;
    console.log('usernameOld '+usernameOld);

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET username = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [usernameUpdator, usernameOld], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          // Update session username to new
          req.session.idname = usernameUpdator;
          res.end();
        });
    });

});

/* User Update Email */
router.post('/updateUserEmail', function(req, res, next) {
    console.log('user update');
    emailUpdator = req.body.emailUp;
    console.log('emailUpdator '+emailUpdator);

    usernameCurrent = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET email = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [emailUpdator, usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Update First Name */
router.post('/updateUserFirstname', function(req, res, next) {
    console.log('user update');
    firstUpdator = req.body.firstUp;
    console.log('firstUpdator '+firstUpdator);

    usernameCurrent = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET first_name = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [firstUpdator, usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Update Last Name */
router.post('/updateUserLastname', function(req, res, next) {
    console.log('user update');
    lastUpdator = req.body.lastUp;
    console.log('lastUpdator '+lastUpdator);

    usernameCurrent = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET last_name = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [lastUpdator, usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Update Address */
router.post('/updateUserAddress', function(req, res, next) {
    console.log('user update');
    addressUpdator = req.body.addressUp;
    console.log('addressUpdator '+addressUpdator);

    usernameCurrent = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET address = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [addressUpdator, usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Update Zip */
router.post('/updateUserZip', function(req, res, next) {
    console.log('user update');
    zipUpdator = req.body.zipUp;
    console.log('zipUpdator '+zipUpdator);

    usernameCurrent = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET zip = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [zipUpdator, usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Update Birthday */
router.post('/updateUserDOB', function(req, res, next) {
    console.log('user update');
    dobUpdator = req.body.dobUp;
    console.log('dobUpdator '+dobUpdator);

    usernameCurrent = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET DOB = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [dobUpdator, usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Update Phone Number */
router.post('/updateUserPhone', function(req, res, next) {
    console.log('user update');
    phoneUpdator = req.body.phoneUp;
    console.log('phoneUpdator '+phoneUpdator);

    usernameCurrent = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET contact_number = ? WHERE username = ?";
        console.log('queried');
        connection.query(query, [phoneUpdator, usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Update Password */
router.post('/updateUserPassword', function(req, res, next) {
    console.log('user update');

    if( 'passUp' in req.body &&
        'passCurrent' in req.body) {

      passUpdator = req.body.passUp;

      // Check if new password is not empty
      if (passUpdator.length == 0) {
        console.log('Need a password of length > 0');
        res.sendStatus(500);
        return;
      }

      usernameCurrent = req.session.idname;
      userCurrentPass = req.body.passCurrent;

      // Check if current password is correct
      req.pool.getConnection( function(err,connection) {
          if (err) {
            res.sendStatus(500);
            return;
          }
          var query = `SELECT username FROM Users WHERE username = ? AND password = SHA2(?,256);`;
          console.log('check current pw');
          connection.query(query, [usernameCurrent, userCurrentPass], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
              res.sendStatus(500);
              return;
            }
            if(rows.length > 0){
              console.log('current pw was correct');
            } else {
                res.sendStatus(401);
            }
          });
      });

      // Update new password
      req.pool.getConnection( function(err,connection) {
          if (err) {
            res.sendStatus(500);
            return;
          }
          var query = "UPDATE Users SET password = SHA2(?,256) WHERE username = ? AND password = SHA2(?,256);";
          console.log('queried');
          connection.query(query, [passUpdator, usernameCurrent, userCurrentPass], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
              res.sendStatus(500);
              return;
            }
            res.end();
          });
      });

    } else {
        res.sendStatus(400);
    }

});

/* Get Users Info */
router.get('/usersinfo', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT DISTINCT Users.id, Users.first_name, Users.last_name, Users.email, Users.contact_number, Users.DOB, Hotspot.yes_col FROM Users INNER JOIN Hotspot INNER JOIN Business INNER JOIN UserCheckIn ON Users.id=UserCheckIn.users_id AND UserCheckIn.business_id=Business.id AND Business.zip=Hotspot.zip OR Users.zip=Hotspot.zip;';
        connection.query(query, function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});

/* Get Restriction Info */
router.get('/restrictioninfo', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT DISTINCT restrictions AS resbool FROM Restriction;';
        connection.query(query, function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});

/* Restrict Capacities */
router.post('/restrictcapacities', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business INNER JOIN Restriction SET Business.capacity = ROUND(0.1*venue_size,-1), Restriction.restrictions = 'Yes';";
        console.log('queried');
        connection.query(query, function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Lift Restrictions */
router.post('/liftrestrictions', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business INNER JOIN Restriction SET Business.capacity = ROUND(0.5*venue_size,-1), Restriction.restrictions = 'No';";
        console.log('queried');
        connection.query(query, function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Email Subscribe */
router.post('/emailsubscribe', function(req, res, next) {
    console.log('user update');
    usernameCurrent = req.session.idname;

    // Check if already subscribed
    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = `SELECT email_sub FROM Users WHERE username = ? AND email_sub = 'Yes';`;
        console.log('check sub');
        connection.query(query, [usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          if(rows.length > 0){
            console.log('user was already subbed');
            res.sendStatus(406);
          } else if (rows.length <= 0){
              console.log('user was previously unsubbed');
          } else {
              res.sendStatus(401);
          }
        });
    });

    // Subscribe
    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET email_sub = 'Yes' WHERE username = ?;";
        console.log('queried');
        connection.query(query, [usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Email Unsubscribe */
router.post('/emailunsub', function(req, res, next) {
    console.log('user update');
    usernameCurrent = req.session.idname;

    // Check if already unsubscribed
    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = `SELECT email_sub FROM Users WHERE username = ? AND email_sub = 'No';`;
        console.log('check sub');
        connection.query(query, [usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          if(rows.length > 0){
            console.log('user was already unsubbed');
            res.sendStatus(406);
          } else if (rows.length <= 0){
              console.log('user was previously subbed');
          } else {
              res.sendStatus(401);
          }
        });
    });

    // Unsubscribe
    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Users SET email_sub = 'No' WHERE username = ?;";
        console.log('queried');
        connection.query(query, [usernameCurrent], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

module.exports = router;

