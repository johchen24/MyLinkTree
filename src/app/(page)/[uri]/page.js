import mongoose from "mongoose";
import { Page } from "@/models/pageSchema";
import { User } from "@/models/userSchema";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaSquareInstagram, FaDiscord } from "react-icons/fa6";
import { FaFacebook, FaTiktok, FaYoutube, FaGithub, FaTelegram } from "react-icons/fa";
import { Event } from "@/models/eventSchema";

export default async function UserPage({ params }) {
    const { uri } = await params;
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({ uri }).lean();
    const user = await User.findOne({ email: page.owner }).lean();
    await Event.create({uri:uri, type:'view', page: uri});

    // Build social links based on saved `buttons` map
    const buttons = page?.buttons || {};

    const normalizeUsername = (val) => (val || "").toString().trim().replace(/^@/, "");
    const makeUrl = (kind, val) => {
        const v = (val || "").toString().trim();
        if (!v) return null;
        if (v.startsWith("http://") || v.startsWith("https://")) return v;
        switch (kind) {
            case "instagram":
                return `https://instagram.com/${normalizeUsername(v)}`;
            case "facebook":
                return `https://facebook.com/${normalizeUsername(v)}`;
            case "discord":
                return `https://discord.com/${v}`;
            case "tiktok":
                return `https://tiktok.com/@${normalizeUsername(v)}`;
            case "youtube":
                return `https://youtube.com/${v}`;
            case "github":
                return `https://github.com/${normalizeUsername(v)}`;
            case "telegram":
                return `https://t.me/${normalizeUsername(v)}`;
            default:
                return v;
        }
    };

    const socials = [
        { key: "email", icon: MdEmail, href: buttons.email ? `mailto:${buttons.email}` : null },
        { key: "mobile", icon: MdPhone, href: buttons.mobile ? `tel:${buttons.mobile}` : null },
        { key: "instagram", icon: FaSquareInstagram, href: makeUrl("instagram", buttons.instagram) },
        { key: "facebook", icon: FaFacebook, href: makeUrl("facebook", buttons.facebook) },
        { key: "discord", icon: FaDiscord, href: makeUrl("discord", buttons.discord) },
        { key: "tiktok", icon: FaTiktok, href: makeUrl("tiktok", buttons.tiktok) },
        { key: "youtube", icon: FaYoutube, href: makeUrl("youtube", buttons.youtube) },
        { key: "github", icon: FaGithub, href: makeUrl("github", buttons.github) },
        { key: "telegram", icon: FaTelegram, href: makeUrl("telegram", buttons.telegram) },
    ].filter(s => !!s.href);

    return (
        <div className="bg-gray-200 min-h-screen">
            {/* Cover */}
            <div
                className="h-40 bg-gray-400 bg-cover bg-center"
                style={
                    page.bgType === 'color'
                        ? { backgroundColor: page.bgColor }
                        : { backgroundImage: `url(${page.bgImage})` }
                }
            />

            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mt-[-48px] rounded-full overflow-hidden border-4 border-white shadow">
                <Image className="object-cover w-full h-full" src={user.image} alt="avatar" width={256} height={256} />
            </div>

            {/* Basic info */}
            <div className="text-center mt-4 mb-4 px-4">
                <h2 className="text-3xl font-bold">{page.displayName}</h2>
                {page.location && (
                    <h3 className="text-lg text-gray-700 flex items-center gap-1 justify-center">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        <span>{page.location}</span>
                    </h3>
                )}
                {page.bio && <p className="text-gray-700 mt-1">{page.bio}</p>}
            </div>

            {/* Social icons */}
            {socials.length > 0 && (
                <div className="flex justify-center gap-4 mb-8">
                    {socials.map(({ key, icon: Icon, href }) => (
                        <a
                            key={key}
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noreferrer' : undefined}
                            className="w-12 h-12 rounded-full bg-white text-emerald-900 flex items-center justify-center shadow hover:scale-105 transition-transform"
                        >
                            <Icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}