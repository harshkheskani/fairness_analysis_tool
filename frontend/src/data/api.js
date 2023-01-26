import axios from "axios";

export async function postTextBox(obj) {
    console.log("The function is called");
    return await axios.post
    ("http://127.0.0.1:8000/api/searchQuery/", obj)
    .then ((response) => response.data)
    .catch((error) => console.log(error));
}