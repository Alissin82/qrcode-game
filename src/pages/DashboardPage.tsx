import { useContext, useMemo } from "react";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { TbCoinFilled } from "react-icons/tb";
import { MdOutlineMilitaryTech } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BellIcon from "../components/ui/icons/BellIcon";
import SettingsIcon from "../components/ui/icons/SettingIcon";
import Menu from "../components/ui/Menu";
import Upgrade from "../components/ui/Upgrade";
import { TeamDataContext } from "../contexts/TeamDataContext.ts";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: team } = useContext(TeamDataContext);

  // 🌈 تم رنگی بر اساس جنسیت
  const className = useMemo(() => {
    if (team?.gender === true) {
      return "bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900"; // پسر
    } else {
      return "bg-gradient-to-br from-pink-700 via-rose-600 to-red-700"; // دختر
    }
  }, [team]);

  // 📦 کارت‌های لینک‌دار
  const boxes = [
    {
      title: "جوایز ویژه",
      desc: "برو جایزتو بگیر 🎁",
      icon: <FaTrophy size={36} />,
      color: "from-pink-500 to-rose-500",
      glow: "shadow-pink-400/50",
      link: "/gifts",
    },
    {
      title: "ماموریت‌ها",
      desc: "بزن بریم ماوریت ها رو انجام بدیم 🚀",
      icon: <MdOutlineMilitaryTech size={36} />,
      color: "from-indigo-500 to-blue-500",
      glow: "shadow-indigo-400/50",
      link: "/missions",
    },
    {
      title: "تیم من",
      desc: "اعضا و رتبه تیم رو ببین 👥",
      icon: <FaUsers size={36} />,
      color: "from-green-500 to-emerald-500",
      glow: "shadow-green-400/50",
      link: "/teams",
    },
  ];

  return (
    <div className={`min-h-screen ${className} font-sans text-white`}>
      <div className="relative mx-auto w-full max-w-xl p-4 pb-24">
        {/* هدر */}
        <header className="mb-6 flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md p-4 shadow-lg">
          <div className="flex items-center gap-3 text-right">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                <img src="/images/logo3.jpg" alt="User Avatar" />
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">{team?.name}</p>
              <p className="text-sm opacity-70">پروفایل تیم</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="btn btn-square btn-ghost bg-white/20 hover:bg-white/30"
              onClick={() => navigate("/settings")}
            >
              <SettingsIcon />
            </button>
            <div className="indicator" onClick={() => navigate("/notifications")}>
              <button className="btn btn-square btn-ghost bg-white/20 hover:bg-white/30">
                <BellIcon />
              </button>
            </div>
          </div>
        </header>

        {/* امتیاز و سکه */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <section className="flex w-1/2 items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md p-4 shadow-lg hover:scale-105 hover:rotate-1 transition">
            <div className="rounded-full bg-indigo-400/80 p-2">{<FaTrophy size={24} />}</div>
            <span className="text-2xl font-extrabold tracking-widest text-indigo-300 drop-shadow">
              {team?.score ?? 0}
            </span>
          </section>
          <section className="flex w-1/2 items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md p-4 shadow-lg hover:scale-105 -hover:rotate-1 transition">
            <div className="rounded-full bg-yellow-400 p-2 text-black">{<img src="/images/coin_1fa99.png" width={24} height={24} alt="nist"/>}</div>
            <span className="text-2xl font-extrabold tracking-widest text-yellow-400 drop-shadow">
              {team?.coin ?? 0}
            </span>
          </section>
        </div>

        {/* کارت‌های لینک‌دار (متفاوت از Navigation) */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {boxes.map((box, i) => (
            <div
              key={i}
              onClick={() => navigate(box.link)}
              className={`cursor-pointer rounded-2xl p-5 bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4 
              transform transition duration-300 hover:scale-105 hover:-rotate-1 shadow-xl ${box.glow}`}
            >
              {/* آیکون داخل دایره گرادیانت */}
              <div className={`p-4 rounded-full bg-gradient-to-br ${box.color} shadow-md`}>
                {box.icon}
              </div>
              {/* متن داخل کارت */}
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">{box.title}</h3>
                <p className="text-sm opacity-80">{box.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* بخش ارتقا */}
        <Upgrade />
      </div>

      {/* منو پایین (ساده‌تر) */}
      <Menu />
    </div>
  );
};

export default DashboardPage;
