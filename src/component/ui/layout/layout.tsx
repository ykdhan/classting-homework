import classnames from 'classnames';

import { Logo } from '../logo';
import { LayoutProps } from './types';

export const Layout = function (props: LayoutProps) {
    const { center = false, layer, className= '', children, } = props;

    return (
        <div className={classnames('screen', className)}>
            <Logo />
            <div className={classnames('contents', { center }, { 'show-layer': layer && layer.on })}>
                { children }
                <div className={classnames('layer', { loading: layer && layer.type === 'loading'})}>
                    {
                        layer && layer.type !== 'loading' && 
                        <div className="result">
                            { layer.correct 
                                ? <p><span>정답</span>입니다!</p> : <p>오답입니다.</p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}