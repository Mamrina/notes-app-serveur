import { CategoryController } from "../controllers/category-controller.js";
import { Router } from "express";
import verifyToken from "../middleware/auth-middleware.js";

const router = Router();
const categoryController = new CategoryController();

/* GET categories listing. */
router.get("/", verifyToken, function (req, res, next) {
  categoryController.listAll(req, res);
});

// Create a new category
router.post("/", verifyToken, function (req, res) {
  categoryController.create(req, res);
});

// Update a category
router.put("/:id", verifyToken, (req, res) => categoryController.update(req, res));

// Delete a category
router.delete("/:id", verifyToken, function (req, res) {
  console.log("Access to delete action with id: ", req.params.id);
  categoryController.destroy(req, res);
});

export default router;
