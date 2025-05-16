
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirigir a la landing page
    navigate("/");
  }, [navigate]);

  return <div>Redirigiendo a la página principal...</div>;
};

export default Index;
