import { usersStorage } from "../storage/userStorage.js";
import { body, validationResult, matchedData } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`FirstName ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`LastName ${lengthErr}`),
];

export const usersListGet = (req, res) => {
  res.render("index", {
    title: "user list",
    users: usersStorage.getUsers(),
  });
};
export const usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create User",
  });
};
export const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = matchedData(req);
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  },
];
