const { fetchData } = require("../utils/postgres");


const getOneManager = async (req, res) => {
  try {
    let { id } = req.params;
    let role = "manager";
    let [user] = await fetchData(
      "SELECT * FROM users WHERE id = $1 AND role=$2",
      id,
      role
    );

    if (!user) {
      res.status(404).send({
        success: false,
        message: "Manager Not Found⚠️",
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



const getAllManager = async (req, res) => {
  try {
    let users = await fetchData("SELECT * FROM users WHERE role='manager'");
    if (users.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Manager Not Found⚠️",
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

const createManager = async (req, res) => {
  try {
    let { fullname, login, password, company_id } = req.body;

    fetchData(
      " INSERT INTO users(fullname, login, password,company_id, role) VALUES ($1, $2, $3, $4,$5)",
      fullname,
      login,
      password,
      company_id,
      "manager"
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

const updateManager = async (req, res) => {
  try {
    let { fullname, login, password, company_id, role } = req.body;
    let { id } = req.params;
    
    let [user] = await fetchData(
      "SELECT * FROM users WHERE id = $1 AND role=$2",
      id,
      role
    );
    fetchData(
      "UPDATE users SET fullname = $1, login = $2, password = $3, company_id = $4, role = $5 WHERE id = $6 ",
      fullname || user.fullname,
      login || user.login,
      password || user.password,
      company_id || user.company_id,  
      role || user.role,  
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

const deleteManager = async (req, res) => {
  try {
    let { id } = req.params;
    let role;
    if ((role = "manager")) {
      await fetchData("DELETE FROM users WHERE id = $1 And  role=$2", id, role);
      res.send({
        success: true,
        message: "Deleted👌",
      });
    } else {
      res.status(403).send({
        success: false,
        message: "Manager Does Not Exist⚠️",
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
  getOneManager,
  getAllManager,
  createManager,
  updateManager,
  deleteManager,
};
