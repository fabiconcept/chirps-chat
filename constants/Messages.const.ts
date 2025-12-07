import { ChatBubbleProps } from "@/components/DMs/ChatContainer/ChatBubble";

export const MARKDOWN_EXAMPLES: ChatBubbleProps[] = [
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Basic Formatting",
        timestamp: "Monday, November 3, 2025 @ 10:14:22 AM",
        content: `Hey! Check out these **bold** and _italic_ styles!

        @[youtube](YMmdQw17TU4)

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
        replyingTo: {
            name: "Lists Master",
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
4. Celebrate! 🎉`,
            id: "1"
        },
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
> https://aism-edu.vercel.app/

Pretty deep stuff! 🤔`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Link Sharer",
        timestamp: "Monday, November 10, 2025 @ 01:26:52 PM",
        content: `Check out these resources:

[My Portfolio](https://linktree-three-lovat.vercel.app/fabiconcept)
[LinkedIn](https://www.linkedin.com/in/fabiconcept)
[Twitter](https://twitter.com)

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

export const CHANNEL_CHAT_EXAMPLES: ChatBubbleProps[] = [
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Alex Chen",
        timestamp: "Thursday, September 25, 2025 @ 09:15:42 AM",
        content: `Morning team! 👋 Just pushed the new authentication module to dev. Can someone review when you get a chance?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Sarah Mills",
        timestamp: "Thursday, September 25, 2025 @ 09:18:03 AM",
        content: `On it! Will check it out after standup`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Rodriguez",
        timestamp: "Thursday, September 25, 2025 @ 09:22:17 AM",
        content: `@alex quick question - did you use JWT or session-based auth?`,
        reactions: [
            { emoji: "👀", count: 2, reacted: false }
        ]
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Alex Chen",
        replyingTo: {
            name: "Marcus Rodriguez",
            content: `@alex quick question - did you use JWT or session-based auth?`,
            id: "1"
        },
        timestamp: "Thursday, September 25, 2025 @ 09:24:51 AM",
        content: `JWT with refresh tokens. Here's the implementation:

\`\`\`typescript
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '15m' });
};
\`\`\`

Refresh tokens expire in 7 days.`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Jamie Park",
        timestamp: "Thursday, September 25, 2025 @ 10:03:44 AM",
        content: `Hey everyone! Quick reminder:

- [ ] Code review deadline: Today 5pm
- [ ] Sprint retro: Tomorrow 2pm
- [ ] Deploy to staging: Wednesday morning

Let me know if anyone needs an extension on reviews!`,
        reactions: [
            { emoji: "👍", count: 5, reacted: true },
            { emoji: "✅", count: 3, reacted: false }
        ],
        userReaction: "👍"
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Sarah Mills",
        timestamp: "Thursday, September 25, 2025 @ 10:47:22 AM",
        content: `Code review done! ✨

Looks solid overall, just left a few comments about error handling. The logic is clean though, nice work @alex!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Rodriguez",
        timestamp: "Friday, October 18, 2025 @ 11:31:09 AM",
        content: `Lunch break! 🍕

Who's ordering?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Jamie Park",
        timestamp: "Friday, October 18, 2025 @ 11:32:47 AM",
        content: `I can order from that Thai place. The usual?`,
        reactions: [
            { emoji: "🙏", count: 4, reacted: false }
        ]
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Alex Chen",
        timestamp: "Wednesday, November 12, 2025 @ 02:18:55 PM",
        content: `Just addressed all the review comments. Thanks @sarah for the thorough feedback!

Updated PR: [View on GitHub](https://github.com)

The error handling now includes:
1. Network timeouts
2. Invalid token scenarios
3. Rate limiting responses

Should be good to merge now 🚀`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Sarah Mills",
        timestamp: "Wednesday, November 12, 2025 @ 02:45:31 PM",
        content: `Perfect! Approved ✅`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Rodriguez",
        timestamp: "Wednesday, November 12, 2025 @ 03:22:08 PM",
        content: `Ugh, production is down 😱

Getting 502 errors on the API. Anyone else seeing this?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Jamie Park",
        timestamp: "Wednesday, November 12, 2025 @ 03:22:41 PM",
        content: `Checking now...`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Alex Chen",
        timestamp: "Wednesday, November 12, 2025 @ 03:23:19 PM",
        content: `Confirmed. Database connection pool is exhausted. Restarting now.`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Jamie Park",
        timestamp: "Wednesday, November 12, 2025 @ 03:28:52 PM",
        content: `Back up! 🎉

We should increase the pool size to prevent this. Current config:

\`\`\`yaml
database:
  pool_size: 10
  max_overflow: 5
\`\`\`

I'm thinking we bump it to 25/10?`,
        reactions: [
            { emoji: "💯", count: 3, reacted: true }
        ],
        userReaction: "💯"
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Sarah Mills",
        timestamp: "Wednesday, November 12, 2025 @ 03:31:44 PM",
        content: `+1 on that. Let's also add monitoring alerts so we catch this earlier next time.

> We need to be proactive about infrastructure issues, not reactive.

I'll set up CloudWatch alarms this week.`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Rodriguez",
        timestamp: "Wednesday, November 12, 2025 @ 04:15:27 PM",
        content: `Crisis averted! 😅 Good catch everyone.

BTW, found this awesome article on database pooling: [Best Practices](https://example.com/db-pooling)

Key takeaways:
- Monitor connection lifetime
- Set appropriate timeouts
- ==Always have headroom for traffic spikes==

Worth a read! #engineering #databases`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Alex Chen",
        timestamp: "Wednesday, November 12, 2025 @ 04:52:03 PM",
        content: `Wrapping up for today. Final status:

| Task | Status | Owner |
|------|:------:|-------|
| Auth module | ✅ Merged | Alex |
| DB monitoring | 🔄 In Progress | Sarah |
| Pool config | 🔄 In Progress | Jamie |
| Documentation | ⏳ Pending | Marcus |

See y'all tomorrow! Have a great evening 🌙`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Jamie Park",
        timestamp: "Wednesday, November 12, 2025 @ 04:53:38 PM",
        content: `Night! 👋`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Sarah Mills",
        timestamp: "Saturday, December 7, 2025 @ 08:45:12 AM",
        content: `Good morning! ☕ 

Monitoring dashboard is live: [View Dashboard](https://metrics.example.com)

 ![Dashboard Preview](https://chirps-chat.sirv.com/octopus.png)

Now tracking:
- Connection pool usage
- Query response times
- Error rates
- CPU/Memory metrics

Let me know if you want any other metrics added!`,
        reactions: [
            { emoji: "🔥", count: 6, reacted: false },
            { emoji: "🎉", count: 4, reacted: true }
        ],
        userReaction: "🎉"
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Rodriguez",
        timestamp: "Saturday, December 7, 2025 @ 09:12:55 AM",
        content: `This is **amazing** @sarah! 🙌

Could we add disk I/O metrics too? Would help identify bottlenecks.`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Sarah Mills",
        timestamp: "Saturday, December 7, 2025 @ 09:18:03 AM",
        content: `Done! Added to the dashboard ✨`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Alex Chen",
        timestamp: "Saturday, December 7, 2025 @ 11:47:29 AM",
        content: `Team lunch at the new sushi place? 🍣

They have a special today!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Jamie Park",
        timestamp: "Saturday, December 7, 2025 @ 11:48:52 AM",
        content: `Count me in!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Rodriguez",
        timestamp: "Saturday, December 7, 2025 @ 11:49:18 AM",
        content: `🙋‍♂️ I'm there`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Sarah Mills",
        timestamp: "Saturday, December 7, 2025 @ 11:51:07 AM",
        content: `Can't make it today, have a doctor's appointment. Enjoy! 😊`
    }
];