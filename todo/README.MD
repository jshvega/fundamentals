# TO-DO APP

## Live Demo
https://fundamentals.manfred.studio/todo/

## Status
Completed

## Stack
- HTML
- CSS
- Vanilla JS
- localStorage

## What is it
Basic Vanilla JS + localStorage to-do app built for my FUNDAMENTALS project. No AI.

## What I learned
CSS: Small attributes I had somehow not used before like flex or overflow-x, and first time working this much with custom input fields and webkit scrollbars. I also kept developing and polishing the way I organize and structure the overall .css file.
JS: I got more practice with methods such as querySelector()/querySelectorAll() or closest(). I also had to revisit localStorage syntax.

## One challenge I faced
My original render() injected user input straight into innerHTML. So looking back, I think that its refactor to prevent XSS attacks was the main challenge I faced. It meant figuring out the concept of a createElement() approach: building each element individually, which felt very modular and also removed the need for an if/else. Along the way I had to use methods I had never used before like createDocumentFragment(), and learn how to implement them in the function.

## What I'd do differently
Plan ahead to avoid as many refactors:
- Array implementation: on my very first approach there was not even a "centralized array", they were all just pure injections on each function.
- save() when implementing localStorage.
- render() XSS/polish refactor.

## Demo GIF
![To-do App demo](./media/demo.gif)