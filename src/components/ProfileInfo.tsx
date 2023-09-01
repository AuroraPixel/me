import { Backpack, Github, Linkedin, Mail, MapPin } from 'lucide-react'
// import { Twemoji } from '~/components/Twemoji'
// import { siteMetadata } from '~/data/siteMetadata'
// import XIcon from '~/icons/x.svg'

import SocialIcon from "@/components/social-icons";

export function ProfileCardInfo({siteMetadata}: any) {
    //let { t } = useTranslation('common')
    const { author, occupation, company, email, github } = siteMetadata

    return (
        <div className="hidden py-4 xl:block xl:px-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{author}</h3>
            <h5 className="py-2 text-gray-700 dark:text-gray-400">{occupation}</h5>
            <div className="mb-2 mt-4 space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-200">
                    <Backpack strokeWidth={1} size={20} />
                    <p className="flex items-center px-2 space-x-1">
                        <span>{company}</span>
                    </p>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-200">
                    <MapPin strokeWidth={1} size={20} />
                    <p className="px-2">
                        苏州 - 中国,
                        <span className="absolute ml-1 inline-flex pt-px">
              {/*<Twemoji emoji="flag-vietnam" />*/}
            </span>
                    </p>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-200">
                    {/*<Mail strokeWidth={1} size={20} />*/}
                    {/*<a className="px-2" href={`mailto:${siteMetadata.email}`}>*/}
                    {/*    {siteMetadata.email}*/}
                    {/*</a>*/}
                </div>
                <div className="flex gap-2.5 items-center text-gray-700 dark:text-gray-200">
                    <a
                        target="_blank"
                        href={"#"}
                        rel="noreferrer"
                        className="hover:underline text-sm flex items-center"
                        data-umami-event="profile-card-github"
                    >
                        <SocialIcon kind="mail" href={`mailto:${email}`} />
                    </a>
                    <span className="text-gray-400 dark:text-gray-500">|</span>
                    <a
                        target="_blank"
                        href={github}
                        rel="noreferrer"
                        className="hover:underline text-sm flex items-center"
                        data-umami-event="profile-card-linkedin"
                    >
                        <SocialIcon kind="github" href={github} />
                    </a>
                </div>
            </div>
        </div>
    )
}