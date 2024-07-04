import React from 'react';
import Nav from './Nav';
import earth from '../assets/logo/earth.png'

function AboutUs() {
    return (
        <div>
            <Nav/>
            <div className="mt-12 bg-gradient-to-r from-green-800 to-lime-300 min-h-screen py-12 ">
            <div className="absolute -top-32 -left-32">
            <img src={earth} width={400} className="z-1 xmd:block hidden"/>
            </div>

            <div className="max-w-7xl mx-auto px-4 text-black sm:px-6 lg:px-8">
                <h1 className="text-5xl font-extrabold mb-12 text-center text-white">About Us</h1>
                <div className="space-y-12">
                    <div className="bg-white bg-opacity-20 shadow-lg rounded-lg p-8">
                        <h2 className="text-3xl font-semibold ml-0 xmd:ml-48">Our Mission</h2>
                        <p className="mt-4  text-lg">
                            At EcoEclipse, our mission is to promote sustainability and environmental awareness
                            through education and action. We strive to create a community that is informed, engaged,
                            and committed to making a positive impact on our planet.
                        </p>
                    </div>
                    <div className="bg-white bg-opacity-20 shadow-lg rounded-lg p-8">
                        <h2 className="text-3xl font-semibold">Our Vision</h2>
                        <p className="mt-4 text-lg">
                            We envision a world where communities are empowered to protect and sustain their
                            natural environments, leading to healthier ecosystems and a brighter future for
                            generations to come.
                        </p>
                    </div>
                    <div className="bg-white bg-opacity-20 shadow-lg rounded-lg p-8">
                        <h2 className="text-3xl font-semibold">Our Team</h2>
                        <p className="mt-4 text-lg">
                            Our team is composed of passionate individuals from diverse backgrounds, all
                            united by a common goal: to make a difference. From environmental scientists to
                            community organizers, each member brings unique skills and perspectives to the
                            table.
                        </p>
                    </div>
                    <div className="bg-white bg-opacity-20 shadow-lg rounded-lg p-8">
                        <h2 className="text-3xl font-semibold">Our History</h2>
                        <p className="mt-4 text-lg">
                            Founded in 2024, EcoEclipse began as a small grassroots organization dedicated to
                            local conservation efforts. We will be grown into a recognized leader in the
                            sustainability movement, with numerous initiatives and programs making a tangible
                            impact worldwide.
                        </p>
                    </div>
                    <div className="bg-white bg-opacity-20 shadow-lg rounded-lg p-8">
                        <h2 className="text-3xl font-semibold">Get Involved</h2>
                        <p className="mt-4 text-lg">
                            Whether you are an individual looking to volunteer, a company seeking to improve
                            your environmental practices, or a donor interested in supporting our work, there
                            are many ways to get involved with EcoEclipse. Join us in our mission to create a
                            sustainable future.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AboutUs;
