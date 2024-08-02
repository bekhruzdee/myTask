const { fetchData } = require("../utils/postgres");


const getOneTask = async (req, res) => {
    try {
      let { id } = req.params;
      let [task] = await fetchData("SELECT * FROM tasks WHERE id = $1", id);
      if (!task) {
        res.status(404).send({
          success: false,
          message: "Task Not Found❌",
        });
        return;
      }
      res.send({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(error.status || 403).send({
        success: false,
        message: error.message,
      });
    }
  };
  


const getAllTasks = async (req, res) => {
  try {
    let tasks = await fetchData("SELECT * FROM tasks");
    if (tasks.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Task Not Found⚠️",
      });
    }
    res.send({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};


let getByCompanyId = async (req, res) => {
    try {
      let { company_id } = req.params;
      if (!company_id) {
        return res.status(400).send({
          success: false,
          message: "Company_id Not Found⚠️",
        });
      }
      let tasks = await fetchData(
        "SELECT * FROM tasks WHERE company_id = $1",
        company_id
      );
  
      if (tasks.length === 0) {
        return res.status(404).send({
          success: false,
          message: "This Company does not Task",
        });
      }
      res.send({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(error.status || 403).send({
        success: false,
        message: error.message || "Error",
      });
    }
  };



const createTask = async (req, res) => {
  try {
    let { title, description, company_id } = req.body;
    fetchData(
      "INSERT INTO  tasks( title, description, company_id) VALUES ($1, $2, $3)",
      title,
      description,
      company_id
    );
    res.send({
      success: true,
      message: "Created✅",
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    let { title, description, company_id } = req.body;
    let { id } = req.params;
    let [task] = await fetchData("SELECT * FROM tasks WHERE id = $1", id);
    fetchData(
      "UPDATE tasks SET title = $1, description = $2,   company_id = $3 WHERE id = $4 ",
      title || task.title,
      description || task.description,
      company_id || task.company_id,
      id
    );

    res.send({
      success: true,
      message: "Updated👌",
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    let { id } = req.params;

    let task = await fetchData("SELECT * FROM tasks WHERE id = $1", id);
    if (task.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Task Not Found❌",
      });
    }
    await fetchData("DELETE FROM tasks WHERE id = $1", id);
    res.send({
      success: true,
      message: "Task Deleted✅",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  getOneTask,
  getAllTasks,
  getByCompanyId,
  createTask,
  updateTask,
  deleteTask,
};
