import { Github, Twitter, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Good First Guide</h3>
            <p className="text-sm text-muted-foreground">
              Helping developers make their first open source contributions with confidence.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@goodfirstissues.com" className="hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://opensource.guide/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Open Source Guides
                </a>
              </li>
              <li>
                <a href="https://github.com/firstcontributions/first-contributions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  First Contributions
                </a>
              </li>
              <li>
                <a href="https://www.freecodecamp.org/news/how-to-contribute-to-open-source/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Contribution Tutorial
                </a>
              </li>
              <li>
                <a href="https://github.com/topics/good-first-issue" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  GitHub Good First Issues
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contributors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Good First Guide. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for the open source community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
