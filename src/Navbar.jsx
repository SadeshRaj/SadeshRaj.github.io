import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
// 1. Import the confetti library
import confetti from "canvas-confetti";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 2. The function to trigger the Wow Effect
    const handleLogoClick = (e) => {
        e.preventDefault(); // Prevent page reload/jump

        // Trigger a confetti explosion from the top-left (near the logo)
        const rect = e.target.getBoundingClientRect();
        // Calculate position relative to viewport (0 to 1)
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ['#22d3ee', '#f472b6', '#cbd5e1'], // Cyan, Pink, Slate
            disableForReducedMotion: true
        });
    };

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg py-2"
                    : "bg-transparent py-4 border-b border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* --- LOGO SECTION --- */}
                    <a
                        href="#"
                        onClick={handleLogoClick}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-700 group-hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-900/20 group-hover:shadow-cyan-400/50 group-active:scale-95 duration-200">
                            <img
                                src="./devLogo.png"
                                alt="Logo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display='none';
                                    e.target.parentElement.classList.add('bg-slate-800');
                                    e.target.parentElement.innerHTML = '<span class="text-cyan-400 font-bold text-xl flex items-center justify-center w-full h-full">S</span>';
                                }}
                            />
                        </div>

                        <span className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                            SadeshRaj
                        </span>
                    </a>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-300 hover:text-cyan-400 transition-colors p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden absolute w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-lg text-slate-300 hover:text-cyan-400 font-medium tracking-wide"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        className="mt-4 flex items-center gap-2 px-6 py-3 text-cyan-400 border border-cyan-400/30 rounded-full hover:bg-cyan-400/10 transition-all"
                    >
                        <FileText size={18} /> Resume
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;