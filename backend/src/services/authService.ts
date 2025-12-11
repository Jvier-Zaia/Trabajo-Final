import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { IUser } from "../interfaces/User.interface";

export class AuthService {
    async register(userData: IUser){
        const existingUser = await User.findOne({ email:userData.email });
       if (existingUser) {
        throw new Error('El email ya está registrado');
       } 
       const hanshedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
        ...userData,
        password: hanshedPassword
    })
    
     return await user.save();

    }

    async login(email: string, password: string) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Credenciales Invalidas🚫');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Credenciales Invalidas🚫');
      }
      const token = jwt.sign(
        { userId: user._id,email:user.email},
        process.env.JWT_SECRET as string,
        { expiresIn: '12h'}
      );
      return { token, user: {id: user._id, email: user.email, name: user.name}
    }
    }
}