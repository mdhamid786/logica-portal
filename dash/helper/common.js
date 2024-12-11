

const baseUrl = process.env.APIBASEURL;


export async function postApiData(url, data) {
  if (typeof window !== "undefined") {
    const apiUrl = `${baseUrl}/${url}`;

    try {
      const result = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (result.ok) {
        const responseData = await result.json();
        return responseData;
      } else {
        const error = await result.json();
        return error;
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}



// post with token api call
export async function postWithToken(url, data) {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const apiUrl = `${baseUrl}/${url}`;
  if (typeof window !== "undefined") {


  }

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function getApiData(url) {
  const apiUrl = `${baseUrl}/${url}`;
  // console.log(apiUrl);
  if (typeof window !== "undefined") {


  }

 
  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(result);
    if (result) {
      const data = await result.json();

      return data;
    } else {
      const errorData = await result.json();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function getWithToken(url) {
  const apiUrl = `${baseUrl}/${url}`;
  if (typeof window !== "undefined") {


  }

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const errorData = await result.json();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function postApiFormDataToken(url, data) {

  if (typeof window !== "undefined") {


  }
  const apiUrl = `${baseUrl}/${url}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (result) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function postApiFormData(url, data) {

  if (typeof window !== "undefined") {


  }
  const apiUrl = `${baseUrl}/${url}`;

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: data,
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}


export async function deleteApiData(url) {
  if (typeof window === "undefined") {
    // Handle server-side (Node.js) logic if needed
  }

  const apiUrl = `${baseUrl}/${url}`;

  try {
    const result = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  
  }
}


export async function updateApiData(url, data) {
  if (typeof window === "undefined") {
    // Handle server-side (Node.js) logic if needed
  }

  const apiUrl = `${baseUrl}/${url}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), 
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function updateApiFormData(url, data) {

  if (typeof window !== "undefined") {


  }
  const apiUrl = `${baseUrl}/${url}`;

  try {
    const result = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
      },
      body: data,
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}