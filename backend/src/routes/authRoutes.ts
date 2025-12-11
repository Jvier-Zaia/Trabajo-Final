import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validateRegister, validateLogin } from "../validators/authValidator";
import { authRateLimiter } from "../middlewares/rateLimitMiddleware";

const router = Router ();
const authController = new AuthController();

router.post('/register', authRateLimiter, validateRegister, (req, res) => authController.register(req, res));
router.post('/login', authRateLimiter, validateLogin, (req, res) => authController.login(req, res));

export default router;