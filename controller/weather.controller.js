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
    console.log("API KEY:", process.env.WEATHER_API_KEY);

    // Get weather from OpenWeatherMap
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: location,
          appid: "b58c2369ce92ce6378226ea88065a19e",
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
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
