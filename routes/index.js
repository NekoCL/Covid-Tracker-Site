var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var QRCode = require('qrcode');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//google signin
const CLIENT_ID = '341339043890-4rr3gtr98gbja66hapco57gc0qhao9hc.apps.googleusercontent.com'

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// router.use('/*', function(req, res, next) {
//   if(!req.session.isAuthenticated) {
//     res.redirect('/');
//   }
//   next();
// });

/* INSERT User Info user-signup */
router.post('/usersignup', function(req, res, next) {
    console.log('signup post');
    userName = req.body.username;
    eMail = req.body.email;
    firstName = req.body.first_name;
    lastName = req.body.last_name;
    addRess = req.body.address;
    ziP = req.body.zip;
    doB = req.body.dob;
    numBer = req.body.number;
    passWord = req.body.password;
    emailNotif = req.body.email_notif;

    if (emailNotif != 'Yes') {
      emailNotif = 'No';
    }

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO Users (username, email, first_name, last_name, address, zip, DOB, contact_number, password, email_sub) VALUES (?, ?, ?, ?, ?, ?, ?, ?, SHA2(?,256), ?)";
        console.log('queried');
        connection.query(query, [userName, eMail, firstName, lastName, addRess, ziP, doB, numBer, passWord, emailNotif], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* INSERT Owner Info Owner-signup */
router.post('/ownersignup', function(req, res, next) {
    console.log('signup post');
    userName_o = req.body.usernameOwn;
    eMail_o = req.body.emailOwn;
    firstName_o = req.body.first_nameOwn;
    lastName_o = req.body.last_nameOwn;
    addRess_o = req.body.addressOwn;
    ziP_o = req.body.zipOwn;
    doB_o = req.body.dobOwn;
    numBer_o = req.body.numberOwn;
    passWord_o = req.body.passwordOwn;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO Owners (username, email, first_name, last_name, address, zip, DOB, contact_number, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, SHA2(?,256))";
        console.log('queried');
        connection.query(query, [userName_o, eMail_o, firstName_o, lastName_o, addRess_o, ziP_o, doB_o, numBer_o, passWord_o], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* INSERT Admin Info Create Admin */
router.post('/adminsignup', function(req, res, next) {
    console.log('signup post');
    userName_a = req.body.usernameAdm;
    eMail_a = req.body.emailAdm;
    firstName_a = req.body.first_nameAdm;
    lastName_a = req.body.last_nameAdm;
    passWord_a = req.body.passwordAdm;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO Admins (admin_username, email, first_name, last_name, password) VALUES (?, ?, ?, ?, SHA2(?,256))";
        console.log('queried');
        connection.query(query, [userName_a, eMail_a, firstName_a, lastName_a, passWord_a], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

router.post('/userlogin', function(req, res, next) {
    console.log('post user');

     if( 'user' in req.body &&
        'pass' in req.body) {

        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = `SELECT id,first_name,last_name,username,email
                            FROM Users WHERE username = ? AND password = SHA2(?,256);`;
            connection.query(query,[
                req.body.user,
                req.body.pass
                ], function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(rows.length > 0){
                  req.session.user = rows[0];
                  req.session.individual = true;
                  req.session.isAuthenticated = true;
                  req.session.idname = req.body.user;
                  console.log('idname: ' +req.session.idname);
                  console.log('user session');
                  res.json(rows[0]);
              } else {
                  res.sendStatus(401);
              }
            });
        });

    } else if( 'token' in req.body) {
        console.log('google user');
        async function verify() {
            const ticket = await client.verifyIdToken({
              idToken: req.body.token,
              audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
              // Or, if multiple clients access the backend:
              //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            req.session.isAuthenticated = true;
            req.session.individual = true;

            //database match
            // req.pool.getConnection( function(err,connection) {
            //     if (err) {
            //         console.log(err);
            //         res.sendStatus(500);
            //         return;
            //     }
            //     var query = `SELECT u_id,given_name,family_name,username,email
            //                     FROM Users WHERE email = ?;`;
            //     connection.query(query,[payload['email']], function(err, rows, fields) {
            //       connection.release(); // release connection
            //       if (err) {
            //         console.log(err);
            //         res.sendStatus(500);
            //         return;
            //       }
            //       if(rows.length > 0){
            //           req.session.user = rows[0];
            //           res.json(rows[0]);
            //       } else {
            //           res.sendStatus(401);
            //       }
            //     });
            // });
            //req.session.user = payload['email'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            res.send();
            }
            verify().catch(console.error);
    }

    else {
        res.sendStatus(400);
    }

});



/* passport
passport.serializeUser(function(logintest, done) {
  done(null, logintest);
});

passport.deserializeUser(function(logintest, done) {
  done(null, logintest);
});

function authenticationMiddleware () {
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/index.html')
	}
}*/

router.post('/ownerlogin', function(req, res, next) {

     if( 'user' in req.body &&
        'pass' in req.body) {

        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = `SELECT id,first_name,last_name,username,email
                            FROM Owners WHERE username = ? AND password = SHA2(?,256);`;
            connection.query(query,[
                req.body.user,
                req.body.pass
                ], function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(rows.length > 0){
                  req.session.user = rows[0];
                  req.session.owner = true;
                  req.session.ownername = req.body.user;
                  req.session.isAuthenticated = true;
                  console.log('ownername: ' +req.session.ownername);
                  console.log('owner session');
                  res.json(rows[0]);
              } else {
                  res.sendStatus(401);
              }
            });
        });

    } else if( 'token' in req.body) {
        console.log('google user');
        async function verify() {
            const ticket = await client.verifyIdToken({
              idToken: req.body.token,
              audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
              // Or, if multiple clients access the backend:
              //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();

            //database match
            // req.pool.getConnection( function(err,connection) {
            //     if (err) {
            //         console.log(err);
            //         res.sendStatus(500);
            //         return;
            //     }
            //     var query = `SELECT u_id,given_name,family_name,username,email
            //                     FROM Users WHERE email = ?;`;
            //     connection.query(query,[payload['email']], function(err, rows, fields) {
            //       connection.release(); // release connection
            //       if (err) {
            //         console.log(err);
            //         res.sendStatus(500);
            //         return;
            //       }
            //       if(rows.length > 0){
            //           req.session.user = rows[0];
            //           res.json(rows[0]);
            //       } else {
            //           res.sendStatus(401);
            //       }
            //     });
            // });
            //req.session.user = payload['email'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            req.session.isAuthenticated = true;
            res.send();
            }
            verify().catch(console.error);
    }

    else {
        res.sendStatus(400);
    }

});
// temporarily diabled the middleware to that prevents login functions
// router.use(function(req, res, next) {
//     if(!req.session.idname) {
//         res.redirect('/index.html');
//     } else {
//         next();
//     }
// });

router.post('/adminlogin', function(req, res, next) {

     if( 'user' in req.body &&
        'pass' in req.body) {

        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = `SELECT id,first_name,last_name,admin_username,email
                            FROM Admins WHERE admin_username = ? AND password = SHA2(?,256);`;
            connection.query(query,[
                req.body.user,
                req.body.pass
                ], function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(rows.length > 0){
                  req.session.user = rows[0];
                  req.session.admin = true;
                  req.session.isAuthenticated = true;
                  console.log('admin session');
                  res.json(rows[0]);
              } else {
                  res.sendStatus(401);
              }
            });
        });

    } else {
        res.sendStatus(400);
    }

});


router.post('/logout', function(req, res, next) {
    req.session.isAuthenticated = false;
    delete req.session.user;
    if (req.session.individual) {
        delete req.session.individual;
    }
    if (req.session.owner) {
        delete req.session.owner;
    }
    if (req.session.admin) {
        delete req.session.admin;
    }
    res.send();
});

/* get Total hotspot count */
router.get('/totalhotspot', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT COUNT(DISTINCT zip) AS totalspot FROM Hotspot';
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

/* get Hotspots for User */
router.get('/getuserhotspot', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT zip AS hotspotzips FROM Hotspot';
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

/* Add Hotspot */
router.post('/addhotspot', function(req, res, next) {
    console.log('add hotspot');
    hotSpot = req.body.hotspotu;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO Hotspot (zip, yes_col) VALUES (?, 'Yes')";
        console.log('queried');
        connection.query(query, [hotSpot], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Remove Hotspot */
router.post('/removehotspot', function(req, res, next) {
    console.log('remove hotspot');
    hotSpotR = req.body.hotspotr;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "DELETE FROM Hotspot WHERE zip = ?";
        console.log('queried');
        connection.query(query, [hotSpotR], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* User Check In Get
router.get('/usercheckin', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT users_id AS u_id FROM Users';
        connection.query(query, function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});*/

/* User Check In Post
router.post('/usercheckin', function(req, res, next) {
    console.log('user check in');
    checkIn = req.body.checkin;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO UserCheckIn (,date_time,) VALUES (?,NOW(),)";
        console.log('queried');
        connection.query(query, [checkIn], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});*/

/* get Total checkin count */
router.get('/totalcheckin', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT COUNT(DISTINCT date_time) AS totalcheck FROM UserCheckIn';
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

/* get Total venue count */
router.get('/totalvenues', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT COUNT(DISTINCT id) AS totalvenue FROM Business;';
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


/* get UserInfo */
router.get('/userinfo', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT id AS saveID FROM Users WHERE username = ?;';
        connection.query(query,[req.session.idname], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});

/* User Check In Post */
router.post('/checkinUser', function(req, res, next) {
    console.log('user check in');
    userID = req.body.hold;
    console.log('userID '+userID);

    usernameCheck = req.session.idname;
    console.log('usernameCheck '+usernameCheck);

    businessCode = req.body.business_code;
    console.log('businessCode '+businessCode);

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO UserCheckIn (users_id, date_time, business_id) SELECT Users.id, CURRENT_TIMESTAMP, Business.id FROM Users INNER JOIN Business WHERE Users.username = ? AND Business.business_code = ?";
        console.log('queried');
        connection.query(query, [usernameCheck,businessCode], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

// Read the image and create a buffer
// (Here image.png is our QR code)
router.get('/QR', function(req, res, next) {
    var fs = require('fs');
    var Jimp = require("jimp");
    var QrCode = require('qrcode-reader');
    var buffer = fs.readFileSync('./public/images/QR_test.png', 'utf8');

    // Parse the image using Jimp.read() method
    Jimp.read(buffer, function(err, image) {
      if (err) {
        console.error(err);
      }
      // Creating an instance of qrcode-reader module
      let qrcode = new qrCode();
      qrcode.callback = function(err, value) {
        if (err) {
            console.error(err);
        }
        // Printing the decrypted value
        console.log(value.result);
      };
      // Decoding the QR code
      qrcode.decode(image.bitmap);
    });

});


/* Get User CheckIn history */
router.get('/userhistory', function(req, res, next) {
    usernameHist = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        /*var query = 'SELECT UserCheckIn.users_id, UserCheckIn.date_time, UserCheckIn.business_id FROM UserCheckIn INNER JOIN Users ON UserCheckIn.users_id=Users.id WHERE Users.username=?';*/
        /*var query = 'SELECT date_time, Business.address FROM UserCheckIn INNER JOIN Users INNER JOIN Business ON UserCheckIn.users_id=Users.id AND UserCheckIn.business_id=Business.id WHERE Users.username=?;';*/
        var query = 'SELECT date_time, Business.address, Hotspot.yes_col FROM UserCheckIn INNER JOIN Users INNER JOIN (Business LEFT JOIN Hotspot ON Business.zip=Hotspot.zip) ON UserCheckIn.users_id=Users.id AND UserCheckIn.business_id=Business.id WHERE Users.username=?;';
        connection.query(query, [usernameHist],function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});

/* get User Name */
router.get("/get_User", function(req, res, next) {
    userGreet = req.session.idname;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT first_name, last_name FROM Users WHERE username = ?';
        connection.query(query, [userGreet], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});

/* get Business Table */
router.get("/getBizTable", function(req, res, next) {
    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT name, business_code FROM Business';
        connection.query(query, [userGreet], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});

/* get Owner Name */
router.get('/getOwner', function(req, res, next) {
    ownerBiz = req.session.ownername;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT first_name, last_name FROM Owners WHERE username = ?';
        connection.query(query, [ownerBiz], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});


/* get Business card */
router.get('/startownerpage', function(req, res, next) {
    ownerBiz = req.session.ownername;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT Business.name, Business.venue_size AS b_size, Business.business_type AS b_type, Business.business_code AS b_code, Business.capacity AS b_cap FROM Business INNER JOIN Owners ON Business.owner_id = Owners.id WHERE Owners.username = ? AND Business.flag = 1;';
        connection.query(query, [ownerBiz], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(rows); //send response
        });
    });

});

/* Edit business 1 */
router.post('/editbusiness1', function(req, res, next) {
    console.log('edit business');

    editName = req.body.rename;
    editSize = req.body.resize;
    editType = req.body.retype;
    holderName = req.body.oldname;
    ownBiz = req.session.ownername;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business INNER JOIN Owners ON Business.owner_id = Owners.id SET Business.name = ?, Business.venue_size = ?, Business.business_type = ? WHERE Owners.username = ? AND Business.name = ?";
        console.log('queried');
        connection.query(query, [editName, editSize, editType, ownBiz, holderName], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Edit business 2 */
router.post('/editbusiness2', function(req, res, next) {
    console.log('edit business 2');

    editName2 = req.body.rename2;
    editSize2 = req.body.resize2;
    editType2 = req.body.retype2;
    holderName2 = req.body.oldname2;
    ownBiz = req.session.ownername;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business INNER JOIN Owners ON Business.owner_id = Owners.id SET Business.name = ?, Business.venue_size = ?, Business.business_type = ? WHERE Owners.username = ? AND Business.name = ?";
        console.log('queried');
        connection.query(query, [editName2, editSize2, editType2, ownBiz, holderName2], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Edit business 3 */
router.post('/editbusiness3', function(req, res, next) {
    console.log('edit business 3');

    editName3 = req.body.rename3;
    editSize3 = req.body.resize3;
    editType3 = req.body.retype3;
    holderName3 = req.body.oldname3;
    ownBiz = req.session.ownername;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business INNER JOIN Owners ON Business.owner_id = Owners.id SET Business.name = ?, Business.venue_size = ?, Business.business_type = ? WHERE Owners.username = ? AND Business.name = ?";
        console.log('queried');
        connection.query(query, [editName3, editSize3, editType3, ownBiz, holderName3], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Add Business */
router.post('/newbusiness', function(req, res, next) {
    console.log('add biz post');
    bizName = req.body.bus_name;
    bizSize = req.body.bus_size;
    bizType = req.body.bus_type;
    bizNum = req.body.bus_num;
    bizAdd = req.body.bus_add;
    bizZip = req.body.bus_zip;
    bizCode = req.body.bus_code;

    ownBiz = req.session.ownername;


    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO Business (name, venue_size, business_type, business_number, address, zip, business_code, flag, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, 1, (SELECT id FROM Owners WHERE Owners.username = ?));";
        console.log('queried');
        connection.query(query, [bizName, bizSize, bizType, bizNum, bizAdd, bizZip, bizCode, ownBiz], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Remove Business 1 */
router.post('/removebiz1', function(req, res, next) {
    console.log('remove biz 1');
    removal_n1 = req.body.remove_bus1;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business SET flag = 0 WHERE Business.name = ?;";
        console.log('queried');
        connection.query(query, [removal_n1], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Remove Business 2 */
router.post('/removebiz2', function(req, res, next) {
    console.log('remove biz 2');
    removal_n2 = req.body.remove_bus2;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business SET flag = 0 WHERE Business.name = ?;";
        console.log('queried');
        connection.query(query, [removal_n2], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

/* Remove Business 3 */
router.post('/removebiz3', function(req, res, next) {
    console.log('remove biz 3');
    removal_n3 = req.body.remove_bus3;

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "UPDATE Business SET flag = 0 WHERE Business.name = ?;";
        console.log('queried');
        connection.query(query, [removal_n3], function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.end();
        });
    });

});

//owner routes

/*router.get('/startownerpage', function(req, res, next ){
    console.log('check if there is existing business');

    let biz = business_table[i];
    //pseudo code
    //if business in database for this particular owner
    //res.send rendered html of the card-box
    //else render a template box
    var business_info = `
            <h5 class="card-title">${biz.name}</h5>
            <p class="card-text">Business Type: ${biz.business_type}</p>
            <p class="card-text">Venue Size: ${biz.venue_size}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <button class="btn btn-info" id="owner-button">
      			Edit Business
  		      </button>`
    res.send(business_info);
}); */

/*router.use(function(req, res, next) {
    if(!req.session.user) {
        res.redirect('/index.html');
    } else {
        next();
    }
});*/

router.get('/getsubbed', function(req, res, next) {

    req.pool.getConnection( function(err,connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        // Querying only email subbed users that have been exposed to a hotspot
        var query = "SELECT DISTINCT Users.email FROM UserCheckIn INNER JOIN Users INNER JOIN (Business LEFT JOIN Hotspot ON Business.zip=Hotspot.zip) ON UserCheckIn.users_id=Users.id AND UserCheckIn.business_id=Business.id WHERE Users.email_sub = 'Yes';"
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

router.post('/emailusers', function(req, res, next) {
  console.log('email users');

  var emailHiddenSubs = req.body.email_subs_arr;
  console.log(emailHiddenSubs);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
    auth: {
      user: 'edbenchn@gmail.com',
      pass: 'edbenchn123'
    },
  });


  var message = {
    from: 'edbenchn@gmail.com',
    to: emailHiddenSubs,
    subject: 'Hotspot exposure',
    text: 'This is a message from Covid Tracker app. Our data shows that you have been exposed to a hotspot. Please go get tested immediately and self isolate.'
    };


  transporter.sendMail(message, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent. ' + info.response);
    }
  });
});


router.post('/qr_biz', function(req, res, next) {

  //get the document
  var use_this = req.body.render_code;

  QRCode.toDataURL(use_this, function (err, url) {
  console.log(url)
  var startstring = '<img src="';
  var midstring = url;
  var endstring = '"/>'

  res.send(startstring + midstring + endstring);
})
});

router.post('/qr_biz2', function(req, res, next) {

  //get the document
  var use_this2 = req.body.render_code2;

  QRCode.toDataURL(use_this2, function (err, url) {
  console.log(url)
  var startstring = '<img src="';
  var midstring = url;
  var endstring = '"/>'

  res.send(startstring + midstring + endstring);
})
});

router.post('/qr_biz3', function(req, res, next) {

  //get the document
  var use_this3 = req.body.render_code3;

  QRCode.toDataURL(use_this3, function (err, url) {
  console.log(url)
  var startstring = '<img src="';
  var midstring = url;
  var endstring = '"/>'

  res.send(startstring + midstring + endstring);
})
});


module.exports = router;
