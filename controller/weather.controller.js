import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const { city, country } = req.body;

    if (!city) {
      return res.status(400).json({
        message: "City name is required",
      });
    }

    // Create the location
    const location = country ? `${city},${country}` : city;
    // console.log("API KEY:", process.env.WEATHER_API_KEY);

    // Get weather from OpenWeatherMap
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: location,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      },
    );

    // Send weather data to frontend
    res.status(200).json({
      message: "Weather fetched successfully",
      weather: response.data,
      success: true,
    });
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch weather data";
    res.status(status).json({
      message,
      success: false,
    });
  }
};
