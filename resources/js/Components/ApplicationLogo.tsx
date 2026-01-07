import { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export default function ApplicationLogo(props: Props) {
    return (
        <img
            src="img/Logo Only.png"
            alt="Application Logo"
            {...props}
        />
    );
}
