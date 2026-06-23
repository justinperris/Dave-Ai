# Dave Ai Metal Buildings

A simple static web demo for collecting metal building project details through a guided chat.

## Features
- Intake form (name, contact, ZIP, timeframe)
- Guided questions for key project parameters (size, eave height, roof pitch, openings, insulation, skylights)
- Chat powered by Groq AI (via Netlify function) with fallback to simulated responses
- Specific canned answers for common questions (phone, email, etc.)
- Sends collected lead + project data via Formspree

## Local Testing
Just open `index.html` in any browser.

## Deployment (GitHub + Netlify)
1. Push this folder to a GitHub repo.
2. Import the repo into Netlify.
3. Set `GROQ_API_KEY` in Netlify Environment Variables.
4. Update `FORMSPREE_ENDPOINT` in `index.html` with your real Formspree form ID.
5. Deploy.

The site is fully static but uses a Netlify Function to securely call the Groq API.

## Notes
- Remove or replace the Groq key before making the repo public.
- The guided chat helps gather complete project info without repeating questions.