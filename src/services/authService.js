import Parse from "parse/dist/parse.min.js";

const PARSE_APPLICATION_ID = "l6kPqgl0vczfSwTUi6wmlW0K7yrnHP6LupC5vSJT";
const PARSE_HOST_URL = "https://parseapi.back4app.com/users";
const PARSE_JAVASCRIPT_KEY = "zzZWt7MQOPzFb7syzRnkbpV80bcoFr8TyY4ekzlo";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export async function register({
  username,
  email,
  gender,
  exp,
  tech,
  photo,
  password,
  repeatPassword,
}) {
  const user = new Parse.User();

  user.set({
    username,
    email,
    gender,
    exp,
    tech,
    photo,
    password,
    repeatPassword,
  });

  try {
    await user.signUp();
    console.log(user);

    const newUser = { ...user.attributes, id: user.id };
    console.log(newUser);

    return newUser;
  } catch (error) {
    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}

export async function login(username, password) {
  try {
    const userData = await Parse.User.logIn(username, password);

    const user = { ...userData.attributes, id: userData.id };

    return user;
  } catch (error) {
    if (error) {
      throw new Error(error.message);
    }
  }
}

export async function logout() {
  try {
    await Parse.User.logOut();
    // To verify that current user is now empty, currentAsync can be used
    const currentUser = await Parse.User.current();
    if (currentUser === null) {
      console.log("Success! No user is logged in anymore!");
    }
    // Update state variable holding current user
    getCurrentUser();
    return true;
  } catch (error) {
    throw new Error(error);
    // alert(`Error! ${error.message}`);
    // return false;
  }
}

export async function getCurrentUser() {
  const currentUser = await Parse.User.current();
  return currentUser;
}
