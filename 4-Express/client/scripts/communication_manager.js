const axios = require("axios").default;
const SERVER_URL = "http://localhost:3000";

function addOrUpdateItem(id, item) {
  const urlWithId = `${SERVER_URL}/${id}`;

  axios.post(urlWithId, item).then(
    (response) => {
    },
    (error) => {
      console.log(error);
    }
  );
}

function removeItem(id) {
  const urlWithId = `${SERVER_URL}/${id}`;

  axios.delete(urlWithId, { params: { id: id } }).then(
    (response) => {
    },
    (error) => {
      console.log(error);
    }
  );
}

async function getItems() {
  try {
    const response = await axios.get(SERVER_URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export { addOrUpdateItem, removeItem, getItems };
