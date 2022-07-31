import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { timerState } from '../../recoil/states';

export const Timer = function () {
    const [ _timer, _setTimer ] = useRecoilState(timerState);

    useEffect(() => {
        let timerInterval = setInterval(() => {
            _setTimer(_timer + 1);
        }, 1000);

        return ()=> {
            clearInterval(timerInterval);
        };
    })

    return (
        <div className='timer'>
            <span>
                { `${Math.floor(_timer / 60)} : ${_timer % 60 < 10 ? '0' + _timer % 60 : _timer % 60}` }
            </span>
        </div>
    );
}