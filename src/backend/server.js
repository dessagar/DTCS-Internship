const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const OpenAI = require('openai');
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // for generating JWT tokens


// header('Access-Control-Allow-Origin : *');
// header('Access-Control-Allow-Origin : POST,GET,OPTIONS,PIT,DELETE');
// header('Access-Control-Allow-Origin : Content-Type, X-Auth-Token, Origin, Authorization');


const app = express();
const port=3000;
app.use(cors());


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const labelName = req.body.labelName || 'default'; // Default to 'default' if no labelName provided
    const uploadPath = path.join(__dirname, 'public', 'uploads', labelName);

    // Ensure the directory exists
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating directory', err);
        return cb(err);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with the original filename
  }
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Route to handle file uploads
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ filename: req.file.filename });
});
// File upload route
app.post('/upload-file', upload.single('file'), (req, res) => {
  // Access the uploaded file details
  const uploadedFile = req.file;
  // Do something with the file, e.g., respond with a success message
  res.status(200).json({ message: 'File uploaded successfully', filename: uploadedFile.originalname });
});
app.get('/preview/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/uploads', filename);
  res.sendFile(filePath);
});

// Array to store recently uploaded filenames
let recentlyUploadedFilenames = [];

// app.post('/upload-multiple-files', upload.array('files'), (req, res) => {
//   const files = req.files;
//   const fileNames = files.map(file => file.originalname);

//   console.log('Uploaded Files:', fileNames);

//   recentlyUploadedFilenames = fileNames;

//   res.status(200).json({ message: 'Data and files uploaded successfully', files: fileNames });
// });
// Route for handling file uploads
app.post('/upload-multiple-files', upload.array('files'), (req, res) => {
  const files = req.files;
  const fileNames = files.map(file => file.originalname);

  console.log('Uploaded Files:', fileNames);

  res.status(200).json({ message: 'Data and files uploaded successfully', files: fileNames });
});

// Route for getting recently uploaded filenames
// app.get('/recentlyUploadedFilenames', (req, res) => {
//   res.json(recentlyUploadedFilenames);
  
//   recentlyUploadedFilenames = [];
// });
// app.get('/datapreview/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, 'public/uploads', filename);
//   res.sendFile(filePath);
// });

// Endpoint to fetch recently uploaded filenames from the folder
app.get('/recentlyUploadedFilenames', (req, res) => {
  const labelName = req.query.labelName; // Assuming you pass labelName as a query parameter
  const uploadPath = path.join('public/uploads', labelName);

  console.log('Requested labelName:', labelName);
  console.log('Upload path:', uploadPath);

  // Read the contents of the folder
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      res.status(500).json({ message: 'Error reading folder' });
    } else {
      res.json(files); // Send the list of file names as a response
    }
  });
});
app.get('/api/subtopicform/:labelName/files', (req, res) => {
  const labelName = req.params.labelName; // Extract labelName from URL parameter
  const uploadPath = path.join(__dirname, 'public', 'uploads', labelName); // Construct the upload path

  // Check if the directory exists
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      res.status(500).json({ message: 'Error reading folder' });
    } else {
      // Send the list of file names as a response
      res.json(files);
    }
  });
});

// DELETE endpoint to delete a file
app.delete('/deleteFile', (req, res) => {
  const labelName = req.query.labelName;
  const fileName = req.query.fileName;

  // Ensure both labelName and fileName are provided
  if (!labelName || !fileName) {
    return res.status(400).json({ message: 'Both labelName and fileName are required.' });
  }

  // Construct the path to the file with labelName
  const filePathWithLabelName = path.join(__dirname, 'public/uploads', labelName, fileName);
  // Construct the path to the file without labelName
  const filePathWithoutLabelName = path.join(__dirname, 'public/uploads', fileName);

  // Check if the file exists in both paths and delete it
  deleteFileIfExists(filePathWithLabelName);
  deleteFileIfExists(filePathWithoutLabelName);

  res.status(200).json({ message: 'File deleted successfully.' });
});

// Function to delete a file if it exists
function deleteFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('File deleted:', filePath);
  }
}
// Endpoint to delete files from the folder
app.delete('/deleteFiles', (req, res) => {
  const labelName = req.query.labelName;
  const uploadPath = path.join(__dirname, 'public/uploads', labelName);

  console.log('Requested labelName:', labelName);
  console.log('Upload path:', uploadPath);

  // Check if the folder exists
  if (fs.existsSync(uploadPath)) {
    // Read the contents of the folder
    fs.readdir(uploadPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        res.status(500).json({ message: 'Error reading folder' });
      } else {
        // Loop through the files and delete each one
        files.forEach(file => {
          const filePath = path.join(uploadPath, file);
          fs.unlinkSync(filePath); // Delete the file
          console.log('Deleted file:', file);
        });

        // After deleting files, remove the folder itself
        fs.rm(uploadPath, { recursive: true, force: true }, (err) => {
          if (err) {
            console.error('Error deleting folder:', err);
            res.status(500).json({ message: 'Error deleting folder' });
          } else {
            console.log('Folder deleted successfully');
            res.status(200).json({ message: 'Files and folder deleted successfully' });
          }
        });
      }
    });
  } else {
    // Folder does not exist
    res.status(404).json({ message: 'Folder not found' });
  }
});
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true, // Allow cookies to be sent with the request
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const openai = new OpenAI({ apiKey: "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"});

app.post('/ask-openai', async (req, res) => {
  const { userQuery } = req.body;

  try {
    // Make a request to OpenAI API
    const openaiResponse = await openai.completions.create({
      model: "text-davinci-003",
      prompt: userQuery,
      max_tokens: 100,
    });

    const answer = openaiResponse.choices[0].text;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static('public')); 

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
 
//************************new code for database************************

// MongoDB connection
mongoose.connect('mongodb+srv://trainingapp111:VCot0hMvKkDwjDnv@cluster0.z8saabe.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect(process.env.mongodb_connect_str);

// Define question schema
const questionSchema = new mongoose.Schema({
  text: String,
  userName: String,
  timestamp: { type: Date, default: Date.now },
  answered: { type: Boolean, default: false },
  answers: [{
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

const Question = mongoose.model('Question', questionSchema);


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: 'employee',
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'admin',
  },
});

const User = mongoose.model('User', userSchema);


app.use(bodyParser.json());



// Question.find({}).then(questions => {
//   questions.forEach(question => {
//     // Convert each answer string to an object with 'text' property
//     const answers = question.answers.map(answer => ({ text: answer }));

//     // Update the question record with the new answers structure
//     question.answers = answers;
//     question.save().then(() => {
//       console.log('Record updated successfully');
//     }).catch(error => {
//       console.error('Error updating record:', error);
//     });
//   });
// }).catch(error => {
//   console.error('Error fetching questions:', error);
// });

app.post('/updatepassword', async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  if (!name || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Please fill out all fields' });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// Get all questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/questions', async (req, res) => {
  const question = new Question({
    text: req.body.text,
    userName: 'User' // Update with user information if available
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// app.post('/questions/:id/reply', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     question.answers.push(req.body.answer); // Add new answer to the array
//     question.answered = true;

//     await question.save();

//     res.status(200).json({ message: 'Answer added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/questions/:id/answers', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     res.json(question.answers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/questions/:id/answers', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     question.answers.push(req.body.answer);
//     await question.save();
//     res.json(question);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
//===================================================================================================================================
// app.post('/questions/:id/reply', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     // Push the new answer into the array of answers
//     question.answers.push(req.body.answer);
//     question.answered = true;

//     await question.save();

//     res.status(200).json({ message: 'Answer added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Post multiple answers to a question
// app.post('/questions/:id/answers', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     // Filter out existing answers
//     const newAnswers = req.body.answers.filter(newAnswer => !question.answers.includes(newAnswer));

//     // Push only new answers into the array of answers
//     question.answers.push(...newAnswers);
//     question.answered = true;

//     await question.save();

//     res.status(200).json({ message: 'Answers added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
//=========================================================================================================================================

app.post('/questions/:id/reply', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Push the new answer into the array of answers
    question.answers.push({ text: req.body.answer });
    question.answered = true;

    await question.save();

    res.status(200).json({ message: 'Answer added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post multiple answers to a question
app.post('/questions/:id/answers', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Filter out invalid answers (likely to be ObjectIDs)
    const validAnswers = req.body.answers.filter(answer => typeof answer === 'string');

    // Map new answers to objects with text and timestamp properties
    const newAnswers = validAnswers.map(answer => ({
      text: answer,
      timestamp: new Date() // Add timestamp for each answer
    }));

    // Push only new answers into the array of answers
    question.answers.push(...newAnswers);
    question.answered = true;

    await question.save();

    res.status(200).json({ message: 'Answers added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for handling user registration

// Routes setup
app.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Login route
// app.post('/login', async (req, res) => {
//   console.log('received login request..');
//   try {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = await User.findOne({ username });

    // Check if the user exists
    // if (!user) {
    //   console.log('user not found');
      // return res.status(401).json({ message: 'Invalid username or password' });
    // }

    // Compare the password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   console.log('invalid password');
      // return res.status(401).json({ message: 'Invalid username or password' });
    // }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id, username: user.username }, '905ff3a2d0202cdc929f98296190703bb1e7ad96a94e8645279f3819807672f7fcdd9b766f4baf82465d792e1bdfbc6490d2c0106f8378a0e20e2483f9ae38b2', {
    //   expiresIn: '1h', // token expires in 1 hour
    // });

//     res.status(200).json({ token, expiresIn: 3600, role: user.role });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
//=================================================================================================================================
async function rehashExistingPasswords() {
  try {
    // Fetch all users from the database
    const users = await User.find().maxTimeMS(50000);

    // Loop through users and rehash passwords
    // for (const user of users) {
    //   const hashedPassword = await bcrypt.hash(user.password, 10);
    //   user.password = hashedPassword;
    //   await user.save();
    // }

    const batchSize = 200; // Adjust based on your needs

for (let i = 0; i < users.length; i += batchSize) {
  const batch = users.slice(i, i + batchSize);
  await Promise.all(batch.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await user.save();
  }));
}

    console.log('Passwords rehashed successfully.');
  } catch (error) {
    console.error('Error rehashing passwords:', error);
  }
}

// Call the function to rehash existing passwords
rehashExistingPasswords();

//=====================================================================================================================================
//================================================new login code====================================================
app.post('/login', async (req, res) => {
  console.log('received login request..');
  try {
    const { username, password , role} = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      console.log('user not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    

    console.log('Entered password:', password);
console.log('Stored password:', user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('invalid password');
      
    }


    const token = jwt.sign({ userId: user._id, username: user.username }, '905ff3a2d0202cdc929f98296190703bb1e7ad96a94e8645279f3819807672f7fcdd9b766f4baf82465d792e1bdfbc6490d2c0106f8378a0e20e2483f9ae38b2', {
      expiresIn: '1h',
    });

    return res.status(200).json({ message: 'Login successful', token, expiresIn: 3600, role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// app.post('/login', async (req, res) => {
//   console.log('received login request..');
//   try {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = await User.findOne({ username });

//     // Check if the user exists
//     if (!user) {
//       console.log('user not found');
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Compare the entered password with the hashed password stored in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log('Invalid password');
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // If both username and password are valid, generate JWT token for the user
//     const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', {
//       expiresIn: '1h', // token expires in 1 hour
//     });

//     return res.status(200).json({ message: 'Login successful', token, expiresIn: 3600, role: user.role });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
//==========================================================================================================================================

// Add this to your server.js or relevant file
const slideSchema = new mongoose.Schema({
  labelname: String, // Add this line
  title: String,
  subtitle: String,
  description: String,
  image: String,
  externalVideos: [
    {
      videoTitle: String,
      videoDescription: String,
      youtubeUrl: String,
    },
  ],
  internalVideos: [
    {
      videoTitle: String,
      videoDescription: String,
      localVideoFile: String,
    },
  ],
  selectedModules: [String],
  timestamp: { type: Date, default: Date.now },
});
const SlideModel = mongoose.model('Slide', slideSchema);

app.post('/slides', async (req, res) => {
  const slideData = req.body;

  try {
    const newSlide = await SlideModel.create(slideData);
    res.status(201).json(newSlide);
  } catch (error) {
    console.error('Error adding slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route handler for retrieving all slides
app.get('/slides', async (req, res) => {
  try {
    const slides = await SlideModel.find();
    res.status(200).json(slides);
  } catch (error) {
    console.error('Error retrieving slides:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update the route handler for retrieving slides by module
app.get('/slides/module/:module', async (req, res) => {
  try {
    const module = req.params.module; // Get the module parameter from the URL path
    const slides = await SlideModel.find({ selectedModules: module }); // Update the field name here
    res.status(200).json(slides);
  } catch (error) {
    console.error('Error retrieving slides by module:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.put('/slides/:id', async (req, res) => {
  const slideId = req.params.id;
  const updatedSlideData = req.body;

  try {
    const updatedSlide = await SlideModel.findByIdAndUpdate(
      slideId,
      updatedSlideData,
      { new: true }
    );

    if (updatedSlide) {
      res.status(200).json(updatedSlide);
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    console.error('Error updating slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/slides/labelname/:labelname', async (req, res) => {
  try {
    const labelname = req.params.labelname;
    const slides = await SlideModel.find({ labelname: labelname });
    res.status(200).json(slides);
  } catch (error) {
    console.error('Error retrieving slides by labelname:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete a slide by ID
app.delete('/slides/:id', async (req, res) => {
  const slideId = req.params.id;

  try {
    // Use the findByIdAndDelete method to remove the slide by ID
    const deletedSlide = await SlideModel.findByIdAndDelete(slideId);

    if (deletedSlide) {
      res.status(204).send(); // Successfully deleted
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    console.error('Error deleting slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Update a slide by ID
app.put('/slides/:id', async (req, res) => {
  const slideId = req.params.id;
  const updatedSlideData = req.body;

  try {
    const updatedSlide = await SlideModel.findByIdAndUpdate(
      slideId,
      updatedSlideData,
      { new: true }
    );

    if (updatedSlide) {
      res.status(200).json(updatedSlide);
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    console.error('Error updating slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint for deleting an image
app.delete('/deleteImage/:filename', (req, res) => {
  const filename = req.params.filename;

  // Construct the path to the image file
  const imagePath = path.join(__dirname, 'public/uploads', filename);

  // Check if the image file exists
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found
      console.error('Error accessing image file:', err);
      return res.status(404).json({ message: 'Image not found.' });
    }

    // Delete the image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        // Error deleting the image file
        console.error('Error deleting image file:', err);
        return res.status(500).json({ message: 'Error deleting image file.', error: err });
      }

      // Image file deleted successfully
      console.log('Image file deleted:', filename);
      res.status(200).json({ message: 'Image file deleted successfully.' });
    });
  });
});


// Endpoint for uploading videos
app.post('/upload-video', upload.single('video'), (req, res) => {
  res.json({ filename: req.file.filename });
});

// Example endpoint for deleting videos
app.delete('/delete-video/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Construct the path to the video file
  const filePath = path.join(__dirname,  'public/uploads', filename);
  
  // Delete the video file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting video:', err);
      res.status(500).json({ message: 'Error deleting video.' });
    } else {
      console.log('Video deleted successfully:', filename);
      res.status(200).json({ message: 'Video deleted successfully.' });
    }
  });
});



const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: false, // Make it optional
  },
  chosenOption: {
    type: String,
    required: true,
  },
  textareaContent: {
    type: String,
    required: false, // Make it optional
  },
  // Add other fields as needed
});

const DataModel = mongoose.model('Data', dataSchema);


app.post('/submitData', async (req, res) => {
  try {
    const { name, eligibility, chosenOption, textareaContent } = req.body;

    const newData = new DataModel({
      name,
      eligibility,
      chosenOption,
      textareaContent,
      // Add other fields as needed
    });
// subject
    await newData.save();

    res.status(201).json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      console.error('Validation error:', errors);
      res.status(400).json({ success: false, errors });
    } else {
      console.error('Error saving data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});
// Add this route after the existing route for saving data
app.get('/getRecentData', async (req, res) => {
  try {
    const recentData = await DataModel.find().sort({ _id: -1 }).limit(1);

    res.status(200).json(recentData);
  } catch (error) {
    console.error('Error fetching recent data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/subjects', (req, res) => {
  const { chosenOption } = req.query;
  Subject.find({ chosenOption })
    .then(subjects => {
      res.json(subjects);
    })
    .catch(error => {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
// Inside your server.js or wherever your server-side code is
app.post('/deleteCard', (req, res) => {
    const { column, index } = req.body;

    // Assuming you have a mechanism to delete the card data from the database
    // Implement the logic to delete the card based on the column and index

    // Respond with success or an error
    res.status(200).json({ message: 'Card deleted successfully' });
});

//subjectform
const formDataSchema = new mongoose.Schema({
  labelName: String, // Change name to labelName
  group: String,
  description: String,
  isPublished: {
    type: Boolean,
    default: false
  }
});

const FormData = mongoose.model('FormData', formDataSchema);


app.post('/api/publish', async (req, res) => {
  const { labelName } = req.body;

  try {
    const formData = await FormData.findOneAndUpdate({ labelName }, { isPublished: true });
    if (formData) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: 'Record not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// Handle GET request to fetch data with optional isPublished filter
app.get('/api/formData', async (req, res) => {
  const { isPublished } = req.query;
  const filter = isPublished ? { isPublished: true } : {};

  try {
    const formData = await FormData.find(filter);
    res.json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

app.put('/api/formData/publish/:id', async (req, res) => {
  try {
    const updatedFormData = await FormData.findByIdAndUpdate(req.params.id, { isPublished: true }, { new: true });
    res.status(200).json(updatedFormData);
  } catch (error) {
    console.error('Error updating isPublished flag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//========================================================================================================
// Create FormData
// app.post('/subjectform', async (req, res) => {
//   try {
//       const { labelName, group, description } = req.body; 
//       const formData = new FormData({ labelName, group, description }); 
//       await formData.save();
//       res.status(201).send(formData);
//   } catch (error) {
//       res.status(400).send(error);
//   }
// });
//======================================================================================================
app.post('/subjectform', async (req, res) => {
  try {
    const { labelName, group, description } = req.body;

    // Check if a subject with the same name already exists
    const existingSubject = await FormData.findOne({ labelName });
    if (existingSubject) {
      return res.status(400).send({ error: 'Subject name already exists, Try with Other Subject Name.' });
    }

    const formData = new FormData({ labelName, group, description });
    await formData.save();
    res.status(201).send(formData);
  } catch (error) {
    res.status(400).send(error);
  }
});
//======================================================================================================

// Get all FormData
app.get('/subjectform', async (req, res) => {
  try {
      const formData = await FormData.find({});
      res.send(formData);
  } catch (error) {
      res.status(500).send(error);
  }
});
app.get('/subjectform/:labelName', async (req, res) => {
  try {
      const labelName = req.params.labelName;
      const subjectData = await FormData.findOne({ labelName }); // Assuming you're using Mongoose
      res.status(200).send(subjectData);
  } catch (error) {
      res.status(500).send(error);
  }
});

// app.delete('/api/subjectform/:id', async (req, res) => {
//   try {
//     await formData.findByIdAndDelete(req.params.id);
//     res.sendStatus(204); 
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500); 
//   }
// });
//===========================================================================================================

app.delete('/api/formData/:id', async (req, res) => {
  try {
    const deletedCard = await FormData.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).send('Card not found');
    }
    res.send(deletedCard);
  } catch (error) {
    res.status(500).send(error);
  }
});
//================================================================================================================

//for dropdown values
app.post('/api/subjects', async (req, res) => {
  try {
      // Save subject data to the database
      // Example: const newSubject = await Subject.create(req.body);
      res.status(201).send({ message: 'Subject saved successfully' });
  } catch (error) {
      res.status(400).send(error);
  }
});

app.get('/api/subjects', async (req, res) => {
  try {
      // Fetch subject names from the database
      // Example: const subjects = await Subject.find({}, 'name');
      const subjects = ['Subject 1', 'Subject 2', 'Subject 3']; // Replace with actual data from your database
      res.status(200).send({ subjects });
  } catch (error) {
      res.status(500).send(error);
  }
});

app.get('/api/formData', async (req, res) => {
  try {
    const formData = await FormData.find();
    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/formData/:group', async (req, res) => {
  const group = req.params.group;
  try {
    const formData = await FormData.find({ group: group });
    res.json(formData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes
app.get('/api/formData', async (req, res) => {
  try {
    const data = await FormData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/api/formData/:id', async (req, res) => {
  try {
    const { labelName } = req.body;
    const updatedData = await FormData.findByIdAndUpdate(req.params.id, { labelName }, { new: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/formData/:id', async (req, res) => {
  try {
    const removedData = await FormData.findByIdAndRemove(req.params.id);
    res.status(200).json(removedData);
  } catch (error) {
    res.status(500).send(error);
  }
});



//============================== Schema and Model for Subtopic Form Data==================================
const subtopicFormDataSchema = new mongoose.Schema({
  labelName: String,
  selectedSubject: String,
  textareaContent: String,
  fileDescriptions: [String],
  isPublished: { type: Boolean, default: false } // New field
});
const SubtopicFormData = mongoose.model('SubtopicFormData', subtopicFormDataSchema);

// Route to delete subject and its associated subtopics
// app.delete('/api/formData/:id', async (req, res) => {
//   try {
//     const deletedSubject = await FormData.findByIdAndDelete(req.params.id);
//     if (!deletedSubject) {
//       return res.status(404).send({ error: 'Subject not found' });
//     }

//     console.log( deletedSubject.labelName)
//     // Delete associated subtopics
//     await SubtopicFormData.deleteMany({ selectedSubject: deletedSubject.labelName });

//     res.send({ message: 'Subject and associated subtopics deleted successfully' });
//     console.log("Subject and associated subtopics deleted successfully")
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Server error' });
//   }
// });

// Assuming you have an Express route like this
// app.get('/subtopics', (req, res) => {
//   SubtopicFormData.find({ isPublished: true }, (err, subtopics) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//     res.json(subtopics);
//   });
// });

app.get('/subtopics', (req, res) => {
  SubtopicFormData.find({ isPublished: true }, (err, subtopics) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(subtopics);
  });
});

//to delete associated subtopics when subject is being deleted
app.delete('/api/subtopics/:subjectLabel', (req, res) => {
  const subjectLabel = req.params.subjectLabel;

  // Use Promises to handle the delete operation
  SubtopicFormData.deleteMany({ selectedSubject: subjectLabel })
    .then(() => {
      console.log('Subtopics deleted successfully');
      res.status(200).send('Subtopics deleted successfully');
    })
    .catch((err) => {
      console.error('Error deleting subtopics:', err);
      res.status(500).send('Error deleting subtopics');
    });
});

// Endpoint to handle saving Subtopic Form Data
app.post('/api/subtopicform', async (req, res) => {
  try {
    const { labelName, selectedSubject, textareaContent,fileDescriptions } = req.body;
    const subtopicFormData = new SubtopicFormData({ labelName, selectedSubject, textareaContent,fileDescriptions });
    await subtopicFormData.save();
    res.status(201).send(subtopicFormData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Define route to fetch subtopicFormData
app.get('/api/subtopicFormData', async (req, res) => {
  try {
    const subtopicData = await SubtopicFormData.find();
    res.json(subtopicData);
  } catch (error) {
    console.error('Error fetching subtopicFormData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Your API routes
app.put('/publishSubtopic/:labelName', async (req, res) => {
  const { labelName } = req.params;

  try {
    // Update the record where labelName matches
    await SubtopicFormData.updateOne({ labelName }, { isPublished: true });

    // Send a JSON response indicating success
    res.status(200).json({ success: true, message: 'Subtopic published successfully' });
  } catch (error) {
    console.error('Error publishing subtopic:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Endpoint to handle fetching the most recent Subtopic Form Data
app.get('/api/subtopicform/latest', async (req, res) => {
  try {
    const latestFormData = await SubtopicFormData.findOne().sort({ _id: -1 });
    res.send(latestFormData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to fetch subtopic count for a specific subject label
app.get('/api/subtopics/count/:selectedSubject', (req, res) => {
  const selectedSubject = req.params.selectedSubject;
  SubtopicFormData.countDocuments({ selectedSubject }, (err, count) => {
      if (err) {
          console.error('Error counting subtopics:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.json({ count });
      }
  });
});

app.get('/api/subtopicform/:labelName', async (req, res) => {
  try {
    const labelName = req.params.labelName;
    const action = req.query.action;

    if (action === 'create') {
      // Fetch subtopic form data for updating
      const subtopicFormData = await SubtopicFormData.findOne({ labelName });
      if (!subtopicFormData) {
        return res.status(404).json({ message: 'Subtopic form data not found' });
      }
      res.status(200).json(subtopicFormData);
    } else {
      // Fetch subtopic form data for displaying on another page
      const subtopic = await SubtopicFormData.findOne({ labelName });
      if (!subtopic) {
        return res.status(404).json({ message: 'Subtopic not found' });
      }
      res.status(200).json(subtopic);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Endpoint for updating subtopic form data
app.put('/api/subtopicform/:labelName/update', async (req, res) => {
  try {
    const labelName = req.params.labelName;
    const { selectedSubject, textareaContent , fileDescriptions} = req.body;
    
    // Find the document by labelName and update its fields
    const updatedSubtopic = await SubtopicFormData.findOneAndUpdate(
      { labelName },
      { selectedSubject, textareaContent , fileDescriptions},
      { new: true } // Return the updated document
    );

    if (!updatedSubtopic) {
      return res.status(404).json({ message: 'Subtopic form data not found' });
    }

    res.status(200).json(updatedSubtopic);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/api/subtopicform', async (req, res) => {
  try {
      const selectedSubject = req.query.selectedSubject;
      const subtopics = await SubtopicFormData.find({ selectedSubject });
      res.status(200).send(subtopics);
  } catch (error) {
      res.status(500).send(error);
  }
});

//card filter subject wise
app.get('/api/subtopicform/:selectedSubject', async (req, res) => {
  try {
      const selectedSubject = req.params.selectedSubject;
      const subtopics = await SubtopicFormData.find({ selectedSubject });
      res.status(200).send(subtopics);
  } catch (error) {
      res.status(500).send(error);
  }
});



app.get('/subtopics', async (req, res) => {
  try {
    const subtopics = await SubtopicFormData.find();
    res.json(subtopics);
  } catch (error) {
    console.error('Error fetching subtopics', error);
    res.status(500).json({ error: 'Failed to fetch subtopics' });
  }
});



// app.delete('/subtopics/:id', (req, res) => {
//   const subtopicId = req.params.id;
//   SubtopicFormData.findByIdAndDelete(subtopicId)
//     .then(result => {
//       if (result) {
//         console.log('Subtopic deleted successfully:', result);
//         res.status(200).send('Subtopic deleted successfully');
//       } else {
//         res.status(404).send('Subtopic not found');
//       }
//     })
//     .catch(err => {
//       console.error(err); // Log the error
//       res.status(500).send('Error deleting subtopic');
//     });
// });

app.delete('/subtopics/:id', (req, res) => {
  const subtopicId = req.params.id;
  SubtopicFormData.findByIdAndDelete(subtopicId)
    .then(result => {
      if (result) {
        console.log('Subtopic deleted successfully:', result);
        res.status(200).json({ message: 'Subtopic deleted successfully' }); // Send JSON response
      } else {
        res.status(404).json({ message: 'Subtopic not found' }); // Send JSON response
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error deleting subtopic' }); // Send JSON response
    });
});

// app.get('/api/subtopic/count', (req, res) => {
//   const selectedSubject = req.query.selectedSubject;
//   SubtopicFormData.countDocuments({ selectedSubject: selectedSubject, isPublished: true }, (err, count) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json(count);
//     }
//   });
// });

// Assuming you're using Express.js

app.get('/api/subtopic/count', async (req, res) => {
  try {
    const selectedSubject = req.query.selectedSubject;
    const count = await SubtopicFormData.countDocuments({ selectedSubject: selectedSubject, isPublished: true });
    res.json(count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/publish-subtopic/:subtopicId', async (req, res) => {
  const subtopicId = req.params.subtopicId;

  try {
    const updatedSubtopic = await SubtopicFormData.findByIdAndUpdate(subtopicId, { isPublished: true }, { new: true });

    if (updatedSubtopic) {
      res.status(200).json({ success: true, message: "Subtopic published successfully", updatedSubtopic });
    } else {
      res.status(404).json({ success: false, message: "Subtopic not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Error publishing subtopic", error: err.message });
  }
});

//====================================================================================================================================================
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, default: null },
  otp: { type: String, default: null }

});

// const Admin = mongoose.model('Admin', adminSchema);
// app.post('/api/admin', async (req, res) => {
//   const { name, email, mobile } = req.body;
//   const otp = generateOTP(); // Function to generate OTP
//   const admin = new Admin({ name, email, mobile, otp });
//   try {
//     const newmobile='+91'+ admin.mobile;
//     // Send OTP to mobile number (Implement this part)
//     await sendOTP(newmobile, admin.otp);
    
//     await admin.save();
//     res.status(201).send(admin);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

//dynamic imed
const cardsSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  functioncall: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

// Create a model for the cards collection
const Card = mongoose.model('Card', cardsSchema);

// Add default entries to the database
async function addDefaultCards() {
  try {
    const count = await Card.countDocuments();
    if (count === 0) {
      // const defaultCards = [
      //   { label: 'PMS', routerLink: '../pmsFlow' },
      //   { label: 'CARE', routerLink: '../careFlow' },
      //   { label: 'LSM', routerLink: '../lsmFlow' },
      //   { label: 'DOC.OP', routerLink: '../docopFlowPage' },
      //   { label: 'BILLING', routerLink: '../billingFlow' },
      //   { label: 'AMS', routerLink: '../amsFlowPage' },
      //   { label: 'GRM', routerLink: '../grmFlow' }
      // ];

      const defaultCards = [
        { label: 'PMS', functioncall: 'goToPmsFlow()' },
        { label: 'CARE', functioncall: 'goToCareFlow()' },
        { label: 'LSM', functioncall: 'goToLsmFlow()' },
        { label: 'DOC.OP', functioncall: 'goToDocFlow()' },
        { label: 'BILLING', functioncall: 'goToBillFlow()' },
        { label: 'AMS', functioncall: 'goToAsmFlow()' },
        { label: 'GRM', functioncall: 'goToGrmFlow()' }
      ];

      await Card.insertMany(defaultCards);
      console.log('Default cards added successfully');
    } else {
      console.log('Default cards already exist in the database');
    }
  } catch (err) {
    console.error('Error adding default cards:', err);
  }
}

// Call addDefaultCards() when the server starts up
addDefaultCards();

// API to get cards data
app.get('/api/cardsData', async (req, res) => {
  try {
    const cards = await Card.find({}).exec();
    res.json(cards);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).send('Error fetching cards');
  }
});

app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.find({ isPublished: true }).exec();
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API to update card label
app.put('/api/cardsData/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    const updatedLabel = req.body.label;
    await Card.findByIdAndUpdate(cardId, { label: updatedLabel });
    res.status(200).send('Card label updated successfully');
  } catch (err) {
    // console.error('Error updating card label:', err);
    res.status(500).send('Error updating card label');
  }
});

// API to delete a card
app.delete('/api/cardsData/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    await Card.findByIdAndDelete(cardId);
    res.status(200).send('Card deleted successfully');
  } catch (err) {
    console.error('Error deleting card:', err);
    res.status(500).send('Error deleting card');
  }
});

// API to publish a card
app.put('/api/cardsData/publish/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    await Card.findByIdAndUpdate(cardId, { isPublished: true });
    res.status(200).send('Card published successfully');
  } catch (err) {
    console.error('Error publishing card:', err);
    res.status(500).send('Error publishing card');
  }
});

app.get('/api/cardsData', async (req, res) => {
  console.log("in server file");
  const { isPublished } = req.query;
  const filter = isPublished === 'false' ? { isPublished: true } : {};

  try {
    const cardsData = await Card.find(filter);
    res.json(cardsData);
    console.log(cardsData); // Corrected console.log statement
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
