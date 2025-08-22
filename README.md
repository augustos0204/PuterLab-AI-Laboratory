# 🧪 PuterLab - AI Laboratory

An experimental project to test and evaluate the capabilities of the **Puter.JS SDK** by developing a complete AI assistant as a practical use case.

![PuterLab Interface](https://img.shields.io/badge/Status-Experimental-orange?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Design-Responsive-brightgreen?style=for-the-badge)
![Puter.JS](https://img.shields.io/badge/SDK-Puter.JS_v2-blue?style=for-the-badge)

## 🎯 **Project Purpose**

**PuterLab** was developed as a **testing laboratory** to evaluate the functionalities of the [Puter.JS SDK](https://docs.puter.com) in a real application scenario. The project uses a conversational AI assistant as a use case to test:

- ✅ **Authentication System**
- ✅ **LLM Chat API**
- ✅ **Image Generation (txt2img)**
- ✅ **Text-to-Speech (TTS)**
- ✅ **Frontend Integration**

## 🔬 **Implemented Features**

### 💬 **Smart Chat**
- Real-time conversation with **GPT-4.1-nano** model
- WhatsApp-like interface
- "Typing" indicator during processing
- Message history with timestamps
- Auto-scroll for new messages

### 🔐 **Integrated Authentication**
- Login via Puter.auth without additional configuration
- Automatic authentication state verification
- Personalized welcome message
- Disabled states when not authenticated

### 🎨 **Image Generation**
- Dedicated button for text → image conversion
- Direct display in chat
- Processing via `puter.ai.txt2img()`

### 🔊 **Text-to-Speech**
- Audio playback of AI messages
- Audio button on each received message
- Configuration for Brazilian Portuguese
- Puter's generative engine

### 📱 **Responsive Design**
- Adaptive layout for all devices
- Use of `100dvh` for mobile (eliminates unwanted scroll)
- Media queries for different breakpoints
- Touch-friendly elements for mobile devices

## 🛠️ **Technologies Used**

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **SDK**: Puter.JS v2
- **Icons**: Lucide Icons
- **Design**: Mobile-first, Flexbox
- **Hosting**: Compatible with any static server

## ⚙️ **How to Use**

### 1. **Clone and Setup**
```bash
git clone [repository-url]
cd test-puter
```

### 2. **Run**
```bash
# Serve files via HTTP (required for Puter.JS)
python -m http.server 8000
# or
npx serve .
```

### 3. **Access**
- Open `http://localhost:8000`
- Login when prompted
- Test chat and generation features

## 📊 **Test Results**

### ✅ **Text LLM - EXCELLENT**
```javascript
puter.ai.chat(message, { model: "gpt-4.1-nano" })
```

**Rating: ⭐⭐⭐⭐⭐**
- **Response quality**: Very high
- **Speed**: Fast and consistent
- **Reliability**: Stable during tests
- **Integration**: Simple and effective
- **Recommendation**: **Ideal for production**

### ❌ **Image Generation - POOR**
```javascript
puter.ai.txt2img(message)
```

**Rating: ⭐⭐**
- **Visual quality**: Below expectations
- **Processing time**: Very slow
- **Consistency**: Inconsistent results
- **Limitations**: Model seems basic
- **Recommendation**: **Use specialized APIs** (DALL-E, Midjourney, Stable Diffusion)

### ❌ **Text-to-Speech - POOR**
```javascript
puter.ai.txt2speech(message, { language: "pt-BR", engine: "generative" })
```

**Rating: ⭐⭐**
- **Voice quality**: Robotic and artificial
- **Portuguese pronunciation**: Frequent issues
- **Latency**: High processing delays
- **Audio quality**: Low fidelity
- **Recommendation**: **Use specialized services** (ElevenLabs, Google TTS, AWS Polly)

## 📈 **Test Conclusions**

### 🎯 **Recommended Use Cases for Puter.JS**
- ✅ **Chatbots and text assistants**
- ✅ **Q&A Systems**
- ✅ **Rapid prototyping of AI apps**
- ✅ **Applications that need integrated LLM**
- ✅ **MVPs with chat functionalities**

### ⚠️ **Not Recommended**
- ❌ **Applications that depend on high-quality images**
- ❌ **Professional audio systems**
- ❌ **Applications that need quality TTS**

### 🚀 **Suggested Hybrid Strategy**
For a production project:
```
✅ Keep: Puter.JS for chat and authentication
⚠️ Replace: Specialized API for images (OpenAI DALL-E)
⚠️ Replace: Dedicated service for TTS (ElevenLabs)
```

## 🏗️ **Project Architecture**

```
test-puter/
├── index.html          # Main structure
├── style.css           # Responsive styles
├── script.js           # Application logic
├── assets/
│   └── volume-2.svg    # Audio icon
└── README.md           # Documentation
```

### 📱 **Responsiveness**
- **Mobile** (≤480px): Full-screen layout with `100dvh`
- **Tablet** (481px-768px): Centered container
- **Desktop** (≥769px): Layout optimized for large screens
- **Landscape**: Specific adjustments for orientation

## 🎨 **Design System**

### 🎨 **Colors**
- **Primary**: `#075e54` (WhatsApp Green)
- **Secondary**: `#128c7e` (Hover Green)
- **Background**: `#f0f2f5` (Light Gray)
- **Messages**: `#dcf8c6` (Light Green - sent)
- **Received**: `#ffffff` (White - received)

### 🤖 **Visual Identity**
- **Name**: PuterLab
- **Icon**: Robot (Lucide Icons)
- **Theme**: Experimentation laboratory
- **Style**: Minimalist and modern

## 📝 **Features in Detail**

### 🔐 **Authentication System**
```javascript
// State verification
const isAuth = await puter.auth.isSignedIn();

// Login
await puter.auth.signIn();

// User data
const user = await puter.auth.getUser();
```

### 💬 **AI Chat**
```javascript
// Send message
const response = await puter.ai.chat(message, { 
    model: "gpt-4.1-nano" 
});
```

### 🎨 **Image Generation**
```javascript
// Generate image
const imageBase64 = await puter.ai.txt2img(prompt);
```

### 🔊 **Text-to-Speech**
```javascript
// Play audio
const audio = await puter.ai.txt2speech(text, {
    language: "pt-BR",
    engine: "generative"
});
await audio.play();
```

## 📄 **License**

This project is experimental and was developed for testing and evaluation purposes of the Puter.JS SDK.

---

**Developed as a testing laboratory to evaluate Puter.JS SDK capabilities** 🧪

