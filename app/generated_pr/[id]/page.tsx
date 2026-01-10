"use client";
import React, { useState } from 'react';
import { GitPullRequest, RefreshCw, Send, XCircle, FileCode, CheckCircle2, FileText, Terminal } from 'lucide-react';

const PRPreviewPage = () => {
    // Simulation of content extracted from a .md response
    const [isRegenerating, setIsRegenerating] = useState(false);

    const handleRegenerate = () => {
        setIsRegenerating(true);
        setTimeout(() => setIsRegenerating(false), 1500); // Simulate API call
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans selection:bg-primary/20">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Top Navigation / Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>Issues</span>
                    <span>/</span>
                    <span className="text-primary font-medium">PR Generation</span>
                </div>

                {/* Header Actions */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border p-6 rounded-2xl shadow-soft">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <GitPullRequest size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Generated Pull Request</h1>
                            <p className="text-muted-foreground text-sm">Review the AI-generated changes from the model response.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-smooth rounded-xl border border-transparent">
                            <XCircle size={18} />
                            Cancel
                        </button>
                        <button
                            onClick={handleRegenerate}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-foreground bg-secondary hover:bg-border transition-smooth rounded-xl border border-border shadow-soft"
                        >
                            <RefreshCw size={18} className={`${isRegenerating ? 'animate-spin' : ''}`} />
                            Regenerate
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-smooth rounded-xl shadow-medium">
                            <Send size={18} />
                            Raise PR
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content: The .md Parser View */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-medium">
                            <div className="bg-muted/50 px-5 py-3 border-b border-border flex items-center gap-2">
                                <FileText size={16} className="text-muted-foreground" />
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">PR_DESCRIPTION.md</span>
                            </div>
                            <div className="p-6 prose prose-slate dark:prose-invert max-w-none">
                                <h3 className="text-xl font-bold mb-2">docs: update contribution guidelines</h3>
                                <p className="text-muted-foreground mb-4">
                                    This pull request addresses the outdated setup instructions in the root documentation.
                                    Key changes include:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    <li>Updated Node.js version requirements to v20 (LTS).</li>
                                    <li>Fixed broken relative links to the security policy.</li>
                                    <li>Clarified the branch naming convention for first-time contributors.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Code Diff Section */}
                        {/* <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-medium">
                            <div className="bg-muted/50 px-5 py-3 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Terminal size={16} className="text-muted-foreground" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Files Changed</span>
                                </div>
                                <code className="text-[10px] bg-accent/20 text-accent-foreground px-2 py-0.5 rounded">CONTRIBUTING.md</code>
                            </div>
                            <div className="bg-[#0d1117] p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                                <div className="text-gray-500 mb-2">@@ -42,7 +42,7 @@</div>
                                <div className="bg-destructive/20 text-destructive-foreground px-2 -mx-2">
                                    - Requires Node.js version 14.x or higher.
                                </div>
                                <div className="bg-accent/20 text-accent-foreground px-2 -mx-2 font-bold">
                                    + Requires Node.js version 20.x (LTS) or higher.
                                </div>
                                <div className="text-gray-300">  Follow the steps below to set up your local environment.</div>
                            </div>
                        </section> */}
                    </div>

                    {/* Sidebar: Metadata & Help */}
                    <aside className="space-y-6">
                        <div className="bg-secondary/50 border border-border rounded-2xl p-6">
                            <h4 className="font-bold mb-4 flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-accent" />
                                PR Checklist
                            </h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex gap-3 text-muted-foreground">
                                    <input type="checkbox" checked readOnly className="mt-1 accent-primary" />
                                    <span>Verified commit message format</span>
                                </li>
                                <li className="flex gap-3 text-muted-foreground">
                                    <input type="checkbox" checked readOnly className="mt-1 accent-primary" />
                                    <span>Targeted main branch</span>
                                </li>
                                <li className="flex gap-3 text-muted-foreground">
                                    <input type="checkbox" className="mt-1 accent-primary" />
                                    <span>Linked to Issue #442</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-2xl">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                <strong>Tip:</strong> If the model response isn't quite right, use the <strong>Regenerate</strong> button to get a fresh perspective from the AI.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PRPreviewPage;