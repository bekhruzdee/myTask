const { fetchData } = require("../utils/postgres");


// --------------------- GetOne -------------------


const getOneCompany = async(req, res) => {
    try {
      let { id } = req.params
      let company = await fetchData("SELECT * FROM companies WHERE id = $1", id)
  
      if (company.length === 0) {
        return res.status(404).send({
          success: false,
          message: "Company Not Found❌"
        });
      }
      res.send({
          success: true,
          data: company
      })
    } catch (error) {
      res.status(error.status || 403).send({
          success: false,
          message: error.message
      })
    }
  }


// ------------------- GetAll -------------------------

const getAllCompany = async (req, res) => {
  try {
    let companies = await fetchData("Select * from companies")
    if (companies.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Company Not Found❌"
      });
    }
    res.send({
        success: true,
        data: companies
    })
  } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
  }
}

// -----------------  CREATE --------------------------------

const createCompany = async (req, res) => {
  try {
    let { name } = req.body
    fetchData("INSERT INTO companies(name) values($1)", name)
    res.send({
        success: true,
        message: "Created✅"
    })
  } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
  }
};

// --------------------- UPDATE ------------------------

const updateCompany = async (req, res) => {
  try {
    let { name } = req.body;
    let { id } = req.params;

    
    let company = await fetchData("SELECT * FROM companies WHERE id = $1", id);
    if (company.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Company Not Found❌"
      });
    }

    await fetchData("UPDATE companies SET name = $1 WHERE id = $2", name, id);
    res.send({
      success: true,
      message: "Updated company✅"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

// --------------- DELETE ---------------------------------

const deleteCompany = async (req, res) => {
  try {
    let { id } = req.params;

    let company = await fetchData("SELECT * FROM companies WHERE id = $1", id);
    if (company.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Company Not Found❌"
      });
    }

   
    await fetchData("DELETE FROM companies WHERE id = $1", id);
    res.send({
      success: true,
      message: "Company Deleted✅"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};




module.exports = {
    getOneCompany,
    getAllCompany,
    createCompany,
    updateCompany,
    deleteCompany
}