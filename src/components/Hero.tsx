import React, {ReactElement, useEffect, useRef} from 'react'
import {renderCanvas} from './renderCanvas'
import {TypedBios} from "@/components/TypedBios";
import {ProfileCard} from "@/components/ProfileCard";
import Twemoji from "@/components/Twemoji";

export default function Hero({siteMetadata}: any): ReactElement {
    const ref = useRef<HTMLHeadingElement>(null)
    useEffect(() => {
        renderCanvas()
        ref.current?.classList.add('transition-in')
    }, [])
    return (
        <div>
            <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
            <div className=" divide-y divide-gray-200 dark:divide-gray-700">
                <div ref={ref} className="px-4 space-y-2 md:my-4 md:space-y-5 md:pb-8 md:pt-6 xl:grid xl:grid-cols-3">
                    <div className={'tmd:pr-8 xl:col-span-2 space-y-6 md:space-y-8'}>
                        <div className="text-base leading-7 md:text-lg md:leading-8 text-black dark:text-white">
                            <div className={'title whitespace-nowrap mb-8 text-3xl md:text-5xl'}>
                                <span className={'first '}>
                                    Code
                                </span>&nbsp;your way
                                <br/>
                                <div className={'second ml-[150px] mt-5'}>
                                    to the future.
                                </div>
                            </div>
                            <TypedBios/>
                        </div>

                    </div>
                    <div className={'hidden xl:block h-[20px]'}>
                        <ProfileCard siteMetadata={siteMetadata}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
