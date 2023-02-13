import './Button.css';

interface Props {
    children: string

}

export const SecondaryButton = ({ children }: Props) => (
    <button className="search">{children}</button>
)