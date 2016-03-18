+++
date = "2015-10-14T17:43:46-04:00"
draft = true
title = "One day with - Emacs"
tags = ["One day with"]
+++

I typically use Vi as my terminal editor of choice. However after recently talking with a colleague about Emacs as his terminal editor of choice; he intrigued me to using it. Now I've opened up Emacs in the past before but that was just from accidentally opening it in the terminal. This week I decided to actually learn it.

In this post I will write my daily thoughts, likes and dislikes, and what I learned that may help beginners trying to pick up this tool. In addition, to stay true to this post I decided to write this whole post in emacs. What better way to learn something than to just use it.

***
### Up and Running
So coming in fresh I had no idea what C-x C-c meant. Like I literally hit shift c + x shift c + c. After a little googling I find out that the C in C-x is actually the control key. So now looking back C-x C-c really is just key sequence Ctrl + x + c.

I also at first had no idea what M-f meant. Browsing stackoverflow helped me out on this one. Apparently M is the meta key so in this case since I was using a Mac machine M is the option/alt key. In windows it is the windows or super key. The weird thing about it was that the option key also made my Mac output funky text like this ƒ and ∫ when I try to use Meta + f and Meta + b. The solution to that problem was either to modify my terminal(iTerm2) settings to make the Meta key behave like a Meta key or use the escape key. I chose to do the former as it was easier to reach the option key for me. So to make this post easier for beginners I will refer to C as Ctrl and M as Meta.

To get started I decided to learn the typical workflow patterns all editors should offer which are

 - copy/cut and paste
 - undo and redo
 - search and replace
 - navigation
 - installing plugins

Writing this post there were several occasions where I needed to cut and paste some lines. I looked at this [cheat sheet](http://www.rgrjr.com/emacs/emacs_cheat.html) and easily enough all I had to do was mark the starting point with Ctrl + Space and then go to the end of the desired location and hit Ctrl + w. It also helps that you can copy a whole line by issuing Ctrl + k.

Undo and redo was weird for me as I am used to doing Ctrl+r for redo and hitting u to undo in vim.
The first thing I had to learn was what the heck the command for undo Ctrl+/ and redo Ctrl+g+/ was.
Sometimes I would get weird behaviors when trying to redo changes but that may just be me not being use to emacs yet.

The search and replace feature took me a few tries but I eventually got it. To search was relatively easy just hit Ctrl+s and start typing the word you want to find. The replace functionality was slightly more involved. To replace you had to hit Meta+% (Meta+Shift+5). Which will ask you to find the word to search for (hit enter) then the word to replace with (hit enter). Lastly it'll ask if you want to replace it. I had hit enter a couple times and it kept saying I had 0 occurrences. Finally I decided to hit the y key instead and it finally replaced the word for me.

The navigation in emacs is a breeze as all arrow keys work and using Ctrl+v and Meta+v I was able to do page up and page down. Jumping words were also easy as I could just hit the sequence Meta key + arrow-Left or arrow-Right to jump words vs Meta+f Meta+b. But for productivity I can see where Meta+f and Meta+b can be more resourceful.

Installing plugins has always been one of those things I hated but needed the most for vim. Sometimes things work other times its a complete disaster. So I was really hoping that emacs would be easier and decided to try installing a plugin to see for myself. The plugin I decided to try was a markdown plugin seeing as this post was written in markdown I figured hey why not. A little bit of googling and I happened to stumble upon this link [Emacs Markdown Mode](http://emacswiki.org/emacs/MarkdownMode). Now I have never done this before so it all looks scary new to me. The first few attempts really sucked as I had no idea what was wrong. I read the documentation on the plugin site multiple times and had no luck. I eventually got it to work after upgrading my Emacs version to the latest version. In doing so, the editor also allowed me to do visual selection - hold shift and using the arrow keys. I thought that was pretty cool.

The hardest part for me was tying to un-train myself from using vim commands that I was so use to. I found myself constantly wanting to hit :w or run vim commands. Even when revisiting this post I sometimes open it via the vim command first. Had to resist the urges... must resist. From time to time I did happen to open the debugger window due to trained vim keystrokes. The way to get out of the debugger was pretty straight forward as I just hit the q key but sometimes it didn't work so I had to do something like Ctrl+1 to kill the window.

At the end of the day I felt pretty confident with the basic emacs skills I developed and do think that it is a great and easy tool to pick up with a minimal learning curve.

### Likes
 - I like that the editor has only one mode. Unlike vim there are different modes that maybe intimidating to new users.
 - I like that the arrow keys work
 - Auto-saving. I can't tell you how much I want this in Vi.
 - Emacs feels like an IDE where you can customize language specific features with different modes via the Ctrl key combination.

### Dislikes

 - Undo and redo works weird. I'm still trying to wrap my head around this.
 - Frustrating help window that refuses to close. I eventually got it to close by issuing Ctrl+1.  
 - I wish there was a package manager to maintain the installation of the plugins

### Resource used
[Emacs Cheat Sheet](http://www.rgrjr.com/emacs/emacs_cheat.html)
[GNU Emacs Documentation](https://www.gnu.org/doc/doc.html)

### What I learned
I felt that emacs was a really easy editor to start working in once you understood how the macros work.
The workflow was somewhat smooth for a one day use I suppose it gets easier with time.
The C and M keys are really Ctrl and Meta. The sequence gets easier once you understand the pattern.

Macros that benefited me

    Ctrl + Space //marked location
    Ctrl + w     //cut location
    Ctrl + y     //paste
    Ctrl + k     //cut whole line

    //undo:
    Ctrl + _
    Ctrl + /

    //redo:
	Ctrl + g + _
	Ctrl + g + /

### Would I ever use it again
Sure. But I think I'll stick with Vi for a while.
