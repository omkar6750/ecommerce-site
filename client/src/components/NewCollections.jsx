import React from "react";
import Item from "./Item";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

const NewCollections = ({ newCollection }) => {
	const data = newCollection;
	return (
		<div className="flex h-5/6 w-screen flex-col items-center gap-3">
			<h1 className="mt-10 text-5xl font-semibold text-slate-900">NEW COLLECTIONS</h1>
			<hr className="h-1 w-52 rounded-xl bg-[#252525]" />
			<div className="mt-12 flex gap-8">
				<Carousel
					opts={{
						align: "start",
					}}
					plugins={[
						Autoplay({
							delay: 2000,
						}),
					]}
					className="w-full max-w-7xl"
				>
					<CarouselContent>
						{newCollection.map((item, i) => (
							<CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<Item product={item} />
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};

export default NewCollections;
