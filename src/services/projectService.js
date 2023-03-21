import Parse from "parse/dist/parse.min.js";

const PARSE_APPLICATION_ID = "l6kPqgl0vczfSwTUi6wmlW0K7yrnHP6LupC5vSJT";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "zzZWt7MQOPzFb7syzRnkbpV80bcoFr8TyY4ekzlo";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export async function getAll() {
  // create your Parse Query using the Person Class you've created
  const query = new Parse.Query("project");
  // run the query
  const Project = await query.find();

  //add id to the result
  const result = Project.map((x, id) => ({ ...x.attributes, id: x.id }));

  // const filtered = result.filter(x => x.location === 'Varna')

  return result;
}

export async function getLatest() {
  const query = new Parse.Query("project");
  query.limit(3);
  // run the query
  const Project = await query.find();

  //add id to the result
  const result = Project.map((x, id) => ({ ...x.attributes, id: x.id }));

  return result;
}

export async function getById(projectId) {
  const query = new Parse.Query("project");
  try {
    const Project = await query.get(projectId);

    const result = { ...Project.attributes, id: Project.id };

    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getByOwner(ownerId) {
  const query = new Parse.Query("project");

  try {
    // run the query
    const Project = await query.find();

    const result = Project.map((x, id) => ({ ...x.attributes, id: x.id }));

    const filtered = result.filter((x) => x.ownerId === ownerId);

    return filtered;
  } catch (err) {
    console.log(err);
  }
}

export async function addProject(data, ownerId) {
  const Project = Parse.Object.extend("project");
  const project = new Project();

  project.set({
    name: data.name,
    email: data.email,
    frontendTech: data.frontendTech,
    backendTech: data.backendTech,
    link: data.link,
    picture: data.picture,
    description: data.description,
    ownerId: ownerId,
  });

  project.save().then(
    (project) => {},
    (error) => {
      alert("Failed to create new object, with error code: " + error.message);
    }
  );
}

export async function remove(projectId) {
  const query = new Parse.Query("project");
  try {
    // here you put the objectId that you want to delete
    const object = await query.get(projectId);
    try {
      const response = await object.destroy();
      console.log("Deleted ParseObject", response);
    } catch (error) {
      console.error("Error while deleting ParseObject", error);
    }
  } catch (error) {
    console.error("Error while retrieving ParseObject", error);
  }
}
