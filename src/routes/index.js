const { Router } = require("express")
const { login } = require("../controllers/loginController")
const { createCompany, getAllCompany, getOneCompany, updateCompany, deleteCompany } = require("../controllers/companyController")
const verifyRole = require("../middlewares/verifyRole")
const verifyToken = require("../middlewares/verifyToken")
const { getAllManager, getOneManager, createManager, updateManager, deleteManager } = require("../controllers/managerController")
const { getAllWorkers, getOneWorker, createWorker, updateWorker, deleteWorker } = require("../controllers/workerController")
const { getAllTasks, getOneTask, createTask, updateTask, deleteTask, getByCompanyId } = require("../controllers/tasksController")
const { getAllUserTask, getOneUserTask, getByTaskId, createUserTask, updateUserTask, deleteUserTask, getByUserId } = require("../controllers/userTasksController")
const loginSchema = require("../middlewares/validation/login/login")
const { validation } = require("../middlewares/validation/validation")

const router = Router()

 

// ---------------- login  ----------------   //

router.post("/login", validation(loginSchema), login)


// -------------------   Company ---------------- //

router.get("/companies/all", verifyToken(),  verifyRole("admin"), getAllCompany)
router.get("/companies/one/:id", verifyToken(), verifyRole("admin"), getOneCompany)
router.post("/companies/create", verifyToken(), verifyRole("admin"), createCompany)
router.patch("/companies/update/:id", verifyToken(), verifyRole("admin"), updateCompany)
router.delete("/companies/delete/:id", verifyToken(), verifyRole("admin"), deleteCompany)


// ------------------ MANAGER ---------------------- // 

router.get("/users/all", verifyToken(), verifyRole("admin"), getAllManager)
router.get("/users/one/:id", verifyToken(), verifyRole("admin"), getOneManager)
router.post("/users/create", verifyToken(), verifyRole("admin"), createManager)
router.patch("/users/update/:id", verifyToken(), verifyRole("admin"), updateManager)
router.delete("/users/delete/:id", verifyToken(), verifyRole("admin"), deleteManager)


// ------------------ WORKER ---------------------- //


router.get("/users/all", verifyToken(), verifyRole("manager"), getAllWorkers)
router.get("/users/one/:id", verifyToken(), verifyRole("manager"), getOneWorker)
router.post("/users/create", verifyToken(), verifyRole("manager"), createWorker)
router.patch("/users/update/:id", verifyToken(), verifyRole("manager"), updateWorker)
router.delete("/users/delete/:id", verifyToken(), verifyRole("manager"), deleteWorker)



// ------------------ TASKS ---------------------- // 



router.get("/tasks/all",  getAllTasks)
router.get("/tasks/one/:id",  getOneTask)
router.get("/tasks/byCompanyId/:id",  getByCompanyId)
router.post("/tasks/create", verifyToken(), verifyRole("manager"), createTask)
router.patch("/tasks/update/:id", verifyToken(), verifyRole("manager"), updateTask)
router.delete("/tasks/delete/:id", verifyToken(), verifyRole("manager"), deleteTask)




// ---------------- USER TASKS -------------------- // 

router.get("/userTask/all",  getAllUserTask)
router.get("/userTask/one/:id",  getOneUserTask)
router.get("/userTask/byTaskId/:task_id",  getByTaskId)
router.get("/userTask/byUserId/:user_id",  getByUserId)
router.post("/userTask/create", verifyToken(), verifyRole("manager"), createUserTask)
router.patch("/userTask/update/:id", verifyToken(), verifyRole("manager"), updateUserTask)
router.delete("/userTask/delete/:id", verifyToken(), verifyRole("manager"), deleteUserTask)




module.exports = router