import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository";
import { signToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";
import { RegisterDTO, LoginDTO } from "../validators/auth.schema";

export const authService = {
  // register user and return token
  register: async (dto: RegisterDTO) => {
    const existing = await userRepository.findByEmail(dto.email);
    if (existing) throw new ApiError(409, "Email already registered");
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await userRepository.create({ ...dto, password: hash });
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },
  // login user and return token
  login: async (dto: LoginDTO) => {
    const user = await userRepository.findByEmail(dto.email);
    if (!user) throw new ApiError(401, "Invalid credentials");
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new ApiError(401, "Invalid credentials");
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },
  // get me details
  me: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  },
};
