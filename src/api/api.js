const APIURL = 'http://localhost:3000';

export const registerUser = async (userData) => {
  const response = await fetch(`${APIURL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const registerJson = await response.json();
  return registerJson;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${APIURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const loginJson = await response.json();
  return loginJson;
};

export const getUserDetails = async (token) => {
  const response = await fetch(`${APIURL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const detailsJson = await response.json();
  return detailsJson;
};

export const getCampaigns = async (token) => {
  const response = await fetch(`${APIURL}/campaigns`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const campaignsJson = await response.json();
  return Array.isArray(campaignsJson) ? campaignsJson : [];
};

export const getCampaignDetails = async (campaignId, token) => {
  const response = await fetch(`${APIURL}/campaigns/${campaignId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const campaignDetailsJson = await response.json();
  return campaignDetailsJson;
};

export const createCampaign = async (campaignData, token) => {
  const response = await fetch(`${APIURL}/campaigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(campaignData),
  });
  const newCampaignJson = await response.json();
  return newCampaignJson;
};

export const updateCampaign = async (campaignId, campaignData, token) => {
  const response = await fetch(`${APIURL}/campaigns/${campaignId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(campaignData),
  });
  const updatedCampaignJson = await response.json();
  return updatedCampaignJson;
};

export const getInteractiveMaps = async (campaignId, token) => {
  const response = await fetch(`${APIURL}/campaigns/${campaignId}/maps`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const mapsJson = await response.json();
  return mapsJson;
};

export const getInteractiveMapDetails = async (mapId, token) => {
  const response = await fetch(`${APIURL}/maps/${mapId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const mapDetailsJson = await response.json();
  return mapDetailsJson;
};

export const createInteractiveMap = async (campaignId, mapData, token) => {
  const response = await fetch(`${APIURL}/campaigns/${campaignId}/maps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(mapData),
  });
  const newMapJson = await response.json();
  return newMapJson;
};

export const updateInteractiveMap = async (mapId, mapData, token) => {
  const response = await fetch(`${APIURL}/maps/${mapId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(mapData),
  });
  const updatedMapJson = await response.json();
  return updatedMapJson;
};