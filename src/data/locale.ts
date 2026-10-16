// Keep interface strings separate so a future Spanish locale can reuse components.
export const en = {
  projectName: 'Beyond the Third M',
  subtitle: 'An Interactive Atlas of ICI-Associated Neuromuscular Toxicity',
  explore: 'Explore the Mechanisms',
  educationalNote: 'A scientific and educational companion. Not a diagnostic tool or treatment guide.',
  navigation: [
    { href: '#explorer', label: 'Mechanism Explorer' },
    { href: '#laboratory', label: 'Diagnostic Laboratory' },
    { href: '#evidence', label: 'Evidence Explorer' },
    { href: '#study', label: 'About the Study' },
    { href: '#references', label: 'References' },
    { href: '#about', label: 'CV & Contact' },
  ],
} as const;
