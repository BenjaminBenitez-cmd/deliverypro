const config = () => {
  let config = {};
  if (process.env.NODE_ENV === "development") {
    config.URL = process.env.REACT_APP_LOCAL_API;
    console.log(process.env.REACT_APP_LOCAL_MAPBOX);
    config.MAPBOX_TOKEN = process.env.REACT_APP_LOCAL_MAPBOX;
  } else {
    config.URL = process.env.REACT_APP_PUBLIC_API;
    config.MAPBOX_TOKEN = process.env.REACT_APP_PUBLIC_MAPBOX;
  }
  return config;
};

export default config();
