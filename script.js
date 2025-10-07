document.addEventListener('DOMContentLoaded', () => {
    // --- CONSTANTS & CACHE ---
    const GEMINI_API_KEY = "__GEMINI_API_KEY_PLACEHOLDER__"; // This is replaced by the GitHub Action
    const readmeCache = {};
    const SELECTORS = {
        DESKTOP: 'desktop',
        DOCK: 'dock',
        OPEN_TABS: 'open-tabs',
        WINDOW: '.window',
        TITLE_BAR: '.title-bar',
        CLOSE_BUTTON: '.close',
        MINIMIZE_BUTTON: '.minimize',
        MAXIMIZE_BUTTON: '.maximize',
        DOCK_ITEM: '.dock-item',
        PROJECT_LIST_ITEM: '.project-list-item',
        ABOUT_TABS: '.about-tabs',
        ABOUT_TAB: '.about-tab',
        DATETIME: 'datetime',
        CHAT_MESSAGES: 'chat-messages',
        CHAT_INPUT: 'chat-input',
        CHAT_SEND: 'chat-send',
    };

    // --- GLOBAL STATE ---
    let highestZIndex = 10;

    // --- DATA (remains the same) ---
    const appData = {
        'projects': { title: 'Projects', icon: 'https://placehold.co/128x128/4ade80/1e3a8a?text=P' },
        'about-syad': { title: 'About Syad', icon: 'https://placehold.co/128x128/60a5fa/1e3a8a?text=A' },
        'ai-assistant': { title: 'AI Assistant', icon: 'https://placehold.co/128x128/a78bfa/ffffff?text=✨' },
        'contact': { title: 'Contact', icon: 'https://placehold.co/128x128/f87171/1e3a8a?text=@' },
    };
    const projectData = [
        { id: 'project-1', title: 'Memory Card Game', icon: 'https://placehold.co/48x48/facc15/1e3a8a?text=M', github: 'https://github.com/syaddays/Memory-Card-Game', shortDesc: 'A modern, interactive memory card game.', tags: ['HTML', 'CSS', 'JavaScript'] },
        { id: 'project-2', title: 'IPO Web App', icon: 'https://placehold.co/48x48/ef4444/ffffff?text=IPO', github: 'https://github.com/syaddays/ipo', shortDesc: 'A Django-based IPO tracking web app.', tags: ['Django', 'Bootstrap'] },
        { id: 'project-3', title: 'SkillVault', icon: 'https://placehold.co/48x48/8b5cf6/ffffff?text=SV', github: 'https://github.com/syaddays/skillvault', shortDesc: 'A daily goal tracker built with React.', tags: ['React', 'TypeScript', 'Framer Motion'] },
        { id: 'project-4', title: 'Customer Churn Prediction', icon: 'https://placehold.co/48x48/34d399/ffffff?text=CP', github: 'https://github.com/syaddays/Customer-Churn-Prediction-Model', shortDesc: 'A model to predict customer churn.', tags: ['Python', 'Machine Learning'] },
        { id: 'project-5', title: 'Retail Sales Analysis', icon: 'https://placehold.co/48x48/fb923c/ffffff?text=SA', github: 'https://github.com/syaddays/Retail-Sales-Analysis', shortDesc: 'Analyzing retail sales data.', tags: ['Python', 'Data Analysis'] },
        { id: 'project-6', title: 'LaTeX Resume Tailor', icon: 'https://placehold.co/48x48/9333ea/ffffff?text=LR', github: 'https://github.com/syaddays/latex-resume-tailor', shortDesc: 'A tool to customize LaTeX resumes.', tags: ['Python', 'LaTeX'] },
        { id: 'project-7', title: 'Code Patterns Website', icon: 'https://placehold.co/48x48/ec4899/ffffff?text=LP', github: 'https://github.com/syaddays/Learncodepattern.github.io', shortDesc: 'A site for learning code patterns.', tags: ['HTML', 'CSS'] },
        { id: 'project-8', 'title': 'Vehicle Rental System', icon: 'https://placehold.co/48x48/14b8a6/ffffff?text=VR', github: 'https://github.com/syaddays/Vehicle-Rental-System', shortDesc: 'A rental system built with Java.', tags: ['Java', 'MySQL'] },
    ];
    const skillsData = {
        Languages: [{ name: 'JavaScript', icon: 'https://placehold.co/48x48/f7df1e/000000?text=JS' }, { name: 'HTML5', icon: 'https://placehold.co/48x48/e34f26/ffffff?text=H5' }, { name: 'CSS3', icon: 'https://placehold.co/48x48/1572b6/ffffff?text=C3' }, { name: 'Python', icon: 'https://placehold.co/48x48/3776ab/ffffff?text=Py' }, { name: 'Java', icon: 'https://placehold.co/48x48/007396/ffffff?text=J' }],
        Frameworks_Libraries: [{ name: 'React', icon: 'https://placehold.co/48x48/61dafb/000000?text=R' }, { name: 'Next.js', icon: 'https://placehold.co/48x48/000000/ffffff?text=N' }, { name: 'Vue.js', icon: 'https://placehold.co/48x48/4fc08d/ffffff?text=V' }, { name: 'Django', icon: 'https://placehold.co/48x48/092e20/ffffff?text=Dj' }, { name: 'Bootstrap', icon: 'https://placehold.co/48x48/7952b3/ffffff?text=B' }, { name: 'Framer Motion', icon: 'https://placehold.co/48x48/0055ff/ffffff?text=FM' }],
        Databases_Tools: [{ name: 'MySQL', icon: 'https://placehold.co/48x48/4479a1/ffffff?text=SQL' }, { name: 'Git', icon: 'https://placehold.co/48x48/f05032/ffffff?text=G' }, { name: 'Firebase', icon: 'https://placehold.co/48x48/ffca28/000000?text=F' }, { name: 'TailwindCSS', icon: 'https://placehold.co/48x48/06b6d4/ffffff?text=T' }, { name: 'LaTeX', icon: 'https://placehold.co/48x48/008080/ffffff?text=La' }],
        Fields: [{ name: 'Machine Learning', icon: 'https://placehold.co/48x48/f97316/ffffff?text=ML' }, { name: 'Data Analysis', icon: 'https://placehold.co/48x48/10b981/ffffff?text=DA' }]
    };
    const certificationsData = [
        { title: 'Postman API Fundamentals Student Expert', issuer: 'Canvas Credentials (Badgr)', url: 'https://api.badgr.io/public/assertions/E4AlyjMWQqKU8F48Zgm3hw', tags: ['Testing', 'API', 'Postman API', 'API Development'] },
        { title: 'Node.js Essential Training', issuer: 'LinkedIn', url: 'https://www.linkedin.com/learning/node-js-essential-training-14888164', tags: ['Node.js'] },
        { title: 'AWS Cloud Solutions Architect', issuer: 'Coursera', url: 'https://coursera.org/share/a663300a582df7784f434d5ac74b78cf', tags: ['Solution Architecture', 'Serverless Computing', 'Cloud Security'] },
        { title: 'Python Basics', issuer: 'Coursera', url: 'https://coursera.org/share/56bae0b699e3b0d1ff4424c63c130a59', tags: ['Computer Programming', 'Data Structures', 'Python Programming'] },
        { title: 'Thinking Creatively', issuer: 'LinkedIn', url: 'https://www.linkedin.com/learning/thinking-creatively', tags: ['Analytical Skills'] },
        { title: 'Foundations of Project Management', issuer: 'Coursera', url: 'https://coursera.org/share/c38e6a5db0cd65a5dd756bba1e87ef22', tags: ['Project Management Life Cycle', 'Software Project Management'] }
    ];
    const tagColors = {
        'React': 'bg-blue-900 text-blue-300', 'TypeScript': 'bg-sky-900 text-sky-300', 'Framer Motion': 'bg-pink-900 text-pink-300', 'HTML': 'bg-red-900 text-red-300', 'CSS': 'bg-indigo-900 text-indigo-300', 'JavaScript': 'bg-yellow-900 text-yellow-300', 'Django': 'bg-green-800 text-green-200', 'Bootstrap': 'bg-purple-900 text-purple-300', 'Python': 'bg-blue-800 text-blue-200', 'Machine Learning': 'bg-rose-800 text-rose-200', 'Data Analysis': 'bg-amber-800 text-amber-200', 'LaTeX': 'bg-teal-800 text-teal-200', 'Java': 'bg-orange-800 text-orange-200', 'MySQL': 'bg-sky-800 text-sky-200', 'MERN': 'bg-green-800 text-green-200', 'Node.js': 'bg-green-700 text-green-100', 'LSTM': 'bg-purple-900 text-purple-300', 'Testing': 'bg-emerald-800 text-emerald-200', 'API': 'bg-sky-700 text-sky-100', 'Postman API': 'bg-orange-600 text-white', 'API Development': 'bg-blue-600 text-white', 'Solution Architecture': 'bg-amber-700 text-amber-100', 'Serverless Computing': 'bg-yellow-600 text-yellow-100', 'Cloud Security': 'bg-red-700 text-red-100', 'Computer Programming': 'bg-green-600 text-green-100', 'Data Structures': 'bg-cyan-700 text-cyan-100', 'Python Programming': 'bg-blue-700 text-blue-100', 'Analytical Skills': 'bg-indigo-600 text-indigo-100', 'Project Management Life Cycle': 'bg-rose-700 text-rose-100', 'Software Project Management': 'bg-pink-700 text-pink-100'
    };

    // --- DOM Elements ---
    const chatMessages = document.getElementById(SELECTORS.CHAT_MESSAGES);
    const chatInput = document.getElementById(SELECTORS.CHAT_INPUT);
    const chatSendButton = document.getElementById(SELECTORS.CHAT_SEND);
    const datetimeElement = document.getElementById(SELECTORS.DATETIME);

    // --- GEMINI API CALL ---
    async function callGeminiAPI(prompt) {
        if (GEMINI_API_KEY === "__GEMINI_API_KEY_PLACEHOLDER__") {
            console.error("Gemini API Key has not been replaced. Please configure the GitHub Action secret.");
            return "API Key not configured. This is a simulated response. Please check the setup instructions.";
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error("API request failed:", response.status, await response.text());
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                return result.candidates[0].content.parts[0].text;
            } else {
                console.error("Unexpected API response structure:", result);
                throw new Error('Unexpected API response structure.');
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return "Sorry, I encountered an error while contacting the AI. Please try again later.";
        }
    }

    // --- WINDOW MANAGEMENT ---
    function focusWindow(win) { 
        if (window.innerWidth <= 768) return;
        if (win) win.style.zIndex = ++highestZIndex; 
    }
    function openWindow(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;
        if (window.innerWidth <= 768) {
            document.querySelectorAll(SELECTORS.WINDOW).forEach(w => w.classList.remove('active'));
        }
        win.classList.add('active');
        win.classList.remove('minimized');
        updateUI();
        focusWindow(win);
    }
    function closeWindow(windowId) {
        const win = document.getElementById(windowId);
        if (win) win.classList.remove('active');
        updateUI();
    }
    function minimizeWindow(windowId) {
        if (window.innerWidth <= 768) return;
        const win = document.getElementById(windowId);
        if (win) win.classList.add('minimized');
        updateMenuBar();
    }
    function toggleMaximize(win) {
        if (window.innerWidth <= 768) return;
        win.classList.toggle('maximized');
    }

    // --- UI UPDATES ---
    function updateMenuBar() {
        const openTabsContainer = document.getElementById(SELECTORS.OPEN_TABS);
        openTabsContainer.innerHTML = '';
        document.querySelectorAll('.window.active:not(.minimized)').forEach(win => {
            const title = win.querySelector('.window-title').textContent;
            const tab = document.createElement('span');
            tab.className = 'menu-bar-item';
            tab.textContent = title;
            tab.onclick = () => focusWindow(win);
            openTabsContainer.appendChild(tab);
        });
    }
    function updateDock() {
        Object.keys(appData).forEach(appId => {
            const win = document.getElementById(appId);
            const dockIcon = document.querySelector(`.dock-item[data-window="${appId}"]`);
            if (win && win.classList.contains('active')) {
                dockIcon.classList.add('app-open');
            } else {
                dockIcon.classList.remove('app-open');
            }
        });
    }
    function updateUI() {
        updateMenuBar();
        updateDock();
    }

    // --- INITIALIZATION ---
    function initWindows() {
        document.querySelectorAll(SELECTORS.WINDOW).forEach(win => {
            if (win.classList.contains('active')) focusWindow(win);
            
            win.querySelector(SELECTORS.CLOSE_BUTTON).addEventListener('click', e => { e.stopPropagation(); closeWindow(win.id); });
            win.querySelector(SELECTORS.MINIMIZE_BUTTON).addEventListener('click', e => { e.stopPropagation(); minimizeWindow(win.id); });
            win.querySelector(SELECTORS.MAXIMIZE_BUTTON).addEventListener('click', e => { e.stopPropagation(); toggleMaximize(win); });
            
            win.addEventListener('mousedown', () => focusWindow(win));

            const titleBar = win.querySelector(SELECTORS.TITLE_BAR);
            if (window.innerWidth > 768 && titleBar) {
                let isDragging = false, offsetX, offsetY;
                titleBar.addEventListener('mousedown', e => { 
                    if (e.target.classList.contains('title-bar-button')) return;
                    isDragging = true; 
                    document.body.classList.add('dragging'); 
                    focusWindow(win); 
                    offsetX = e.clientX - win.offsetLeft; 
                    offsetY = e.clientY - win.offsetTop; 
                    titleBar.style.cursor = 'grabbing'; 
                });
                document.addEventListener('mousemove', e => { 
                    if (isDragging) { 
                        let newLeft = e.clientX - offsetX; 
                        let newTop = e.clientY - offsetY; 
                        const menuBarHeight = 28; 
                        const visibleMargin = 50; 
                        newTop = Math.max(menuBarHeight, Math.min(newTop, window.innerHeight - visibleMargin));
                        newLeft = Math.max(-win.offsetWidth + visibleMargin, Math.min(newLeft, window.innerWidth - visibleMargin));
                        win.style.left = `${newLeft}px`; 
                        win.style.top = `${newTop}px`; 
                    } 
                });
                document.addEventListener('mouseup', () => { 
                    isDragging = false; 
                    document.body.classList.remove('dragging'); 
                    titleBar.style.cursor = 'grab'; 
                });
            }
        });
    }

    function initDock() {
        const dock = document.getElementById(SELECTORS.DOCK);
        Object.keys(appData).forEach(appId => {
            const app = appData[appId];
            const dockIcon = document.createElement('button');
            dockIcon.className = 'dock-item';
            dockIcon.dataset.window = appId;
            dockIcon.setAttribute('aria-label', `Open ${app.title}`);
            dockIcon.innerHTML = `<span class="dock-tooltip">${app.title}</span><img src="${app.icon}" class="w-full h-full rounded-lg" alt=""><div class="active-dot"></div>`;
            dockIcon.addEventListener('click', () => {
                const win = document.getElementById(appId);
                if (!win) return;
                const isTopWindow = parseInt(win.style.zIndex) === highestZIndex && win.classList.contains('active') && !win.classList.contains('minimized');
                if (window.innerWidth > 768 && isTopWindow) {
                    minimizeWindow(appId);
                } else {
                    openWindow(appId);
                }
            });
            dock.appendChild(dockIcon);
        });
        
        const separator = document.createElement('div');
        separator.className = 'h-3/5 w-px bg-white/20 mx-1';
        dock.appendChild(separator);

        const externalLinks = [
            { name: 'GitHub', href: 'https://github.com/syaddays', svg: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.302 24 12 24 5.373 18.627 0 12 0z"/>' },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/syad-safi/', svg: '<title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>' },
            { name: 'LeetCode', href: 'https://leetcode.com/syad/', svg: '<path d="M13.483 0a1.5 1.5 0 00-1.5 1.5v15.25a1.5 1.5 0 001.5 1.5h7.767a1.5 1.5 0 001.5-1.5V1.5a1.5 1.5 0 00-1.5-1.5h-7.767zM15.75 15.5h-1.017v-1.625h1.017V15.5zM15.75 11.5h-1.017V9.875h1.017V11.5zM15.75 7.5h-1.017V5.875h1.017V7.5zM15.75 3.5h-1.017V1.875h1.017V3.5zM18.5 15.5h-1.017v-1.625h1.017V15.5zM18.5 11.5h-1.017V9.875h1.017V11.5zM18.5 7.5h-1.017V5.875h1.017V7.5zM18.5 3.5h-1.017V1.875h1.017V3.5zM21.25 15.5h-1.017v-1.625h1.017V15.5zM21.25 11.5h-1.017V9.875h1.017V11.5zM21.25 7.5h-1.017V5.875h1.017V7.5zM21.25 3.5h-1.017V1.875h1.017V3.5zM12 18.25V1.5a1.5 1.5 0 00-1.5-1.5H2.75a1.5 1.5 0 00-1.5 1.5v16.75a1.5 1.5 0 001.5 1.5h7.75a1.5 1.5 0 001.5-1.5zM9 14.25H3.5v-1.5H9v1.5zm0-4H3.5v-1.5H9v1.5zm0-4H3.5v-1.5H9v1.5z"/>', padding: 'p-2.5' }
        ];
        externalLinks.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            anchor.className = 'dock-item';
            anchor.setAttribute('aria-label', `Visit Syad's ${link.name}`);
            anchor.innerHTML = `<span class="dock-tooltip">${link.name}</span><div class="w-full h-full bg-black/50 rounded-lg flex items-center justify-center ${link.padding || 'p-2'}"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">${link.svg}</svg></div>`;
            dock.appendChild(anchor);
        });
    }

    // --- APPS LOGIC ---
    function initProjectsApp() {
        const projectListContainer = document.getElementById('project-list');
        const projectDisplayContainer = document.getElementById('project-display');
        if (!projectListContainer || !projectDisplayContainer) return;

        async function displayProjectDetails(project) {
            document.querySelectorAll(SELECTORS.PROJECT_LIST_ITEM).forEach(item => item.classList.toggle('selected', item.dataset.projectId === project.id));
            projectDisplayContainer.innerHTML = `<div id="gemini-controls" class="p-4 border-b border-white/10"><button id="summarize-button" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">✨ Summarize with AI</button><div id="gemini-summary-container" class="mt-4 hidden"><div id="gemini-summary-content" class="p-4 bg-black/20 rounded-lg text-gray-300 border border-white/10 prose prose-sm prose-invert max-w-none"></div></div></div><div id="readme-content-wrapper" class="readme-content p-6"><div class="flex justify-center items-center h-full"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div></div></div>`;
            const readmeWrapper = projectDisplayContainer.querySelector('#readme-content-wrapper');
            projectDisplayContainer.querySelector('#summarize-button').addEventListener('click', () => handleProjectSummary(project, projectDisplayContainer));

            if (readmeCache[project.id]) {
                readmeWrapper.innerHTML = marked.parse(readmeCache[project.id]);
                return;
            }
            try {
                const repoUrl = new URL(project.github);
                // Try fetching from 'main' or 'master' branches
                const branches = ['main', 'master'];
                let markdown = null;
                for (const branch of branches) {
                    const rawUrl = `https://raw.githubusercontent.com${repoUrl.pathname}/${branch}/README.md`;
                    try {
                        const response = await fetch(rawUrl);
                        if (response.ok) {
                            markdown = await response.text();
                            break; // Exit loop if successful
                        }
                    } catch (e) { /* Ignore fetch error and try next branch */ }
                }
                
                if (markdown) {
                    readmeCache[project.id] = markdown;
                    readmeWrapper.innerHTML = marked.parse(markdown);
                } else {
                    throw new Error(`Failed to fetch README from common branches.`);
                }
            } catch (error) {
                console.error(error);
                readmeWrapper.innerHTML = `<div class="p-4 text-center text-gray-400">Could not load README.md for this project.</div>`;
            }
        }
        projectData.forEach(p => {
            const entry = document.createElement('button');
            entry.className = 'project-list-item';
            entry.dataset.projectId = p.id;
            const tagsHTML = p.tags.map(tag => `<span class="tech-tag ${tagColors[tag] || 'bg-gray-700 text-gray-300'}">${tag}</span>`).join('');
            entry.innerHTML = `<div class="flex items-start gap-3 pointer-events-none"><img src="${p.icon}" class="w-10 h-10 rounded-md mt-1" alt=""><div><h3 class="font-semibold text-sm text-gray-200">${p.title}</h3><p class="text-xs text-gray-400 mb-2">${p.shortDesc}</p><div class="flex flex-wrap gap-1.5">${tagsHTML}</div></div></div>`;
            entry.addEventListener('click', () => displayProjectDetails(p));
            projectListContainer.appendChild(entry);
        });
        if(projectData.length > 0) displayProjectDetails(projectData[0]);
    }

    /**
     * TOKEN-SAVING CHANGE: Instead of sending the full README, we send a much smaller,
     * pre-processed summary of the project's data. This dramatically reduces input tokens.
     */
    async function handleProjectSummary(project, container) {
        const summaryContainer = container.querySelector('#gemini-summary-container');
        const summaryContent = container.querySelector('#gemini-summary-content');
        const summarizeButton = container.querySelector('#summarize-button');
        
        summaryContainer.style.display = 'block';
        summaryContent.innerHTML = '<p>✨ Thinking...</p>';
        summarizeButton.disabled = true;
        
        try {
            // Create a small, token-efficient summary of the project data.
            const projectInfo = `Project Title: ${project.title}. Description: ${project.shortDesc}. Key Technologies: ${project.tags.join(', ')}.`;
            
            // The prompt is now much shorter and more direct.
            const prompt = `You are a technical writer AI. Based on the following information, write a concise and engaging one-paragraph summary for a portfolio website. Be enthusiastic.\n\n**Project Data:**\n---\n${projectInfo}`;
            
            const summaryMarkdown = await callGeminiAPI(prompt);
            summaryContent.innerHTML = marked.parse(summaryMarkdown);
        } catch (error) {
            console.error('Gemini Summary Error:', error);
            summaryContent.innerHTML = '<p class="text-red-400">Sorry, I couldn\'t generate a summary at this time.</p>';
        } finally {
            summarizeButton.disabled = false;
        }
    }

    function initAboutApp() {
        const aboutSyadWindow = document.getElementById('about-syad');
        if (!aboutSyadWindow) return;
        const skillsContainer = aboutSyadWindow.querySelector('#skills-content');
        const certsContainer = aboutSyadWindow.querySelector('#certifications-content');
        skillsContainer.innerHTML = `<div class="space-y-4">${Object.keys(skillsData).map(category => `<div><p class="text-sm font-semibold text-gray-300 mb-2 capitalize">${category.replace(/_/g, ' ')}</p><div class="flex flex-wrap gap-4">${skillsData[category].map(skill => `<div class="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-md"><img src="${skill.icon}" class="w-5 h-5 rounded-sm" alt=""><span class="text-sm">${skill.name}</span></div>`).join('')}</div></div>`).join('')}</div>`;
        certsContainer.innerHTML = certificationsData.map(cert => {
            const tagsHTML = cert.tags.map(tag => `<span class="tech-tag ${tagColors[tag] || 'bg-gray-700 text-gray-300'}">${tag}</span>`).join('');
            return `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="block bg-black/20 p-4 rounded-lg hover:bg-black/40 transition-colors"><h3 class="font-semibold text-gray-200">${cert.title}</h3><p class="text-xs text-gray-400 mt-1 mb-2">Issued by: ${cert.issuer}</p><div class="flex flex-wrap gap-1.5">${tagsHTML}</div></a>`;
        }).join('');
        aboutSyadWindow.querySelector(SELECTORS.ABOUT_TABS).addEventListener('click', (e) => {
            if(e.target.matches(SELECTORS.ABOUT_TAB)) {
                const tabName = e.target.dataset.tab;
                aboutSyadWindow.querySelectorAll(SELECTORS.ABOUT_TAB).forEach(t => t.classList.remove('active'));
                aboutSyadWindow.querySelectorAll('.about-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                aboutSyadWindow.querySelector(`#${tabName}-content`).classList.add('active');
            }
        });
    }

    function initAIAssistant() {
        let aiChatHistory = [];
        // Create a more concise context string to save tokens on every call.
        const portfolioContext = `Syad Safi's Projects: ${projectData.map(p => `${p.title} (${p.tags.join(', ')})`).join('; ')}. Skills: ${Object.values(skillsData).flat().map(s => s.name).join(', ')}.`;

        chatSendButton.addEventListener('click', handleAIChat);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAIChat(); });
        
        async function handleAIChat() {
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;
            
            appendChatMessage(userMessage, 'user');
            chatInput.value = '';
            chatSendButton.disabled = true;
            appendChatMessage('...', 'assistant', true);

            /**
             * TOKEN-SAVING CHANGE: We now use a "sliding window" for chat history.
             * This keeps the prompt from growing indefinitely by only sending the last
             * 6 messages (3 pairs of user/assistant turns).
             */
            const recentHistory = aiChatHistory.slice(-6); 

            try {
                const prompt = `You are a friendly AI assistant for Syad Safi's portfolio. Answer questions about his skills and projects based on this context. Be conversational. If a question is outside this scope, politely decline. CONTEXT: ${portfolioContext}\n\nHISTORY:\n${recentHistory.map(m => `${m.role}: ${m.parts[0].text}`).join('\n')}\n\nUSER QUESTION: ${userMessage}`;
                
                const assistantResponse = await callGeminiAPI(prompt);
                updateLastChatMessage(assistantResponse);
                
                // Add new messages to the full history
                aiChatHistory.push({role: 'user', parts: [{text: userMessage}]});
                aiChatHistory.push({role: 'model', parts: [{text: assistantResponse}]});

            } catch (error) {
                console.error("AI Assistant Error:", error);
                updateLastChatMessage("I'm sorry, I encountered an error. Please try again later.");
            } finally {
                chatSendButton.disabled = false;
            }
        }
    }
    
    // --- UTILITY FUNCTIONS ---
    function appendChatMessage(message, sender, isTyping = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        const p = document.createElement('p');
        p.innerHTML = marked.parse(message);
        if (isTyping) p.id = 'typing-indicator';
        messageDiv.appendChild(p);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    function updateLastChatMessage(newMessage) {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.innerHTML = marked.parse(newMessage);
            typingIndicator.id = '';
        }
    }
    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' };
        datetimeElement.textContent = now.toLocaleString('en-US', options).replace(',', '');
    }

    // --- MAIN EXECUTION ---
    function main() {
        initWindows();
        initDock();
        initProjectsApp();
        initAboutApp();
        initAIAssistant();
        setInterval(updateDateTime, 1000);
        updateDateTime();
        if (window.innerWidth > 768) {
            openWindow('projects');
            openWindow('about-syad');
        } else {
            openWindow('about-syad');
        }
        updateUI();
    }

    main();
});
