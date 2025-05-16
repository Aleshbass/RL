import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "How do I get started?",
		answer: "Simply sign up for an account, browse our course catalog, and enroll in any course that interests you. You can start learning immediately after enrollment.",
	},
	{
		question: "What payment methods do you accept?",
		answer: "We accept all major credit cards and debit cards through our secure payment processor, ensuring your payment information is always protected.",
	},
	{
		question: "Are the courses self-paced?",
		answer: "Yes, all our courses are self-paced. You can learn at your own speed and access the content whenever it's convenient for you.",
	},
	{
		question: "Do I get a certificate upon completion?",
		answer: "Yes, you'll receive a certificate of completion for each course you finish. These certificates can be shared on your professional networks.",
	},
	{
		question: "How long do I have access to a course?",
		answer: "Once you enroll in a course, you have lifetime access to its content. You can revisit the material as many times as you need.",
	},
	{
		question: "What if I'm not satisfied with a course?",
		answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your course, contact our support team for a full refund.",
	},
];

export default function FAQ() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-secondary-honeydew">
					Frequently Asked Questions
				</h2>
				<div className="max-w-3xl mx-auto">
					<Accordion type="single" collapsible className="w-full">
						{faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className="text-left text-lg md:text-xl font-semibold md:font-bold dark:text-secondary-honeydew">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-base md:text-lg dark:text-secondary-honeydew/90">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}