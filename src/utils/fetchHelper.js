export const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }
  
      const data = await response.json();
      return data; // Return the data from the response
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; // Rethrow the error so that the calling component can handle it
    }
  };
  