const environment = () => {
  let config = {};
  if (process.env.NODE_ENV === "development") {
    config.URL = process.env.REACT_APP_LOCAL_API;
    config.MAPBOX_TOKEN = process.env.REACT_APP_MAP_LOCAL_TOKEN;
  } else {
    config.URL = process.env.REACT_APP_API;
    config.MAPBOX_TOKEN = process.env.REACT_APP_MAP_PUBLIC_TOKEN;
  }
  return config;
};

const config = environment();

export default config;
