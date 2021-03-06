// hooks
import { useState, FormEvent, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
// apis
import navedexApi from "../services/navedexApi";
// contexts
import { ModalContext } from "../hooks/modal";

const useCreateNaver = () => {
  // naver data
  const [name, setName] = useState("");
  const [job_role, setRole] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [admission_date, setAdmissionDate] = useState("");
  const [project, setProject] = useState("");
  const [url, setUrl] = useState("");

  // naver creating status
  const [creatingStatus, setCreatingStatus] = useState("inactive");

  // using modal context
  const modalContext = useContext(ModalContext);

  const history = useHistory();

  const handleCreateNaverSubmit = async (e: FormEvent) => {
    // prevent form standard refresh on submit
    e.preventDefault();

    // creating naver in navedex api
    await navedexApi
      .post(
        "navers",
        {
          name,
          job_role,
          birthdate,
          admission_date,
          project,
          url,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setCreatingStatus("created");
      })
      .catch((err) => {
        alert(err);
        setCreatingStatus("error");
      });
  };

  useEffect(() => {
    // if naver was been created, then
    if (creatingStatus === "created") {
      modalContext?.handleActive("naver-created");
      setTimeout(() => {
        history.push("/navers");
        setCreatingStatus("inactive");
      }, 1000);
    } else if (creatingStatus === "error") {
      modalContext?.handleActive("naver-create-error");
      setCreatingStatus("inactive");
    }
  }, [creatingStatus, history, modalContext]);

  return {
    name,
    setName,
    job_role,
    setRole,
    birthdate,
    setBirthDate,
    admission_date,
    setAdmissionDate,
    project,
    setProject,
    url,
    setUrl,
    handleCreateNaverSubmit,
  };
};

export default useCreateNaver;
