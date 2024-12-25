const API_URL = 'http://localhost:5500';

export const getRequests = async () => {
  try {
    const response = await fetch(`${API_URL}/requests`);
    const data = await response.json();
    if (response.ok) {
      return data; // Return list of requests
    } else {
      throw new Error(data.message || 'Error fetching requests');
    }
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
};

export const addRequest = async (requestData) => {
  try {
    const response = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    if (response.ok) {
      return data; // Return the created request data
    } else {
      throw new Error(data.message || 'Error adding request');
    }
  } catch (error) {
    console.error('Error adding request:', error);
    throw error;
  }
};
