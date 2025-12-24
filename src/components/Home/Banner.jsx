import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070",
            title: "Success in Rural Healthcare",
            desc: "Providing essential medical support to those who need it most."
        },
        {
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=2070",
            title: "Impactful Medical Moments",
            desc: "Every smile tells a story of a life changed through our camps."
        }
    ];

    return (
        <div className="h-[500px] md:h-[600px] w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* গুরুত্বপূর্ণ: style এর ভেতরে URL সিনট্যাক্স চেক করুন */}
                        <div 
                            className="w-full h-full bg-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})` }}
                        >
                            <div className="text-center text-white px-4">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                                <p className="text-lg md:text-xl max-w-2xl mx-auto">{slide.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;