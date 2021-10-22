const apiDataContainer = document.querySelector("#apiData");

document.addEventListener("DOMContentLoaded", () => getUsers());

// Window on Loaded
document.querySelector(".getUsers").addEventListener("click", () => getUsers());
document.querySelector(".getUser").addEventListener("click", () => getUser());
document.querySelector(".postUser").addEventListener("click", () => postUser());
document
  .querySelector(".deleteUser")
  .addEventListener("click", () => deleteUser());
document
  .querySelector(".updateUser")
  .addEventListener("click", () => updateUser());

const getUsers = async () => {
  try {
    const response = await fetch("/api/users"); //AJAX via fetch() API

    if (!response.ok) {
      const msg = await response.json();
      throw new Error(msg.message);
    }
    // { [{}, {}] }
    const users = await response.json();
    //  [{}, {}]
    populateUsers(users);
  } catch (e) {
    apiDataContainer.innerHTML = e;
  }
};
const getUser = async () => {
  try {
    const userId = prompt("Please Enter User ID: ");

    const response = await fetch(`/api/users/${userId}`); //AJAX via fetch() API

    if (!response.ok) {
      // { { message: "LKJDLJ" } }
      const msg = await response.json();
      // {message:";lskdjfl"}
      throw new Error(msg.message);
    }

    // {{}}
    const user = await response.json();
    // {} => [{}]

    const userData = [];
    userData.push(user); //[{}]
    populateUsers(userData);
  } catch (e) {
    apiDataContainer.innerHTML = e;
  }
};
const postUser = async () => {
  try {
    const postData = prompt(`Enter the Details: Name, Age, Gender, Active`);

    const response = await fetch(`/api/users/${postData}`, { method: "POST" }); //AJAX via fetch() API

    if (!response.ok) {
      const msg = await response.json();
      throw new Error(msg.message);
    }

    const users = await response.json();

    const userData = [];

    userData.push(users);

    populateUsers(userData);
  } catch (e) {
    apiDataContainer.innerHTML = e;
  }
};
const updateUser = async () => {
  try {
    const updateValues = prompt(
      "Please Enter UserID to be updated and active field value as true/false in the format of  id,value"
    );

    const userValue = updateValues.split(",");
    const id = userValue[0];
    let active = null;
    userValue[1].toLowerCase() === "false" ? (active = false) : (active = true);

    const response = await fetch(`/api/users/${id}/${active}`, {
      method: "PATCH",
    }); //AJAX via fetch() API

    if (!response.ok) {
      const msg = await response.json();
      throw new Error(msg.message);
    }

    const user = await response.json();

    const userData = [];

    userData.push(user);

    populateUsers(userData);
  } catch (e) {
    apiDataContainer.innerHTML = e;
  }
};
const deleteUser = async () => {
  try {
    const userId = prompt("Please Enter User ID: ");

    const response = await fetch(`/api/users/${userId}`, { method: "DELETE" }); //AJAX via fetch() API

    if (!response.ok) {
      const msg = await response.json();
      throw new Error(msg.message);
    }

    const user = await response.json();

    const userData = [];

    userData.push(user);

    populateUsers(userData);
  } catch (e) {
    apiDataContainer.innerHTML = e;
  }
};

function populateUsers(users) {
  apiDataContainer.innerHTML = users
    .map((user) => {
      const { _id, name, age, gender, active } = user;
      return `
        <div class="card">
            <div class="content">
                <h2>ID: ${_id}</h2>
                <div>
                <h2>NAME: ${name}</h2>
                <h2>AGE: ${age}</h2>
                <h2>GENDER: ${gender}</h2>
                <h2>ACTIVE: ${active}</h2>
                </div>
            </div>
        </div>
        `;
    })
    .join("");
}
