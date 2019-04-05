const router = require('express').Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const secret = "Is it secret?"
const Users = require('../users/userDb');


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10 );
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  

  router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
        
          res.status(200).json({ message: `Welcome ${user.username}!`, token, });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  // router.get('/api/logout', (req, res, next) => {
   
   
  //   {
  //       if(err){
  //         res.send('Im afraid you will not be leaving')
  //       } else {
  //         res.send('ba bye')
  //       }
  //     })
  //       }
  //       else {
  //         res.end()
  //       }
  // })
  
  function generateToken(user){
  
    const payload = {
      subject: user.id,
      username: user.username,
    }
  
    const options = {
      expiresIn: '1d',
    }
  
    return jwt.sign(payload, secret, options)
  }

  // function only(username) {
  //   return function (req, res, next) {
  //     if(req.headers.username === username){
  //       next();
  //     } else {
  //       res.status(403).json({ message: `you not ${username}` })
  //     }
  //   };
  // }
  
  // function restricted(req, res, next) {
  
  //   if(req.session && req.session.username){
  //     next();
  //   } else {
  //     res.status(401).json({ message: 'you shall not..... PASSSSSSSSS!'})
  //   }
  // }
  
  
  
    module.exports = router;