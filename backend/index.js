const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SignupModel = require('./Schemas/Signup');
const CreatepostModel = require('./Schemas/Createpost');
const jwt = require('jsonwebtoken');
const requireLogin = require('./middlewares/requireLogin');


const app = express();
app.use(cors());
app.use(express.json());

const Jwt_secret = 'jafgjsgjgvsvh';
mongoose.connect('mongodb://127.0.0.1:27017/Instagram');

app.listen(3001, () => {
    console.log('Server is running ')
})



//  CODE TO SIGNUP NEW USER........................................................
app.post('/signup', async (req, res) => {

    try {
      const { email, fullname, username,  password } = req.body;
      const hash = await bcrypt.hash(password, 10);
  
      const user = await SignupModel.findOne({ email:email });
      const profilename = await SignupModel.findOne({ username:username });
  
      if (user) {
        res.status(400).json({ message: 'email already exists' });
      } 
      else if(profilename){
        res.status(400).json({ message: 'username already exists' });
      }

      else {
        const result = await SignupModel.create({ email, fullname, username, password: hash });
        res.json({ message: 'Account created' });
      }
      
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // CODE TO LOGIN USER AND GET JWT TOKEN............................
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await SignupModel.findOne({ email: email });
  
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          const token = jwt.sign({ _id: user.id }, Jwt_secret);
          const { _id, fullname, email, username} = user

          res.status(200).json({ status: 'success', message: 'Login successful',  token, user: { _id, username, email, fullname }  });
        } else {
          res.status(401).json({ status: 'error', message: 'Password is incorrect' });
        }
      } else {
        res.status(401).json({ status: 'error', message: 'No record existed' });
      }
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });



  // CODE TO LOGIN WITH GOOGLE ...............................
  app.post('/googleLogin', (req, res) => {
    const { email_verified, email, fullname, clientId, username, picture } = req.body;
    if (email_verified) {
        SignupModel.findOne({ email: email }).then((savedUser) => {
            if (savedUser) {
                const token = jwt.sign({ _id: savedUser._id }, Jwt_secret);
                const { _id, fullname, email, username } = savedUser;
                SignupModel.findByIdAndUpdate(savedUser._id, {
                    $set: { profilephoto: picture }
                }, {
                    new: true
                }).then(() => {
                    res.json({ token, user: { _id, fullname, email, username } });
                    console.log({ token, user: { _id, fullname, email, username } });
                }).catch(err => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                });
            } else {
                const password = email + clientId;
                const user = new SignupModel({
                    fullname,
                    email,
                    username,
                    password,
                    profilephoto: picture
                });
                user.save().then(user => {
                    let userId = user._id.toString();
                    const token = jwt.sign({ _id: userId }, Jwt_secret);
                    const { _id, fullname, email, username } = user;
                    res.json({ token, user: { _id, fullname, email, username } });
                    console.log({ token, user: { _id, fullname, email, username } });
                }).catch(err => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                });
            }
        }).catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
    }
});



  //  CODE TO CREATE POST ONLY IF THE USER IS LOGGED IN .........................
    app.post('/createpost', requireLogin, async (req, res) => {
      try {
        const { title, image, location, timestamp } = req.body;
    
        if (!image) {
          return res.status(422).json({
            error: "Please select an image"
          });
        }
    
        const post = new CreatepostModel({
          title: title !== undefined ? title : null,
          location: location !== undefined ? location : null,
          image: image,
          timestamp,
          postedBy: req.user
        });
    
        const result = await post.save();
        return res.json({ post: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
    

  // CODE TO SHOW ALL POSTS TO HOME PAGE ..................
  app.get('/allposts', requireLogin, async (req, res) => {
    try {
      const posts = await CreatepostModel.find()
      .populate('postedBy', '_id username profilephoto')
      .populate('comments.postedBy', '_id username')
      .sort('-createdAt')
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });




  //CODE TO SEARCH USER........
  app.get('/searchUser', requireLogin, async (req, res) => {
    const search = req.query.search || ''
    const query = {
      username: {$regex: search,$options:'i'}
    }
    try {
      const posts = await SignupModel.find(query)
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });




  // CODE TO SHOW USERS POSTS ON HIS PROFILE PAGE.....................
  app.get('/myposts', requireLogin, async (req, res) => {
    try {
      const myposts = await CreatepostModel.find({ postedBy: req.user._id })
        .populate('postedBy', '_id username')
        .populate('comments.postedBy', '_id username')
        .sort('-createdAt')
      res.json(myposts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // CODE TO LIKE POST .............................
  app.put('/like',requireLogin, (req,res)=>{
    CreatepostModel.findByIdAndUpdate(req.body.postId,{
      $push:{likes:req.user._id}
    },{
      new:true
    }).then((err,result)=>{
      if(err){
        return res.status(401).json({error:err})
      }else{
        res.json(result)
      }
    })
  })


   // CODE TO UNLIKE POST .............................
   app.put('/unlike',requireLogin, (req,res)=>{
    CreatepostModel.findByIdAndUpdate(req.body.postId,{
      $pull: {likes:req.user._id}
    },{
      new:true
    }).then((err,result)=>{
      if(err){
        return res.status(401).json({error:err})
      }else{
        res.json(result)
      }
    })
  })


  // CODE TO ADD A COMMENT....................................
  app.put('/comment',requireLogin, (req,res)=>{
    const comment={
      comment: req.body.text,
      postedBy: req.user._id
    }
    CreatepostModel.findByIdAndUpdate(req.body.postId,{
      $push:{comments:comment}
    },{
      new:true
    })
    .populate('comments.postedBy','_id username')
    .populate('postedBy','_id username')
    .then((err,result)=>{
      if(err){
        return res.status(401).json({error:err})
      }else{
        res.json(result)
      }
    })
  })


  // CODE TO DELETE POST...............................
  app.delete('/deletepost/:postId', requireLogin, (req, res) => {
    CreatepostModel.findOne({ _id: req.params.postId, postedBy: req.user._id })
      .then(post => {
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        post.deleteOne()
          .then(result => {
            return res.json({ message: 'Successfully deleted' });
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
      });
  });
  

  // CODE TO VIEW OTHER USERS PROFILE..........................
  app.get('/user/:id',requireLogin, async (req, res) => {
    try {
      const user = await SignupModel.findOne({ _id: req.params.id }).select('-password');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const posts = await CreatepostModel.find({ postedBy: req.params.id })
        .populate('postedBy', '_id')
        .sort('-createdAt')
  
      res.status(200).json({ user, posts });
    } catch (error) {
      console.log('Error retrieving user and posts', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  // CODE TO FOLLOW USER................................
  app.put('/follow', requireLogin, async (req, res) => {
    try {
      const userData = req.user; // Assuming req.user contains the logged-in user's data
  
      const updatedSignup = await SignupModel.findByIdAndUpdate(req.body.followId, {
        $push: { followers: userData._id }
      }, {
        new: true
      });
  
      if (!updatedSignup) {
        return res.status(404).json({ error: "User not found" });
      }
  
      await SignupModel.findByIdAndUpdate(userData._id, {
        $push: { following: req.body.followId }
      }, {
        new: true
      });
  
      return res.json(updatedSignup);
    } catch (error) {
      return res.status(401).json({
        error: 'Invalid token, you must be logged in'
      });
    }
  });
  

    // CODE TO UNFOLLOW USER................................
    app.put('/unfollow', requireLogin, async (req, res) => {
      try {
        const userData = req.user;
    
        const updatedSignup = await SignupModel.findByIdAndUpdate(req.body.followId, {
          $pull: { followers: userData._id }
        }, {
          new: true
        });
    
        if (!updatedSignup) {
          return res.status(404).json({ error: "User not found" });
        }
    
        await SignupModel.findByIdAndUpdate(userData._id, {
          $pull: { following: req.body.followId }
        }, {
          new: true
        });
    
        return res.json(updatedSignup);
      } catch (error) {
        return res.status(401).json({
          error: 'Invalid token, you must be logged in'
        });
      }
    });


    // CODE TO VIEW ONLY THOSE USERS POSTS WHICH WE ARE FOLLOWING.................
    app.get('/myfollowingpost', requireLogin, (req,res) => {
      CreatepostModel.find({ postedBy: { $in: req.user.following } })
      .populate('postedBy', '_id username profilephoto')
      .populate('comments.postedBy', '_id username')
      .sort('-createdAt')
      .then(posts => {
        res.json(posts)
      })
      .catch(err => { console.log(err) })
    })


    // CODE TO UPLOAD PROFILE PIC....................................
    app.put('/uploadprofilepic', requireLogin, (req,res) => {
      SignupModel.findByIdAndUpdate(req.user._id,{
        $set:{profilephoto:req.body.image}
      },{
        new:true
      }).then((err,result) => {
        if(err){
          return res.status(422).json({error:err})
        }else{
          res.json(result)
        }
      })
    })


  // CODE TO REMOVE PROFILE PIC....................................
        app.put('/removeprofilepic', requireLogin, (req,res) => {
          SignupModel.findByIdAndUpdate(req.user._id,{
            $set:{profilephoto:req.body.image}
          },{
            new:true
          }).then((err,result) => {
            if(err){
              return res.status(422).json({error:err})
            }else{
              res.json(result)
            }
          })
        })



    



  
  
  


