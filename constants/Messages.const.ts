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

export const CASUAL_CHAT_EXAMPLES: ChatBubbleProps[] = [
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Emma Wilson",
        timestamp: "Monday, December 1, 2025 @ 09:23:15 AM",
        content: `😂`,
        reactions: [
            { emoji: "🤬", count: 15, reacted: false },
            { emoji: "👍", count: 10, reacted: false },
            { emoji: "👎", count: 5, reacted: false },
            { emoji: "👌", count: 3, reacted: false },
            { emoji: "👊", count: 2, reacted: false },
            { emoji: "👋", count: 1, reacted: false },
            { emoji: "🤯", count: 0, reacted: false },
        ]
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Emma Wilson",
        timestamp: "Monday, December 1, 2025 @ 09:23:15 AM",
        content: `Hey! Did you see the game last night?`,
        reactions: [
            { emoji: "⚽", count: 2, reacted: false }
        ]
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Jake Martinez",
        timestamp: "Monday, December 1, 2025 @ 09:25:41 AM",
        content: `Yeah! That last minute goal was insane 🔥`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Sophie Chen",
        timestamp: "Monday, December 1, 2025 @ 09:31:08 AM",
        content: `I missed it, still at work. Anyone have a clip?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Brown",
        timestamp: "Monday, December 1, 2025 @ 09:33:22 AM",
        content: `Check your DMs, just sent you the link`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Sophie Chen",
        timestamp: "Monday, December 1, 2025 @ 09:35:47 AM",
        content: `Thanks! You're the best 😊`,
        reactions: [
            { emoji: "👀", count: 1, reacted: true }
        ],
        userReaction: "👀"
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Emma Wilson",
        timestamp: "Monday, December 1, 2025 @ 02:14:33 PM",
        content: `Anyone want to grab coffee after work?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Jake Martinez",
        timestamp: "Monday, December 1, 2025 @ 02:16:19 PM",
        content: `Can't today, got a dentist appointment 😬`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Brown",
        timestamp: "Monday, December 1, 2025 @ 02:18:05 PM",
        content: `I'm down! The usual place?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Emma Wilson",
        replyingTo: {
            name: "Marcus Brown",
            content: `I'm down! The usual place?`,
            id: "1"
        },
        timestamp: "Monday, December 1, 2025 @ 02:19:42 PM",
        content: `Yep! Meet you there around 5:30?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Brown",
        timestamp: "Monday, December 1, 2025 @ 02:20:11 PM",
        content: `Perfect 👍`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Sophie Chen",
        timestamp: "Tuesday, December 2, 2025 @ 10:47:26 AM",
        content: `Just finished my presentation! So relieved it's over`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Emma Wilson",
        timestamp: "Tuesday, December 2, 2025 @ 10:48:53 AM",
        content: `Congrats! How did it go?`,
        reactions: [
            { emoji: "🎉", count: 3, reacted: true }
        ],
        userReaction: "🎉"
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Sophie Chen",
        timestamp: "Tuesday, December 2, 2025 @ 10:52:14 AM",
        content: `Really well actually! The client seemed happy with everything`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Jake Martinez",
        timestamp: "Tuesday, December 2, 2025 @ 10:54:08 AM",
        content: `That's awesome! We should celebrate this weekend`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Brown",
        timestamp: "Tuesday, December 2, 2025 @ 11:03:41 AM",
        content: `Saturday works for me. Dinner somewhere?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Emma Wilson",
        timestamp: "Tuesday, December 2, 2025 @ 11:07:22 AM",
        content: `There's that new Italian place downtown. Heard good things about it`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Sophie Chen",
        timestamp: "Tuesday, December 2, 2025 @ 11:09:55 AM",
        content: `Ooh yes, let's do it! I'll make a reservation for 7pm?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Jake Martinez",
        timestamp: "Tuesday, December 2, 2025 @ 11:11:03 AM",
        content: `Sounds good to me!`,
        reactions: [
            { emoji: "👍", count: 4, reacted: false }
        ]
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Brown",
        timestamp: "Wednesday, December 3, 2025 @ 08:15:37 AM",
        content: `Morning everyone! Quick question - did anyone see my keys yesterday? Can't find them anywhere`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Emma Wilson",
        timestamp: "Wednesday, December 3, 2025 @ 08:18:24 AM",
        content: `Check the break room, I think I saw something on the counter`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Marcus Brown",
        timestamp: "Wednesday, December 3, 2025 @ 08:22:51 AM",
        content: `Found them! They were in my jacket pocket the whole time 🤦‍♂️`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "Jake Martinez",
        timestamp: "Wednesday, December 3, 2025 @ 08:24:16 AM",
        content: `Classic Marcus 😂`,
        reactions: [
            { emoji: "😂", count: 5, reacted: true }
        ],
        userReaction: "😂"
    }
];

export const TEAM_WORKSPACE_EXAMPLES: ChatBubbleProps[] = [
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Lisa Chang",
        timestamp: "Monday, December 15, 2025 @ 09:05:12 AM",
        content: `Good morning team! Ready for the week ahead`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "David Kim",
        timestamp: "Monday, December 15, 2025 @ 09:07:38 AM",
        content: `Morning! Just a heads up, I'm working from home today`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Rachel Foster",
        timestamp: "Monday, December 15, 2025 @ 09:12:45 AM",
        content: `Hey @lisa, did you get a chance to review the budget proposal?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Lisa Chang",
        replyingTo: {
            name: "Rachel Foster",
            content: `Hey @lisa, did you get a chance to review the budget proposal?`,
            id: "1"
        },
        timestamp: "Monday, December 15, 2025 @ 09:18:22 AM",
        content: `Yes! Looks good overall. Just have a few questions about Q2 projections. Can we chat after standup?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Rachel Foster",
        timestamp: "Monday, December 15, 2025 @ 09:19:47 AM",
        content: `Perfect, thanks!`,
        reactions: [
            { emoji: "👍", count: 1, reacted: true }
        ],
        userReaction: "👍"
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Tom Anderson",
        timestamp: "Monday, December 15, 2025 @ 10:33:19 AM",
        content: `Update: Design mockups are ready for review. Link in the project folder`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "David Kim",
        timestamp: "Monday, December 15, 2025 @ 10:36:54 AM",
        content: `Great! I'll take a look this afternoon`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Lisa Chang",
        timestamp: "Monday, December 15, 2025 @ 10:41:03 AM",
        content: `These look fantastic Tom. Really like the color scheme you went with`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Tom Anderson",
        timestamp: "Monday, December 15, 2025 @ 10:44:27 AM",
        content: `Thanks! Tried to keep it clean and modern`,
        reactions: [
            { emoji: "✨", count: 3, reacted: false }
        ]
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Rachel Foster",
        timestamp: "Monday, December 15, 2025 @ 02:15:41 PM",
        content: `Reminder: Client call at 3pm today. Don't forget!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "David Kim",
        timestamp: "Monday, December 15, 2025 @ 02:17:08 PM",
        content: `Thanks for the reminder. I'll dial in from home`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Lisa Chang",
        timestamp: "Monday, December 15, 2025 @ 02:55:33 PM",
        content: `Heading to the conference room now`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Rachel Foster",
        timestamp: "Monday, December 15, 2025 @ 04:22:16 PM",
        content: `That went really well! Client approved moving forward with phase 2`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Tom Anderson",
        timestamp: "Monday, December 15, 2025 @ 04:23:47 PM",
        content: `Excellent news! 🎉`,
        reactions: [
            { emoji: "🎉", count: 4, reacted: true },
            { emoji: "👏", count: 2, reacted: false }
        ],
        userReaction: "🎉"
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "David Kim",
        timestamp: "Monday, December 15, 2025 @ 04:25:13 PM",
        content: `Nice work everyone! This is a big win for the team`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Lisa Chang",
        timestamp: "Tuesday, December 16, 2025 @ 09:41:55 AM",
        content: `Quick question - has anyone tested the new feature on mobile yet?`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Tom Anderson",
        timestamp: "Tuesday, December 16, 2025 @ 09:44:32 AM",
        content: `I tested on iOS yesterday. Working smoothly on my end`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "David Kim",
        timestamp: "Tuesday, December 16, 2025 @ 09:47:18 AM",
        content: `Android testing in progress. Should have results by end of day`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Rachel Foster",
        timestamp: "Tuesday, December 16, 2025 @ 11:28:44 AM",
        content: `Lunch orders are here! Come grab your food from the kitchen`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Lisa Chang",
        timestamp: "Tuesday, December 16, 2025 @ 11:30:21 AM",
        content: `On my way!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/frog.png",
        name: "Tom Anderson",
        timestamp: "Tuesday, December 16, 2025 @ 03:52:09 PM",
        content: `Wrapping up for the day. See you all tomorrow!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/octopus.png",
        name: "David Kim",
        timestamp: "Tuesday, December 16, 2025 @ 03:53:41 PM",
        content: `Have a good evening!`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/tiger.png",
        name: "Rachel Foster",
        timestamp: "Tuesday, December 16, 2025 @ 04:17:28 PM",
        content: `Heads up team: Office will be closed Thursday for maintenance. Plan to work from home`
    },
    {
        avatarUrl: "https://chirps-chat.sirv.com/parrot.png",
        name: "Lisa Chang",
        timestamp: "Tuesday, December 16, 2025 @ 04:19:55 PM",
        content: `Got it, thanks for letting us know`,
        reactions: [
            { emoji: "👍", count: 3, reacted: true }
        ],
        userReaction: "👍"
    }
];