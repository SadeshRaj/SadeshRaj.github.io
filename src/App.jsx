import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import ParticleField from './ParticleField';
import { personalInfo, experience, education, projects, certificates } from './data';
import { ExternalLink, Github, ChevronRight, GraduationCap, Calendar, Eye, X } from 'lucide-react';

// --- Hook for Scroll Animations ---
const useScrollReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return [ref, isVisible];
};

// --- Reusable Animated Section Wrapper ---
const Section = ({ children, className = "", id = "" }) => {
    const [ref, isVisible] = useScrollReveal();
    return (
        <section
            id={id}
            ref={ref}
            className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${className}`}
        >
            {children}
        </section>
    );
};

// --- POPUP MODAL COMPONENT ---
const ProjectModal = ({ project, onClose }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // Auto-rotate images in modal
    useEffect(() => {
        if (!project.images || project.images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [project.images]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-900/20 overflow-y-auto flex flex-col animate-fade-in-up">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-all border border-slate-700 hover:border-red-500/50"
                >
                    <X size={24} />
                </button>

                {/* Big Image Display */}
                <div className="w-full aspect-video bg-black relative shrink-0">
                    {project.images && project.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={project.title}
                            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${idx === currentImgIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {project.images && project.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImgIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentImgIndex ? 'bg-cyan-400 w-6' : 'bg-white/50 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 text-sm font-mono text-cyan-300 bg-cyan-900/20 rounded-full border border-cyan-900/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 shrink-0">
                            <a href={project.links.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-cyan-900/20">
                                <ExternalLink size={20} /> Live Demo
                            </a>
                            <a href={project.links.code} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg font-medium border border-slate-700 transition-colors">
                                <Github size={20} /> Source Code
                            </a>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed border-t border-slate-800 pt-6">
                        <p>{project.desc}</p>
                        <p className="mt-4 text-slate-400 text-sm italic">
                            (You can add more detailed descriptions, challenges faced, or features lists here in the data.js file to make this modal richer.)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Project Card Component ---
const ProjectCard = ({ project, onOpen }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // Auto-change images in card
    useEffect(() => {
        if (!project.images || project.images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [project.images]);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-900/10">

            {/* MONITOR GRAPHIC with HOVER OVERLAY */}
            <div className="w-full mb-6 relative group/screen cursor-pointer" onClick={() => onOpen(project)}>
                <div className="bg-gray-800 rounded-t-lg p-2 pb-0 border-4 border-b-gray-300 shadow-xl relative z-10">
                    <div className="aspect-video bg-slate-950 rounded overflow-hidden relative">
                        {/* Image Carousel */}
                        {project.images && project.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={project.title}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImgIndex ? 'opacity-100' : 'opacity-0'}`}
                            />
                        ))}

                        {/* HOVER OVERLAY - THE "VIEW" BUTTON */}
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-full transform translate-y-4 group-hover/screen:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                            >
                                <Eye size={20} /> View Details
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-16 h-4 bg-gray-300 mx-auto relative z-0"></div>
                <div className="w-32 h-2 bg-gray-400 mx-auto rounded-full relative z-0"></div>
            </div>

            <div className="mb-4">
                <h3
                    className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors cursor-pointer"
                    onClick={() => onOpen(project)}
                >
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.desc}
                </p>
            </div>

            <div className="mb-6 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-mono text-cyan-300 bg-cyan-900/20 rounded-full border border-cyan-900/30">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm font-medium border border-slate-700">
                    <ExternalLink size={16} /> Live
                </a>
                <a href={project.links.code} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm font-medium border border-slate-700">
                    <Github size={16} /> Code
                </a>
            </div>
        </div>
    );
};

// --- Main App Component ---
function App() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Disable background scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

    return (
        <div className="min-h-screen text-slate-200 selection:bg-cyan-500/30 font-sans">
            <Navbar />
            <ParticleField />

            {/* Modal Overlay */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* HERO SECTION */}
                <Section id="about" className="min-h-screen flex items-center justify-center py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                        <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">
                            <div className="space-y-4">
                                <h2 className="text-cyan-400 font-mono tracking-wider text-lg">Hi, my name is</h2>
                                <h5 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
                                    {personalInfo.name}
                                </h5>
                                <h3 className="text-4xl sm:text-1xl font-bold text-slate-400">
                                    I build digital solutions.
                                </h3>
                            </div>
                            <p className="max-w-2xl mx-auto lg:mx-0 text-slate-400 text-lg leading-relaxed">
                                {personalInfo.bio}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                                <a href="#projects" className="group px-8 py-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/20 transition-all font-medium flex items-center justify-center gap-2">
                                    View My Work
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                                </a>
                                <a href={`mailto:${personalInfo.email}`} className="px-8 py-4 border border-slate-700 text-slate-300 rounded-lg hover:border-slate-500 hover:bg-slate-800 transition-all font-medium">
                                    Contact Me
                                </a>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 bg-slate-800">
                                    <img
                                        src="./Profile.jpg"
                                        alt="Profile"
                                        // CHANGE IS HERE: Added brightness-75, hover:brightness-100, and transition classes
                                        className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* EXPERIENCE & EDUCATION SECTION */}
                <Section id="experience" className="py-20">
                    <h2 className="flex items-center text-3xl font-bold text-white mb-16">
                        <span className="text-cyan-400 font-mono mr-4 text-xl">01.</span> Experience & Education
                        <span className="ml-6 h-px bg-slate-800 flex-grow max-w-xs"></span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {experience.map((category, idx) => (
                            <div key={idx} className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 group">
                                <h3 className="text-xl font-semibold text-white mb-8 border-b border-slate-800 pb-4 group-hover:text-cyan-400 transition-colors">
                                    {category.category}
                                </h3>
                                <div className="grid grid-cols-3 gap-8">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name} className="flex flex-col items-center gap-3 group/icon">
                                            <div className="p-3 bg-slate-800/50 rounded-lg group-hover/icon:bg-slate-800 transition-colors">
                                                <i className={`${skill.iconClass} text-4xl group-hover/icon:scale-110 transition-transform duration-300`}></i>
                                            </div>
                                            <span className="text-xs font-medium text-slate-500 group-hover/icon:text-slate-300 transition-colors">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <GraduationCap className="text-cyan-400" /> Education History
                        </h3>

                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <div key={idx} className="group relative flex items-center gap-6 p-6 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-cyan-500/40 transition-all duration-300 hover:bg-slate-800/60">
                                    <div className="shrink-0 w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center border-4 border-slate-800 group-hover:border-cyan-500/30 transition-colors shadow-lg">
                                        <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain"/>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                            <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{edu.school}</h4>
                                            <div className="flex items-center gap-2 text-cyan-400/80 font-mono text-sm bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-900/50">
                                                <Calendar size={14} />
                                                {edu.year}
                                            </div>
                                        </div>
                                        <p className="text-lg text-slate-300 font-medium mb-1">{edu.degree}</p>
                                        <p className="text-slate-500 text-sm">{edu.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* PROJECTS SECTION */}
                <Section id="projects" className="py-20">
                    <h2 className="flex items-center text-3xl font-bold text-white mb-16">
                        <span className="text-cyan-400 font-mono mr-4 text-xl">02.</span> Projects
                        <span className="ml-6 h-px bg-slate-800 flex-grow max-w-xs"></span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, idx) => (
                            <ProjectCard
                                key={idx}
                                project={project}
                                onOpen={setSelectedProject} // Pass the opener function
                            />
                        ))}
                    </div>
                </Section>

                {/* CERTIFICATES SECTION */}
                {/*<Section className="py-20 max-w-5xl mx-auto">*/}
                {/*    <h2 className="flex items-center text-3xl font-bold text-white mb-12">*/}
                {/*        <span className="text-cyan-400 font-mono mr-4 text-xl">03.</span> Certificates*/}
                {/*        <span className="ml-6 h-px bg-slate-800 flex-grow max-w-xs"></span>*/}
                {/*    </h2>*/}
                {/*    <div className="grid md:grid-cols-2 gap-8">*/}
                {/*        {certificates.map((cert, idx) => (*/}
                {/*            <div key={idx} className="relative group">*/}
                {/*                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-slate-700 rounded-full z-0"></div>*/}
                {/*                <div className="relative bg-slate-900 p-3 rounded-lg border-4 border-slate-800 shadow-xl group-hover:border-cyan-500/30 transition-all duration-300 z-10">*/}
                {/*                    <div className="relative overflow-hidden rounded border border-slate-700 bg-slate-800 aspect-[4/3]">*/}
                {/*                        <img*/}
                {/*                            src={cert.imgUrl}*/}
                {/*                            alt={cert.name}*/}
                {/*                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"*/}
                {/*                        />*/}
                {/*                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>*/}
                {/*                    </div>*/}
                {/*                    <div className="mt-4 text-center">*/}
                {/*                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{cert.name}</h4>*/}
                {/*                        <p className="text-sm text-slate-500 font-mono mt-1">{cert.issuer} • {cert.date}</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</Section>*/}

                {/* CONTACT SECTION */}
                <Section id="contact" className="py-32 text-center max-w-3xl mx-auto">
                    <p className="text-cyan-400 font-mono mb-4 text-lg">03. What's Next?</p>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Get In Touch</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-12">
                        I’m open to collaborations, freelance work, and new opportunities. Feel free to get in touch.
                    </p>
                    <a href={`mailto:${personalInfo.email}`} className="inline-block px-10 py-5 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all font-bold text-lg hover:-translate-y-1">
                        Say Hello
                    </a>
                    <div className="mt-24 pt-8 border-t border-slate-800">
                        <div className="flex justify-center gap-10 mb-8">
                            {personalInfo.socials.map((social, idx) => (
                                <a key={idx} href={social.link} className="text-slate-500 hover:text-cyan-400 hover:-translate-y-1 transition-all transform duration-300">
                                    <social.icon size={28} />
                                </a>
                            ))}
                        </div>
                        <p className="text-slate-600 text-sm font-mono">
                            Designed & Built by ♥️ SadeshRaj.  Last Update: 09/01/2026
                        </p>
                    </div>
                </Section>
            </main>
        </div>
    )
}

export default App