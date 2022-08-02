// import { useRecoilState } from 'recoil';
import { useCountTime } from '../../hook/useCountTime';

// import { timerState } from '../../recoil/states';

export const Timer = function () {
    const time = useCountTime();

    return (
        <div className='timer'>
            <span>
                { `${Math.floor(time / 60)} : ${time % 60 < 10 ? '0' + time % 60 : time % 60}` }
            </span>
        </div>
    );
}
