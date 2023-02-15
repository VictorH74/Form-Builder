import { FormContext } from "@/contexts/FormContext";
import { useContext } from "react";

const useForm = () => useContext(FormContext);

export default useForm