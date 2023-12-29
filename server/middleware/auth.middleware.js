const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token.service");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }

    const userData = tokenService.validatAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }

    req.user = userData;

    next();
  } catch (e) {
    return next(ApiError.UnautorizedError());
  }
};
