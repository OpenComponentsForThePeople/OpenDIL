Hello there! I was amazed by this new feature that allowed ChatGPT to display graphical interfaces in its responses. That is why I made OpenDIL. 

# Features

It uses JSON, JavaScript, and CSS to render:
- Cards
- Badges
- Rankings
- Icons

# Instructions

1. Download `DIL.css`, `DIL.json`, and `renderer.js`
2. Put them in the same folder as your HTML. (or your folder) Make sure those three are in the same folder!
3. Attatch them to you html folder via `<link rel="stylesheet>` and `<script src="renderer.js" defer>` alongside your other CSS and JS attatchments.
4. Now, whenever you need a box, just use `<box color=[text color] bg-color=[background color] border=[border color]>` and don't worry if VSCode shows `border` in red, that's just a false positive!