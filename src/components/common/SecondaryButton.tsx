import './Button.css';

interface Props {
    children: string

}

export const SecondaryButton = ({ children }: Props) => (
    <button>{children}</button>
)