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
                description: "İstifadəçinin gördüyü sayt və tətbiq hissəsini hazırlayır. \nDüymələr, rənglər, formalar – hamısı onun işidir.\n",
            },
            {
                id: 1,
                title: "Backend proqramçı",
                description: "Saytın arxa tərəfində işləyir. \nMəlumatların saxlanması, istifadəçi məlumatları, sistemin işləməsi onun işidir.\n",
            },
            {
                id: 2,
                title: "Fullstack proqramçı",
                description: "Həm frontend, həm backend işlərini görür. \nYəni saytı başdan sona qədər yığa bilir.\n",
            },
            {
                id: 3,
                title: "Mobil tətbiq proqramçısı",
                description: "Telefon üçün tətbiqlər hazırlayır (Android / iOS). \nInstagram, bank tətbiqləri kimi proqramlar.\n",
            },
            {
                id: 4,
                title: "Test mühəndisi (QA)",
                description: "Proqramları yoxlayır ki, səhv işləməsin. \n“Bu düymə niyə işləmir?” deyən adamdır\n",
            },
            {
                id: 5,
                title: "DevOps mühəndisi",
                description: "Proqramların serverdə problemsiz işləməsinə nəzarət edir. \nSaytın çökməməsi onun məsuliyyətidir.\n",
            }, 
            {
                id: 6,
                title: "Data analitik",
                description: "Məlumatlara baxıb nəticə çıxarır. \n“İstifadəçilər nə edir, harada problem var?” suallarına cavab tapır.\n",
            }
        ]
    },
    {
        id: 1,
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
                description: "Rəqəmləri analiz edir, cədvəllərlə işləyir. \nQərar verməyə kömək edən məlumatlar hazırlayır.\n",
            },
            {
                id: 1,
                title: "Biznes analitik",
                description: "Biznes proseslərini analiz edir. \n“Bu iş niyə ləng gedir, necə yaxşılaşdıraq?” suallarını araşdırır.\n",
            },
            {
                id: 2,
                title: "BI mütəxəssisi",
                description: "Rəhbərlik üçün qrafiklər və hesabatlar hazırlayır. \nRəqəmləri vizual şəkildə göstərir.\n",
            },
            {
                id: 3,
                title: "Data scientist",
                description: "Böyük məlumatlarla işləyir, proqnozlar verir. \n“Gələcəkdə nə olacaq?” sualına cavab axtarır.\n",
            }
        ]
    },
    {
        id: 2,
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
                description: "Instagram, TikTok, Facebook səhifələrini idarə edir. \nPost paylaşır, mesajlara cavab verir.\n",
            },
            {  
                id: 1,
                title: "Performans marketinq mütəxəssisi",
                description: "Reklamları idarə edir. \n“Reklama pul qoyduq, nəticəsi nə oldu?” buna baxır.\n",
            },
            {
                id: 2,      
                title: "SEO mütəxəssisi",
                description: "Saytın Google-da yuxarı çıxması üçün çalışır. \nAxtarışda birinci səhifəyə düşmək onun işidir.\n",
            },
            {
                id: 3,
                title: "Kontent meneceri",
                description: "Mətn, şəkil, video planlayır və paylaşır.\nSayt və sosial şəbəkələr üçün məzmun hazırlayır.\n",
            },
            {
                id: 4,
                title: "Brend meneceri",
                description: "Brendin imicini qoruyur.\nŞirkət necə görünür, insanlar onu necə tanıyır – buna cavabdehdir.\n",
            }
        ]
    },
    {
        id: 3,
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
                description: "Sayt və tətbiqin həm gözəl, həm rahat olmasını təmin edir. \nİstifadəçi harada klikləməlidir – onu düşünür.\n",
            },
            {
                id: 1,
                title: "Qrafik dizayner",
                description: "Poster, banner, loqo və vizuallar hazırlayır. \nGörünən dizayn işləri onun sahəsidir.\n",
            },
            {
                id: 2,
                title: "Məhsul dizayneri",
                description: "Məhsulun ümumi görünüşünü və istifadə rahatlığını dizayn edir. \nDizayn + istifadəçi təcrübəsi birlikdədir.\n",
            },
            {
                id: 3,
                title: "Motion dizayner",
                description: "Hərəkətli dizaynlar hazırlayır. \nAnimasiya və video effektlər onun işidir.\n",
            }
        ]
    },
    {
        id: 4,
        icon: prod,
        title: "Biznes və İdarəetmə",
        description: "Agile, Scrum, Jira",
        color: '#FF803533',
        arrowColor:'#F3762C',
        textColor: '#FFB86A',
        directions: [
            {
                id: 0,
                title: "Layihə meneceri",
                description: "Komandanın işini planlayır və izləyir. \n“Kim nə vaxt nə etməlidir?” – buna cavab verir.\n",
            },
            {
                id: 1,
                title: "Məhsul meneceri",
                description: "Məhsulun nə olacağına qərar verir. \nİstifadəçi nə istəyir, məhsul necə inkişaf etməlidir – bunu düşünür.\n",
            },
            {
                id: 2,
                title: "Əməliyyatlar meneceri",
                description: "Gündəlik işlərin düzgün getməsinə nəzarət edir. \nProseslərdə problem olmasın deyə çalışır.\n",
            },
            {
                id: 3,
                title: "Biznesin inkişafı üzrə mütəxəssis",
                description: "Yeni imkanlar tapır.\nYeni müştərilər, yeni tərəfdaşlar onun işidir.\n",
            }
        ]
    },
    {
        id: 5,
        icon: devops,
        title: "Maliyyə və Mühasibatlıq",
        description: "Docker, Kubernetes, AWS",
        color: '#FF2B3533',
        arrowColor:'#EF222C',
        textColor: '#FFA2A2',
        directions: [
            {
                id: 0,
                title: "Mühasib",
                description: "Şirkətin pulunun giriş-çıxışını qeyd edir.\n Maaşlar, xərclər, sənədlər onun nəzarətindədir.\n",
            },
            {
                id: 1,
                title: "Maliyyə analitiki",
                description: "Pulun necə idarə olunmasını analiz edir. \n“Pul necə artsın?” sualına cavab axtarır.\n",
            },
            {
                id: 2,
                title: "Auditor",
                description: "Maliyyə sənədlərini yoxlayır. \nSəhv və ya problem varmı – onu tapır.\n",
            },
            {
                id: 3,
                title: "Risk analitiki",
                description: "Maliyyə risklərini əvvəlcədən görməyə çalışır.\nZərər ehtimalını azaldır.\n",
            }
        ]
    },
    {
        id: 6,
        icon: hr,
        title: "Satış və müştəri ilə iş",
        description: "Recruitment, Training",
        color: '#FF5CB133',
        arrowColor:'#F34EA4',
        textColor: '#FDA5D5',
        directions: [
            {
                id: 0,
                title: "Satış meneceri",
                description: "Məhsul və ya xidməti satır.\nMüştəri tapır və razı salır.\n",
            },
            {
                id: 1,
                title: "Müştəri meneceri",
                description: "Müştərilərlə əlaqəni saxlayır.\nOnların suallarına və problemlərinə baxır.\n",
            },
            {
                id: 2,
                title: "Müştəri dəstəyi üzrə mütəxəssis",
                description: "Müştərilərin problemlərini həll edir.\nZənglərə və mesajlara cavab verir.\n",
            },
            {
                id: 3,
                title: "Müştəri uğuru meneceri",
                description: "Müştərinin məhsuldan razı qalmasını təmin edir.\nUzunmüddətli münasibət qurur.\n",
            }
        ]
    },
    {
        id: 7,
        icon: content,
        title: "Logistika",
        description: "Video, Photo, Copywriting",
        color: '#FBBE2A33',
        arrowColor:'#ECB123',
        textColor: '#FFDF20',
        directions: [
            {
                id: 0,
                title: "Logistika mütəxəssisi",
                description: "Yüklərin haradan hara gedəcəyini planlayır.\nÇatdırılmanın vaxtında olmasına baxır.\n",
            },
            {
                id: 1,
                title: "Təchizat zənciri analitiki",
                description: "Məhsulun yolunu analiz edir.\nHarada gecikmə var, harada xərc çoxdur – onu tapır.\n",
            },
            {
                id: 2,
                title: "Əməliyyatlar üzrə koordinator",
                description: "Gündəlik daşınma işlərini koordinasiya edir.\nSürücü, anbar, sənəd işlərini əlaqələndirir.\n",
            },
            {
                id: 3,
                title: "Satınalma üzrə mütəxəssis",
                description: "Şirkət üçün lazım olan malları alır.\nQiymət və keyfiyyətə nəzarət edir.\n",
            }
        ]
    },
        {
        id: 8,
        icon: content,
        title: "İnsan Resursları (HR)",
        description: "Video, Photo, Copywriting",
        color: '#FBBE2A33',
        arrowColor:'#ECB123',
        textColor: '#FFDF20',
        directions: [
            {
                id: 0,
                title: "İnsan resursları üzrə mütəxəssis",
                description: "İşçilərlə bağlı sənədlər və proseslərlə məşğul olur. \nİşə qəbul, məzuniyyət, qaydalar və s.\n",
            },
            {
                id: 1,
                title: "İşə qəbul üzrə mütəxəssis (Recruiter)",
                description: "Yeni işçilər tapır və müsahibə aparır. \nUyğun namizədi seçir.\n",
            },
            {
                id: 2,
                title: "Talent acquisition mütəxəssisi",
                description: "Uzunmüddətli istedad tapmağa fokuslanır. \nGüclü kadrları şirkətə cəlb edir.\n",
            },
            {
                id: 3,
                title: "HR biznes partnyoru",
                description: "Rəhbərliklə HR arasında körpü rolunu oynayır. \nKomandanın inkişafına kömək edir.\n",
            }
        ]
    }
]


export default DirectionsData; 