import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userRepo from "./userRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";

export default class userController {
    constructor() {
        this.userRepo = new userRepo();
    }

    async getLogin(req, res, next) {
        try {
            return res.render("guest/login", {
                title: "Login",
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error({
                message: err.message,
            });
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            if(req.validationErrors){
               return res.render('guest/login',{
                                    title: "Login Page",
                    errors: req.validationErrors,
                    oldData: req.body

               })
            }
            const { email, password } = req.body;

            const result = await this.userRepo.findUserByEmail(email);

            if (!result) {
                logger.warn(`Login failed: User not found (${email})`);

                return res.status(400).render("guest/login", {
                    title: "Login Page",
                    errors: [{ msg: "Invalid email or password" }],
                    oldData: { email }
                });
            }

            const isMatch = await bcrypt.compare(password, result.password);

            if (!isMatch) {
                logger.warn(`Login failed: Invalid password (${email})`);

                return res.status(400).render("guest/login", {
                    title: "Login Page",
                    errors: [{ msg: "Invalid email or password" }],
                    oldData: { email }
                });
            }

            const token = jwt.sign(
                {
                    userId: result._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            logger.info(`User logged in: ${email}`);

            return res.redirect("/");
        } catch (err) {
            logger.error({
                message: err.message            });
            next(err);
        }
    }

    async getRegister(req, res, next) {
        try {
            return res.render("guest/register", {
                title: "Register Page",
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error({
                message: err.message            });
            next(err);
        }
    }

    async register(req, res, next) {
        try {
                        if(req.validationErrors){
               return res.render('guest/register',{
                                    title: "Register Page",
                    errors: req.validationErrors,
                    oldData: req.body

               })
            }

            const {
                name,
                email,
                phoneNo,
                password,
                confirmPassword,
                role
            } = req.body;

            const user = await this.userRepo.findUserByEmail(email);

            if (user) {
                logger.warn(`Registration failed: ${email} already exists`);

                return res.status(400).render("guest/register", {
                    title: "Register Page",
                    errors: [{ msg: "User already exists" }],
                    oldData: req.body
                });
            }

            if (confirmPassword !== password) {
                logger.warn(`Registration failed: Password mismatch (${email})`);

                return res.status(400).render("guest/register", {
                    title: "Register Page",
                    errors: [{ msg: "Passwords don't match" }],
                    oldData: req.body
                });
            }

            const hashPassword = await bcrypt.hash(password, 12);

            const image = req.file ? req.file.filename : "default.png";

            const newUser = {
                name,
                email,
                phoneNo,
                password: hashPassword,
                role,
                image
            };

            await this.userRepo.register(newUser);

            logger.info(`New user registered: ${email}`);

            return res.redirect("/api/auth/login");
        } catch (err) {
            logger.error({
                message: err.message            });
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie("token");

            logger.info("User logged out");

            return res.redirect("/api/auth/login");
        } catch (err) {
            logger.error({
                message: err.message            });
            next(err);
        }
    }

    async forgotPassPage(req, res, next) {
        try {
            return res.render("guest/forgotPass", {
                title: "Forgot Password",
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error({
                message: err.message            });
            next(err);
        }
    }

    async forgotPass(req, res, next) {
        try {
                        if(req.validationErrors){
               return res.render('guest/forgotPass',{
                                    title: "Forgot Password Page",
                    errors: req.validationErrors,
                    oldData: req.body

               })
            }

            const { email } = req.body;

            const result = await this.userRepo.forgotPass(email);

            if (!result) {
                logger.warn(`Password reset requested for unknown email: ${email}`);

                return res.status(400).render("guest/forgotPass", {
                    title: "Forgot Password Page",
                    errors: [{ msg: "User email not found!" }],
                    oldData: {}
                });
            }

            const token = crypto.randomBytes(32).toString("hex");
            const expiry = Date.now() + 15 * 60 * 1000;

            await this.userRepo.saveResetToken(email, token, expiry);

            logger.info(`Password reset token generated for: ${email}`);

            return res.redirect(`/api/auth/reset-pass/${token}`);
        } catch (err) {
            logger.error({
                message: err.message            });
            next(err);
        }
    }

    async resetPassPage(req, res, next) {
        try {
            const { token } = req.params;

            return res.render("guest/resetPass", {
                title: "Reset Password",
                token,
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error({
                message: err.message            });
            next(err);
        }
    }


async resetPass(req, res, next) {
    try {
        const { password } = req.body;
        const { token } = req.params;

        if (req.validationErrors) {
            return res.render("guest/resetPass", {
                title: "Reset Password Page",
                errors: req.validationErrors,
                oldData: req.body,
                token
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await this.userRepo.resetPass(
            token,
            hashedPassword
        );

        if (result.modifiedCount === 0) {
            logger.warn(`Invalid or expired reset token: ${token}`);

            return res.status(400).render("guest/resetPass", {
                title: "Reset Password Page",
                errors: [{ msg: "Invalid or expired link" }],
                oldData: req.body,
                token
            });
        }

        logger.info("Password reset successful");

        return res.redirect("/api/auth/login");

    } catch (err) {
        logger.error({
            message: err.message
        });

        next(err);
    }
}

}