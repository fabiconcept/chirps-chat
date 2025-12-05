import { ChatBubbleProps } from "@/components/DMs/ChatContainer/ChatBubble";

export const MARKDOWN_EXAMPLES: ChatBubbleProps[] = [
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Basic Formatting",
        timestamp: "Monday, November 3, 2025 @ 10:14:22 AM",
        content: `Hey! Check out these **bold** and _italic_ styles!

You can also use __bold__ and *italic* this way.

Want to ~~cross something out~~? Easy!

Here's some \`inline code\` for you.`,
        reactions: [
            { emoji: "😂", count: 1, reacted: true },
            { emoji: "😊", count: 2, reacted: false }
        ],
        userReaction: "😂" // Current user has reacted with 😂
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Lists Master",
        timestamp: "Wednesday, November 5, 2025 @ 04:33:57 PM",
        content: `Here's my shopping list:

- Apples
- Bananas
- Oranges
  - Blood oranges
  - Navel oranges
- Grapes

And my todo list:

1. Wake up
2. Write code
3. Ship features
   1. Test thoroughly
   2. Deploy to prod
4. Celebrate! 🎉`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Task Manager",
        timestamp: "Thursday, November 6, 2025 @ 08:22:41 AM",
        content: `Project Status:

- [x] Design mockups
- [x] Setup repository
- [ ] Implement features
- [ ] Write tests
- [ ] Deploy to production`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Code Wizard",
        timestamp: "Friday, November 7, 2025 @ 11:05:03 AM",
        content: `Here's a quick React component:

\`\`\`javascript
function HelloWorld() {
  return <h1>Hello World!</h1>;
}
\`\`\`

And some Python:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")
\`\`\`

Use \`npm install\` to get started!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Social Butterfly",
        timestamp: "Saturday, November 8, 2025 @ 09:44:18 AM",
        content: `Hey @john and @sarah! 👋

Check out these cool topics:
#javascript #react #webdev #coding

Let's collaborate on this! @teamlead what do you think?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Quote Master",
        timestamp: "Sunday, November 9, 2025 @ 06:11:59 PM",
        content: `Someone once said:

> To be or not to be, that is the question.
> Whether 'tis nobler in the mind to suffer
> The slings and arrows of outrageous fortune

Pretty deep stuff! 🤔`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Link Sharer",
        timestamp: "Monday, November 10, 2025 @ 01:26:52 PM",
        content: `Check out these resources:

[My Portfolio](https://my-portfolio-liart-rho-62.vercel.app/)
[GitHub](https://github.com "Visit GitHub")
<https://twitter.com>

Or visit [https://example.com](https://example.com) directly!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Science Nerd",
        timestamp: "Tuesday, November 11, 2025 @ 07:43:19 PM",
        content: `Did you know?

Water is H~2~O and the equation is E=mc^2^

This is ==super important== to remember!

Chemical formula: CO~2~ (carbon dioxide)`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Table Creator",
        timestamp: "Wednesday, November 12, 2025 @ 03:18:05 PM",
        content: `Here's our team performance:

| Name | Tasks | Status |
|:-----|:-----:|-------:|
| Alice | 24 | ✅ Done |
| Bob | 18 | 🔄 Progress |
| Charlie | 32 | ✅ Done |

Great work everyone! 🎯`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Image Poster",
        timestamp: "Thursday, November 13, 2025 @ 09:01:47 AM",
        content: `Check out these awesome images!

 ![A cute octopus](https://chirps-chat.sirv.com/octopus.png)
 ![A friendly frog](https://chirps-chat.sirv.com/frog.png)

Aren't they adorable? 🐙🐸`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Header Hero",
        timestamp: "Friday, November 14, 2025 @ 05:55:31 PM",
        content: `# Main Title

## Subtitle Here

### Section 1
Some content here about section 1.

#### Subsection A
More detailed information.

##### Small Header
###### Tiny Header

Regular paragraph text continues here.`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Definition Guru",
        timestamp: "Saturday, November 15, 2025 @ 02:44:12 PM",
        content: `Technical Terms:

React
: A JavaScript library for building user interfaces

TypeScript
: A typed superset of JavaScript that compiles to plain JavaScript

npm
: Node Package Manager - the default package manager for Node.js`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Divider Fan",
        timestamp: "Sunday, November 16, 2025 @ 07:33:46 AM",
        content: `First section with some important info.

---

Second section after the divider.

***

Third section with different style.

___

Final section!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Complex Formatter",
        timestamp: "Monday, November 17, 2025 @ 11:19:57 AM",
        content: `# Project Overview

## Features

We've implemented **bold features** with _italic performance_ improvements.

### Task Progress

- [x] Authentication system
- [x] Login flow
- [x] Registration
- [ ] Dashboard
- [x] User profile
- [ ] Analytics

### Code Sample

\`\`\`typescript
interface User {
  id: number;
  name: string;
}
\`\`\`

> Remember: ==Quality over quantity!==

Contact @admin for more info or check #announcements

---

*Built with ❤️ by the team*`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "All-in-One Demo",
        timestamp: "Tuesday, November 18, 2025 @ 04:02:25 PM",
        content: `# Complete Markdown Demo

This message showcases **all features**:

## Text Styling
- **Bold** and __bold__
- *Italic* and _italic_
- ~~Strikethrough~~
- ==Highlighted==
- \`inline code\`

## Lists
1. First item
2. Second item
   - Nested bullet
   - Another one

## Tasks
- [x] Completed
- [ ] Pending

## Science
H~2~O and x^2^

## Social
Hey @user! #markdown

## Links
[Click here](https://example.com)

## Code
\`\`\`js
console.log("Hi!");
\`\`\`

> A wise quote

---

| Feature | Status |
|---------|:------:|
| Lists   | ✅     |
| Tables  | ✅     |

 ![Image](https://chirps-chat.sirv.com/termite.png)
 ![Image](https://chirps-chat.sirv.com/fish.png)
 ![Image](https://chirps-chat.sirv.com/frog.png)`
    }
];
