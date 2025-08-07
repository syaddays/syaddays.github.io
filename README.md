# Syad Safi - Portfolio

A modern, interactive portfolio website designed to look like a macOS desktop interface. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

- **macOS-style Desktop Interface**: Complete with draggable windows, dock, and menu bar
- **Interactive Projects Showcase**: Browse through projects with detailed descriptions
- **AI Assistant**: Built-in chat interface for questions about projects and skills
- **Responsive Design**: Works seamlessly across different screen sizes
- **Real-time Clock**: Dynamic date and time display
- **Smooth Animations**: Polished user experience with smooth transitions

## 🚀 Live Demo

Visit the live portfolio: [](https://syaddays.github.io/)]

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Tailwind CSS
- **JavaScript**: Vanilla JS for interactivity
- **Tailwind CSS**: Utility-first CSS framework
- **Marked.js**: Markdown parsing for content
- **Google Fonts**: Inter font family

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript functionality
├── deploy.yml          # GitHub Actions deployment
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- GitHub account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

3. **Customize the content**
   - Edit `index.html` to update personal information
   - Modify `script.js` to add new projects or features
   - Update `style.css` for custom styling

## 🎨 Customization

### Adding New Projects

1. Open `script.js`
2. Find the `projects` array
3. Add a new project object with the following structure:
   ```javascript
   {
     title: "Project Name",
     description: "Project description",
     technologies: ["Tech1", "Tech2"],
     link: "https://project-url.com",
     image: "path/to/image.png"
   }
   ```

### Modifying the AI Assistant

The AI assistant uses the Gemini API. To set it up:

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the API key as a GitHub secret named `__GEMINI_API_KEY__`
3. The deployment workflow will automatically inject the key

### Styling Changes

- Main styles are in `style.css`
- Tailwind CSS classes are used throughout `index.html`
- Custom CSS variables are defined for consistent theming

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your code to the `main` branch
2. GitHub Actions will automatically deploy to GitHub Pages
3. Your site will be available at `https://yourusername.github.io/repository-name`

### Manual Deployment

1. Enable GitHub Pages in your repository settings
2. Select the `gh-pages` branch as the source
3. Your site will be deployed automatically

## 🔧 Configuration

### GitHub Secrets

For the AI assistant to work, you need to set up the following secret:

- `__GEMINI_API_KEY__`: Your Google Gemini API key

### Environment Variables

The deployment workflow automatically handles API key injection during the build process.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: syadabduldg@gmail.com
- **Portfolio**: [Your Portfolio URL]

---

Made with ❤️ by Syad Safi 
