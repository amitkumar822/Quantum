import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const waveVariants = {
    initial: { x: 0 },
    animate: {
      x: ["0%", "-50%", "0%"],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Animated wave SVG background */}
      <motion.div
        className="absolute top-0 left-0 w-[200%] h-20"
        variants={waveVariants}
        initial="initial"
        animate="animate"
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.labels.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.navLink}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.subTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Email us</p>
              <a href="mailto: sales@quantumitinnovation.com" className="font-medium">
                sales@quantumitinnovation.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Call us</p>
              <a href="tel: +91 97179 98517" className="font-medium">
                +91 97179 98517
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Location</p>
              <p className="font-medium">
                Noida, Uttar Pradesh
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-white/20 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            className="text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Quantum IT Innovation. All rights reserved.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social?.url}
                target="_blanck"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const socialLinks = [
  {
    icon: <Facebook className="w-5 h-5" />,
    url: "https://www.facebook.com/quantumitinnovationindia",
  },
  { icon: <Youtube className="w-5 h-5" />, url: "https://www.youtube.com/@quantumitinnovation6761" },
  { icon: <Instagram className="w-5 h-5" />, url: "https://www.instagram.com/quantumitpro/" },
  { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/company/quantumit-it-innovation" },
];

const footerLinks = [
  {
    title: "Company",
    labels: [
      { subTitle: "About", navLink: "/about" },
      { subTitle: "Careers", navLink: "/careers" },
      { subTitle: "Blog", navLink: "/blog" },
      { subTitle: "Pricing", navLink: "/pricing" },
    ],
  },
  {
    title: "Quick Links",
    labels: [
      { subTitle: "About Us", navLink: "/about" },
      { subTitle: "Departments", navLink: "/departments" },
      { subTitle: "Admissions", navLink: "/admissions/apply" },
      { subTitle: "Contact Us", navLink: "/contact" },
    ],
  },
  {
    title: "Services",
    labels: [
      { subTitle: "Web Development", navLink: "/web-development" },
      { subTitle: "App Development", navLink: "/app-development" },
      { subTitle: "AI Solutions", navLink: "/ai-solutions" },
      { subTitle: "Digital Marketing", navLink: "/digital-marketing" },
    ],
  },
  {
    title: "Legal",
    labels: [
      { subTitle: "Privacy Policy", navLink: "/privacy-policy" },
      { subTitle: "Terms & Conditions", navLink: "/terms-conditions" },
      { subTitle: "Refund Policy", navLink: "/refund-policy" },
      { subTitle: "Disclaimer", navLink: "/disclaimer" },
    ],
  },
];
