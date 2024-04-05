import axios from "axios";

// const API_URL = "http://63f1-123-193-128-69.ngrok-free.app/user";
const API_URL = "http://127.0.0.1:8080/user";

class PicServices {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  register(username, email, password, gender) {
    const formData = new FormData();

    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      gender,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  logout() {
    localStorage.removeItem("user");
  }

  getUser(_id) {
    return axios.get(API_URL + "/" + _id);
  }

  uploadProfile(file, _id) {
    const formData = new FormData();
    formData.append("img", file);

    return axios.post(API_URL + "/profile/" + _id, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  editProfile(id, username, email, password, gender) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/" + id,
      { username: username, email: email, password: password, gender: gender },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new PicServices();
