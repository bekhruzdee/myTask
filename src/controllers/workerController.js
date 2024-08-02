const { fetchData } = require("../utils/postgres");

const getOneWorker = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(req.params);
    let [user] = await fetchData(
      "SELECT * FROM users WHERE id = $1 AND role='worker' ",
      id
    );
    console.log(user);
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Worker Not Found⚠️",
      });
      return;
    }
    res.send({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllWorkers = async (req, res) => {
  try {
    let users = await fetchData("SELECT * FROM users WHERE role='worker'");
    if (users.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Worker Not Found⚠️",
      });
    }
    res.send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

const createWorker = async (req, res) => {
  try {
    let { fullname, login, password, company_id } = req.body;

    fetchData(
      "INSERT INTO users(fullname, login, password, company_id, role) VALUES ($1, $2, $3, $4,$5)",
      fullname,
      login,
      password,
      company_id,
      "worker"
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

const updateWorker = async (req, res) => {
  try {
    let { fullname, login, password, company_id } = req.body;
    let { id } = req.params;
    let [users] = await fetchData(
      "SELECT * FROM users WHERE id = $1 AND role='worker'",
      id
    );
    fetchData(
      "UPDATE users SET fullname = $1, login = $2, password = $3, company_id = $4 WHERE id = $5 ",
      fullname || users.fullname,
      login || users.login,
      password || users.password,
      company_id || users.company_id,
      id
    );

    res.send({
      success: true,
      message: "Updated✅",
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteWorker = async (req, res) => {
  try {
    let { id } = req.params;
    let role;
    if ((role = "worker")) {
      await fetchData("DELETE FROM users WHERE id = $1 AND role=$2", id, role);

      res.send({
        success: true,
        message: "Deleted👌",
      });
    } else {
      res.status(403).send({
        success: false,
        message: "This User does not Worker❌",
      });
      return;
    }
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getOneWorker,
  getAllWorkers,
  createWorker,
  updateWorker,
  deleteWorker
};
