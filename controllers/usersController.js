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
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("age")
    .trim()
    .optional({ values: "falsy" })
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be a number between 0 and 120."),
  body("bio")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ max: 200 })
    .withMessage("Bio must be at most 200 characters long."),
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
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

export const usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);

  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

export const usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

export const usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

export const usersSearchGet = (req, res) => {
  const searchTerm = req.query.search;
  const users = usersStorage.getUsers();
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  res.render("search", {
    title: "User List",
    users: filteredUsers,
  });
};
