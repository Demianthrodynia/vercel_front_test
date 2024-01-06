import axios from "axios";
const url = "https://clon-sz-i4q8.vercel.app/"
// const url = "http://localhost:3000"



// USERS API CALLS
export const loginCall = async (credentials) => {
  return await axios.post(`${url}/users/login`, credentials);
};

export const registerCall = async (data) => {
  await axios.post(`${url}/users/`, data);
};

export const profileCall = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.token,
    },
  };

  return await axios.get(`${url}/users/profile`,
    config
  );
};

export const updateUserCall = async (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };


  return await axios.put(`${url}/users/profile`, data, config);
};

export const updateUserRole = async (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const userId = data.id
  const newRole = {role: data.role}
  return await axios.put(`${url}/users/${userId}`, newRole, config)
}


export const bringUsersByRole = async (token, role) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return await axios.get(`${url}/users/users/${role}`, config);
};

export const findUsers = async (token, name) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await axios.get(`${url}/users/users/?user=${name}`, config)
}


// EDITIONS API CALLS

export const newEventCall = async (token, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  data.date = new Date(data.date).toISOString()

  return await axios.post(`${url}/editions/`, data, config)
}

export const bringEvents = async (filter, token = "") => {
  let query = ""

  if (filter?.page) query += `?page=${filter.page}&`
  if (filter?.limit) query += `?limit=${filter.limit}&`
  if (filter?.location) query += `location=${filter.location}&`
  if (filter?.start) query += `start=${filter.start}&`
  if (filter?.end) query += `end=${filter.end}&`
  

  if (token) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await axios.get(`${url}/editions/${query}`, config)

  } 
  return await axios.get(`${url}/editions/${query}`)
}


export const updateEventCall = async (token, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  }

  return await axios.put(`${url}/editions/${data._id}`, data, config)
}


export const joinEvent = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  }
  console.log(token)
  console.log(id)
  return await axios.put(`${url}/editions/?id=${id}`, {}, config)
}


// CHARACTERS API CALLS

export const createCharacter = async (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  }
  return await axios.post(`${url}/characters`, data, config)
}

export const bringCharacters = async (token) => {
  const config = {
    headers: {
      Authorization: "Beared " + token
    }
  }
  return await axios.get(`${url}/characters`, config)
}

export const updateCharacter = async (dataObj) => {
  const data = dataObj.data
  const token = dataObj.token
  const id = dataObj.data.id
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  }
  return await axios.put(`${url}/characters/${id}`, data, config)
}

export const deleteCharacter = async (dataObj) => {
  const id = dataObj.id
  const token = dataObj.token
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  }
  return await axios.delete(`${url}/characters/${id}`, config)
}

