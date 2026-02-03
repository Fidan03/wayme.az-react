import programming from '../assets/programming.png';
import design from '../assets/designer.png';
import data from '../assets/dataAnalyst.png';
import marketing from '../assets/marketoloq.png';
import prod from '../assets/prodMan.png';
import devops from '../assets/devops.png';
import hr from '../assets/hr.png';
import content from '../assets/content.png';


const DirectionsData = [
    {
        id: 0,
        icon: programming,
        title: "İnformasiya Texnologiyaları (IT)",
        description: "Frontend, Backend...",
        color: '#357CFF33',
        arrowColor:'#3379FB',
        textColor: '#8EC5FF',
        directions: [
            {
                id: 0,
                title: "Frontend proqramçı",
                description: "İstifadəçinin gördüyü sayt və tətbiq hissəsini hazırlayır. Düymələr, rənglər, formalar – hamısı onun işidir.",
            },
            {
                id: 1,
                title: "Backend proqramçı",
                description: "Saytın arxa tərəfində işləyir. Məlumatların saxlanması, istifadəçi məlumatları, sistemin işləməsi onun işidir.",
            },
            {
                id: 2,
                title: "Fullstack proqramçı",
                description: "Həm frontend, həm backend işlərini görür. Yəni saytı başdan sona qədər yığa bilir.",
            },
            {
                id: 3,
                title: "Mobil tətbiq proqramçısı",
                description: "Telefon üçün tətbiqlər hazırlayır (Android / iOS). Instagram, bank tətbiqləri kimi proqramlar.",
            },
            {
                id: 4,
                title: "Test mühəndisi (QA)",
                description: "Proqramları yoxlayır ki, səhv işləməsin. “Bu düymə niyə işləmir?” deyən adamdır",
            },
            {
                id: 5,
                title: "DevOps mühəndisi",
                description: "Proqramların serverdə problemsiz işləməsinə nəzarət edir. Saytın çökməməsi onun məsuliyyətidir.",
            }, 
            {
                id: 6,
                title: "Data analitik",
                description: "Məlumatlara baxıb nəticə çıxarır. “İstifadəçilər nə edir, harada problem var?” suallarına cavab tapır.",
            }
        ]
    },
    {
        id: 1,
        icon: design,
        title: "Dizayn və Kreativ",
        description: "UX/UI, Motion, Grafik...",
        color: '#B656FF33',
        arrowColor:'#AB4DF4',
        textColor: '#DAB2FF',
        directions: [
            {
                id: 0,
                title: "UI/UX dizayner",
                description: "Sayt və tətbiqin həm gözəl, həm rahat olmasını təmin edir. İstifadəçi harada klikləməlidir – onu düşünür.",
            },
            {
                id: 1,
                title: "Qrafik dizayner",
                description: "Poster, banner, loqo və vizuallar hazırlayır. Görünən dizayn işləri onun sahəsidir.",
            },
            {
                id: 2,
                title: "Məhsul dizayneri",
                description: "Məhsulun ümumi görünüşünü və istifadə rahatlığını dizayn edir. Dizayn + istifadəçi təcrübəsi birlikdədir.",
            },
            {
                id: 3,
                title: "Motion dizayner",
                description: "Hərəkətli dizaynlar hazırlayır. Animasiya və video effektlər onun işidir.",
            }
        ]
    },
    {
        id: 2,
        icon: data,
        title: "Məlumat və Analitika",
        description: "SQL, Python, Power BI",
        color: '#10BCE333',
        arrowColor:'#10AED2',
        textColor: '#53EAFD',
        directions: [
            {
                id: 0,
                title: "Data analitik",
                description: "Rəqəmləri analiz edir, cədvəllərlə işləyir. Qərar verməyə kömək edən məlumatlar hazırlayır.",
            },
            {
                id: 1,
                title: "Biznes analitik",
                description: "Biznes proseslərini analiz edir. “Bu iş niyə ləng gedir, necə yaxşılaşdıraq?” suallarını araşdırır.",
            },
            {
                id: 2,
                title: "BI mütəxəssisi",
                description: "Rəhbərlik üçün qrafiklər və hesabatlar hazırlayır. Rəqəmləri vizual şəkildə göstərir.",
            },
            {
                id: 3,
                title: "Data scientist",
                description: "Böyük məlumatlarla işləyir, proqnozlar verir. “Gələcəkdə nə olacaq?” sualına cavab axtarır.",
            }
        ]
    },
    {
        id: 3,
        icon: marketing,
        title: "Rəqəmsal Marketinq",
        description: "SEO, SMM, Google Ads",
        color: '#00CD5033',
        arrowColor:'#02BD4B',
        textColor: '#7BF1A8',
        directions: [
            {
                id: 0,
                title: "Sosial media meneceri",
                description: "Instagram, TikTok, Facebook səhifələrini idarə edir. Post paylaşır, mesajlara cavab verir.",
            },
            {  
                id: 1,
                title: "Performans marketinq mütəxəssisi",
                description: "Reklamları idarə edir. “Reklama pul qoyduq, nəticəsi nə oldu?” buna baxır.",
            },
            {
                id: 2,      
                title: "SEO mütəxəssisi",
                description: "Saytın Google-da yuxarı çıxması üçün çalışır. Axtarışda birinci səhifəyə düşmək onun işidir.",
            },
            {
                id: 3,
                title: "Kontent meneceri",
                description: "Mətn, şəkil, video planlayır və paylaşır.Sayt və sosial şəbəkələr üçün məzmun hazırlayır.",
            },
            {
                id: 4,
                title: "Brend meneceri",
                description: "Brendin imicini qoruyur.Şirkət necə görünür, insanlar onu necə tanıyır – buna cavabdehdir.",
            }
        ]
    },
    {
        id: 4,
        icon: prod,
        title: "Product Manager",
        description: "Agile, Scrum, Jira",
        color: '#FF803533',
        arrowColor:'#F3762C',
        textColor: '#FFB86A',
        directions: [
            {
                id: 0,
                title: "Product Owner",
                description: "Məhsulun inkişafını idarə edir. Komanda ilə işləyir, məhsulun uğurlu olmasına çalışır.",
            },
        ]
    },
    {
        id: 5,
        icon: devops,
        title: "DevOps Engineer",
        description: "Docker, Kubernetes, AWS",
        color: '#FF2B3533',
        arrowColor:'#EF222C',
        textColor: '#FFA2A2',
    },
    {
        id: 6,
        icon: hr,
        title: "HR Mütəxəssisi",
        description: "Recruitment, Training",
        color: '#FF5CB133',
        arrowColor:'#F34EA4',
        textColor: '#FDA5D5',
    },
    {
        id: 7,
        icon: content,
        title: "Content Creator",
        description: "Video, Photo, Copywriting",
        color: '#FBBE2A33',
        arrowColor:'#ECB123',
        textColor: '#FFDF20',
    }
]


export default DirectionsData; 