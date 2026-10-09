import BASE_URL from "./api";

export const addFavourite = async (destinationId, token) => {
  const response = await fetch(`${BASE_URL}/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ destinationId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getFavourites = async (token) => {
  const response = await fetch(`${BASE_URL}/favourites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const removeFavourite = async (destinationId, token) => {
  const response = await fetch(`${BASE_URL}/favourites/${destinationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
