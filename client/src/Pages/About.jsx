import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
const About = () => {
	const faqs = [
		{
			question: "What's the best thing about Switzerland?",
			answer:
				"I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		{
			question: "What's the best thing about Switzerland?",
			answer:
				"I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		{
			question: "What's the best thing about Switzerland?",
			answer:
				"I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		// More questions...
	];
	return (
		<div
			className="
			flex flex-row justify-center h-full overflow-y-auto pt-6">
			<div className="w-3/4">
				<h1 className="text-6xl my-6 text-accent font-display">About Us</h1>
				<p className="text-md text-info">
					Welcome to DuoTune, where creativity and collaboration thrive! We are
					an innovative platform dedicated to connecting talented music
					producers, vocalists, instrumentalists, composers, and other music
					enthusiasts who share the passion for making music together. Our
					mission is to build and foster a vibrant community that nurtures the
					growth and development of musicians, helping them create and
					collaborate on their musical journeys. We understand the challenges
					faced by artists in finding the perfect partner for their projects,
					and that's why we've built a platform that simplifies the process and
					brings like-minded musicians together in a seamless, enjoyable way.
					Whether you're an aspiring music producer looking for the right
					vocalist to bring your track to life, a skilled instrumentalist
					seeking a composer for your next masterpiece, or an up-and-coming
					singer in search of a producer who can help you create the perfect
					sound, DuoTune is the place for you. Our user-friendly platform allows
					you to create a personalized profile, showcasing your talents and
					preferences, to help you attract the right kind of collaborators. Once
					you've specified the type of musician you'd like to work with, our
					smart matching system will present you with a curated feed of
					potential partners who share your vision. When you find someone who
					catches your interest, simply swipe right to express your desire to
					collaborate. If the feeling is mutual, you'll be notified of your
					match, and you can then exchange messages to discuss your project and
					begin the exciting process of creating music together. At DuoTune, we
					believe that the power of music transcends boundaries and that the
					magic of collaboration can lead to remarkable creations. Join us today
					and become a part of our thriving community of passionate musicians,
					where new connections are made, and musical dreams become reality.
				</p>
				<div className="">
					<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
						<div className="mx-auto max-w-4xl divide-y divide-accent">
							<h2 className="text-2xl font-bold leading-10 tracking-tight text-accent">
								Frequently asked questions
							</h2>
							<dl className="mt-10 space-y-6 divide-y divide-accent">
								{faqs.map((faq, key) => (
									<Disclosure as="div" key={key} className="pt-6">
										{({ open }) => (
											<>
												<dt>
													<Disclosure.Button className="flex w-full items-start justify-between text-left text-info">
														<span className="font-semibold leading-7">
															{faq.question}
														</span>
														<span className="ml-6 flex h-7 items-center">
															{open ? (
																<MinusSmallIcon
																	className="h-6 w-6"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmallIcon
																	className="h-6 w-6"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</dt>
												<Disclosure.Panel as="dd" className="mt-2 pr-12">
													<p className="text-base leading-7 text-[#fffef582]">
														{faq.answer}
													</p>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
