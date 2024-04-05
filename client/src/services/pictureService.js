import axios from "axios";
// const API_URL = "http://63f1-123-193-128-69.ngrok-free.app/picture";
const API_URL = "http://127.0.0.1:8080/picture";

class PicServices {
  getAll(page) {
    return axios.get(API_URL + "?page=" + page);
  }
  getOne(_id, page) {
    return axios.get(API_URL + "/" + _id + "?page=" + page);
  }
  search(keywords, page) {
    return axios.get(API_URL + "/search/" + keywords + "?page=" + page);
  }

  upload(file, title, description) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("img", file);
    formData.append("description", description);

    return axios.post(API_URL + "/postPic", formData, {
      headers: { Authorization: token, "Content-type": "multipart/form-data" },
    });
  }
  editPicture(id, title, description) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/postPic/" + id,
      { title: title, description: description },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  deletePicture(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/postPic/" + id, {
      headers: {
        Authorization: token,
      },
    });
  }
  like(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/postPic/" + id + "/like",
      {},
      { headers: { Authorization: token } }
    );
  }
  dislike(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/postPic/" + id + "/like", {
      headers: { Authorization: token },
    });
  }

  postComment(id, comment) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/postPic/" + id,
      { comment },
      { headers: { Authorization: token } }
    );
  }

  getByUserId(userId, page) {
    return axios.get(API_URL + "/user/" + userId + "?page=" + page);
  }
  arrayBuffer(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return "data:image/jpeg;base64," + window.btoa(binary);
  }
}

export default new PicServices();
