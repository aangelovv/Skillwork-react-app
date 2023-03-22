import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import * as projectService from "../../services/projectService";
import { useState, useEffect } from "react";

const Details = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const params = useParams();

  const [project, setProject] = useState([]);

  useEffect(() => {
    projectService
      .getById(params.projectId)
      .then((result) => setProject(result));
  }, [params.projectId]);

  return <h1> aaaaaaaaaaaaa</h1>;
};

export default Details;
