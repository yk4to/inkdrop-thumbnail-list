# Inkdrop Thumbnail List Plugin

> Inkdrop plugin to show thumbnail images in note lists

![](https://inkdrop-plugin-badge.vercel.app/api/version/thumbnail-list) ![](https://inkdrop-plugin-badge.vercel.app/api/downloads/thumbnail-list) ![](https://img.shields.io/github/license/Fus1onDev/inkdrop-thumbnail-list?style=plastic)

![](./images/ss.png)

This plugin automatically sets the first image as the thumbnail.

You can overwrite it by adding a `thumbnail` key to the front-matter.

![](./images/example.png)

The name of the key (default: `thumbnail`) can be changed from settings.

## Changelog

### 0.2.5

- Fix a bug that there are extra margins on items without thumbnails

### 0.2.4

- Use `require` instead of `default export` for dayjs

### 0.2.3

- Fix a bug that non-YAML formatted text in the front matter cause a crash

### 0.2.2

- Change to get dependencies from npm

### 0.2.1

- Fix a bug that caused a crash if duplicate keys existed in front-matter

### 0.2.0

- Add some options
- Remove one dependency

### 0.1.0 - First Release