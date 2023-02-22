import './Button.css';
import { Link } from "react-router-dom";

interface Props {
    children: string
}

export const MainButton = ({ children }: Props) => {
    return (
        <Link to="/add" className="add">{children}</Link>
    )
};