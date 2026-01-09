import { Github, Linkedin, Mail } from "lucide-react";

export const personalInfo = {
    name: "Poorna Rajapakshe",
    title: "Full Stack Developer",
    bio: "A Software Engineering undergraduate with a passion for full-stack development and problem-solving. I enjoy building scalable web applications, exploring new technologies, and creating software solutions that make a real-world impact.",
    email: "sadeshraj.info@gmail.com",
    socials: [
        { icon: Github, link: "https://github.com/SadeshRaj" },
        { icon: Linkedin, link: "https://www.linkedin.com/in/poorna-rajapakshe-5604b431b/" },
        { icon: Mail, link: "mailto:sadeshraj.info@gmail.com" }
    ]
};

export const experience = [
    {
        category: "Frontend",
        skills: [
            { name: "HTML", iconClass: "devicon-html5-plain colored" },
            { name: "CSS", iconClass: "devicon-css3-plain colored" },
            { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
            { name: "React", iconClass: "devicon-react-original colored" },
            { name: "Tailwind", iconClass: "devicon-tailwindcss-original colored" },
            { name: "Bootstrap", iconClass: "devicon-bootstrap-plain colored" }
        ]
    },
    {
        category: "Backend",
        skills: [
            { name: "Java", iconClass: "devicon-java-plain colored" },
            { name: "Tomcat", iconClass: "devicon-tomcat-line" },
            { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
            { name: "Express", iconClass: "devicon-express-original" },
            { name: "Python", iconClass: "devicon-python-plain colored" }
        ]
    },
    {
        category: "Database & Tools",
        skills: [
            { name: "SQL", iconClass: "devicon-mysql-plain colored" },
            { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
            { name: "GitHub", iconClass: "devicon-github-original" },
            { name: "Jupyter", iconClass: "devicon-jupyter-plain colored" }
        ]
    }
];

export const education = [
    {
        school: "Sri Lanka Institute of Information Technology (SLIIT)",
        degree: "BSc. (Hons) in Information Technology (Undergraduate)",
        year: "Mar 2024 - Present",
        desc: "Undergraduate student at SLIIT.",
        logo: "src/public/SLIIT_Logo_Crest.png"
    },
    {
        school: "DS Senanayake College Colombo 07",
        degree: "G.C.E Advanced Level",
        year: "Mar 2021 - Jan 2024",
        desc: "Mathematics Stream Passed with 1 Credit and 2 Simple passes",
        logo: "./src/public/D._S._Senanayake_College_crest.png"
    },
    {
        school: "Central College Piliyandala",
        degree: "G.C.E Ordinary Level",
        year: "Mar 2015 - Mar 2021",
        desc: "Physical Science Stream. District Rank: 15.",
        logo: "/src/public/PCC.jpg"
    }

];

export const projects = [
    {
        title: "LankaCast News Extension",
        desc: "Chrome extension delivering real-time Sinhala news updates directly to the browser toolbar using background workers.",
        tags: ["JavaScript","RSS Feed", "Chrome API", "HTML/CSS"],
        images: [
            "./src/public/projects/LankaCast/1.png",
            "./src/public/projects/LankaCast/2.png",
            "./src/public/projects/LankaCast/3.png",
        ],
        links: { demo: "https://github.com/SadeshRaj/LankaCast/releases/tag/v1.0.0", code: "https://github.com/SadeshRaj/LankaCast" }
    },
    {
        title: "Invoice & BOQ PDF Generator",
        desc: "A web application built for CCSMC Company to create, preview, and download invoice and BOQ documents as professionally formatted PDFs.",
        tags: ["JSPservlet", "MySQL","JS","HTML","Tailwind"],
        // ADD UP TO 3 IMAGE URLs HERE
        images: [
            "./src/public/projects/CCSMC/img1.png",
            "./src/public/projects/CCSMC/img2.png",
            "./src/public/projects/CCSMC/img3.png",
            "./src/public/projects/CCSMC/img4.png"
        ],
        links: { demo: "https://github.com/SadeshRaj/LankaCast/releases/tag/v1.0.0", code: "https://github.com/SadeshRaj/LankaCast" }
    }
];

export const certificates = [
    {
        name: "Full Stack Web Development",
        issuer: "University of Moratuwa",
        date: "2024",
        imgUrl: "https://images.unsplash.com/photo-1589330694653-46d2de65a247?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Java SE 8 Programmer",
        issuer: "Oracle",
        date: "2023",
        imgUrl: "https://images.unsplash.com/photo-1589330694653-46d2de65a247?q=80&w=1000&auto=format&fit=crop"
    }
];