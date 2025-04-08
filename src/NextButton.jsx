
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function NextButton() {
    const navigate = useNavigate();

    return <Button onClick={(e) => {
        e.preventDefault()
        navigate("/")
    }} type='next'>Next &rarr;</Button>
}

export default NextButton;