export const TEAMS_DATA = [
    {
        id: 1,
        name: 'شهید خرازی',
        score: 6000000,
        avatar: 'https://placehold.co/100x100/222/fff?text=1',
        rank: 1,
    },
    {
        id: 2,
        name: 'شهید همت',
        score: 5500000,
        avatar: 'https://placehold.co/100x100/222/fff?text=2',
        rank: 2,
    },
    {
        id: 3,
        name: 'شهید آوینی',
        score: 5000000,
        avatar: 'https://placehold.co/100x100/222/fff?text=3',
        rank: 3,
    },
    {
        id: 4,
        name: 'شهید دلاوری',
        score: 4000000,
        avatar: 'https://placehold.co/100x100/222/fff?text=4',
        rank: 4,
    },
    {
        id: 5,
        name: 'شهید رضائی',
        score: 3900000,
        avatar: 'https://placehold.co/100x100/222/fff?text=5',
        rank: 5,
    },
    {
        id: 6,
        name: 'شهید نوری',
        score: 3800000,
        avatar: 'https://placehold.co/100x100/222/fff?text=6',
        rank: 6,
    },
    {
        id: 7,
        name: 'شهید دلاوری',
        score: 3000000,
        avatar: 'https://placehold.co/100x100/222/fff?text=7',
        rank: 7,
    },
    {
        id: 8,
        name: 'شهید رضائی',
        score: 2900000,
        avatar: 'https://placehold.co/100x100/222/fff?text=8',
        rank: 8,
    },
    {
        id: 9,
        name: 'شهید نوری',
        score: 2800000,
        avatar: 'https://placehold.co/100x100/222/fff?text=9',
        rank: 9,
    },
];

export const MY_TEAM_DATA = {
    id: 10,
    name: 'شهید سلیمانی',
    score: 3000000,
    avatar: 'https://placehold.co/100x100/222/fff?text=QS',
    members: [
        {
            id: 1,
            name: 'ناهید مجیدی',
            role: 'سرگروه',
            avatar: 'https://placehold.co/100x100/222/fff?text=NM',
        },
        {
            id: 2,
            name: 'مینا علیاری',
            role: 'عضو تیم',
            avatar: 'https://placehold.co/100x100/222/fff?text=MA',
        },
        {
            id: 3,
            name: 'نازنین بیاتی',
            role: 'عضو تیم',
            avatar: 'https://placehold.co/100x100/222/fff?text=NB',
        },
        {
            id: 4,
            name: 'مینا غلامی',
            role: 'عضو تیم',
            avatar: 'https://placehold.co/100x100/222/fff?text=MG',
        },
        {
            id: 5,
            name: 'زهره کاظمی',
            role: 'عضو تیم',
            avatar: 'https://placehold.co/100x100/222/fff?text=ZK',
        },
    ],
};

export const ANNOUNCEMENTS_DATA = [
    {
        id: 1,
        title: 'خوش آمدید',
        date: '1404/06/10',
        time: '12:30',
        content:
            'برای انجام چالش های جدید آماده ای ؟',
    },
];

export const GIFTS_DATA = [
    {
        id: 1,
        title: 'برترین تیم',
        reward: 1000,
        icon: '⭐',
        color: 'bg-yellow-500',
        claimed: true,
    },
    {
        id: 2,
        title: 'جایزه روزانه',
        reward: 1000,
        icon: '🏅',
        color: 'bg-gray-300',
        claimed: true,
    },
    {
        id: 3,
        title: 'بهترین نظرات ثبت شده ماموریت اول',
        reward: 1000,
        icon: '👍',
        color: 'bg-red-500',
        claimed: false,
    },
];

export const GAMES_DATA = [
    {
        id: 1,
        title: 'بازی ماشینی',
        description:
            'بازی رو اجرا در پایان بازی به صورت خودکار امتیاز اضافه میشه',
        icon: '🚗',
        color: 'bg-yellow-500',
    },
    {
        id: 2,
        title: 'صندوقچه بازی',
        description:
            'بازی رو اجرا در پایان بازی به صورت خودکار امتیاز اضافه میشه',
        icon: '📦',
        color: 'bg-blue-400',
    },
    {
        id: 3,
        title: 'عملیات خیبر 5',
        description:
            'بازی رو اجرا در پایان بازی به صورت خودکار امتیاز اضافه میشه',
        icon: '💣',
        color: 'bg-gray-600',
    },
    {
        id: 4,
        title: 'بازی دورهمی',
        description:
            'بازی انجام بدید و qr code اسکن تا جایزه دریافت کنید',
        icon: '🎲',
        color: 'bg-purple-500',
    },
    {
        id: 5,
        title: 'زندگی نامه شهید',
        description:
            'بازی انجام بدید و qr code اسکن تا جایزه دریافت کنید',
        icon: '📖',
        color: 'bg-red-500',
    },
];

export const VIDEO_MISSION_DATA = {
    title: 'تماشا ویدیو تاریخ تمدن',
    totalSteps: 7,
    videoThumbnail:
        'https://placehold.co/600x400/222/fff?text=Video',
};

export const QUESTIONS_DATA = [
    {
        id: 1,
        question:
            'کدام یک از موارد زیر مهم‌ترین ویژگی این مکان محسوب می‌شود؟',
        options: [
            'گزینه ۱',
            'گزینه ۲',
            'گزینه ۳',
            'گزینه ۴',
        ],
        correctAnswer: 'گزینه ۱',
    },
    {
        id: 2,
        question:
            'سوال دوم در مورد چه موضوعی است؟',
        options: [
            'پاسخ الف',
            'پاسخ ب',
            'پاسخ ج',
            'پاسخ د',
        ],
        correctAnswer: 'پاسخ ج',
    },
];

export const PUZZLE_DATA = {
    completed: 1,
    inProgress: 2,
    total: 6,
    totalRewards: 200,
    pieces: [
        {
            id: 1,
            title: 'معمای شب اول کتاب راز ها',
            status: 'unlocked',
            action: 'scan',
        },
        {
            id: 2,
            title: 'معمای شب دوم',
            status: 'locked',
        },
        {
            id: 3,
            title: 'کارت شناسایی شهید',
            status: 'locked',
        },
        {
            id: 4,
            title: 'معمای شب سوم',
            status: 'locked',
        },
        {
            id: 5,
            title: 'مدال افتخار',
            status: 'locked',
        },
        {
            id: 6,
            title: 'کیف رمزگشایی',
            status: 'locked',
        },
    ],
};
