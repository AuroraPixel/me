import React, {ReactElement, useEffect, useRef} from 'react'
import {renderCanvas} from './renderCanvas'
import {TypedBios} from "@/components/TypedBios";
import {ProfileCard} from "@/components/ProfileCard";

export default function Hero({siteMetadata}: any): ReactElement {
    const ref = useRef<HTMLHeadingElement>(null)
    useEffect(() => {
        renderCanvas()
        ref.current?.classList.add('transition-in')
    }, [])
    return (
        <div>
            <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
            <div className="relative z-10 h-[calc(100vh_-_135px)]">
                <div ref={ref} className="px-4 text-3xl md:text-4xl mt-12">
                    <div className={'text-4xl md:text-5xl'}>
                        {siteMetadata.welcome}
                    </div>
                    <div className={'mt-10'}>
                        <TypedBios/>
                    </div>
                </div>
                <div className={'hidden py-4 xl:block  w-1/3 mt-32 ml-auto'}>
                    <ProfileCard siteMetadata={siteMetadata}/>
                </div>
            </div>
        </div>
    )
}
