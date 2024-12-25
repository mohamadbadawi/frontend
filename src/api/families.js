const API_URL = 'http://localhost:5500';

export const getFamilies = async () => {
  try {
    const response = await fetch(`${API_URL}/families`);
    const data = await response.json();
    if (response.ok) {
      return data; // Return list of families
    } else {
      throw new Error(data.message || 'Error fetching families');
    }
  } catch (error) {
    console.error('Error fetching families:', error);
    throw error;
  }
};

export const addFamily = async (familyData) => {
  try {
    const response = await fetch(`${API_URL}/families`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(familyData),
    });

    const data = await response.json();
    if (response.ok) {
      return data; // Return the created family data
    } else {
      throw new Error(data.message || 'Error adding family');
    }
  } catch (error) {
    console.error('Error adding family:', error);
    throw error;
  }
};
