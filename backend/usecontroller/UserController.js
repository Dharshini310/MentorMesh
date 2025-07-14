const { hash, compare } = require('bcrypt');
const {UserModel,intExp} = require('../Login')
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