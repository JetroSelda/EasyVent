import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GalleryCarousel = ({ images = [], selectedImage = 0, setSelectedImage}) => {
  return (
    <div onClick={() => setSelectedImage(null)} className="py-[2rem] px-[10rem] fixed w-[100vw] h-[100vh] bg-[#000000AA] backdrop-blur-xs z-[1001] top-0 left-0">
      <div className="flex flex-col w-full h-full" onClick={(event) => event.stopPropagation()}>
        <div className="p-5 h-[75%] px-10 flex justify-center">
          <img src={images[selectedImage]} alt="" className="w-auto h-full" />
        </div>

        <div className="px-[4rem]">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-[100%]"
          >
            <CarouselContent>
              {images.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                  <div className="p-1">
                    <div
                      onClick={() => setSelectedImage(index)}
                      className={`h-[8rem] border-2 ${selectedImage === index ? "border-blue-500" : ""} hover:shadow-lg cursor-pointer rounded-sm overflow-hidden`}
                    >
                      <img src={item} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
};

export default GalleryCarousel;