import { GET_IP_API, GET_GEO_API, API_KEY } from "./config";
import { checkIP, checkEmail, checkDomain } from "./helpers";

import "core-js/stable";
import "regenerator-runtime/runtime";

export const state = {
  ip: "",
  coords: "",
  inputParameter: "",
  searchQuery: "",
  results: {},
};

const createResultsObject = (data) => {
  return {
    ip: data.ip,
    lat: data.location.lat,
    lng: data.location.lng,
    locationCity: data.location.city,
    locationRegion: data.location.region,
    timezone: data.location.timezone,
    isp: data.isp,
  };
};

export const loadClientIP = async () => {
  try {
    const response = await fetch(GET_IP_API);
    const { ip } = await response.json();
    state.ip = ip;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadLocationCoords = async (address, inputParameter) => {
  try {
    const response = await fetch(
      `${GET_GEO_API}Key=${API_KEY}&${inputParameter}=${address}`
    );
    const data = await response.json();
    state.results = createResultsObject(data);
    state.coords = [state.results.lat, state.results.lng];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const validateInput = (input) => {
  if (checkEmail(input)) {
    state.inputParameter = "email";
    return;
  }
  if (checkIP(input)) {
    state.inputParameter = "ipAddress";
    return;
  }
  if (checkDomain(input)) {
    state.inputParameter = "domain";
    return;
  } else {
    state.inputParameter = "ipAddress";
  }
};
