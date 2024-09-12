"use client";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { ReactNode } from "react";
import { FaInstagram, FaXTwitter, FaGithub, FaLinkedinIn, FaChevronRight } from "react-icons/fa6"

type ButtonSize = "sm" | "md" | "lg" | undefined;

interface SocialLinkProps {
    href: string;
    icon: ReactNode;
    size: ButtonSize;
}

function SocialLink({ href, icon, size }: SocialLinkProps) {
    return (
        <Link href={href} isExternal className="bg-[#D4D4D8] dark:bg-[#3f3f47] flex items-center justify-center rounded-[10px] p-2">
            <Button isIconOnly startContent={icon} size={size} />
        </Link>
    )
}

interface FooterLinkProps {
    text: string;
}

function FooterLink({ text }: FooterLinkProps) {
    return (
        <p className="group flex cursor-pointer items-center justify-center gap-1">
            <span
                className="footerLink hidden group-hover:block group-hover:animate-spin"
                style={{ animationIterationCount: 1, animationDuration: "0.3s" }}>
                <FaChevronRight size={12} />
            </span>
            {text}
        </p>
    )
}

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const departments = [
        "Keyboard and Mouse",
        "Monitors",
        "Audio",
        "Peripherals",
        "Gamer Space"
    ]
    const institucionals = [
        "About Gamtech",
        "Terms and conditions",
        "Exchange and Returns Policy",
        "Security and Privacy Policy",
        "Cookies Policy"
    ]
    const helps = [
        "How to buy",
        "Deadlines and deliveries",
        "Payment Methods",
        "Partner Program",
        "Frequently Asked Questions"
    ]

    return (
        <footer className="mx-auto w-full cursor-default items-center justify-center bg-white pt-8 shadow-xl md:px-0 dark:bg-[#181717] dark:border-t dark:border-gamtech">
            <section className="flex flex-col items-center justify-around gap-y-4 px-4 pb-8 shadow-xl md:flex-row md:gap-y-0 dark:bg-[#181717]">
                <Link href="/">
                    <Image src="/gamtech.png" alt="Foxtech" width={200} height={50} style={{ objectFit: 'contain' }} className="h-auto w-52" />
                </Link>
                <p className="text-sm">
                    &copy;{currentYear}Gamtech - All rights reserved.
                </p>
                <div className="flex gap-1">
                    <SocialLink
                        href="https://www.instagram.com/"
                        icon={<FaInstagram size={20} />}
                        size="sm"
                    />
                    <SocialLink
                        href="https://twitter.com/"
                        icon={<FaXTwitter size={20} />}
                        size="sm"
                    />
                    <SocialLink
                        href="https://github.com/sasuke914"
                        icon={<FaGithub size={20} />}
                        size="sm"
                    />
                    <SocialLink
                        href="https://www.linkedin.com/in/"
                        icon={<FaLinkedinIn size={20} />}
                        size="sm"
                    />
                </div>
            </section>
            <div className="bg-zinc-200/60 px-4 py-6 dark:bg-[#111111]">
                <section className="flex flex-col items-center justify-center gap-3 text-center text-xs md:flex-row">
                    <div className="flex flex-col w-full gap-1">
                        <h3 className="text-base font-medium uppercase">Departments</h3>
                        {departments.map((item, index) => (
                            <FooterLink key={index} text={item} />
                        ))}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <h3 className="text-base font-medium uppercase">Institucionals</h3>
                        {institucionals.map((item, index) => (
                            <FooterLink key={index} text={item} />
                        ))}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <h3 className="text-base font-medium uppercase">Doubts</h3>
                        {helps.map((item, index) => (
                            <FooterLink key={index} text={item} />
                        ))}
                    </div>
                </section>
                <section className="mx-auto flex flex-col items-center justify-center gap-2 pt-4 text-center text-xs">
                    <h3 className="text-base font-medium uppercase">Service</h3>
                    <p>
                        Opening hours: 09:00 to 19:00 - Monday to Saturday, Brasília time (Except Sunday and holidays)
                    </p>

                    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                        <div className="flex items-center justify-center gap-2">
                            <h3 className="font-medium uppercase">Customer Service Center - </h3>
                            <p>(12) 9999-9999</p>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <h3 className="font-medium uppercase">E-mail - </h3>
                            <p>contato@gamtech.com</p>
                        </div>
                    </div>

                    <p className="py-2 text-center">
                        WE ARE E-COMMERCE - WE DO NOT HAVE LOCAL SERVICE
                    </p>
                </section>
            </div>
        </footer>
    )
}