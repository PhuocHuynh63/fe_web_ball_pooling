import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import JewelryCard from "../Jewelry/JewelryCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllAreaAction } from "../State/Area/Action";
import Footer from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { area } = useSelector((store) => store);
  const imagesRef = useRef([]);

  const images = [
    "https://images.pexels.com/photos/12865908/pexels-photo-12865908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/6625941/pexels-photo-6625941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7700270/pexels-photo-7700270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const themes = [
    {
      title: "Elegant Jewelry",
      subtitle: "Timeless beauty in every piece",
      textColor: "text-yellow-400",
    },
    {
      title: "Modern Styles",
      subtitle: "Fashion forward designs",
      textColor: "text-blue-400",
    },
    {
      title: "Classic Collection",
      subtitle: "Tradition meets elegance",
      textColor: "text-green-400",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (jwt) {
      dispatch(getAllAreaAction(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    imagesRef.current.forEach((image) => {
      if (image) {
        observer.observe(image);
      }
    });

    return () => {
      observer.disconnect(); // Disconnect the observer when component unmounts
    };
  }, []);

  return (
    <div className="mt-24">
      <div className="pb-10">
        <Navbar />
        <div className="black-separator"></div> {/* Black line separator */}
        <div className="separator"></div> {/* New line separator */}
        <section className="top-product-section p-10 lg:py-10 lg:px-20">
          <p className="header-blue">Top Product</p>
          <MultiItemCarousel />
        </section>
        <div className="separator"></div> {/* Line separator */}
        <section className="additional-images px-5 lg:px-20 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 additional-images-container">
            <img
              ref={(el) => (imagesRef.current[0] = el)}
              src="https://images.pexels.com/photos/17068457/pexels-photo-17068457/free-photo-of-da-nh-n-ph-ki-n-hinh-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Additional 1"
              className="additional-image border-green-500 w-full"
            />
            <img
              ref={(el) => (imagesRef.current[1] = el)}
              src="https://images.pexels.com/photos/10361483/pexels-photo-10361483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Additional 2"
              className="additional-image border-green-500 w-full"
            />
            <img
              ref={(el) => (imagesRef.current[2] = el)}
              src="https://images.pexels.com/photos/7407595/pexels-photo-7407595.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Additional 3"
              className="additional-image border-green-500 w-full"
            />
            <img
              ref={(el) => (imagesRef.current[3] = el)}
              src="https://images.pexels.com/photos/15684103/pexels-photo-15684103/free-photo-of-sang-tr-ng-da-c-c-da-ph-ki-n.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Additional 3"
              className="additional-image border-green-500 w-full"
            />
          </div>
        </section>
        <div className="separator"></div> {/* Line separator */}
        {/* <section id="order-here" className="px-5 lg:px-20 pt-5">
                <p className="order-here-section">Order here</p>
                <div className="flex flex-wrap items-center justify-around gap-5">
                    {area?.areas?.length > 0 ? area.areas.map((item, index) => (
                        <JewelryCard key={index} item={item} />
                    )) : (
                        <p>No products available</p>
                    )}
                </div>
            </section> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
