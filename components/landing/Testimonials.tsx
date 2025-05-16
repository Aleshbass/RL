"use client";

import { AnimatedTestimonials } from "../ui/animated-testimonials";

const testimonials = [
	{
		quote: "RehabifyLearn transformed my professional development journey. The course content is incredibly practical and directly applicable to my daily practice in physiotherapy.",
		name: "Dr. Ademola Abass",
		designation: "Senior Physiotherapist",
		src: "https://res.cloudinary.com/dubeogufg/image/upload/v1747271142/Ademola_profile_glt1ot.jpg",
	},
	{
		quote: "RehabifyLearn's interactive learning approach and community support have been invaluable for my growth as a physiotherapist. I've gained new perspectives and techniques that have improved my patient outcomes.",
		name: "Mary Akinwola",
		designation: "Physiotherapist",
		src: "https://res.cloudinary.com/dubeogufg/image/upload/v1743173455/cpd/Mary_o5sjrw.jpg",
	},
	{
		quote: "As a speech therapist, finding specialized continuing education can be challenging. RehabifyLearn provides exactly what I need with their comprehensive and targeted speech therapy courses.",
		name: "Emmanuella Otu",
		designation: "Speech Therapist",
		src: "https://res.cloudinary.com/dubeogufg/image/upload/v1747271135/Ella_xuuknt.webp",
	},
];

export default function Testimonials() {
	return (
		<section className="bg-white dark:bg-background">
			<div className="container mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold text-center text-rehabify-core dark:text-secondary-honeydew mb-8">
					What Our Learners Say
				</h2>
				<AnimatedTestimonials testimonials={testimonials} autoplay={true} />
			</div>
		</section>
	);
}