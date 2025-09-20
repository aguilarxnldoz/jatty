# Welcome to jatty.

"jatty." is a chatroom web application that allows you to create chatrooms and have direct messages with people (pretty basic).
The purpose of the project was to familiarize myself with modern technologies and improve my web-developing skills/arsenal by focusing on building features that require real-time dynamic content.

## Techstacks

-   vite-express
-   React.js
-   TypeScript
-   Redis
-   Socket.io
-   TailwindCSS

## Environment Variables

![env variables](/public/readme_images/envariables.png)

PORT and VITE_API_PORT should be the same value (this is so that I can access env in the front-end, but if theres better methods lmk);

### Database

As of now the database only contains one key which is a set that holds all the chatrooms.

The elements of the set follow a simple object structure:

```
{ roomId, chatroomName }

```
