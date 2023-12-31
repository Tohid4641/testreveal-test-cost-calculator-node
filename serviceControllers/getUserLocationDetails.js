const getGeoDetails = require("../apiCalls/geoplugingApiCall");
const requestIp = require("request-ip");

exports.getUserLocationDetails = async (ipAddress) => {

  try {
    // Make custom variables for location details
    let user_location = "";
    let user_ip = "";
    let user_currencyCode;
    let currencyCode_set;
    let user_countryCode;
    let countryCode_set;
    let user_geoplugin_currencyConverter;
    let currency_set;
    let user_currencysymbol;
    let curr_sym_set;
    let user_ContinentName;
    let location_set = "";
    let user_city = "";
    let user_region = "";
    let user_CountryName = "";
    const response = await getGeoDetails(ipAddress == "::1" ? "127.0. 0.1" : ipAddress);

    // Here response is geoPlugin api call response which gives object of location details
    if (response !== false && response !== "") {
      // Iterate response object
      for (const i in response) {
        // Check if response is not null
        if (response[i] !== null && response[i] !== "") {
          if (i == "geoplugin_request") {
            user_ip = response[i] ? response[i] : "";
          } else if (i == "geoplugin_city") {
            user_city = response[i] ? response[i] : "";
            user_location += user_city+ " ";
          } else if (i == "geoplugin_region") {
            user_region = response[i] ? response[i] : "";
            user_location += user_region+ " ";
          } else if (i == "geoplugin_countryName") {
            user_CountryName = response[i] ? response[i] : "";
            user_location += user_CountryName+ " ";
          } else if (i == "geoplugin_currencyCode") {
            user_currencyCode = response[i] ? response[i] : "";
            currencyCode_set = response[i] ? 1 : 0;
          } else if (i == "geoplugin_countryCode") {
            user_countryCode = response[i] ? response[i] : "";
            countryCode_set = response[i] ? 1 : 0;
          } else if (i == "geoplugin_currencyConverter") {
            user_geoplugin_currencyConverter = response[i] ? response[i] : "";
            currency_set = response[i] ? 1 : 0;
          } else if (i == "geoplugin_currencySymbol_UTF8") {
            user_currencysymbol = response[i] ? response[i] : "";
            curr_sym_set = response[i] ? 1 : 0;
          } else if (i == "user_ContinentName") {
            user_ContinentName = response[i] ? response[i] : "North America";
          }
        }
      }
    } else {
      user_location = "Couldn't Find Location";
      currencyCode_set = 0;
      currency_set = 0;
      location_set = 0;
      user_city = "";
      user_region = "";
      user_CountryName = "";
      user_countryCode = "";
    }
    if (user_location.trim() == "") {
      user_location = "Couldn't Find Any Location";
      currencyCode_set = 0;
      currency_set = 0;
      location_set = 0;
      user_city = "";
      user_region = "";
      user_CountryName = "";
      user_countryCode = "";
    }

    return {
      user_location_data: {
        user_location,
        currencyCode_set,
        currency_set,
        location_set,
        user_city,
        user_region,
        user_CountryName,
        user_countryCode,
      },
      fpc_calculation_data: {
        user_geoplugin_currencyConverter,
        currency_set,
        curr_sym_set,
        currencyCode_set,
        user_currencyCode,
        user_currencysymbol,
      },
    };
  } catch (error) {
    return error.message;
  }
};
