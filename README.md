# Open X Follower by @crypto_apha

A powerful Chrome extension to manage your X (formerly Twitter) followers with an ultra-smooth, premium UI.

## Features
- **Bulk Unfollowing**: Quickly remove inactive or unwanted followers.
- **Advanced Filtering**: Filter followers by activity, follow range, and more.
- **Premium Themes**: Includes high-quality visual themes (Transformers, Bitcoin, OpenClaw) with seamless "VIP" animations.
- **Lightweight & Fast**: Optimized to run smoothly without lagging your browser.

## Installation for Development
1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the directory containing this extension.

## Usage
- Pin the extension to your toolbar.
- Open the extension while on `x.com` or `twitter.com`.
- Select your preferred premium theme and start managing your network!

## Structure
- `manifest.json`: Extension configuration (Manifest V3).
- `enhance-panel.js`: Core logic for the premium UI themes and animations.
- `main.*.js` / `popup.*.js`: Core extension functionality and popups.
- `interceptor.*.js`: Background script for API request handling.

## License
MIT
