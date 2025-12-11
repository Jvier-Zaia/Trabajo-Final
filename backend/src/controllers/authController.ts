import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { EmailService } from "../services/emailService";

const authService = new AuthService();
const emailService = new EmailService();

export class AuthController {
    async register(req: Request, res: Response) {
     try {
        const user = await authService.register(req.body);
         
        // Enviar email en segundo plano para no bloquear la respuesta al cliente
        emailService
          .sendWelcomeEmail(user.email, user.name)
          .catch((err) => {
            console.error('Error al enviar email de bienvenida:', err);
          });
        
        res.status(201).json({
            message:'✔ Usuario registrado exitosamente',
            user: {id: user._id, email: user.email, name: user.name}
        });
    }catch ( error: any) {
        res.status(400).json({ error: error.message});
}
}
async login( req: Request, res: Response) {
    try {
     const { email,password } = req.body;
     const result = await authService.login(email,password);
       res.json(result); 
    }catch (error: any) {
        res.status(401).json({error: error.message});

    }
  }
}