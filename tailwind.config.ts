import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
		  typography: {
			DEFAULT: {
			  css: {
				// Customize colors
				'--tw-prose-body': '#374151',
				'--tw-prose-headings': '#111827',
				'--tw-prose-links': '#2563eb',
				'--tw-prose-bullets': '#6b7280',
				
				// Custom styles for specific elements
				h1: {
				  fontSize: '2.5rem',
				  marginBottom: '2rem',
				  fontWeight: '700',
				},
				h2: {
				  fontSize: '2rem',
				  marginBottom: '1.5rem',
				  marginTop: '2rem',
				},
				// p: {
				//   fontSize: '2rem',
				//   marginBottom: '1.5rem',
				//   marginTop: '2rem',
				// },
				'code::before': {
				  content: '""', // Remove backticks
				},
				'code::after': {
				  content: '""',
				},
				code: {
				  color: '#ef4444',
				  backgroundColor: '#fee2e2',
				  padding: '0.2em 0.4em',
				  borderRadius: '0.25rem',
				  fontWeight: '400',
				},
				pre: {
				  backgroundColor: '#1f2937',
				  color: '#f9fafb',
				  padding: '1rem',
				  borderRadius: '0.5rem',
				  overflow: 'auto',
				},
				'pre code': {
				  backgroundColor: 'transparent',
				  color: 'inherit',
				  padding: '0',
				},
				blockquote: {
				  borderLeftColor: '#3b82f6',
				  backgroundColor: '#eff6ff',
				  padding: '1rem',
				  fontStyle: 'italic',
				},
				img: {
				  borderRadius: '0.75rem',
				  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
				},
				a: {
				  color: '#2563eb',
				  textDecoration: 'none',
				  '&:hover': {
					color: '#1d4ed8',
					textDecoration: 'underline',
				  },
				},
				ul: {
				  listStyleType: 'disc',
				  marginTop: '1rem',
				  marginBottom: '1rem',
				  paddingLeft: '1.5rem',
				},
				ol: {
				  listStyleType: 'decimal',
				  marginTop: '1rem',
				  marginBottom: '1rem',
				  paddingLeft: '1.5rem',
				},
				// Add custom styles for tables
				table: {
				  borderCollapse: 'collapse',
				  width: '100%',
				  marginTop: '2rem',
				  marginBottom: '2rem',
				},
				'thead th': {
				  backgroundColor: '#f3f4f6',
				  padding: '0.75rem',
				  borderBottom: '2px solid #e5e7eb',
				},
				'tbody td': {
				  padding: '0.75rem',
				  borderBottom: '1px solid #e5e7eb',
				},
				// Custom spacing
				'> :first-child': {
				  marginTop: '0',
				},
				'> :last-child': {
				  marginBottom: '0',
				},
			  },
			},
			// Custom size variant
			'custom': {
			  css: {
				fontSize: '1.125rem',
				lineHeight: '1.75',
			  },
			},
		  },
	  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  },
  plugins: [
	require("tailwindcss-animate"),
    require("preline/plugin"),
    require("@tailwindcss/typography"),
],
};
export default config;
