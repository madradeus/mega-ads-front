import './Button.css';

interface Props {
    children: string
}

export const MainButton = ({ children }: Props) => {
    return (
        <button className="add">{children}</button>
    )
};