# Theming & Skins Guide

Sopplayer v2.0 is built on a modern design system using **CSS Custom Properties (Variables)**. You can use any of our built-in themes or define your own in just a few lines of CSS.

---

## Built-in Themes

| Theme | Class Name | Description |
| :--- | :--- | :--- |
| **Default** | `.sp-theme-default` | Flagship Obsidian Glass dark mode with Sky Blue accents |
| **Flamingo** | `.sp-theme-flamingo` | Vibrant coral-rose theme with ambient glow |
| **Forest** | `.sp-theme-forest` | Emerald nature theme with subtle frosted glass |
| **City** | `.sp-theme-city` | Warm sunset amber and urban ruby night aesthetic |
| **Sea** | `.sp-theme-sea` | Deep marine azure with cool translucent controls |
| **Fantasy** | `.sp-theme-fantasy` | Neon violet cyberpunk theme |
| **Minimal** | `.sp-theme-minimal` | Restrained monochrome theme for technical blogs |

---

## Creating a Custom Skin

To create your own skin, define a CSS selector matching `.sp-player.sp-theme-<your-name>` and override any design tokens:

```css
/* custom-theme.css */
.sp-player.sp-theme-cyber {
  --sp-color-primary: #a855f7;
  --sp-color-primary-hover: #9333ea;
  --sp-color-primary-glow: rgba(168, 85, 247, 0.5);
  --sp-color-bg: rgba(10, 5, 20, 0.9);
  --sp-color-surface: rgba(30, 20, 50, 0.8);
  --sp-radius-md: 20px;
  --sp-focus-ring: 2px solid #a855f7;
}
```

Then initialize the player with your custom theme name:
```javascript
const player = new Sopplayer('#my-video', {
  theme: 'cyber'
});
```
