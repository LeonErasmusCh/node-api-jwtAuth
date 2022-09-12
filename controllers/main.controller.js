const jwt = require("jsonwebtoken");


let tasks = [
  {
    id: 1,
    task: "eat",
  },
  {
    id: 2,
    task: "sleep",
  },
];


const getData = (request, response) => {
  return response.status(200).json({ tasks: tasks });
};

const getById = (request, response) => {
  const id = request.params.id;
  const taskById = tasks.find((x) => x.id == parseInt(id));
  return response.status(200).json(taskById);
};

const postData = (request, response) => {
  const task = request.body;
  tasks.push(task);
  return response.status(200).json({ "task received": task });
};

const updateData = (request, response) => {
  const task = request.body;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == task.id) {
      tasks.splice(tasks[i], 1);
      tasks.push({ id: request.body.id, task: request.body.task });
    }
  }
  return response.status(200).json({ "Task updated with id": task.id });
};

const deleteData = (request, response) => {
  const id = request.params.id;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
      tasks.splice(tasks[i].id - 1, 1);
    }
  }

  return response.status(200).json({ "Task Deleted with id": id });
};


// Login route
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "email or password is required" });
  }
  if (email === "test@gmail.com" && password === "admin") {
    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
      expiresIn: 60000,
    });
    console.log("token", token);
    res.json({ token: token });
  } else {
    return res.json({ message: "user not valid" });
  }
};





module.exports = {
  getData,
  getById,
  postData,
  updateData,
  deleteData,
  login
};
