// Problem Knowledge Base
const KNOWLEDGE_BASE = {
  code: {
    title: "Code Debugger Agent",
    statusText: "Ready to analyze stack traces & logic...",
    suggestions: [
      "React State Not Updating",
      "Python NameError: undefined variable",
      "SQL JOIN query is extremely slow",
      "JS async/await unhandled rejection"
    ],
    welcomeMessage: "Hello! I am your Code Debugger. I specialize in syntax errors, runtime failures, and query optimization. Paste your code or select one of the common debugging guides below to begin troubleshooting in real-time.",
    problems: {
      "react state not updating": {
        title: "Fix: React State Not Updating Async",
        cause: "React state updates are batched and asynchronous. Mutating original state variables directly also prevents re-rendering.",
        checklist: [
          "Avoid direct mutation (e.g. use state arrays with copy operator `[...arr]`)",
          "Use the updater callback syntax if new state relies on previous state",
          "Ensure updates are not blocked inside outdated closures or event listeners",
          "Use a useEffect hook to monitor state changes and log correctly"
        ],
        code: `// ❌ Incorrect (direct mutation)
const addVal = () => {
  myArray.push('newVal');
  setMyArray(myArray); // Won't trigger re-render
}

// ✔️ Correct (Functional state update + shallow copy)
const addVal = () => {
  setMyArray(prevArray => [...prevArray, 'newVal']);
}`,
        language: "javascript",
        type: "code"
      },
      "python nameerror: undefined variable": {
        title: "Fix: Python NameError",
        cause: "The interpreter cannot find a variable or function name in local or global scopes. This is often due to spelling mistakes or incorrect scoping.",
        checklist: [
          "Double-check spelling of the variable name (remember Python is case-sensitive)",
          "Verify the variable or function is defined *before* you attempt to call it",
          "If accessing inside a function, declare variable as global or pass it as an argument",
          "Check import statements: verify package/module name is spelled correctly"
        ],
        code: `# ❌ Incorrect (Out of scope)
def calculate():
  result = 100
calculate()
print(result) # NameError: name 'result' is not defined

# ✔️ Correct (Return value or scope correctly)
def calculate():
  return 100
value = calculate()
print(value) # 100`,
        language: "python",
        type: "python"
      },
      "sql join query is extremely slow": {
        title: "Optimize: Slow SQL JOIN Query",
        cause: "Large datasets joined on un-indexed or mismatched fields cause full-table scans. Selecting unnecessary columns (`SELECT *`) also degrades throughput.",
        checklist: [
          "Run 'EXPLAIN' on the query to view execution path and table scans",
          "Create indexes on columns used in JOIN conditions (Foreign Keys)",
          "Replace SELECT * with explicit column names",
          "Avoid joining on non-indexed string fields; match data types strictly"
        ],
        code: `-- Run this command to analyze query performance
EXPLAIN SELECT u.id, o.order_date 
FROM users u 
JOIN orders o ON u.id = o.user_id;

-- Create target indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);`,
        language: "sql",
        type: "terminal"
      },
      "js async/await unhandled rejection": {
        title: "Fix: JS Promise Unhandled Rejection",
        cause: "An asynchronous promise failed, but there is no catch block or error handler configured to process the exception.",
        checklist: [
          "Wrap your async operations inside a try-catch block",
          "Verify downstream api response checks (response.ok) before parsing json",
          "Implement a global catch listener for safety backup",
          "Ensure await keyword is placed before promise functions"
        ],
        code: `// ✔️ Clean Async-Await Error Handling
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
    // Gracefully handle or pass to fallback state
  }
}`,
        language: "javascript",
        type: "code"
      }
    }
  },
  network: {
    title: "Network Support Agent",
    statusText: "Ready to diagnose network paths...",
    suggestions: [
      "Slow WiFi Connection",
      "SSH Connection Timeout",
      "DNS Name Resolution Issue",
      "Port 80/443 Connection Blocked"
    ],
    welcomeMessage: "Hello! I am your Network Support Agent. I specialize in routing issues, slow connections, SSH timeouts, and DNS overrides. Choose a guide below or describe your connection problem.",
    problems: {
      "slow wifi connection": {
        title: "Troubleshoot: Slow WiFi Connection",
        cause: "Signal degradation, DNS congestion, channel interference, or router buffer overload.",
        checklist: [
          "Perform a speed test (e.g. fast.com) to measure latency and packet loss",
          "Unplug the router for 30 seconds, then power back on",
          "Flush local system DNS cache to clear outdated routing records",
          "Move closer to router or switch from 2.4 GHz to 5 GHz bandwidth"
        ],
        code: `# Flush DNS cache on Windows (Command Prompt)
ipconfig /flushdns

# Flush DNS cache on macOS / Linux
sudo killall -HUP mDNSResponder`,
        language: "bash",
        type: "terminal"
      },
      "ssh connection timeout": {
        title: "Diagnose: SSH Connection Timeout",
        cause: "Network route issues, server firewalls (iptables/ufw) dropping packets, or SSH service is down.",
        checklist: [
          "Check remote host availability via ping command",
          "Verify the target port (default 22) is open and listening",
          "Use verbose output (-vvv) to isolate exactly where connection stalls",
          "Confirm your local IP is not blacklisted by Fail2ban on host server"
        ],
        code: `# Run diagnostic SSH connection in verbose debug mode
ssh -vvv username@your_remote_server_ip -p 22

# Quick port check using Netcat
nc -zv your_remote_server_ip 22`,
        language: "bash",
        type: "terminal"
      },
      "dns name resolution issue": {
        title: "Fix: DNS Name Resolution Failed",
        cause: "Local ISP DNS servers are down, misconfigured hosts files, or invalid DNS configurations.",
        checklist: [
          "Verify you can ping a raw IP (e.g., 8.8.8.8) to isolate connection vs domain issues",
          "Configure local DNS adapter to Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)",
          "Verify no malicious routing blocks exist in your /etc/hosts file",
          "Check local adapter properties and reset IPv4/IPv6 stacks"
        ],
        code: `# Check DNS path to server using nslookup
nslookup google.com

# Trace DNS routing path (Linux/macOS)
dig +trace google.com`,
        language: "bash",
        type: "terminal"
      },
      "port 80/443 connection blocked": {
        title: "Resolve: Port 80/443 Connection Blocked",
        cause: "Web server daemon (Nginx/Apache) is not running, or system firewalls are blocking inbound HTTP/HTTPS traffic.",
        checklist: [
          "Check if web service is running status on server",
          "Inspect local firewalls (UFW, firewalld, or Windows Defender)",
          "Verify router port-forwarding configurations are pointing correctly",
          "Check netstat listening ports on server"
        ],
        code: `# Check service status (Systemd)
sudo systemctl status nginx

# Verify listening ports on server
sudo netstat -tulpn | grep -E '80|443'

# Allow HTTP/HTTPS traffic on Ubuntu Firewall
sudo ufw allow 'Nginx Full'`,
        language: "bash",
        type: "terminal"
      }
    }
  },
  diy: {
    title: "DIY & Tech Repair Agent",
    statusText: "Ready to troubleshoot hardware...",
    suggestions: [
      "Laptop Battery Draining Fast",
      "Touch Screen Unresponsive",
      "Smart Plug Won't Pair",
      "Blue Screen of Death (BSOD)"
    ],
    welcomeMessage: "Welcome to DIY & Tech Repair. I'm here to walk you through basic hardware resets, battery diagnostic reports, device pairings, and system crash recovery. Choose a guide or enter details below.",
    problems: {
      "laptop battery draining fast": {
        title: "Analyze: Fast Battery Drain",
        cause: "High CPU background cycles, worn out battery health capacity, screen brightness, or legacy system settings.",
        checklist: [
          "Open Task Manager / Activity Monitor; kill high CPU-consuming processes",
          "Generate a detailed battery report to review maximum battery capacity",
          "Reduce screen brightness below 60% and toggle power-saving profile",
          "Perform battery calibration (fully discharge, wait, and charge back to 100%)"
        ],
        code: `# Generate a detailed battery health HTML report on Windows
powercfg /batteryreport /output "C:\\battery_report.html"

# Run energy check utility
powercfg /energy`,
        language: "cmd",
        type: "terminal"
      },
      "touch screen unresponsive": {
        title: "Troubleshoot: Unresponsive Mobile Screen",
        cause: "Static buildup, memory freezes, loose connector, or touch digitizer hardware failure.",
        checklist: [
          "Wipe screen surface with a soft microfiber cloth to clean dirt and oils",
          "Remove plastic screen protector or bumper case to test touch input",
          "Force restart the device using physical hardware key combinations",
          "Power off device, remove SIM card tray, re-insert, and restart"
        ],
        code: `To Force Restart:
• iPhone: Press Vol Up, Vol Down, then hold Power Button.
• Android: Hold Power Button and Volume Down for 10 seconds.`,
        language: "text",
        type: "terminal"
      },
      "smart plug won't pair": {
        title: "Fix: IoT Smart Plug Pairing Fail",
        cause: "Smart plugs require a 2.4 GHz WiFi frequency. Modern routers broadcast mixed 2.4/5GHz networks which confuse pairing systems.",
        checklist: [
          "Verify smart phone is temporarily connected strictly to the 2.4 GHz band",
          "Hold the device physical reset button for 10 seconds to restore factory mode",
          "Place device within 5 feet of the router during the pairing process",
          "Disable cellular/mobile data on pairing phone during device setup"
        ],
        code: `Router Setup Tip:
1. Log into your router admin console (typically 192.168.1.1).
2. Create a separate SSID for 2.4 GHz (e.g., "Home_IoT").
3. Connect your phone to "Home_IoT", then launch pairing app.`,
        language: "text",
        type: "terminal"
      },
      "blue screen of death (bsod)": {
        title: "Diagnose: Windows BSOD Crash",
        cause: "Faulty device drivers, corrupt system files, registry issues, or memory/hardware failure.",
        checklist: [
          "Reboot into Safe Mode to isolate background startup driver conflicts",
          "Run the Windows System File Checker (SFC) tool to repair system assets",
          "Run Deployment Image Servicing and Management (DISM) scan",
          "Inspect Device Manager for warning symbols on display/network drivers"
        ],
        code: `# Scan and repair system filesystem files (Command Prompt Admin)
sfc /scannow

# Clean and repair corrupt Windows components image
dism /online /cleanup-image /restorehealth`,
        language: "cmd",
        type: "terminal"
      }
    }
  }
};

// Global App State
let currentDomain = 'code';
let ticketsHistory = [
  { id: 1, title: "React State Updating", domain: "code" },
  { id: 2, title: "Slow WiFi Connection", domain: "network" }
];

// DOM Selectors
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const chatTitle = document.getElementById('chatTitle');
const agentStatus = document.getElementById('agentStatus');
const clearChatBtn = document.getElementById('clearChatBtn');
const messageViewport = document.getElementById('messageViewport');
const quickSuggestions = document.getElementById('quickSuggestions');
const chatInput = document.getElementById('chatInput');
const btnSend = document.getElementById('btnSend');
const historyList = document.getElementById('historyList');
const domainButtons = document.querySelectorAll('.domain-btn');

// Initialize App
function init() {
  setupEventListeners();
  loadDomain(currentDomain);
  renderHistory();
}

// Set Event Listeners
function setupEventListeners() {
  // Domain selection clicks
  domainButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      domainButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const domain = btn.getAttribute('data-domain');
      loadDomain(domain);
      // Close sidebar on mobile
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
  });

  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  });

  // Clear chat
  clearChatBtn.addEventListener('click', () => {
    messageViewport.innerHTML = '';
    sendWelcomeMessage();
  });

  // Send button click
  btnSend.addEventListener('click', handleUserSendMessage);

  // Enter key in textarea
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSendMessage();
    }
  });

  // Textarea auto-resize
  chatInput.addEventListener('input', () => {
    chatInput.style.height = '24px';
    chatInput.style.height = (chatInput.scrollHeight - 20) + 'px';
  });
}

// Load Domain Setup
function loadDomain(domain) {
  currentDomain = domain;
  const config = KNOWLEDGE_BASE[domain];
  
  chatTitle.textContent = config.title;
  agentStatus.textContent = config.statusText;
  
  // Render suggestion chips
  quickSuggestions.innerHTML = '';
  config.suggestions.forEach(sug => {
    const chip = document.createElement('div');
    chip.className = 'suggestion-chip';
    chip.textContent = sug;
    chip.addEventListener('click', () => {
      chatInput.value = sug;
      handleUserSendMessage();
    });
    quickSuggestions.appendChild(chip);
  });

  // Clear chat viewport and greet user
  messageViewport.innerHTML = '';
  sendWelcomeMessage();
}

// Send Chatbot Welcome Message
function sendWelcomeMessage() {
  const config = KNOWLEDGE_BASE[currentDomain];
  appendMessage('bot', config.welcomeMessage);
}

// Append message (bot/user) to viewport
function appendMessage(sender, text, diagnosticObj = null) {
  const row = document.createElement('div');
  row.className = `message-row ${sender}`;
  
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  // For bot messages, support formatting (bold, newlines, code blocks)
  if (sender === 'bot') {
    const formattedText = text.replace(/\n/g, '<br>');
    bubble.innerHTML = `<p>${formattedText}</p>`;
    
    if (diagnosticObj) {
      const card = createDiagnosticCard(diagnosticObj);
      bubble.appendChild(card);
    }
  } else {
    bubble.textContent = text;
  }
  
  row.appendChild(bubble);
  messageViewport.appendChild(row);
  
  // Scroll to bottom
  messageViewport.scrollTop = messageViewport.scrollHeight;
  return row;
}

// Create diagnostic step card
function createDiagnosticCard(diag) {
  const card = document.createElement('div');
  card.className = 'diagnostic-card';
  
  // Header row
  const titleRow = document.createElement('div');
  titleRow.className = 'card-title-row';
  
  const title = document.createElement('span');
  title.className = 'card-title';
  title.textContent = diag.title;
  titleRow.appendChild(title);
  card.appendChild(titleRow);

  // Cause text
  if (diag.cause) {
    const causeText = document.createElement('p');
    causeText.style.fontSize = '0.85rem';
    causeText.style.color = 'var(--text-secondary)';
    causeText.style.marginBottom = '12px';
    causeText.innerHTML = `<strong>Root Cause:</strong> ${diag.cause}`;
    card.appendChild(causeText);
  }

  // Progress Bar container
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-bar-container';
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-bar-fill';
  progressContainer.appendChild(progressFill);
  card.appendChild(progressContainer);

  // Checklist items
  const checklistContainer = document.createElement('div');
  checklistContainer.className = 'checklist-container';
  
  let checkedCount = 0;
  const totalCount = diag.checklist.length;
  
  diag.checklist.forEach((step, index) => {
    const item = document.createElement('div');
    item.className = 'checklist-item';
    
    const checkbox = document.createElement('span');
    checkbox.className = 'checklist-checkbox';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'checklist-text';
    textSpan.textContent = `${index + 1}. ${step}`;
    
    item.appendChild(checkbox);
    item.appendChild(textSpan);
    
    // Toggle check listener
    item.addEventListener('click', () => {
      const isChecked = item.classList.toggle('checked');
      if (isChecked) {
        checkedCount++;
      } else {
        checkedCount--;
      }
      
      // Update progress bar width
      const percent = Math.round((checkedCount / totalCount) * 100);
      progressFill.style.width = `${percent}%`;
      
      // Dynamic response upon completing all steps
      if (checkedCount === totalCount) {
        setTimeout(() => {
          showBotFollowUp(diag.title);
        }, 1000);
      }
    });
    
    checklistContainer.appendChild(item);
  });
  card.appendChild(checklistContainer);

  // Add Copyable code block if exists
  if (diag.code) {
    const termBlock = document.createElement('div');
    termBlock.className = 'terminal-block';
    
    const header = document.createElement('div');
    header.className = 'terminal-header';
    
    const titleSpan = document.createElement('span');
    titleSpan.className = 'terminal-title';
    titleSpan.textContent = diag.type === 'terminal' ? 'terminal - bash' : 'code snippet';
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-copy';
    copyBtn.textContent = 'Copy';
    
    // Copy Event
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(diag.code).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
    
    header.appendChild(titleSpan);
    header.appendChild(copyBtn);
    
    const body = document.createElement('div');
    body.className = 'terminal-body';
    body.textContent = diag.code;
    
    termBlock.appendChild(header);
    termBlock.appendChild(body);
    card.appendChild(termBlock);
  }

  // Tip warning alert
  const alert = document.createElement('div');
  alert.className = 'alert-box tip';
  alert.innerHTML = `💡 <strong>Real-Time Tip:</strong> Execute each step sequentially. Make sure to check the box once you finish a step to track progress.`;
  card.appendChild(alert);

  return card;
}

// Bot follow up message when checklist finishes
function showBotFollowUp(problemTitle) {
  const celebrationMessages = [
    `🎉 Great work! You have finished all checklist steps for "${problemTitle}". Is the issue resolved now? Let me know if you need to run another diagnostic!`,
    `🚀 Checkpoints completed! Did this resolve the issue? If you need additional tweaks, tell me!`,
    `✨ Excellent. All verification steps checked off. Did that clear up the problem?`
  ];
  const msg = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
  appendMessage('bot', msg);
}

// Render recent tickets sidebar list
function renderHistory() {
  historyList.innerHTML = '';
  ticketsHistory.forEach(item => {
    const el = document.createElement('div');
    el.className = 'history-item';
    
    const tag = document.createElement('span');
    tag.className = `tag tag-${item.domain}`;
    tag.textContent = item.domain;
    
    const titleSpan = document.createElement('span');
    titleSpan.textContent = item.title;
    
    el.appendChild(tag);
    el.appendChild(titleSpan);
    
    el.addEventListener('click', () => {
      // Switch domain
      const btn = document.querySelector(`.domain-btn[data-domain="${item.domain}"]`);
      if (btn) btn.click();
      
      // Auto execute query
      setTimeout(() => {
        chatInput.value = item.title;
        handleUserSendMessage();
      }, 200);
    });
    
    historyList.appendChild(el);
  });
}

// Append loading typing indicator
function showTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'message-row bot';
  row.id = 'typingIndicator';
  
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;
  
  bubble.appendChild(indicator);
  row.appendChild(bubble);
  messageViewport.appendChild(row);
  messageViewport.scrollTop = messageViewport.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

// Handle message send
function handleUserSendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  
  // Clear input field and restore layout size
  chatInput.value = '';
  chatInput.style.height = '24px';
  
  // Append user message
  appendMessage('user', text);
  
  // Trigger bot typing simulator
  showTypingIndicator();
  
  agentStatus.textContent = "Analyzing query...";
  
  setTimeout(() => {
    removeTypingIndicator();
    processQuery(text);
    agentStatus.textContent = KNOWLEDGE_BASE[currentDomain].statusText;
  }, 1200);
}

// Process user input and match solution
function processQuery(text) {
  const query = text.toLowerCase();
  
  // Search active domain dataset first
  const activeDataset = KNOWLEDGE_BASE[currentDomain].problems;
  let matchedKey = null;
  
  for (const key in activeDataset) {
    if (query.includes(key) || key.includes(query)) {
      matchedKey = key;
      break;
    }
  }
  
  // If no match in current domain, check other domains to auto-switch
  if (!matchedKey) {
    for (const domain in KNOWLEDGE_BASE) {
      if (domain === currentDomain) continue;
      const dataset = KNOWLEDGE_BASE[domain].problems;
      for (const key in dataset) {
        if (query.includes(key) || key.includes(query)) {
          // Switch domain
          const btn = document.querySelector(`.domain-btn[data-domain="${domain}"]`);
          if (btn) {
            btn.click();
            // Trigger matching flow after switch
            setTimeout(() => {
              showTypingIndicator();
              setTimeout(() => {
                removeTypingIndicator();
                const freshDiagObj = KNOWLEDGE_BASE[domain].problems[key];
                appendMessage('bot', `I detected a query belonging to the **${KNOWLEDGE_BASE[domain].title}** domain. Let's switch contexts and troubleshoot it:`, freshDiagObj);
                addNewTicket(freshDiagObj.title, domain);
              }, 1000);
            }, 300);
            return;
          }
        }
      }
    }
  }

  // Generate dynamic response if still no match
  if (matchedKey) {
    const diagObj = activeDataset[matchedKey];
    appendMessage('bot', `I've analyzed your query and retrieved the matching real-time diagnostic flow. Please follow these guidelines:`, diagObj);
    addNewTicket(diagObj.title, currentDomain);
  } else {
    // Dynamic simulated problem-solving generator
    const fallbackDiag = generateFallbackDiagnostic(text);
    appendMessage('bot', `I've created a custom real-time troubleshooting tree based on your query: "${text}". Follow the steps below:`, fallbackDiag);
    addNewTicket(text.substring(0, 20) + (text.length > 20 ? '...' : ''), currentDomain);
  }
}

// Add new ticket to history list
function addNewTicket(title, domain) {
  // Check duplicate
  const exists = ticketsHistory.some(t => t.title.toLowerCase() === title.toLowerCase());
  if (exists) return;
  
  ticketsHistory.unshift({
    id: Date.now(),
    title: title,
    domain: domain
  });
  
  // Limit to 5 items
  if (ticketsHistory.length > 5) {
    ticketsHistory.pop();
  }
  
  renderHistory();
}

// Fallback Diagnostic Generator
function generateFallbackDiagnostic(queryText) {
  // Heuristic switches to guess domain details
  const lowerText = queryText.toLowerCase();
  let codeSnippet = '';
  let checklist = [];
  let cause = "Custom issue requested by operator.";
  let title = `Fix: "${queryText}"`;

  if (lowerText.includes('error') || lowerText.includes('code') || lowerText.includes('exception') || lowerText.includes('fail')) {
    cause = "Runtime exception or execution syntax failure in the script.";
    checklist = [
      "Verify code syntax and parentheses/braces closure matches",
      "Check error console or log stack trace output details",
      "Test function arguments and parameter data types"
    ];
    codeSnippet = `// Custom Code Sandbox check\ntry {\n  // Code logic here\n} catch(err) {\n  console.error("Debug log details:", err);\n}`;
  } else if (lowerText.includes('wifi') || lowerText.includes('internet') || lowerText.includes('network') || lowerText.includes('server')) {
    cause = "Network device disconnect, routing tables latency, or port block.";
    checklist = [
      "Check hardware indicator lights on terminal/router",
      "Run a ping route test to check server availability status",
      "Verify local interface adapter is configured correctly"
    ];
    codeSnippet = `ping 8.8.8.8\ntracert google.com`;
  } else {
    cause = "Device logic mismatch or system settings configuration conflict.";
    checklist = [
      "Verify connection cords and physical power toggle",
      "Reset device setting parameters to default",
      "Review user instruction guide diagnostic values"
    ];
    codeSnippet = `# Check system log diagnostics\njournalctl -xe`;
  }

  return {
    title: title,
    cause: cause,
    checklist: checklist,
    code: codeSnippet,
    language: "bash",
    type: "terminal"
  };
}

// Run app init
init();
