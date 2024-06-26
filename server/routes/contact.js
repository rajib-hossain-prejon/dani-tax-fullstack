const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { email, name, phone, caseNumber } = req.body;
  const nameArray = name?.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray?.slice(1)?.join(" ");

  const tempData = JSON.stringify({
    properties: {
      email: email,
      firstname: firstName || "",
      lastname: lastName || "",
      phone: phone,
      hs_lead_status: "NEW",
      case_number: caseNumber || "000000",
    },
  });


  const config = {
    method: "post",
    url: "https://api.hubapi.com/crm/v3/objects/contacts",
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: tempData,
  };

  try {
    const response = await axios(config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in HubSpot API request:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
