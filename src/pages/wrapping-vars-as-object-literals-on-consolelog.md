---
title: Wrapping vars as Object Literals on console.log
date: '2017-12-02'
spoiler: A trick i find useful when logging variables via console.logs.
---

Today i learned a handy console trick that i find useful. I hope it does to you too.

When logging variable's, wrap it in Object literal.

Before when i log variables, i always do console.log(variable) and at first its quite okay, until when you pile up logs of console log information, its quite challenging to know which is which. 

But now, wrapping the variable with brackets, like console.log({variable}) before logging makes it more readable in your terminal.

```js
const currentInd = 24;
const names = ['Rizal','Bonifacio'];

//nahh
console.log(currentInd); // 24
console.log(names);      // [ 'Rizal', 'Bonifacio']

//nice
console.log({currentInd}); // { currentInd: 24 }
console.log({names});      // { names: [ 'Rizal', 'Bonifacio'] }
```


