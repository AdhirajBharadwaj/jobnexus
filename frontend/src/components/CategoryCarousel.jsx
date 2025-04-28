import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (industry) => {
        const query = {
            keyword: '',
            Location: '',
            Industry: industry,
            Salary: ''
        };
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className="w-full flex flex-col items-center justify-center py-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 tracking-tight">
                Explore by Category
            </h2>
            <div className="w-full max-w-3xl bg-white/70 flex flex-col items-center pb-2">
                <Carousel className="w-full mb-2">
                    <CarouselContent>
                        {category.map((cat, index) => (
                            <CarouselItem key={cat} className="md:basis-1/2 lg:basis-1/3 flex justify-center py-0 ">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full px-6 py-2 font-semibold text-base shadow-md bg-gradient-to-br from-[#f7f7fa] to-[#f9f6ff] hover:from-[#6A38C2]/90 hover:to-[#F83002]/90 hover:text-white hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-[#6A38C2] flex items-center gap-2"
                                >
                                    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#6A38C2] to-[#F83002] mr-2 " />
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel