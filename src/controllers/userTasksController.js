const { fetchData } = require("../utils/postgres");



const getAllUserTask = async (req, res) => {
  try {
    let user_tasks = await fetchData("SELECT * FROM user_tasks ");
    if (user_tasks.length === 0) {
      return res.status(404).send({
        success: false,
        message: "userTask Not Found❌",
      });
    }
    res.send({
      success: true,
      data: user_tasks,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

const getOneUserTask = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(req.params);
    let [user_tasks] = await fetchData(
      "SELECT * FROM user_tasks WHERE id = $1  ",
      id
    );
    console.log(user_tasks);
    if (!user_tasks) {
      res.status(404).send({
        success: false,
        message: "UserTask Not Found ⚠️",
      });
      return;
    }
    res.send({
      success: true,
      data: user_tasks,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};




let getByTaskId = async (req, res) => {
    try {
      let { task_id } = req.params;
      let user_tasks = await fetchData(
        "SELECT * FROM user_tasks WHERE task_id = $1",
        task_id
      );
      if (user_tasks.length === 0) {
        return res.status(404).send({
          success: false,
          message: "UserTask Not Found❌",
        });
      }
      res.send({
        success: true,
        data: user_tasks,
      });
    } catch (error) {
      res.status(error.status || 403).send({
        success: false,
        message: error.message,
      });
    }
  };
  
  let getByUserId = async (req, res) => {
    try {
      let { user_id } = req.params;
      let user_tasks = await fetchData(
        "SELECT * FROM user_tasks WHERE user_id = $1",
        user_id
      );
      if (user_tasks.length === 0) {
        return res.status(404).send({
          success: false,
          message: "UserTask Not Found❌",
        });
      }
      res.send({
        success: true,
        data: user_tasks,
      });
    } catch (error) {
      res.status(error.status || 403).send({
        success: false,
        message: error.message,
      });
    }
  };




let createUserTask = async (req, res) => {
    try {
      let { user_id, task_id } = req.body;
  
      const start_at = new Date();
      const end_at = new Date(start_at.getTime() + 48 * 60 * 60 * 1000);
      let status;
      if (end_at < new Date()) {
        status = "Checking...";
      } else {
        status = "Working...😊";
      }
  
      await fetchData(
        `
          INSERT INTO user_tasks (user_id, task_id, start_at, end_at, status)
          VALUES ($1, $2, $3, $4, $5)
        `,
        user_id,
        task_id,
        start_at,
        end_at,
        status
      );
  
      res.send({
        success: true,
        message: "Task created successfully✅",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  };



const updateUserTask = async (req, res) => {
  try {
    let { id } = req.params;
    let { user_id, task_id } = req.body;

    const start_at = new Date();
    const end_at = new Date(start_at.getTime() + 48 * 60 * 60 * 1000);
    let status;
    if (end_at < new Date()) {
      status = "Checking...";
    } else {
      status = "Working😊";
    }
    await fetchData(
      `
            UPDATE user_tasks SET user_id=$1, task_id=$2, start_at=$3, end_at=$4, status=$5
            WHERE id=$6
        `,
      user_id,
      task_id,
      start_at,
      end_at,
      status,
      id
    );
    res.send({
      success: true,
      message: "UserTask Updated👌",
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

let deleteUserTask = async (req, res) => {
  try {
    let { id } = req.params;

    let user_tasks = await fetchData(
      "SELECT * FROM user_tasks WHERE id = $1",
      id
    );
    if (user_tasks.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Task Not Found⚠️",
      });
    }

    await fetchData("DELETE FROM user_tasks WHERE id = $1", id);

    res.send({
      success: true,
      message: "UserTask Deleted👌",
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  getOneUserTask,
  getAllUserTask,
  getByTaskId,
  getByUserId,
  createUserTask,
  updateUserTask,
  deleteUserTask,
};
