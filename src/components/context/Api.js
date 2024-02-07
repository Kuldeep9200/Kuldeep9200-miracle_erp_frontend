// api.js
const BASE_URL = 'http://localhost:4000/api';

// Helper function to handle response errors
const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Function to perform login
// api.js
export const loginApi = async (username, password) => {
  // Make a request to your authentication server
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    // Handle error
    throw new Error('Login failed');
  }

  const { user, token } = await response.json();
  return { user, token };
};


// Function to fetch data
export const fetchData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/get-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleErrors(response);

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
