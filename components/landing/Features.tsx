import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { motion } from "framer-motion";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

// Replace these image URLs with your actual Cloudinary or CDN URLs
const IMAGES = {
	hero: "https://res.cloudinary.com/dubeogufg/image/upload/v1747336626/ChatGPT_Image_May_15_2025_07_13_03_PM_1_ucr8no.webp",
	interactive: "https://res.cloudinary.com/dubeogufg/image/upload/v1747290977/ChatGPT_Image_May_15_2025_01_53_16_AM_ptd3ui.webp",
	community: "https://res.cloudinary.com/dubeogufg/image/upload/v1747338503/May_15_2025_08_46_46_PM_p8wkdh.webp",
	certificates: "https://res.cloudinary.com/dubeogufg/image/upload/v1747262679/ChatGPT_Image_May_14_2025_10_27_18_AM_wyqrfr.webp",
};

export default function Features() {
	return (
		<section className="py-24">
			<div className="container px-4 mx-auto">
				{/* Title with PointerHighlight */}
				<div className="mx-auto max-w-3xl text-center mb-20">
					<h2 className="text-2xl font-bold tracking-tight md:text-4xl text-rehabify-core dark:text-secondary-honeydew">
						Discover Why Leading Healthcare Professionals{" "}
						<span className="inline-block">
							<PointerHighlight
								rectangleClassName="bg-secondary-fairy/20 dark:bg-rehabify-highlight/20 border-secondary-fairy dark:border-rehabify-highlight"
								pointerClassName="text-rehabify-highlight dark:text-secondary-fairy"
							>
								<span className="relative z-10 whitespace-nowrap">
									Choose Rehabify Learn
								</span>
							</PointerHighlight>
						</span>{" "}
						for Their Professional Development
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
					{/* Hero Feature - Full Width */}
					<div className="grid md:grid-cols-2 gap-8 min-h-[600px] rounded-3xl bg-secondary-honeydew dark:bg-rehabify-alt/10 p-8 md:p-12">
						<div className="flex flex-col justify-center">
							<h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-rehabify-core mb-6 leading-[1.1]">
								Master New Skills, Anytime, Anywhere
							</h3>
							<p className="text-xl md:text-2xl text-rehabify-core/80 max-w-xl leading-relaxed">
								Access a world of expertly crafted courses and learn at your own
								pace. Start your learning journey today.
							</p>
						</div>
						<div className="relative w-full h-full min-h-[400px] md:min-h-full rounded-2xl overflow-hidden">
							<Image
								src={IMAGES.hero}
								alt="Master New Skills"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{/* Interactive Learning */}
						<div className="relative rounded-3xl bg-secondary-fairy dark:bg-rehabify-core/10 p-8 md:p-12 overflow-hidden">
							<div className="flex flex-col justify-between h-full min-h-[600px] relative z-10">
								<div className="relative z-20">
									<h3 className="text-3xl md:text-5xl font-bold text-rehabify-core mb-4 leading-tight max-w-sm">
										Interactive Learning
									</h3>
									<p className="text-lg md:text-xl text-rehabify-core/80 leading-relaxed max-w-sm">
										Engage with immersive content through videos, quizzes, and hands-on
										projects.
									</p>
								</div>
								<div className="absolute right-[-17%] bottom-[-5%] w-[75%] h-[85%]">
									<Image
										src={IMAGES.interactive}
										alt="Interactive Learning"
										fill
										className="object-contain object-bottom scale-110 rounded-3xl"
										sizes="(max-width: 768px) 80vw, 40vw"
									/>
								</div>
							</div>
						</div>

						{/* Community Support */}
						<div className="relative rounded-3xl bg-[#e6eafe] dark:bg-rehabify-highlight/10 p-8 md:p-12 overflow-hidden">
							<div className="flex flex-col justify-between h-full min-h-[500px] relative z-10">
								<div>
									<h3 className="text-3xl md:text-5xl font-bold text-rehabify-core mb-4 leading-tight max-w-sm">
										Community Support
									</h3>
									<p className="text-lg md:text-xl text-rehabify-core/80 leading-relaxed max-w-sm">
										Join a vibrant community of learners. Share progress, get help, and
										grow together.
									</p>
								</div>
								<div className="absolute right-0 bottom-0 w-[70%] h-[60%]">
									<Image
										src={IMAGES.community}
										alt="Community Support"
										fill
										className="object-cover rounded-3xl"
										sizes="(max-width: 768px) 70vw, 35vw"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Certificates - Full Width */}
					<div className="grid md:grid-cols-2 gap-8 min-h-[500px] rounded-3xl bg-[#fef3e6] dark:bg-rehabify-alt/20 p-8 md:p-12">
						<div className="flex flex-col justify-center">
							<h3 className="text-3xl md:text-6xl font-bold text-rehabify-core mb-4 leading-tight">
								Earn Recognized Certificates
							</h3>
							<p className="text-lg md:text-2xl text-rehabify-core/80 leading-relaxed max-w-xl">
								Showcase your achievements with professional certificates. Build your
								portfolio and advance your career.
							</p>
						</div>
						<div className="relative w-full h-full min-h-[400px] md:min-h-full rounded-2xl overflow-hidden">
							<Image
								src={IMAGES.certificates}
								alt="Earn Certificates"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}