import {useEffect, useRef} from 'react'
import Typed from 'typed.js'
import Twemoji from "@/components/Twemoji";

function createTypedInstance(el: HTMLElement) {
    return new Typed(el, {
        stringsElement: '#bios',
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        backDelay: 1000,
    })
}

export function TypedBios() {
    let elRef = useRef(null)
    let typedRef = useRef(null)
    useEffect(() => {
        const el = elRef.current;
        const typed = typedRef.current;

        const createTyped = () => {
            if (el && !typed) {
                typedRef.current = createTypedInstance(el);
            }
        };

        const destroyTyped = () => {
            if (typed) {
                typed.destroy();
                typedRef.current = null;
            }
        };

        createTyped();

        return () => {
            destroyTyped();
        };
    }, []);
    return (
        <div>
            <ul id="bios" className="hidden">
                {/*<li>{tr.t('bio_1')}</li>*/}
                <li>自在，轻盈，我本不想停留</li>
                <li>不要惋惜以前的努力需要重来，有些路，注定不能省略!</li>
                {/*<li>*/}
                {/*  {tr.t('bio_10')} <Twemoji emoji="dog" />*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  {tr.t('bio_11')}*/}
                {/*  <span className="ml-1">*/}
                {/*    <Twemoji emoji="soccer-ball" />,*/}
                {/*    <Twemoji emoji="man-swimming" />,*/}
                {/*    <Twemoji emoji="ping-pong" />,*/}
                {/*    <Twemoji emoji="volleyball" />*/}
                {/*  </span>*/}
                {/*</li>*/}
                {/*<li>{tr.t('bio_12')}</li>*/}
                {/*<li>*/}
                {/*  {tr.t('bio_13')} <Twemoji emoji="musical-keyboard" /> & <Twemoji emoji="guitar" />*/}
                {/*</li>*/}
                {/*<li>{tr.t('bio_14')}</li>*/}
                {/*<li>*/}
                {/*  {tr.t('bio_15')} <Twemoji emoji="chess-pawn" />*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  {tr.t('bio_16')} <Twemoji emoji="video-game" />.*/}
                {/*</li>*/}
            </ul>
            <span ref={elRef} className="text-neutral-900 dark:text-neutral-200"/>
        </div>
    )
}
