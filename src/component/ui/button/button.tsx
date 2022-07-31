import classnames from 'classnames';

import { ButtonProps } from './types';

export const Button = function (props: ButtonProps) {
    const { block = false, round = false, filled = false, disabled = false, children, onClick } = props;

    const handleClick = () => {
        onClick && onClick();
    }

    return (
        <button 
            className={classnames('btn', {block}, {round}, {filled})} 
            disabled={disabled} 
            onClick={handleClick} 
        >
            { children }
        </button>
    );
}