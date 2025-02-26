{
 // Lint & prettify TS and JS files
 '*.{js,jsx,ts,tsx}'; [
    'eslint --fix',
    'prettier --write'
  ],
  // Prettify only Markdown and JSON files
  '*.{md,mdx,json}'; [
    'prettier --write'
  ]
}