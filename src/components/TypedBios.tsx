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
                <li>不要让挫折感把你吞噬，你就一定会成功。</li>
                <li>不要惋惜以前的努力需要重来，有些路，注定不能省略!</li>
                <li>再长的路，一步步也能走完，再短的路，不迈开双脚也无法到达。</li>
            </ul>
            <span ref={elRef} className="text-neutral-900 dark:text-neutral-200"/>
        </div>
    )
}
