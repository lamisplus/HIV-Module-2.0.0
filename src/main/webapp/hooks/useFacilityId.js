import { useState, useEffect } from "react";
import axios from "axios";

const useFacilityId = (baseUrl, token) => {
  const [facilityId, setFacilityId] = useState(null);

  useEffect(() => {
    const fetchFacilityId = async () => {
      try {
        const response = await axios.get(`${baseUrl}account`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const organisationUnitId = response.data.currentOrganisationUnitId;
        localStorage.setItem("facId", organisationUnitId);
        setFacilityId(organisationUnitId);
      } catch (error) {
        console.error("Error fetching facility ID:", error);
      }
    };

    fetchFacilityId();
  }, [baseUrl, token]);

  return facilityId;
};

export default useFacilityId;
