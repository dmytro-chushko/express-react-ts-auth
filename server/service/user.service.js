const bcrypt = require("bcrypt");
const uuid = require("uuid");

const UserModel = require("../models/user.model");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const UserDto = require("../dto/user.dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`User with email ${email} already exist`);
    }

    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
