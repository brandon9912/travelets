const axios = require("axios");

const tripController = {
  getPlacesbyKeyword: (req, res) => {
    const { keyword, radius } = req.query;

    const googleMapKey = process.env.GOOGLE_API_KEY;
    const googleMapUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&key=${googleMapKey}&radius=${radius}`;
    axios
      .get(googleMapUrl)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.results.length);
        res.status(200).json({
          message: "Get Google Map Places successfully",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  },
};

module.exports = tripController;
