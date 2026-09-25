# Heidi Learn to Read

Heidi Learn to Read is a small listen-and-tap game, made in September 2023 to help a young child practise recognising short English words while learning to read. The app plays a recorded prompt, "Which one is…", followed by a spoken word, and shows three large word cards. The child taps the card that matches the word. A correct tap plays "Good job" and moves to a new round, and a wrong tap plays "That is not right" so the child can try again. A running score (correct minus wrong) is shown at the top. The words are the minimal pairs be/me, sit/sat and tip/pit, where one letter changes the sound, so the child has to read each letter rather than guess from the shape of the word. All audio comes from a single MP3 recording. The app plays short slices of it using start and end timestamps listed in the code, so no audio files per word are needed. It is a single React component written in TypeScript and built with Vite, with Framer Motion for the tap animation. The built site is committed to `docs/` and served by GitHub Pages. It is a personal prototype, and the word list is fixed in the code.

> Personal prototype, built in 2023. Not actively maintained.

**Live demo:** https://www.rach.im/heidi-learn-to-read/

## Features

- Spoken prompt and target word, replayable with the speaker icon next to the title
- Three word cards per round, picked at random from `be`, `me`, `sit`, `sat`, `tip`, `pit`
- Audio feedback for correct and wrong answers
- Score counter (correct minus wrong)
- Tap animation on the cards (Framer Motion `whileTap`)

## Tech stack

React 18 · TypeScript · Vite 4 · Framer Motion · react-icons

## Getting started

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev        # Vite dev server, exposed on the local network (--host)
npm run build      # type-check and build to dist/
npm run preview    # serve the production build
npm run lint       # ESLint
```

The Vite `base` is set to `heidi-learn-to-read` to match the GitHub Pages path. Browsers only play audio after a user interaction, so tap the speaker icon to hear the first word.

## Project structure

```text
src/App.tsx                     the whole game: audio catalogue, quiz words, UI
src/main.tsx                    React entry point
public/heidi-learn-letter.MP3   recording with all prompts and words
docs/                           built site served by GitHub Pages (master branch, /docs)
```

## How it works

`catalog` in `src/App.tsx` maps each phrase to a `{ start, end }` time range, in seconds, within `heidi-learn-letter.MP3`. `playMethod` seeks to `start`, plays, and pauses when `timeupdate` reaches `end`. It returns a promise, so the prompt and the word play one after the other.

To add a word, record it into the MP3, add its time range to `catalog`, and add it to the `quiz` array.

## Deployment

`npm run build` writes to `dist/`. GitHub Pages serves the `docs/` folder on `master`, so copy the contents of `dist/` into `docs/` and commit it.
