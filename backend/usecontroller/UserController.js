const { hash, compare } = require('bcrypt');
const {UserModel,intExp} = require('../Model')
const mongoose = require('mongoose');
// Signup
exports.addUser = async (req, res) => {
  const { email, password, confirm_password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await hash(password, 12);
    const newUser = new UserModel({ email, password: hashedPassword, interview: [] });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Signup Error:", err.message); 
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


// Login
exports.addLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
//Add Experience
exports.addInterviewExp = async(req,res) => {
    const {email,
        companyName,
        role,
        year,
        lpa,
        interviewExperience,
        tips,
        url,
        qaList} = req.body;
    try {
        const user = await  UserModel.findOne({email});
        if(!user) {
            return res.status(404).json({msg : 'user not found'});
        }

        const newInterview = {
        companyName,
        role,
        year,
        lpa,
        interviewExperience,
        tips,
        url,
        qaList
        };
        user.interview.push(newInterview);
        await user.save();
        res.status(201).json({msg : 'Interview Added'});
    } catch (error) {
         res.status(500).json({msg : 'Error'})
    }
};

//get Data

exports.getData = async (req, res) => {
  try {
    const data = await UserModel.find({}, 'email interview');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'error', error: error.message });
  }
};

// likes count 

exports.likes = async (req, res) => {
  const { email: likingEmail, interviewId } = req.body;

  try {
    const user = await UserModel.findOne({ 'interview._id': interviewId });

    if (!user) {
      return res.status(404).json({ error: "User or interview not found" });
    }

    const interview = user.interview.id(interviewId);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    if (!interview.likes) {
      interview.likes = { count: 0, users: [] };
    }

    const alreadyLiked = interview.likes.users.includes(likingEmail);

    if (alreadyLiked) {
      interview.likes.users.pull(likingEmail);
      interview.likes.count -= 1;
    } else {
      interview.likes.users.push(likingEmail);
      interview.likes.count += 1;
    }

    await user.save();
    return res.status(200).json({ liked: !alreadyLiked, count: interview.likes.count });

  } catch (err) {
    console.error("Like error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


// save data

exports.save = async (req, res) => {
  const { email: savingEmail, interviewId } = req.body;

  try {
    const user = await UserModel.findOne({ 'interview._id': interviewId });

    if (!user) {
      return res.status(404).json({ error: "User or interview not found" });
    }

    const interview = user.interview.id(interviewId);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    if (!interview.saves) {
      interview.saves = [];
    }

    const alreadySaved = interview.saves.includes(savingEmail);

    if (alreadySaved) {
      interview.saves.pull(savingEmail);
    } else {
      interview.saves.push(savingEmail);
    }

    await user.save();
    return res.status(200).json({ saved: !alreadySaved });

  } catch (err) {
    console.error("Save error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

//sorted data

exports.getSortedData = async (req, res) => {
  try {
    const data = await UserModel.find({}, 'email interview');
    const allInterviews = [];
    data.forEach(user => {
      user.interview.forEach(interview => {
        allInterviews.push({
          ...interview.toObject(),
          email: user.email,
          likeCount: interview.likes?.count || 0,
          saveCount: interview.saves?.length || 0
        });
      });
    });

    allInterviews.sort((a, b) => b.likeCount - a.likeCount);

    res.status(200).json(allInterviews);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};

// getUserDetails

exports.getUserDetails = async (req, res) => {
  const email = (req.query.email || "").trim();
  if (!email) return res.status(400).json({ msg: 'No email in query' })

  try {
    const userDetails = await UserModel.findOne({ email })
    if (!userDetails) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  }

  //add users
  
 exports.addUserData = async(req,res) => {
  const {email, name, role, phone, about, url, image} = req.body;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          role,
          phone,
          about,
          linkedin:url,
          image  
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in addUserData:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

//get user

exports.getUserDetails = async (req, res) => {
  const email = (req.query.email || "").trim();
  if (!email) return res.status(400).json({ msg: 'No email in query' })

  try {
    const userDetails = await UserModel.findOne({ email })
    if (!userDetails) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}