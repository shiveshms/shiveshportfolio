/* js/qna.js - Enhanced Resume-driven Q&A assistant (Extended for Certificates & Achievements) */

// ---------- UI hooks ----------
const floatBtn = document.getElementById('qna-floating-btn');
const qnaCard = document.getElementById('qna-card');
const qnaClose = document.getElementById('qna-close');
const qnaBody = document.getElementById('qna-body');
const qnaInput = document.getElementById('qna-input');
const qnaSend = document.getElementById('qna-send');

// ---------- Structured data ----------
const metadata = {
  nameFull: "Shivesh Mishra Suman",
  shortIntro: "Hi — I'm <strong>Shivesh</strong>, an aspiring Front-End Developer and GATE-qualified student.",
  location: "Delhi, India",
  email: "mishrashiwesh1976@gmail.com",
  phone: "+91-8567834843",
  linkedin: "https://in.linkedin.com/in/shiveshms",
  github: "https://github.com/shiveshms",
  resume: "resume.pdf",
  certificatesDrive: "https://drive.google.com/drive/folders/10zP_AvHBQM4kPUna3TprNHeI5us8df5-",
  portfolio_live: window.location.href
};

// Education
const education = [
  {
    title: "B.Tech in Computer Science & Engineering",
    institution: "GGSIPU · New Delhi",
    duration: "2022 - 2026 (expected)",
    notes: "CGPA: 9.2+ — studying full-stack development, DSA, and analytics."
  },
  {
    title: "Senior Secondary (Class XII)",
    institution: "CBSE · New Delhi",
    duration: "2021 - 2022",
    notes: "PCM with Computer Science — 92%."
  },
  {
    title: "High School (Class X)",
    institution: "CBSE · New Delhi",
    duration: "2019 - 2020",
    notes: "Overall strong performance — 89%."
  }
];

// Experience & Internships
const experience = [
  {
    title: "IBM Internship – Frontend Web Development",
    org: "Edunet (IBM SkillsBuild)",
    period: "Aug 2025 – Present",
    details: "Developed responsive web solutions using HTML, CSS, JavaScript, and React. Focus on component-based architecture and accessibility."
  },
  {
    title: "Deloitte Technology Virtual Internship",
    org: "Forage · Deloitte",
    period: "July 2025",
    details: "Technology consulting simulation — applied data analytics and SDLC practices to solve business problems."
  },
  {
    title: "IBM Full Stack Web Development Training",
    org: "IBM",
    period: "July 2024 - Aug 2024",
    details: "Hands-on training in full-stack development, responsive design, and Git/GitHub workflows."
  },
  {
    title: "Accenture Software Engineering Virtual Internship",
    org: "Forage · Accenture",
    period: "Aug 2024",
    details: "Simulation of software engineering workflows and collaborative coding in a professional environment."
  }
];

// Skills
const skills = [
  { area: "HTML / CSS", pct: 90 },
  { area: "JavaScript", pct: 85 },
  { area: "React.js", pct: 80 },
  { area: "Node.js / Express", pct: 78 },
  { area: "PHP", pct: 70 },
  { area: "MySQL / MongoDB", pct: 75 },
  { area: "Problem Solving (DSA)", pct: 80 },
  { area: "Data Structures", pct: 75 },
  { area: "Algorithms", pct: 70 }
];

// Projects
const projects = {
  "digital portfolio": {
    title: "Digital Portfolio",
    desc: "A responsive personal portfolio showing journey, projects, and resume. Clean UI, smooth animations, and accessible layout.",
    tech: ["HTML","CSS","JavaScript","jQuery"],
    github: "https://github.com/shiveshms",
    live: window.location.href
  },
  "mindaid": {
    title: "MindAid",
    desc: "Mental health awareness app with interactive FAQs and accessible UI.",
    tech: ["HTML","CSS","JavaScript","React"],
    github: "https://github.com/shiveshms/mindaid",
    live: "https://shiveshms.github.io/mindaid/"
  },
  "voyage india": {
    title: "Voyage India",
    desc: "Tourism portal highlighting travel destinations, mobile-first responsive design.",
    tech: ["HTML","CSS","JavaScript"],
    github: "https://github.com/shiveshms/VoyageIndia",
    live: "https://shiveshms.github.io/VoyageIndia/"
  },
  "bookly": {
    title: "Bookly",
    desc: "Full-stack bookstore with browsing, cart, and authentication. Backend in PHP + MySQL.",
    tech: ["HTML","CSS","JavaScript","PHP","MySQL"],
    github: "https://github.com/shiveshms/Bookly",
    live: "https://drive.google.com/file/d/1YVqkg2ZtPRsmesHPhWQYPWARIzN6ylW0/view?usp=drivesdk"
  }
};

// Certificates & Achievements
const certificates = [
  { title: "IBM Web Development Fundamentals", link: "https://drive.google.com/file/d/1ZeuYv5IMO0vskGFbhfwHPoTA3Lbyj40H/view?usp=drive_link" },
  { title: "IBM Full Stack Web Development Training", link: "https://drive.google.com/file/d/116JgUGCNuCZtpMsDSth1jbzNXgJ9Qau_/view?usp=drive_link" },
  { title: "Technorax Hackathon Participation", link: "https://drive.google.com/file/d/1kW4gB47eynwVFKRbBR5f2wp_QsI4Xve1/view?usp=drive_link" },
  { title: "GATE 2025 Scorecard", link: "https://drive.google.com/file/d/1E_to_bXe6nc3wP7kvCe8b5gNFPK6LQWu/view?usp=drive_link" },
  { title: "Google Cloud Intro to GenAI Studio", link: "https://drive.google.com/file/d/14aER49BvVRgc2eeFn5L23KEmxysyVDFo/view?usp=drive_link" },
  { title: "Deloitte Virtual Internship", link: "https://drive.google.com/file/d/13qPLMGih6k3zUqFGyGlPphmbF_isUTaR/view?usp=drive_link" },
  { title: "Accenture Software Engineering Virtual Internship", link: "https://drive.google.com/file/d/1HwDqufRalmrkIYt4ADCevuI21vLOFqGD/view?usp=drive_link" }
];

// ---------- Helper functions ----------
function appendMsg(who, htmlContent) {
  const el = document.createElement('div');
  el.className = 'qna-msg ' + (who === 'user' ? 'qna-user' : 'qna-bot');
  el.innerHTML = (who === 'user' ? `<small>You:</small><br>` : `<small>Bot:</small><br>`) + htmlContent;
  qnaBody.appendChild(el);
  qnaBody.scrollTop = qnaBody.scrollHeight;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ---------- UI open/close ----------
floatBtn.addEventListener('click', () => {
  const isOpen = qnaCard.style.display === 'flex';
  if (isOpen) {
    qnaCard.style.display = 'none';
    qnaCard.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('blur-active');
  } else {
    qnaCard.style.display = 'flex';
    qnaCard.setAttribute('aria-hidden', 'false');
    document.body.classList.add('blur-active');
    setTimeout(()=> qnaInput.focus(), 60);
  }
});
qnaClose.addEventListener('click', () => {
  qnaCard.style.display = 'none';
  qnaCard.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('blur-active');
});

// ---------- Send handler ----------
qnaSend.addEventListener('click', onSend);
qnaInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') onSend(); });

function onSend() {
  const raw = qnaInput.value.trim();
  if (!raw) return;
  appendMsg('user', escapeHtml(raw));
  qnaInput.value = '';
  processQuery(raw.toLowerCase());
}

// ---------- Main query processing ----------
function processQuery(text) {
  // Projects
  for (const key in projects) {
    if (text.includes(key) || text.includes(projects[key].title.toLowerCase())) {
      sendProjectResponse(projects[key]);
      return;
    }
  }

  const normalized = text.replace(/[?!.]/g, '').trim();
if (/\b(portfolio)\b/.test(normalized)) { 
  sendPortfolioLink(); 
  return; 
}

  if (/\b(about you|about yourself|about|intro|brief intro|brief introduction|introduction|portfolio|who are you|can you help me|you do|introduce|tell me about you)\b/.test(normalized)) { sendAbout(); return; }
  if (/\b(resume|cv|download|biodata)\b/.test(normalized)) { appendMsg('bot', formatResumeResponse()); return; }
  if (/\b(contact|quick link|quick links|email|phone|reach|reach me|how to contact)\b/.test(normalized)) { appendMsg('bot', formatContactResponse()); return; }
  if (/\b(linkedin)\b/.test(normalized)) { appendMsg('bot', `LinkedIn: <a href="${metadata.linkedin}" target="_blank" rel="noreferrer">${metadata.linkedin}</a>`); return; }
  if (/\b(github|git hub)\b/.test(normalized)) { appendMsg('bot', `GitHub: <a href="${metadata.github}" target="_blank" rel="noreferrer">${metadata.github}</a>`); return; }
  if (/\b(education|educational|degree|degrees|high school|class 10|class x|10 class|x class|senior secondary|class 12|class xii|12 class|xii class|college|btech|b.tech|ggsipu|school|class)\b/.test(normalized)) { sendEducation(); return; }
  if (/\b(experience|internship|worked|work history|jobs)\b/.test(normalized)) { sendExperience(); return; }
  if (/\b(skill|skills|technologies|tech stack|html|css|js|javascript|react|php|mysql|dsa|algorithm|mongodb|problem solving|data structure|stack|languages)\b/.test(normalized)) { sendSkillsSummary(); return; }
  
  if (/\b(certificates|certificate|certs|documents|drive|achievements|hackathon|gate|genai)\b/.test(normalized)) { sendCertificates(); return; }
  if (/\b(availability|available|available for work|open to|internship|hire|available for internship|hiring details)\b/.test(normalized)) {
    appendMsg('bot', "Availability: Open to internships and entry-level roles. Contact via email or LinkedIn to discuss opportunities.");
    return;
  }
  if (/\b(work|project|projects|demo|what have you built)\b/.test(normalized)) { sendProjectsList(); return; }

  showFallbackOptions();
}

// ---------- Response Builders ----------
function sendAbout() {
  const html = `
    <div>
      <p>${metadata.shortIntro}</p>
      <p><strong>Location:</strong> ${metadata.location}</p>
      <p><strong>Contact:</strong> <a href="mailto:${metadata.email}">${metadata.email}</a> · <a href="tel:${metadata.phone}">${metadata.phone}</a></p>
      <p><strong>LinkedIn:</strong> <a href="${metadata.linkedin}" target="_blank" rel="noreferrer">${metadata.linkedin}</a></p>
      <p><strong>Summary:</strong> Front-End focused developer building responsive, accessible interfaces using modern JS (React), with backend exposure (PHP/MySQL) and a strong DSA foundation. GATE-qualified and active in project-based learning.</p>
    </div>
  `;
  appendMsg('bot', html);
}
function sendPortfolioLink() {
  const html = `
    <div>
      <p>Check out my portfolio: <a href="https://github.com/shiveshm" target="_blank" rel="noreferrer">🌐 Portfolio Website</a></p>
      <p>It showcases my projects, skills, resume, and more.</p>
    </div>
  `;
  appendMsg('bot', html);
}

function formatResumeResponse() {
  return `Download resume: <a href="${metadata.resume}" target="_blank" rel="noreferrer">📄 Resume (PDF)</a>`;
}

function formatContactResponse() {
  return `
    <div>
      <p><strong>Email:</strong> <a href="mailto:${metadata.email}">${metadata.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${metadata.phone}">${metadata.phone}</a></p>
      <p><strong>LinkedIn:</strong> <a href="${metadata.linkedin}" target="_blank" rel="noreferrer">${metadata.linkedin}</a></p>
      <p><strong>GitHub:</strong> <a href="${metadata.github}" target="_blank" rel="noreferrer">${metadata.github}</a></p>
    </div>
  `;
}

function sendEducation() {
  const rows = education.map(ed => `
    <div style="margin-bottom:8px;">
      <strong>${escapeHtml(ed.title)}</strong><br/>
      <small>${escapeHtml(ed.institution)} · ${escapeHtml(ed.duration)}</small>
      <div style="color:#9aa4b0; margin-top:4px;">${escapeHtml(ed.notes)}</div>
    </div>
  `).join('');
  appendMsg('bot', `<div><h5>Education</h5>${rows}</div>`);
}

function sendExperience() {
  const rows = experience.map(exp => `
    <div style="margin-bottom:10px;">
      <strong>${escapeHtml(exp.title)}</strong><br/>
      <small>${escapeHtml(exp.org)} · ${escapeHtml(exp.period)}</small>
      <div style="color:#9aa4b0; margin-top:4px;">${escapeHtml(exp.details)}</div>
    </div>
  `).join('');
  appendMsg('bot', `<div><h5>Experience</h5>${rows}</div>`);
}

function sendSkillsSummary() {
  const bars = skills.map(s => {
    const pct = Math.max(0, Math.min(100, s.pct || 0));
    return `
      <div style="margin-bottom:8px;">
        <div style="display:flex; justify-content:space-between; font-weight:600;">
          <span>${escapeHtml(s.area)}</span><span>${pct}%</span>
        </div>
        <div style="background:#0d1720; border-radius:8px; height:10px; overflow:hidden; margin-top:6px;">
          <div style="width:${pct}%; height:100%; background:linear-gradient(90deg,#39ff14,#a6ff7a);"></div>
        </div>
      </div>
    `;
  }).join('');
  appendMsg('bot', `<div><h5>Skills</h5>${bars}</div>`);
}

function sendProjectsList() {
  const list = Object.keys(projects).map(k => {
    const p = projects[k];
    return `
      <div style="margin-bottom:10px;">
        <strong>${escapeHtml(p.title)}</strong>
        <div style="color:#9aa4b0; margin:6px 0 8px;">${escapeHtml(p.desc)}</div>
        <div style="margin-bottom:6px;">
          <small>Tech: ${p.tech.join(', ')}</small>
        </div>
        <div>
          <a href="${p.github}" target="_blank" rel="noreferrer">GitHub</a> ·
          <a href="${p.live}" target="_blank" rel="noreferrer">Live Demo</a>
        </div>
      </div>
    `;
  }).join('');
  appendMsg('bot', `<div><h5>Projects</h5>${list}</div>`);
}

function sendProjectResponse(project) {
  const html = `
    <div>
      <h5>${escapeHtml(project.title)}</h5>
      <p style="color:#9aa4b0;">${escapeHtml(project.desc)}</p>
      <p><strong>Tech:</strong> ${project.tech.join(', ')}</p>
      <p>
        <a href="${project.github}" target="_blank" rel="noreferrer">🔗 GitHub</a>
        &nbsp; · &nbsp;
        <a href="${project.live}" target="_blank" rel="noreferrer">🔗 Live Demo</a>
      </p>
      <p style="font-size:0.92rem; color:#9aa4b0;">Ask for details or code snippets for this project.</p>
    </div>
  `;
  appendMsg('bot', html);
}

// ---------- Certificates / Achievements ----------
function sendCertificates() {
  const list = certificates.map(c => `<div><a href="${c.link}" target="_blank" rel="noreferrer">${c.title}</a></div>`).join('');
  appendMsg('bot', `<div><h5>Certificates & Achievements</h5>${list}</div>`);
}

// ---------- Fallback ----------
function showFallbackOptions() {
  const fallbackHtml = `
    I couldn't find a direct answer. Try one of these:
    <div class="qna-options" style="margin-top:8px;">
      <button class="qna-option-btn" data-action="resume">📄 Download Resume</button>
      <button class="qna-option-btn" data-action="projects">🌐 Projects</button>
      <button class="qna-option-btn" data-action="contact">✉️ Contact Info</button>
      <button class="qna-option-btn" data-action="certificates">🏆 Certificates</button>
    </div>
  `;
  appendMsg('bot', fallbackHtml);

  setTimeout(() => {
    const opts = qnaBody.querySelectorAll('.qna-option-btn');
    opts.forEach(btn => {
      btn.addEventListener('click', (e)=> {
        const action = e.currentTarget.getAttribute('data-action');
        if (action === 'resume') appendMsg('bot', formatResumeResponse());
        if (action === 'projects') sendProjectsList();
        if (action === 'contact') appendMsg('bot', formatContactResponse());
        if (action === 'certificates') sendCertificates();
      });
    });
  }, 50);
}

// ---------- Onload greeting ----------
window.addEventListener('load', () => {
  appendMsg('bot', 'Hi! Ask me about my skills, projects, resume, experience, certificates, or contact details. Try: "Show my IBM certificate" or "GATE score".');
});



// Scroll-to-top button functionality
const scrollTopBtn = document.getElementById('scroll-top-btn');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

