import classnames from 'classnames';

import { Logo } from '../logo';
import { LayoutProps } from './types';

export const Layout = function (props: LayoutProps) {
    const { center = false, loading = false, className= '', children, } = props;

    return (
        <div className={classnames('screen', className)}>
            <Logo />
            <div className={classnames('contents', { center }, { done: !loading })}>
                { children }
                <div className="loading"></div>
            </div>
        </div>
    );
}